import type { OrderCreateResponse } from "@/types/order";
import type { PaymentResponse } from "@/types/payment";

const ORDER_RESULT_KEY = "checkout-order-result";

export type CheckoutResult = {
  order: OrderCreateResponse;
  payment: PaymentResponse;
};

export function saveOrderResult(
  order: OrderCreateResponse,
  payment: PaymentResponse,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const result: CheckoutResult = { order, payment };
  sessionStorage.setItem(ORDER_RESULT_KEY, JSON.stringify(result));
}

export function getOrderResult(): CheckoutResult | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(ORDER_RESULT_KEY);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!isCheckoutResult(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearOrderResult(): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(ORDER_RESULT_KEY);
}

function isCheckoutResult(value: unknown): value is CheckoutResult {
  if (!isRecord(value)) {
    return false;
  }

  const order = value.order;
  const payment = value.payment;

  if (!isRecord(order) || !isRecord(payment)) {
    return false;
  }

  return (
    typeof order.orderNo === "string" &&
    typeof order.orderName === "string" &&
    typeof payment.approvedNumber === "string" &&
    typeof payment.paidAmount === "number"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
