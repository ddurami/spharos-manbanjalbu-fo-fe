import { formatPrice } from "@/lib/checkout/calculate-summary";
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
    <span className={cn("inline-flex items-end text-sb-text-secondary", className)}>
      <span className={cn("text-lg tracking-wide", amountClassName)}>
        {formatPrice(amount)}
      </span>
      <span className="text-base">원</span>
    </span>
  );
}
