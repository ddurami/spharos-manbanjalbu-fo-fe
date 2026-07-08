const RESERVATION_MONTHS_LIMIT = 3;

export function formatReservationDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatReservationDateLabel(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

export function parseReservationDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getReservationDateRange(baseDate = new Date()) {
  const minDate = startOfDay(baseDate);
  const maxDate = new Date(
    minDate.getFullYear(),
    minDate.getMonth() + RESERVATION_MONTHS_LIMIT,
    minDate.getDate(),
  );

  return { minDate, maxDate };
}

export function isReservationDateSelectable(
  date: Date,
  range = getReservationDateRange(),
): boolean {
  const normalized = startOfDay(date);

  return (
    normalized.getTime() >= range.minDate.getTime() &&
    normalized.getTime() <= range.maxDate.getTime()
  );
}

export function canReserveDelivery(
  items: Array<{ reservationAvailable?: boolean }>,
): boolean {
  return (
    items.length > 0 &&
    items.every((item) => item.reservationAvailable !== false)
  );
}

export function buildCalendarMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index,
    );

    return {
      date,
      inCurrentMonth: date.getMonth() === month,
    };
  });
}
