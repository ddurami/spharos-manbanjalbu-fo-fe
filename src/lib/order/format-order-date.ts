export function formatOrderDateLabel(orderedAt: string): string {
  const datePart = orderedAt.split("T")[0] ?? orderedAt;
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) {
    return orderedAt;
  }

  return `${year}.${month}.${day}`;
}

export function formatOrderDateTime(orderedAt: string): string {
  const date = new Date(orderedAt);

  if (Number.isNaN(date.getTime())) {
    return orderedAt;
  }

  const dateLabel = formatOrderDateLabel(orderedAt);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours < 12 ? "오전" : "오후";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  return `${dateLabel} ${period} ${hour12}:${minutes}`;
}
