import type { SortOption } from "@/components/common/SortDropdown";
import type { OrderListPeriod } from "@/types/order";

export const ORDER_PERIOD_OPTIONS: SortOption[] = [
  { label: "최근 1개월", value: "1M" },
  { label: "최근 3개월", value: "3M" },
  { label: "최근 6개월", value: "6M" },
  { label: "최근 1년", value: "1Y" },
  { label: "전체", value: "ALL" },
];

export function isOrderListPeriod(value: string): value is OrderListPeriod {
  return ORDER_PERIOD_OPTIONS.some((option) => option.value === value);
}
