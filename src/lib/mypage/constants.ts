import type { OrderStatusId } from "@/lib/api/types";
import type { OrderStatusStage } from "@/lib/mypage/mock-data";

export const ORDER_STATUS_LABELS: Record<OrderStatusId, string> = {
  paid: "결제완료",
  preparing: "상품준비중",
  shipping: "배송중",
  delivered: "배송완료",
};

export const ORDER_STATUS_SEQUENCE: OrderStatusId[] = [
  "paid",
  "preparing",
  "shipping",
  "delivered",
];

export function toOrderStatusStages(
  summary: Record<OrderStatusId, number>
): OrderStatusStage[] {
  return ORDER_STATUS_SEQUENCE.map((id) => ({
    id,
    label: ORDER_STATUS_LABELS[id],
    count: summary[id] ?? 0,
  }));
}
