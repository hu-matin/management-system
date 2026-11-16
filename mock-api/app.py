"""Standalone local mock REST API for the Frontend + UI/UX hiring exercise.

Run from this directory:
    python -m uvicorn app:app --reload --host 127.0.0.1 --port 8000

This server is intentionally not production-ready: no authentication or throttling.
"""
from __future__ import annotations

import json
import os
import sqlite3
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Annotated, Literal

from fastapi import FastAPI, Header, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator, model_validator

HERE = Path(__file__).resolve().parent
DB_PATH = Path(os.environ.get("MOCK_DB_PATH", str(HERE / "requests.db"))).resolve()
SEED_PATH = HERE / "seed_requests.json"
Status = Literal["new", "in_progress", "completed"]
Priority = Literal["low", "medium", "high"]


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def connect() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, timeout=15)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA busy_timeout = 10000")
    return conn


def ensure_database() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with connect() as conn:
        conn.execute("PRAGMA journal_mode = WAL")
        conn.execute("""
            CREATE TABLE IF NOT EXISTS requests (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              description TEXT NOT NULL,
              requester TEXT NOT NULL,
              priority TEXT NOT NULL CHECK(priority IN ('low','medium','high')),
              status TEXT NOT NULL CHECK(status IN ('new','in_progress','completed')),
              created_at TEXT NOT NULL,
              updated_at TEXT NOT NULL,
              version INTEGER NOT NULL DEFAULT 1
            )
        """)
        conn.execute("CREATE INDEX IF NOT EXISTS idx_req_status ON requests(status)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_req_priority ON requests(priority)")
        count = conn.execute("SELECT COUNT(*) FROM requests").fetchone()[0]
        if count == 0:
            rows = json.loads(SEED_PATH.read_text(encoding="utf-8"))
            for row in rows:
                conn.execute("""INSERT INTO requests
                    (title, description, requester, priority, status, created_at, updated_at, version)
                    VALUES (?, ?, ?, ?, ?, ?, ?, 1)""", (
                    row["title"], row["description"], row["requester"],
                    row["priority"], row["status"], row["created_at"], row["created_at"]
                ))
        conn.commit()


@asynccontextmanager
async def lifespan(_app: FastAPI):
    ensure_database()
    yield


app = FastAPI(
    title="Request Management Mock API",
    description="Sample data, CRUD, filtering, and a concurrency challenge for hiring.",
    version="1.0.0",
    lifespan=lifespan,
)
origins = [x.strip() for x in os.environ.get("CORS_ORIGINS", "").split(",") if x.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)


class CleanText(BaseModel):
    @field_validator("*", mode="before")
    @classmethod
    def strip_text(cls, value):
        return value.strip() if isinstance(value, str) else value


class RequestCreate(CleanText):
    title: str = Field(min_length=3, max_length=120)
    description: str = Field(min_length=5, max_length=2000)
    requester: str = Field(min_length=2, max_length=100)
    priority: Priority = "medium"
    status: Status = "new"


class RequestPatch(CleanText):
    title: str | None = Field(default=None, min_length=3, max_length=120)
    description: str | None = Field(default=None, min_length=5, max_length=2000)
    requester: str | None = Field(default=None, min_length=2, max_length=100)
    priority: Priority | None = None
    status: Status | None = None
    expected_version: int | None = Field(default=None, ge=1)

    @model_validator(mode="after")
    def has_changes(self):
        if not any(getattr(self, x) is not None for x in
                   ("title", "description", "requester", "priority", "status")):
            raise ValueError("At least one editable field is required")
        return self


def request_row(row: sqlite3.Row) -> dict:
    return dict(row)


@app.get("/")
def home():
    return {"message": "Request Management Mock API", "docs": "/docs", "health": "/api/health"}


@app.get("/api/health")
def health():
    return {"ok": True}


@app.get("/api/stats")
def get_stats():
    with connect() as conn:
        grouped = conn.execute("SELECT status, COUNT(*) as count FROM requests GROUP BY status").fetchall()
    counts = {"new": 0, "in_progress": 0, "completed": 0}
    for row in grouped:
        counts[row["status"]] = row["count"]
    return {"total": sum(counts.values()), **counts, "open": counts["new"] + counts["in_progress"]}


@app.get("/api/requests")
def list_requests(
    q: str = Query(default="", max_length=120),
    status: Status | None = None,
    priority: Priority | None = None,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=50),
):
    clauses = []
    params: list = []
    if q.strip():
        clauses.append("(title LIKE ? OR requester LIKE ?)")
        params += [f"%{q.strip()}%", f"%{q.strip()}%"]
    if status:
        clauses.append("status = ?")
        params.append(status)
    if priority:
        clauses.append("priority = ?")
        params.append(priority)
    where = " WHERE " + " AND ".join(clauses) if clauses else ""
    with connect() as conn:
        total = conn.execute("SELECT COUNT(*) FROM requests" + where, params).fetchone()[0]
        items = conn.execute(
            "SELECT * FROM requests" + where +
            " ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?",
            [*params, page_size, (page - 1) * page_size],
        ).fetchall()
    return {
        "items": [request_row(x) for x in items],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@app.get("/api/requests/{request_id}")
def get_request(request_id: int):
    with connect() as conn:
        row = conn.execute("SELECT * FROM requests WHERE id = ?", (request_id,)).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail={"code": "not_found", "message": "Request not found"})
    return request_row(row)


@app.post("/api/requests", status_code=201)
def create_request(payload: RequestCreate, response: Response):
    now = utc_now()
    with connect() as conn:
        cursor = conn.execute(
            """INSERT INTO requests
            (title, description, requester, priority, status, created_at, updated_at, version)
            VALUES (?, ?, ?, ?, ?, ?, ?, 1)""",
            (payload.title, payload.description, payload.requester, payload.priority,
             payload.status, now, now),
        )
        row = conn.execute("SELECT * FROM requests WHERE id=?", (cursor.lastrowid,)).fetchone()
        conn.commit()
    response.headers["Location"] = f"/api/requests/{row['id']}"
    return request_row(row)


@app.patch("/api/requests/{request_id}")
def update_request(
    request_id: int,
    payload: RequestPatch,
    x_mock_fail: Annotated[str | None, Header(alias="X-Mock-Fail")] = None,
):
    # Optional deterministic failure to test rollback (the record does not change).
    if x_mock_fail == "1":
        raise HTTPException(status_code=503, detail={"code": "simulated_failure", "message": "Temporary service error"})
    edits = payload.model_dump(exclude_none=True, exclude={"expected_version"})
    with connect() as conn:
        conn.execute("BEGIN IMMEDIATE")
        current = conn.execute("SELECT * FROM requests WHERE id = ?", (request_id,)).fetchone()
        if current is None:
            conn.rollback()
            raise HTTPException(status_code=404, detail={"code": "not_found", "message": "Request not found"})
        if payload.expected_version is not None and payload.expected_version != current["version"]:
            result = request_row(current)
            conn.rollback()
            raise HTTPException(status_code=409, detail={
                "code": "version_conflict",
                "message": "This request was updated by someone else; reload latest data.",
                "current": result,
            })
        columns = ", ".join(f"{col} = ?" for col in edits)
        conn.execute(
            f"UPDATE requests SET {columns}, updated_at = ?, version = version + 1 WHERE id = ?",
            [*edits.values(), utc_now(), request_id],
        )
        row = conn.execute("SELECT * FROM requests WHERE id = ?", (request_id,)).fetchone()
        conn.commit()
    return request_row(row)
