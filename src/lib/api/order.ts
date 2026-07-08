import type { PaymentMethod as CheckoutPaymentMethod } from "@/lib/checkout/types";
import type {
  OrderCreateRequest,
  OrderCreateResponse,
  OrderDetailResponse,
  OrderListParams,
  OrderListResponse,
  OrderPaymentMethod,
} from "@/types/order";
import { apiRequest } from "@/lib/api/client";

const PAYMENT_METHOD_MAP: Record<CheckoutPaymentMethod, OrderPaymentMethod> = {
  "credit-card": "CARD",
  ssgpay: "MOBILE",
  "simple-pay": "EASY_PAY",
};

export function toOrderPaymentMethod(
  paymentMethod: CheckoutPaymentMethod,
): OrderPaymentMethod {
  return PAYMENT_METHOD_MAP[paymentMethod];
}

export function createOrder(request: OrderCreateRequest) {
  return apiRequest<OrderCreateResponse>("/api/orders", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export function getOrders(params: OrderListParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.page != null) {
    searchParams.set("page", String(params.page));
  }
  if (params.size != null) {
    searchParams.set("size", String(params.size));
  }
  if (params.period) {
    searchParams.set("period", params.period);
  }
  if (params.orderType) {
    searchParams.set("orderType", params.orderType);
  }

  const query = searchParams.toString();
  return apiRequest<OrderListResponse>(`/api/orders${query ? `?${query}` : ""}`);
}

export function getOrderDetail(orderNo: string) {
  return apiRequest<OrderDetailResponse>(`/api/orders/${orderNo}`);
}

export type CreateOrderParams = {
  cartItemIds: number[];
  memberAddressId: number;
  paymentMethod: CheckoutPaymentMethod;
  deliveryMemo?: string;
  orderType?: OrderCreateRequest["orderType"];
  reservationDeliveryDate?: string;
};

export function buildOrderCreateRequest({
  cartItemIds,
  memberAddressId,
  paymentMethod,
  deliveryMemo,
  orderType,
  reservationDeliveryDate,
}: CreateOrderParams): OrderCreateRequest {
  return {
    cartItemIds,
    memberAddressId,
    paymentMethod: toOrderPaymentMethod(paymentMethod),
    deliveryMemo,
    orderType,
    reservationDeliveryDate,
  };
}
