import type { ApiResponse } from "@/types/member";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const accessToken =
    typeof window !== "undefined"
      ? localStorage.getItem("manbanjalbu-access-token")
      : null;

  if (accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  let body: ApiResponse<T> | null = null;

  try {
    body = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new ApiError("서버 응답을 처리할 수 없습니다.", response.status);
  }

  if (!response.ok || !body.success || body.data == null) {
    throw new ApiError(
      body.message ?? "요청 처리 중 오류가 발생했습니다.",
      response.status,
    );
  }

  return body.data;
}

export async function apiRequestVoid(
  path: string,
  options: RequestInit = {},
): Promise<string | null> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const accessToken =
    typeof window !== "undefined"
      ? localStorage.getItem("manbanjalbu-access-token")
      : null;

  if (accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  let body: ApiResponse<unknown> | null = null;

  try {
    body = (await response.json()) as ApiResponse<unknown>;
  } catch {
    throw new ApiError("서버 응답을 처리할 수 없습니다.", response.status);
  }

  if (!response.ok || !body.success) {
    throw new ApiError(
      body.message ?? "요청 처리 중 오류가 발생했습니다.",
      response.status,
    );
  }

  return body.message;
}
