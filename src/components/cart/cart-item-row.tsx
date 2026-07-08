"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { PriceDisplay } from "@/components/common/price-display";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/lib/cart/types";
import { MAX_ITEM_QUANTITY } from "@/lib/cart/types";
import { cn } from "@/lib/utils";

type CartItemRowProps = {
  item: CartItem;
  checked: boolean;
  onCheckedChange: (cartItemId: number, checked: boolean) => void;
  onQuantityChange: (cartItemId: number, quantity: number) => void;
  onRemove: (cartItemId: number) => void;
  className?: string;
};

export function CartItemRow({
  item,
  checked,
  onCheckedChange,
  onQuantityChange,
  onRemove,
  className,
}: CartItemRowProps) {
  const lineTotal = item.price * item.quantity;

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-[30px] py-5",
        className,
      )}
    >
      <label className="flex shrink-0 cursor-pointer items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(item.cartItemId, e.target.checked)}
          className="size-[18px] cursor-pointer accent-[#00704A]"
        />
      </label>

      <div className="size-[100px] shrink-0 overflow-hidden rounded-lg bg-placeholder">
        <ImagePlaceholder
          src={item.thumbnailUrl}
          alt={item.productName}
          width={100}
          height={100}
          className="size-full object-cover"
        />
      </div>

      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col gap-5">
          <p className="text-[15px] font-medium leading-snug text-foreground">
            {item.productName}
          </p>
          <div className="flex w-[110px] items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="수량 줄이기"
              disabled={item.quantity <= 1}
              onClick={() => onQuantityChange(item.cartItemId, item.quantity - 1)}
              className="size-7 cursor-pointer rounded-full border border-sb-border text-foreground"
            >
              <Minus className="size-3.5" />
            </Button>
            <span className="min-w-[24px] text-center text-[15px] font-medium text-foreground">
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="수량 늘리기"
              disabled={item.quantity >= MAX_ITEM_QUANTITY}
              onClick={() => onQuantityChange(item.cartItemId, item.quantity + 1)}
              className="size-7 cursor-pointer rounded-full border border-sb-border text-foreground"
            >
              <Plus className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-end gap-5">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="상품 삭제"
            onClick={() => onRemove(item.cartItemId)}
            className="cursor-pointer text-sb-text-muted"
          >
            <Trash2 className="size-[18px]" />
          </Button>
          <PriceDisplay
            amount={lineTotal}
            amountClassName="text-[15px] font-semibold"
          />
        </div>
      </div>
    </div>
  );
}
