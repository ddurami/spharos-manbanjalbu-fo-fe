import { apiRequest } from "@/lib/api/client";
import type { PaymentCreateRequest, PaymentResponse } from "@/types/payment";

export function createPayment(request: PaymentCreateRequest) {
  return apiRequest<PaymentResponse>("/api/payments", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export function getPayment(paymentId: number) {
  return apiRequest<PaymentResponse>(`/api/payments/${paymentId}`);
}
