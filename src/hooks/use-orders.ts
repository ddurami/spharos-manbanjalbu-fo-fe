"use client";

import { useEffect, useState } from "react";

import { getOrders } from "@/lib/api/order";
import { isApiError } from "@/lib/api/errors";
import { getAccessToken } from "@/lib/auth/storage";
import { getMockOrders } from "@/lib/api/server/mock-data";
import type { OrderItem, OrderStatusId } from "@/lib/api/types";

type UseOrdersResult = {
  orders: OrderItem[];
  total: number;
  isLoading: boolean;
  error: string | null;
};

export function useOrders(status?: OrderStatusId): UseOrdersResult {
  const mockData = getMockOrders(status);
  const [orders, setOrders] = useState<OrderItem[]>(mockData.items);
  const [total, setTotal] = useState(mockData.total);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      if (!getAccessToken()) {
        const fallback = getMockOrders(status);

        if (!cancelled) {
          setOrders(fallback.items);
          setTotal(fallback.total);
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await getOrders(status);

        if (!cancelled) {
          setOrders(response.items);
          setTotal(response.total);
        }
      } catch (loadError) {
        if (!cancelled) {
          if (isApiError(loadError)) {
            const fallback = getMockOrders(status);
            setOrders(fallback.items);
            setTotal(fallback.total);
          } else {
            setError("주문 내역을 불러오지 못했습니다.");
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [status]);

  return { orders, total, isLoading, error };
}
