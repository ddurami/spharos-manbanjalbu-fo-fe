"use client";

import { useSearchParams } from "next/navigation";

import { AddressForm } from "@/components/address/address-form";
import { buildCheckoutHref, parseCartItemIds } from "@/lib/cart/checkout";

export function CheckoutAddressContent() {
  const searchParams = useSearchParams();
  const cartItemIds = parseCartItemIds(searchParams.get("cartItemIds"));
  const returnHref = buildCheckoutHref(cartItemIds);

  return <AddressForm redirectHref={returnHref} cancelHref={returnHref} />;
}
