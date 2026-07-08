import type {
  DeliveryStatus,
  OrderPaymentMethod,
  OrderStatus,
} from "@/types/order";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "주문 대기",
  PAID: "주문완료",
  PREPARING: "상품 준비중",
  SHIPPING: "배송중",
  DELIVERED: "배송 완료",
  CANCELLED: "주문 취소",
  REFUNDED: "환불 완료",
};

export function getOrderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABEL[status];
}

export function isDeliveredOrder(
  orderStatus: OrderStatus,
  deliveryStatus: DeliveryStatus,
): boolean {
  return orderStatus === "DELIVERED" || deliveryStatus === "DELIVERED";
}

export const ORDER_PAYMENT_METHOD_LABEL: Record<OrderPaymentMethod, string> = {
  CARD: "신용카드",
  MOBILE: "모바일",
  BANK_TRANSFER: "계좌이체",
  VIRTUAL_ACCOUNT: "가상계좌",
  EASY_PAY: "신용카드 간편결제",
};

export function getOrderPaymentMethodLabel(method: OrderPaymentMethod): string {
  return ORDER_PAYMENT_METHOD_LABEL[method];
}
