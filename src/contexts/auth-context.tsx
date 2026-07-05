"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getMemberProfile } from "@/lib/api/member";
import { isApiError } from "@/lib/api/errors";
import {
  clearAuthUser,
  getAccessToken,
  getAuthUser,
  saveAuthSession,
  type AuthUser,
} from "@/lib/auth/storage";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  logout: () => void;
  refreshMember: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toAuthUser(member: {
  id: string;
  name: string;
  email: string;
  memberId: string;
}): AuthUser {
  return {
    id: member.id,
    name: member.name,
    email: member.email,
    memberId: member.memberId,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshMember = useCallback(async () => {
    const token = getAccessToken();

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const member = await getMemberProfile();
      const nextUser = toAuthUser(member);
      saveAuthSession(token, nextUser);
      setUser(nextUser);
    } catch (error) {
      if (isApiError(error) && error.status === 401) {
        clearAuthUser();
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      const cachedUser = getAuthUser();

      if (!cachedUser || !getAccessToken()) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      setUser(cachedUser);

      try {
        await refreshMember();
      } finally {
        setIsLoading(false);
      }
    };

    void initialize();
  }, [refreshMember]);

  const logout = useCallback(() => {
    clearAuthUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      logout,
      refreshMember,
    }),
    [user, isLoading, logout, refreshMember]
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
