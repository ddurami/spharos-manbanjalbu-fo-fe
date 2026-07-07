import { cn } from "@/lib/utils";

type ProductBadgeProps = {
  type: "BEST" | "NEW";
  className?: string;
};

export function ProductBadge({ type, className }: ProductBadgeProps) {
  return (
    <span
      className={cn(
        "text-xs font-medium italic",
        type === "BEST" && "text-sb-green",
        type === "NEW" && "text-sb-warning",
        className,
      )}
    >
      {type === "BEST" ? "Best" : "New"}
    </span>
  );
}

type ProductBadgeListProps = {
  isBest: boolean;
  isNew: boolean;
  className?: string;
};

export function ProductBadgeList({
  isBest,
  isNew,
  className,
}: ProductBadgeListProps) {
  if (!isBest && !isNew) return null;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {isBest && <ProductBadge type="BEST" />}
      {isNew && <ProductBadge type="NEW" />}
    </div>
  );
}
