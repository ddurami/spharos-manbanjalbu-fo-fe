import { getAccessToken } from "@/lib/auth/storage";
import { ApiError } from "@/lib/api/errors";
import type { ApiErrorBody } from "@/lib/api/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: boolean;
};

export async function apiClient<T>(
  path: string,
  { body, auth = true, headers, ...options }: ApiClientOptions = {}
): Promise<T> {
  const requestHeaders = new Headers(headers);

  if (body !== undefined) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getAccessToken();

    if (!token) {
      throw new ApiError("인증이 필요합니다.", 401, "UNAUTHORIZED");
    }

    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    let message = "요청 처리 중 오류가 발생했습니다.";

    try {
      const errorBody = (await response.json()) as ApiErrorBody;
      message = errorBody.message ?? message;
    } catch {
      // ignore parse errors
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
