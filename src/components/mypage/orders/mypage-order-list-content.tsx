"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { SortDropdown } from "@/components/common/SortDropdown";
import { MypageOrderDateCard } from "@/components/mypage/orders/mypage-order-date-card";
import { useAuth } from "@/contexts/auth-context";
import { getOrders } from "@/lib/api/order";
import { ApiError } from "@/lib/api/client";
import { groupOrdersByDate } from "@/lib/order/group-orders-by-date";
import {
  isOrderListPeriod,
  ORDER_PERIOD_OPTIONS,
} from "@/lib/order/order-period-options";
import type { OrderListPeriod, OrderSummary } from "@/types/order";

function resolveLoadErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 405) {
      return "주문 목록 API가 아직 적용되지 않았습니다. 백엔드 서버를 최신 코드로 재시작한 뒤 다시 시도해 주세요.";
    }

    return error.message;
  }

  return "주문 내역을 불러오지 못했습니다.";
}

export function MypageOrderListContent() {
  const router = useRouter();
  const { isLoggedIn, isAuthReady } = useAuth();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [period, setPeriod] = useState<OrderListPeriod>("1M");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadOrders = useCallback(async (selectedPeriod: OrderListPeriod) => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await getOrders({
        page: 0,
        size: 20,
        period: selectedPeriod,
      });
      setOrders(response.orders ?? []);
    } catch (error) {
      setOrders([]);
      setLoadError(resolveLoadErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthReady && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isAuthReady, isLoggedIn, router]);

  useEffect(() => {
    if (isAuthReady && isLoggedIn) {
      void loadOrders(period);
    }
  }, [isAuthReady, isLoggedIn, loadOrders, period]);

  const dateGroups = useMemo(() => groupOrdersByDate(orders), [orders]);

  const handlePeriodChange = (value: string) => {
    if (!isOrderListPeriod(value)) {
      return;
    }

    setPeriod(value);
  };

  if (!isAuthReady || !isLoggedIn) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-[28px] font-medium text-foreground sm:text-[32px]">
            주문내역
          </h1>
          <Link
            href="#"
            className="text-sm text-sb-text-muted transition-opacity hover:text-foreground hover:opacity-70"
          >
            이전 주문 조회
          </Link>
        </div>

        <div className="flex justify-end">
          <SortDropdown
            options={ORDER_PERIOD_OPTIONS}
            value={period}
            onChange={handlePeriodChange}
          />
        </div>

        {loadError ? (
          <div className="border border-destructive/30 bg-destructive/5 px-8 py-4 text-sm text-destructive">
            {loadError}
          </div>
        ) : null}

        {isLoading ? (
          <div className="border border-sb-border px-8 py-16 text-center text-base text-sb-text-muted">
            주문 내역을 불러오는 중...
          </div>
        ) : loadError ? null : dateGroups.length > 0 ? (
          <div className="grid grid-cols-1 gap-[50px] md:grid-cols-2">
            {dateGroups.map((group) => (
              <MypageOrderDateCard key={group.dateLabel} group={group} />
            ))}
          </div>
        ) : (
          <div className="border border-sb-border px-8 py-16 text-center text-base text-sb-text-muted">
            주문 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
