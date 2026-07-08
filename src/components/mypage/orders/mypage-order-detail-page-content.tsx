"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { MypageOrderDetailContent } from "@/components/mypage/orders/mypage-order-detail-content";
import { useAuth } from "@/contexts/auth-context";
import { ApiError } from "@/lib/api/client";
import { getOrderDetail } from "@/lib/api/order";
import type { OrderDetailResponse } from "@/types/order";

function resolveLoadErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 404) {
      return "주문 정보를 찾을 수 없습니다.";
    }

    if (error.status === 405) {
      return "주문 상세 API가 아직 적용되지 않았습니다. 백엔드 서버를 최신 코드로 재시작한 뒤 다시 시도해 주세요.";
    }

    return error.message;
  }

  return "주문 정보를 불러오지 못했습니다.";
}

export function MypageOrderDetailPageContent() {
  const router = useRouter();
  const params = useParams<{ orderNo: string }>();
  const { isLoggedIn, isAuthReady, logout } = useAuth();
  const [order, setOrder] = useState<OrderDetailResponse | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadOrder = useCallback(
    async (orderNo: string) => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await getOrderDetail(orderNo);
        setOrder(response);
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          logout();
          router.replace("/login");
          return;
        }

        setOrder(null);
        setLoadError(resolveLoadErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [logout, router],
  );

  useEffect(() => {
    if (isAuthReady && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isAuthReady, isLoggedIn, router]);

  useEffect(() => {
    if (!isAuthReady || !isLoggedIn || !params.orderNo) {
      return;
    }

    void loadOrder(params.orderNo);
  }, [isAuthReady, isLoggedIn, params.orderNo, loadOrder]);

  if (!isAuthReady || !isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
        <p className="text-base text-sb-text-muted">주문 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
        <div className="flex flex-col gap-6">
          <h1 className="text-[28px] font-medium text-foreground sm:text-[32px]">
            주문 상세 정보
          </h1>
          <div className="border border-destructive/30 bg-destructive/5 px-8 py-4 text-sm text-destructive">
            {loadError}
          </div>
          <Link
            href="/mypage/orders"
            className="text-sm text-sb-text-muted transition-opacity hover:text-foreground hover:opacity-70"
          >
            주문내역으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return <MypageOrderDetailContent order={order} />;
}
