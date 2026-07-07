import type { OrderCreateResponse } from "@/types/order";

const ORDER_RESULT_KEY = "checkout-order-result";

export function saveOrderResult(result: OrderCreateResponse): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(ORDER_RESULT_KEY, JSON.stringify(result));
}

export function getOrderResult(): OrderCreateResponse | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(ORDER_RESULT_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as OrderCreateResponse;
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
