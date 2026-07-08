import { NextRequest, NextResponse } from "next/server";

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
]);

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

function getBackendTargetUrl(path: string[], search: string) {
  const backendUrl = process.env.BACKEND_URL?.replace(/\/$/, "");
  if (!backendUrl) return null;

  return `${backendUrl}/api/${path.join("/")}${search}`;
}

async function proxyRequest(request: NextRequest, path: string[]) {
  const targetUrl = getBackendTargetUrl(path, request.nextUrl.search);

  if (!targetUrl) {
    return NextResponse.json(
      { success: false, message: "BACKEND_URL이 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: "no-store",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  try {
    const response = await fetch(targetUrl, init);
    const responseHeaders = new Headers();

    response.headers.forEach((value, key) => {
      if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    return new NextResponse(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "백엔드 서버에 연결할 수 없습니다." },
      { status: 502 },
    );
  }
}

async function handler(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
