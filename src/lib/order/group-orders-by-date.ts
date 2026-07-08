import { formatOrderDateLabel } from "@/lib/order/format-order-date";
import type { OrderSummary } from "@/types/order";

export type OrderDateGroup = {
  dateLabel: string;
  orders: OrderSummary[];
};

export function groupOrdersByDate(orders: OrderSummary[]): OrderDateGroup[] {
  const groups = new Map<string, OrderSummary[]>();

  for (const order of orders) {
    const dateLabel = formatOrderDateLabel(order.orderedAt);
    const existing = groups.get(dateLabel);

    if (existing) {
      existing.push(order);
      continue;
    }

    groups.set(dateLabel, [order]);
  }

  return Array.from(groups.entries()).map(([dateLabel, groupedOrders]) => ({
    dateLabel,
    orders: groupedOrders,
  }));
}
