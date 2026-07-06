import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

type PriceDisplayProps = {
  amount: number;
  amountClassName?: string;
  className?: string;
};

export function PriceDisplay({
  amount,
  amountClassName,
  className,
}: PriceDisplayProps) {
  return (
    <span className={cn("inline-flex items-baseline text-sb-text-secondary", className)}>
      <span className={cn("text-lg tracking-wide", amountClassName)}>
        {formatPrice(amount)}
      </span>
      <span className="text-sm">원</span>
    </span>
  );
}
