import { MypageOrderItemRow } from "@/components/mypage/orders/mypage-order-item-row";
import type { OrderDateGroup } from "@/lib/order/group-orders-by-date";

type MypageOrderDateCardProps = {
  group: OrderDateGroup;
};

export function MypageOrderDateCard({ group }: MypageOrderDateCardProps) {
  return (
    <article className="flex min-h-0 flex-col border border-sb-border bg-white">
      <div className="shrink-0 px-8 pt-6 pb-2">
        <h2 className="text-base font-medium text-sb-text-muted">
          {group.dateLabel}
        </h2>
      </div>

      <div className="max-h-[480px] min-h-0 overflow-y-auto overscroll-y-contain">
        {group.orders.map((order) => (
          <MypageOrderItemRow key={order.orderNo} order={order} />
        ))}
      </div>
    </article>
  );
}
