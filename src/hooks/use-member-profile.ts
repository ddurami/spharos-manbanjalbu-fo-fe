"use client";

import { useEffect, useState } from "react";

import { getMemberProfile } from "@/lib/api/member";
import { isApiError } from "@/lib/api/errors";
import { getAccessToken } from "@/lib/auth/storage";
import { DEMO_MEMBER } from "@/lib/api/server/mock-data";
import type { MemberProfile } from "@/lib/api/types";

type UseMemberProfileResult = {
  profile: MemberProfile | null;
  isLoading: boolean;
  error: string | null;
};

export function useMemberProfile(): UseMemberProfileResult {
  const [profile, setProfile] = useState<MemberProfile | null>(DEMO_MEMBER);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      if (!getAccessToken()) {
        if (!cancelled) {
          setProfile(DEMO_MEMBER);
          setIsLoading(false);
        }
        return;
      }

      try {
        const nextProfile = await getMemberProfile();

        if (!cancelled) {
          setProfile(nextProfile);
        }
      } catch (loadError) {
        if (!cancelled) {
          if (isApiError(loadError)) {
            setProfile(DEMO_MEMBER);
          } else {
            setError("회원 정보를 불러오지 못했습니다.");
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { profile, isLoading, error };
}
