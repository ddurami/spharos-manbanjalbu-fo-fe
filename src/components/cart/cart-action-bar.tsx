"use client";

import Link from "next/link";

import { PriceDisplay } from "@/components/common/price-display";
import { Button } from "@/components/ui/button";
import type { CheckoutSummary } from "@/lib/checkout/types";
import { cn } from "@/lib/utils";

type CartActionBarProps = {
  summary: CheckoutSummary;
  className?: string;
};

const ACTION_BAR_HEIGHT = 100;

export function CartActionBar({ summary, className }: CartActionBarProps) {
  const canPurchase = summary.itemCount > 0;

  return (
    <div
      className={cn(
        "sticky bottom-0 z-30 border-t border-foreground/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90",
        className,
      )}
      style={{ minHeight: ACTION_BAR_HEIGHT }}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 lg:px-10">
        <div className="flex items-baseline gap-6">
          <p className="text-[15px] font-medium text-foreground">
            총{" "}
            <span className="text-[22px] font-bold text-primary">
              {summary.itemCount}
            </span>
            건
          </p>
          <PriceDisplay
            amount={summary.totalAmount}
            amountClassName="text-[26px] font-bold text-foreground"
            className="text-foreground"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={!canPurchase}
            className="h-14 w-[160px] cursor-pointer rounded-full border-[1.5px] border-primary text-[17px] text-primary hover:bg-sb-green-soft hover:text-primary disabled:cursor-default disabled:border-sb-border disabled:text-sb-text-muted"
          >
            선물하기
          </Button>
          {canPurchase ? (
            <Link href="/checkout">
              <Button
                type="button"
                className="h-14 w-[160px] cursor-pointer rounded-full text-[17px]"
              >
                구매하기
              </Button>
            </Link>
          ) : (
            <Button
              type="button"
              disabled
              className="h-14 w-[160px] rounded-full text-[17px]"
            >
              구매하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { ACTION_BAR_HEIGHT };
