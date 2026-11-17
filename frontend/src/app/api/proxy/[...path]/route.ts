import { NextRequest, NextResponse } from "next/server";

const API_SERVER_URL = process.env.API_SERVER_URL;

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function proxyRequest(request: NextRequest, context: RouteContext) {
  if (!API_SERVER_URL) {
    return NextResponse.json(
      { message: "API server URL is not configured" },
      { status: 500 },
    );
  }

  try {
    const { path } = await context.params;

    const targetUrl = new URL(
      `/api/${path.join("/")}${request.nextUrl.search}`,
      API_SERVER_URL,
    );

    const headers = new Headers();

    const contentType = request.headers.get("content-type");

    if (contentType) {
      headers.set("content-type", contentType);
    }

    const mockFail = request.headers.get("X-Mock-Fail");

    if (mockFail) {
      headers.set("X-Mock-Fail", mockFail);
    }

    const hasBody = !["GET", "HEAD"].includes(request.method);

    const body = hasBody ? await request.text() : undefined;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });

    const responseBody = await response.arrayBuffer();

    return new Response(responseBody, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "ارتباط با سرور برقرار نشد" },
      { status: 502 },
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PATCH = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
