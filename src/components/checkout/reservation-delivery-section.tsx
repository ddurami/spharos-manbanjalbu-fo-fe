"use client";

import { CalendarDays } from "lucide-react";

import {
  formatReservationDateLabel,
  parseReservationDate,
} from "@/lib/checkout/reservation-delivery";
import { cn } from "@/lib/utils";

const NOTICE_LINES = [
  "날짜를 지정하면 지정한 날짜에 상품이 배송됩니다.",
  "배송은 택배사의 사정에 따라 지연될 수 있습니다.",
  "주문 날짜 기준 최대 3개월 후까지 배송 예약이 가능합니다.",
] as const;

type ReservationDeliverySectionProps = {
  enabled: boolean;
  selectedDate: string | null;
  onEnabledChange: (enabled: boolean) => void;
  onOpenDatePicker: () => void;
};

export function ReservationDeliverySection({
  enabled,
  selectedDate,
  onEnabledChange,
  onOpenDatePicker,
}: ReservationDeliverySectionProps) {
  const selectedDateLabel = selectedDate
    ? formatReservationDateLabel(parseReservationDate(selectedDate) ?? new Date())
    : null;

  return (
    <section className="bg-[#222222] px-[30px] py-6 text-white">
      <label className="flex cursor-pointer items-center justify-between gap-4">
        <span className="text-base font-medium">예약배송</span>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => onEnabledChange(event.target.checked)}
          className="size-[22px] cursor-pointer appearance-none rounded-[4px] border-2 border-[#00704A] bg-white checked:border-[#00704A] checked:bg-[#00704A] checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M5%2013l4%204L19%207%22%2F%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat"
        />
      </label>

      {enabled ? (
        <div className="mt-5 space-y-4">
          <button
            type="button"
            onClick={onOpenDatePicker}
            className="flex items-center gap-3 text-left transition-opacity hover:opacity-80"
          >
            <CalendarDays className="size-6 shrink-0 text-white" strokeWidth={1.5} />
            <span
              className={cn(
                "text-base",
                selectedDateLabel ? "text-white" : "text-sb-text-muted",
              )}
            >
              {selectedDateLabel ?? "배송일을 선택해 주세요."}
            </span>
          </button>

          <div className="space-y-1.5">
            {NOTICE_LINES.map((line) => (
              <p key={line} className="text-[13px] leading-relaxed text-[#979797]">
                {line}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
