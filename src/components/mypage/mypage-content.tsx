"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { MypageMenuList } from "@/components/mypage/mypage-menu-list";
import { MypagePersonalInfoLink } from "@/components/mypage/mypage-personal-info-link";
import { MypageSectionCard } from "@/components/mypage/mypage-section-card";
import { MypageWelcome } from "@/components/mypage/mypage-welcome";
import { useAuth } from "@/contexts/auth-context";
import { ApiError } from "@/lib/api/client";
import { getMypageSummary } from "@/lib/api/mypage";
import {
  buildPaymentMenuItems,
  buildShoppingMenuItems,
} from "@/lib/mypage/menu-data";
import type { MypageSummaryResponse } from "@/types/mypage";

export function MypageContent() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [summary, setSummary] = useState<MypageSummaryResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isReady, isLoggedIn, router]);

  useEffect(() => {
    if (!isReady || !isLoggedIn) {
      return;
    }

    let cancelled = false;

    async function loadSummary() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await getMypageSummary();
        if (!cancelled) {
          setSummary(data);
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        if (error instanceof ApiError && error.status === 401) {
          logout();
          router.replace("/login");
          return;
        }

        setErrorMessage(
          error instanceof ApiError
            ? error.message
            : "마이페이지 정보를 불러오지 못했습니다.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadSummary();

    return () => {
      cancelled = true;
    };
  }, [isReady, isLoggedIn, logout, router]);

  if (!isReady || !isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
        <p className="text-base text-sb-text-subtle">마이페이지 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (errorMessage || !summary) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
        <p className="text-base text-destructive">
          {errorMessage ?? "마이페이지 정보를 불러오지 못했습니다."}
        </p>
      </div>
    );
  }

  const shoppingMenuItems = buildShoppingMenuItems(summary.shoppingInfo);
  const paymentMenuItems = buildPaymentMenuItems(summary.paymentMethods);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
      <div className="flex flex-col gap-10 lg:gap-12">
        <MypageWelcome name={summary.name} />

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col gap-6">
            <MypagePersonalInfoLink />

            <MypageSectionCard title="쇼핑정보">
              <MypageMenuList items={shoppingMenuItems} />
            </MypageSectionCard>
          </div>

          <MypageSectionCard title="결제수단" className="h-full">
            <MypageMenuList items={paymentMenuItems} />
          </MypageSectionCard>
        </div>
      </div>
    </div>
  );
}
