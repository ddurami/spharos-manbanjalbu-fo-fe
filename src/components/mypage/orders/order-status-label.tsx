import { getOrderStatusLabel } from "@/lib/order/order-labels";
import type { OrderStatus } from "@/types/order";

type OrderStatusLabelProps = {
  status: OrderStatus;
};

export function OrderStatusLabel({ status }: OrderStatusLabelProps) {
  return (
    <span className="text-sm font-medium text-foreground">
      {getOrderStatusLabel(status)}
    </span>
  );
}
