"use client";

import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";

import { CollapsibleCheckoutSection } from "@/components/checkout/collapsible-checkout-section";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { PaymentMethod } from "@/lib/checkout/types";

type PaymentMethodSectionProps = {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
};

const PAYMENT_OPTIONS = [
  {
    value: "starbucks-card" as const,
    label: "스타벅스 카드 (1)",
    warning: "잔액 부족",
  },
  { value: "simple-pay" as const, label: "간편결제", badge: "혜택" },
  { value: "ssgpay" as const, label: "SSGPAY" },
  { value: "credit-card" as const, label: "신용카드 일반결제" },
];

export function PaymentMethodSection({
  value,
  onChange,
}: PaymentMethodSectionProps) {
  return (
    <CollapsibleCheckoutSection id="payment" title="결제수단">
      <RadioGroup
        value={value}
        onValueChange={(nextValue) => onChange(nextValue as PaymentMethod)}
        className="gap-4"
      >
        {PAYMENT_OPTIONS.map((option) => (
          <div key={option.value} className="space-y-4">
            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-1.5">
                <RadioGroupItem value={option.value} id={option.value} />
                <label
                  htmlFor={option.value}
                  className="cursor-pointer text-base text-sb-text-secondary"
                >
                  {option.label}
                </label>
                {"warning" in option && option.warning ? (
                  <span className="text-[13px] text-sb-warning">
                    {option.warning}
                  </span>
                ) : null}
              </div>
              {"badge" in option && option.badge ? (
                <Badge className="rounded bg-sb-green-soft px-3 py-1.5 text-sm font-medium text-primary hover:bg-sb-green-soft">
                  {option.badge}
                </Badge>
              ) : null}
            </div>

            {option.value === "starbucks-card" && value === "starbucks-card" ? (
              <div className="space-y-4 px-5">
                <div className="flex flex-wrap gap-4">
                  <div className="flex h-[120px] w-full max-w-[300px] items-start justify-between rounded-[10px] border-[1.5px] border-primary px-3.5 py-3">
                    <div className="flex items-center gap-3 px-2.5">
                      <Image
                        src="/images/products/starbucks-card.png"
                        alt="Greeting Card"
                        width={65}
                        height={40}
                        className="h-10 w-[65px] rounded-sm object-cover"
                      />
                      <div className="space-y-3.5">
                        <div>
                          <p className="text-sm text-sb-text-muted">Greeting Card</p>
                          <p className="text-xl font-semibold text-sb-text-secondary">
                            0<span className="text-[13px] font-medium">원</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center gap-3.5 text-[15px] text-primary"
                        >
                          충전하기
                          <ChevronRight className="size-4 rotate-90" />
                        </button>
                      </div>
                    </div>
                    <Check className="size-6 text-primary" />
                  </div>

                  <div className="flex h-[120px] w-full max-w-[300px] items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-sb-text-muted p-3.5">
                    <div className="space-y-3.5 text-center">
                      <p className="text-sm leading-snug text-sb-text-muted">
                        <span className="text-primary">스타벅스 카드</span>를 등록하고
                        <br />
                        편리하게 결제해보세요
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center gap-3.5 text-base text-primary"
                      >
                        등록하기
                        <ChevronRight className="size-4 rotate-90" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded bg-sb-green-soft px-5 py-2 text-center text-[13px] text-primary">
                  🌟스타벅스 카드를 충전하고 다양한 혜택을 누려보세요!
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </RadioGroup>
    </CollapsibleCheckoutSection>
  );
}
