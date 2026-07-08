"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { CollapsibleCheckoutSection } from "@/components/checkout/collapsible-checkout-section";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { PaymentMethod } from "@/lib/checkout/types";
import type { CardResponse } from "@/types/card";
import { cn } from "@/lib/utils";

const DEFAULT_CARD_IMAGE = "/images/products/starbucks-card.png";

const PAYMENT_OPTIONS = [
  { value: "credit-card" as const, label: "신용카드 일반결제" },
  { value: "simple-pay" as const, label: "간편결제", badge: "혜택" },
  { value: "ssgpay" as const, label: "SSGPAY" },
] as const;

type PaymentMethodSectionProps = {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  cards: CardResponse[];
  selectedCardId: number | null;
  onCardSelect: (cardId: number) => void;
  isCardsLoading: boolean;
};

function parsePaymentMethod(value: unknown): PaymentMethod | null {
  if (value === "credit-card" || value === "simple-pay" || value === "ssgpay") {
    return value;
  }
  return null;
}

type CardSelectionPanelProps = {
  cards: CardResponse[];
  selectedCardId: number | null;
  onCardSelect: (cardId: number) => void;
  isCardsLoading: boolean;
};

function CardSelectionPanel({
  cards,
  selectedCardId,
  onCardSelect,
  isCardsLoading,
}: CardSelectionPanelProps) {
  if (isCardsLoading) {
    return (
      <p className="px-5 text-sm text-sb-text-muted">카드 정보를 불러오는 중...</p>
    );
  }

  if (cards.length === 0) {
    return (
      <p className="px-5 text-sm text-sb-text-muted">
        등록된 카드가 없습니다. 결제를 진행할 수 없습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 px-5">
      {cards.map((card) => {
        const isSelected = card.cardId === selectedCardId;
        const imageSrc = card.cardImageUrl ?? DEFAULT_CARD_IMAGE;

        return (
          <button
            key={card.cardId}
            type="button"
            onClick={() => onCardSelect(card.cardId)}
            className={cn(
              "flex h-[120px] w-full max-w-[300px] items-start justify-between rounded-[10px] border-[1.5px] px-3.5 py-3 text-left transition-colors",
              isSelected
                ? "border-primary"
                : "border-sb-border hover:border-primary/60",
            )}
          >
            <div className="flex items-center gap-3 px-2.5">
              <Image
                src={imageSrc}
                alt={card.cardName}
                width={65}
                height={40}
                className="h-10 w-[65px] rounded-sm object-cover"
              />
              <div className="space-y-1">
                <p className="text-sm text-sb-text-muted">{card.cardCompany}</p>
                <p className="text-base font-medium text-sb-text-secondary">
                  {card.cardName}
                </p>
                <p className="text-sm text-sb-text-muted">{card.maskedNumber}</p>
              </div>
            </div>
            {isSelected ? <Check className="size-6 shrink-0 text-primary" /> : null}
          </button>
        );
      })}
    </div>
  );
}

export function PaymentMethodSection({
  value,
  onChange,
  cards,
  selectedCardId,
  onCardSelect,
  isCardsLoading,
}: PaymentMethodSectionProps) {
  return (
    <CollapsibleCheckoutSection id="payment" title="결제수단">
      <RadioGroup
        value={value}
        onValueChange={(nextValue) => {
          const method = parsePaymentMethod(nextValue);
          if (method) {
            onChange(method);
          }
        }}
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
              </div>
              {"badge" in option && option.badge ? (
                <Badge className="rounded bg-sb-green-soft px-3 py-1.5 text-sm font-medium text-primary hover:bg-sb-green-soft">
                  {option.badge}
                </Badge>
              ) : null}
            </div>

            {option.value === "credit-card" && value === "credit-card" ? (
              <CardSelectionPanel
                cards={cards}
                selectedCardId={selectedCardId}
                onCardSelect={onCardSelect}
                isCardsLoading={isCardsLoading}
              />
            ) : null}
          </div>
        ))}
      </RadioGroup>
    </CollapsibleCheckoutSection>
  );
}
