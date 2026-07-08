"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  buildCalendarMonth,
  formatReservationDateLabel,
  getReservationDateRange,
  isReservationDateSelectable,
  parseReservationDate,
  startOfDay,
} from "@/lib/checkout/reservation-delivery";
import { cn } from "@/lib/utils";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"] as const;

type DeliveryDatePickerModalProps = {
  open: boolean;
  selectedDate: string | null;
  onClose: () => void;
  onSelect: (date: string) => void;
};

export function DeliveryDatePickerModal({
  open,
  selectedDate,
  onClose,
  onSelect,
}: DeliveryDatePickerModalProps) {
  const range = useMemo(() => getReservationDateRange(), []);
  const parsedSelectedDate = selectedDate
    ? parseReservationDate(selectedDate)
    : null;
  const initialMonth = parsedSelectedDate ?? range.minDate;

  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const monthBase = parsedSelectedDate ?? range.minDate;
    setVisibleMonth(
      new Date(monthBase.getFullYear(), monthBase.getMonth(), 1),
    );
  }, [open, parsedSelectedDate, range.minDate]);

  if (!open) {
    return null;
  }

  const monthCells = buildCalendarMonth(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
  );

  const canGoPrev =
    visibleMonth.getFullYear() > range.minDate.getFullYear() ||
    (visibleMonth.getFullYear() === range.minDate.getFullYear() &&
      visibleMonth.getMonth() > range.minDate.getMonth());

  const nextMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    1,
  );
  const canGoNext =
    nextMonth.getFullYear() < range.maxDate.getFullYear() ||
    (nextMonth.getFullYear() === range.maxDate.getFullYear() &&
      nextMonth.getMonth() <= range.maxDate.getMonth());

  const handleSelect = (date: Date) => {
    if (!isReservationDateSelectable(date, range)) {
      return;
    }

    onSelect(
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delivery-date-picker-title"
        className="w-full max-w-[360px] rounded-2xl bg-white px-6 py-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {canGoPrev ? (
              <button
                type="button"
                aria-label="이전 달"
                onClick={() =>
                  setVisibleMonth(
                    new Date(
                      visibleMonth.getFullYear(),
                      visibleMonth.getMonth() - 1,
                      1,
                    ),
                  )
                }
                className="text-foreground transition-opacity hover:opacity-70"
              >
                <ChevronLeft className="size-5" />
              </button>
            ) : (
              <span className="size-5" />
            )}
            <h2
              id="delivery-date-picker-title"
              className="min-w-[72px] text-center text-lg font-medium text-foreground"
            >
              {formatReservationDateLabel(
                new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1),
              ).slice(0, 7)}
            </h2>
            {canGoNext ? (
              <button
                type="button"
                aria-label="다음 달"
                onClick={() =>
                  setVisibleMonth(
                    new Date(
                      visibleMonth.getFullYear(),
                      visibleMonth.getMonth() + 1,
                      1,
                    ),
                  )
                }
                className="text-foreground transition-opacity hover:opacity-70"
              >
                <ChevronRight className="size-5" />
              </button>
            ) : (
              <span className="size-5" />
            )}
          </div>

          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="text-foreground transition-opacity hover:opacity-70"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mb-3 grid grid-cols-7 gap-y-2 text-center text-sm">
          {WEEKDAY_LABELS.map((label, index) => (
            <span
              key={label}
              className={cn(
                "font-medium",
                index === 0 ? "text-[#e75b52]" : "text-foreground",
              )}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
          {monthCells.map(({ date, inCurrentMonth }) => {
            const selectable = isReservationDateSelectable(date, range);
            const isSelected =
              parsedSelectedDate !== null &&
              startOfDay(date).getTime() === startOfDay(parsedSelectedDate).getTime();
            const isSunday = date.getDay() === 0;

            return (
              <button
                key={date.toISOString()}
                type="button"
                disabled={!selectable}
                onClick={() => handleSelect(date)}
                className={cn(
                  "mx-auto flex size-9 items-center justify-center rounded-full transition-colors",
                  !inCurrentMonth && "text-sb-text-muted/50",
                  inCurrentMonth && isSunday && "text-[#e75b52]",
                  inCurrentMonth && !isSunday && "text-foreground",
                  isSelected && "bg-sb-green-soft text-primary",
                  selectable && !isSelected && "hover:bg-sb-green-soft/60",
                  !selectable && "cursor-not-allowed opacity-30",
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
