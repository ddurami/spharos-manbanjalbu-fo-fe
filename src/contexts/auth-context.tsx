"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { MemberLoginResponse } from "@/types/member";

const AUTH_STORAGE_KEY = "manbanjalbu-auth";
const ACCESS_TOKEN_KEY = "manbanjalbu-access-token";
const MEMBER_STORAGE_KEY = "manbanjalbu-member";

type StoredMember = Pick<
  MemberLoginResponse,
  "memberId" | "loginId" | "name" | "grade"
>;

type AuthContextValue = {
  isAuthReady: boolean;
  isLoggedIn: boolean;
  accessToken: string | null;
  member: StoredMember | null;
  login: (response: MemberLoginResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [member, setMember] = useState<StoredMember | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const storedAuthFlag = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    const storedMember = localStorage.getItem(MEMBER_STORAGE_KEY);

    setAccessToken(storedToken);
    setIsLoggedIn(storedAuthFlag && Boolean(storedToken));

    if (storedMember) {
      try {
        setMember(JSON.parse(storedMember) as StoredMember);
      } catch {
        localStorage.removeItem(MEMBER_STORAGE_KEY);
      }
    }

    if (storedAuthFlag && !storedToken) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    setIsAuthReady(true);
  }, []);

  const login = useCallback((response: MemberLoginResponse) => {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
    localStorage.setItem(
      MEMBER_STORAGE_KEY,
      JSON.stringify({
        memberId: response.memberId,
        loginId: response.loginId,
        name: response.name,
        grade: response.grade,
      }),
    );
    setIsLoggedIn(true);
    setAccessToken(response.accessToken);
    setMember({
      memberId: response.memberId,
      loginId: response.loginId,
      name: response.name,
      grade: response.grade,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(MEMBER_STORAGE_KEY);
    setIsLoggedIn(false);
    setAccessToken(null);
    setMember(null);
  }, []);

  const value = useMemo(
    () => ({ isAuthReady, isLoggedIn, accessToken, member, login, logout }),
    [isAuthReady, isLoggedIn, accessToken, member, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
