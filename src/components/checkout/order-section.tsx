"use client";

import { CollapsibleCheckoutSection } from "@/components/checkout/collapsible-checkout-section";
import { OrderItemRow } from "@/components/checkout/order-item-row";
import { Separator } from "@/components/ui/separator";
import type { OrderItem } from "@/lib/checkout/types";

type OrderSectionProps = {
  items: OrderItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export function OrderSection({
  items,
  onQuantityChange,
  onRemove,
}: OrderSectionProps) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CollapsibleCheckoutSection
      id="order"
      title="주문내역"
      subtitle={
        <>
          <Separator orientation="vertical" className="h-[18px]" />
          <p className="text-base text-sb-text-secondary">
            배송지 1곳 / 상품 {itemCount}개
          </p>
        </>
      }
    >
      <div className="-mx-[30px] border-t border-sb-border pb-[30px]">
        {items.map((item, index) => (
          <div key={item.id}>
            <OrderItemRow
              item={item}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
            {index < items.length - 1 ? (
              <div className="mx-[30px] border-t border-sb-border" />
            ) : null}
          </div>
        ))}
      </div>
    </CollapsibleCheckoutSection>
  );
}
