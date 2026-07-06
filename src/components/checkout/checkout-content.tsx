"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { CheckoutActionBar } from "@/components/checkout/checkout-action-bar";
import { DiscountSection } from "@/components/checkout/discount-section";
import { OrderSection } from "@/components/checkout/order-section";
import { PaymentMethodSection } from "@/components/checkout/payment-method-section";
import { PriceSummarySidebar } from "@/components/checkout/price-summary-sidebar";
import { AddressSection } from "@/components/checkout/address-section";
import { calculateCheckoutSummary } from "@/lib/checkout/calculate-summary";
import { CHECKOUT_ACTION_BAR_HEIGHT } from "@/lib/checkout/types";
import { MOCK_ORDER_ITEMS } from "@/lib/checkout/mock-data";
import type { OrderItem, PaymentMethod } from "@/lib/checkout/types";
import { getAddress } from "@/lib/address/storage";
import type { Address } from "@/lib/address/types";

export function CheckoutContent() {
  const pathname = usePathname();
  const [items, setItems] = useState<OrderItem[]>(MOCK_ORDER_ITEMS);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("starbucks-card");
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (pathname === "/checkout") {
      setAddress(getAddress());
    }
  }, [pathname]);

  const summary = useMemo(() => calculateCheckoutSummary(items), [items]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(20, Math.max(1, quantity)) } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-1 flex-col">
      <div
        className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col gap-[50px] px-[50px] lg:flex-row lg:items-start lg:px-[300px]"
        style={{ paddingBottom: CHECKOUT_ACTION_BAR_HEIGHT }}
      >
        <div className="flex w-full max-w-[850px] flex-col gap-[50px]">
          <AddressSection address={address} />
          <OrderSection
            items={items}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
          <DiscountSection />
          <PaymentMethodSection
            value={paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>

        <PriceSummarySidebar summary={summary} />
      </div>

      <CheckoutActionBar summary={summary} />
    </div>
  );
}
