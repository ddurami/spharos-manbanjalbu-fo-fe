"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

import { PriceDisplay } from "@/components/common/price-display";
import { Button } from "@/components/ui/button";
import type { OrderItem } from "@/lib/checkout/types";
import { cn } from "@/lib/utils";

type OrderItemRowProps = {
  item: OrderItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  className?: string;
};

export function OrderItemRow({
  item,
  onQuantityChange,
  onRemove,
  className,
}: OrderItemRowProps) {
  const lineTotal = item.price * item.quantity;

  return (
    <div
      className={cn(
        "flex items-start justify-between px-[30px] py-5",
        className
      )}
    >
      <div className="flex gap-5">
        <Image
          src={item.image}
          alt={item.name}
          width={110}
          height={110}
          className="size-[110px] rounded-lg object-cover"
        />
        <div className="flex flex-col gap-[30px] py-2.5">
          <p className="text-base font-medium tracking-tight text-foreground">
            {item.name}
          </p>
          <div className="flex w-[122px] items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="수량 줄이기"
              disabled={item.quantity <= 1}
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              className="size-[30px] rounded-full text-foreground"
            >
              <Minus className="size-4" />
            </Button>
            <span className="text-xl text-foreground">{item.quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="수량 늘리기"
              disabled={item.quantity >= 20}
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              className="size-[30px] rounded-full text-foreground"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-[30px] py-2.5">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="상품 삭제"
          onClick={() => onRemove(item.id)}
          className="text-sb-text-secondary"
        >
          <X className="size-[22px]" />
        </Button>
        <PriceDisplay amount={lineTotal} />
      </div>
    </div>
  );
}
