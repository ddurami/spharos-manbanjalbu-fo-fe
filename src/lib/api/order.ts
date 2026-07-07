import type { PaymentMethod } from "@/lib/checkout/types";
import type {
  OrderCreateRequest,
  OrderCreateResponse,
  OrderPaymentMethod,
} from "@/types/order";
import { apiRequest } from "@/lib/api/client";

const PAYMENT_METHOD_MAP: Record<PaymentMethod, OrderPaymentMethod> = {
  "credit-card": "CARD",
  ssgpay: "MOBILE",
  "simple-pay": "EASY_PAY",
  "starbucks-card": "EASY_PAY",
};

export function toOrderPaymentMethod(
  paymentMethod: PaymentMethod,
): OrderPaymentMethod {
  return PAYMENT_METHOD_MAP[paymentMethod];
}

export function createOrder(request: OrderCreateRequest) {
  return apiRequest<OrderCreateResponse>("/api/orders", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export type CreateOrderParams = {
  cartItemIds: number[];
  memberAddressId: number;
  paymentMethod: PaymentMethod;
  deliveryMemo?: string;
};

export function buildOrderCreateRequest({
  cartItemIds,
  memberAddressId,
  paymentMethod,
  deliveryMemo,
}: CreateOrderParams): OrderCreateRequest {
  return {
    cartItemIds,
    memberAddressId,
    paymentMethod: toOrderPaymentMethod(paymentMethod),
    deliveryMemo,
  };
}
