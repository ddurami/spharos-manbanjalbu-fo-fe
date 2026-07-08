import Link from "next/link";

import { isDeliveredOrder } from "@/lib/order/order-labels";
import type { OrderSummary } from "@/types/order";
import { cn } from "@/lib/utils";

type OrderActionButtonProps = {
  order: OrderSummary;
  className?: string;
};

const outlineButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-full border border-sb-green px-6 text-sm font-medium text-sb-green transition-opacity hover:opacity-70 disabled:cursor-default disabled:opacity-60";

export function OrderActionButton({ order, className }: OrderActionButtonProps) {
  if (order.cancelable) {
    return (
      <button
        type="button"
        onClick={() => {
          window.alert("주문 취소 기능은 준비 중입니다.");
        }}
        className={cn(outlineButtonClassName, className)}
      >
        주문 취소
      </button>
    );
  }

  if (isDeliveredOrder(order.orderStatus, order.deliveryStatus)) {
    return (
      <button
        type="button"
        disabled
        className={cn(outlineButtonClassName, className)}
        aria-label="배송 완료"
      >
        배송 완료
      </button>
    );
  }

  return (
    <Link
      href={`/mypage/orders/${order.orderNo}`}
      className={cn(outlineButtonClassName, className)}
    >
      주문 상세 보기
    </Link>
  );
}
