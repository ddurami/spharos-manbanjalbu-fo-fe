"use client";

import { ChevronRight, Gift, Ticket } from "lucide-react";

import { CollapsibleCheckoutSection } from "@/components/checkout/collapsible-checkout-section";
import { Button } from "@/components/ui/button";

const DISCOUNT_OPTIONS = [
  { id: "coupon", label: "쿠폰", icon: Ticket },
  { id: "gift-card", label: "모바일 상품권", icon: Gift },
] as const;

export function DiscountSection() {
  return (
    <CollapsibleCheckoutSection id="discount" title="쿠폰 및 할인">
      <div className="space-y-4">
        {DISCOUNT_OPTIONS.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            type="button"
            variant="ghost"
            className="h-9 w-full justify-start gap-1.5 px-0 text-base text-sb-text-secondary hover:bg-transparent hover:text-foreground"
          >
            <Icon className="size-9 stroke-[1.25]" />
            {label}
            <ChevronRight className="ml-auto size-4 text-sb-text-muted" />
          </Button>
        ))}
      </div>
    </CollapsibleCheckoutSection>
  );
}
