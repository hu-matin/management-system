"""Reset local mock data to 16 original sample requests. Stop the server first."""
from pathlib import Path
from app import DB_PATH, ensure_database

for path in [DB_PATH, Path(str(DB_PATH) + "-wal"), Path(str(DB_PATH) + "-shm")]:
    if path.exists():
        path.unlink()
ensure_database()
print(f"Mock database reset: {DB_PATH}")
