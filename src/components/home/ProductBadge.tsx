import type { ProductBadge as ProductBadgeType } from "@/types/home";
import { cn } from "@/lib/utils";

interface ProductBadgeProps {
  badges: ProductBadgeType[];
  className?: string;
}

const BADGE_STYLES: Record<ProductBadgeType, string> = {
  BEST: "bg-starbucks-green text-white",
  NEW: "bg-foreground text-white",
  SALE: "bg-red-600 text-white",
};

export function ProductBadgeList({ badges, className }: ProductBadgeProps) {
  if (badges.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="상품 뱃지">
      {badges.map((badge) => (
        <li key={badge}>
          <span
            className={cn(
              "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
              BADGE_STYLES[badge],
            )}
          >
            {badge}
          </span>
        </li>
      ))}
    </ul>
  );
}
