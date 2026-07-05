import type { MemberProfile } from "@/lib/api/types";

export type AuthUser = Pick<MemberProfile, "id" | "name" | "email" | "memberId">;

const SESSION_KEY = "starbucks-auth";
const TOKEN_KEY = "starbucks-access-token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return sessionStorage.getItem(TOKEN_KEY);
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(SESSION_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function saveAuthSession(accessToken: string, user: AuthUser): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(TOKEN_KEY, accessToken);
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearAuthUser(): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}
