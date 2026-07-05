"use client";

import { useEffect, useState } from "react";

import { getOrderStatusSummary } from "@/lib/api/order";
import { isApiError } from "@/lib/api/errors";
import { getAccessToken } from "@/lib/auth/storage";
import { getMockOrderStatusSummary } from "@/lib/api/server/mock-data";
import type { OrderStatusStage } from "@/lib/mypage/mock-data";
import { toOrderStatusStages } from "@/lib/mypage/constants";

type UseOrderStatusSummaryResult = {
  stages: OrderStatusStage[];
  isLoading: boolean;
  error: string | null;
};

export function useOrderStatusSummary(): UseOrderStatusSummaryResult {
  const [stages, setStages] = useState<OrderStatusStage[]>(
    toOrderStatusStages(getMockOrderStatusSummary())
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      if (!getAccessToken()) {
        if (!cancelled) {
          setStages(toOrderStatusStages(getMockOrderStatusSummary()));
          setIsLoading(false);
        }
        return;
      }

      try {
        const summary = await getOrderStatusSummary();

        if (!cancelled) {
          setStages(toOrderStatusStages(summary));
        }
      } catch (loadError) {
        if (!cancelled) {
          if (isApiError(loadError)) {
            setStages(toOrderStatusStages(getMockOrderStatusSummary()));
          } else {
            setError("주문 현황을 불러오지 못했습니다.");
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
  }, []);

  return { stages, isLoading, error };
}
