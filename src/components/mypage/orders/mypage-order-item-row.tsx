import Link from "next/link";

import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { PriceDisplay } from "@/components/common/price-display";
import { OrderActionButton } from "@/components/mypage/orders/order-action-button";
import { OrderStatusLabel } from "@/components/mypage/orders/order-status-label";
import type { OrderSummary } from "@/types/order";

type MypageOrderItemRowProps = {
  order: OrderSummary;
};

export function MypageOrderItemRow({ order }: MypageOrderItemRowProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-sb-border px-8 py-6 last:border-b-0">
      <div className="flex gap-4">
        <div className="size-20 shrink-0 overflow-hidden bg-placeholder">
          <ImagePlaceholder
            src={order.thumbnailUrl}
            alt={order.orderName}
            width={80}
            height={80}
            className="size-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <OrderStatusLabel status={order.orderStatus} />
          <p className="truncate text-base font-medium text-foreground">
            {order.orderName}
          </p>
          <PriceDisplay amount={order.orderAmount} amountClassName="text-base" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Link
          href={`/mypage/orders/${order.orderNo}`}
          className="text-sm text-sb-text-muted transition-opacity hover:text-foreground hover:opacity-70"
        >
          주문상세
        </Link>
        <OrderActionButton order={order} />
      </div>
    </div>
  );
}
