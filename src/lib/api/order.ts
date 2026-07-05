import { apiClient } from "@/lib/api/client";
import type {
  OrderListResponse,
  OrderStatusId,
  OrderStatusSummary,
} from "@/lib/api/types";

export function getOrderStatusSummary() {
  return apiClient<OrderStatusSummary>("/v1/orders/summary");
}

export function getOrders(status?: OrderStatusId) {
  const query = status ? `?status=${status}` : "";

  return apiClient<OrderListResponse>(`/v1/orders${query}`);
}
