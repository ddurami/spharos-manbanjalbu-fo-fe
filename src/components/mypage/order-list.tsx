import type { OrderItem } from "@/lib/api/types";
import { ORDER_STATUS_LABELS } from "@/lib/mypage/constants";

function formatAmount(amount: number) {
  return `${amount.toLocaleString("ko-KR")}원`;
}

function formatDate(date: string) {
  return date.replace(/-/g, ".");
}

type OrderListProps = {
  orders: OrderItem[];
};

export function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <p className="rounded-lg border border-sb-border bg-sb-green-soft px-6 py-5 text-base text-muted-foreground">
        해당 상태의 주문 내역이 없습니다.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-sb-border border border-sb-border">
      {orders.map((order) => (
        <li key={order.orderId} className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{formatDate(order.orderDate)}</p>
            <p className="text-lg text-foreground">{order.productName}</p>
            <p className="text-sm text-muted-foreground">
              주문번호 {order.orderId} · 수량 {order.quantity}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-primary">{ORDER_STATUS_LABELS[order.status]}</p>
            <p className="text-lg font-medium text-foreground">
              {formatAmount(order.totalAmount)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
