import { PriceDisplay } from "@/components/common/price-display";
import { Button } from "@/components/ui/button";
import {
  CHECKOUT_ACTION_BAR_HEIGHT,
  type CheckoutSummary,
} from "@/lib/checkout/types";
import { cn } from "@/lib/utils";

type CheckoutActionBarProps = {
  summary: CheckoutSummary;
  hasAddress: boolean;
  className?: string;
};

export function CheckoutActionBar({
  summary,
  hasAddress,
  className,
}: CheckoutActionBarProps) {
  const canPurchase = summary.itemCount > 0 && hasAddress;

  return (
    <div
      className={cn(
        "sticky bottom-0 z-30 border-t border-foreground/10 bg-white/95 px-[50px] py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur supports-[backdrop-filter]:bg-white/90 lg:px-[300px]",
        className
      )}
      style={{ minHeight: CHECKOUT_ACTION_BAR_HEIGHT }}
    >
      <div className="mx-auto flex max-w-[1320px] flex-col gap-6 pb-[30px] pt-5 lg:flex-row lg:items-start lg:justify-between lg:gap-[50px]">
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xl font-medium text-foreground">
              총{" "}
              <span className="text-[26px] font-semibold text-primary">
                {summary.itemCount}
              </span>
              건
            </p>
            <PriceDisplay
              amount={summary.totalAmount}
              amountClassName="text-[30px] font-bold text-foreground"
              className="text-foreground"
            />
          </div>
          <p className="text-sm text-sb-text-subtle">
            위 주문 내용을 확인하였으며, 결제에 동의합니다. (전자상거래법 8조
            2항)
          </p>
        </div>

        <div className="flex w-full max-w-[440px] items-center justify-end lg:ml-auto">
          <Button
            type="button"
            disabled={!canPurchase}
            className="h-14 w-full max-w-[210px] rounded-full text-[17px]"
          >
            구매하기
          </Button>
        </div>
      </div>
    </div>
  );
}
