"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { OrderList } from "@/components/mypage/order-list";
import { useOrders } from "@/hooks/use-orders";
import type { OrderStatusId } from "@/lib/api/types";
import { ORDER_STATUS_LABELS } from "@/lib/mypage/constants";

const VALID_STATUSES = new Set<OrderStatusId>([
  "paid",
  "preparing",
  "shipping",
  "delivered",
]);

function OrdersContent() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const status =
    statusParam && VALID_STATUSES.has(statusParam as OrderStatusId)
      ? (statusParam as OrderStatusId)
      : undefined;
  const statusLabel = status ? ORDER_STATUS_LABELS[status] : null;
  const { orders, total, isLoading, error } = useOrders(status);

  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="px-[50px] py-[50px] lg:px-[300px]">
        <Link
          href="/mypage"
          className="mb-6 inline-flex text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          ← 마이페이지로 돌아가기
        </Link>
        <h1 className="text-[36px] font-medium text-foreground">주문내역</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          주문 및 배송 내역을 확인할 수 있습니다.
        </p>
        {statusLabel ? (
          <p className="mt-4 text-base text-primary">
            현재 필터: {statusLabel} ({total}건)
          </p>
        ) : (
          <p className="mt-4 text-base text-muted-foreground">전체 {total}건</p>
        )}

        <div className="mt-8">
          {isLoading ? (
            <p className="py-12 text-center text-muted-foreground">불러오는 중...</p>
          ) : error ? (
            <p className="py-12 text-center text-destructive">{error}</p>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center py-24 text-muted-foreground">
          로딩 중...
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}
