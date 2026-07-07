import type { CartItem } from "@/lib/cart/types";
import type { OrderItem } from "@/lib/checkout/types";

export function toOrderItem(cartItem: CartItem): OrderItem {
  return {
    id: String(cartItem.cartItemId),
    name: cartItem.productName,
    price: cartItem.price,
    quantity: cartItem.quantity,
    image: cartItem.thumbnailUrl || "/images/products/nuts-tart.png",
    reservationAvailable: cartItem.reservationAvailable,
  };
}

export function toOrderItems(cartItems: CartItem[]): OrderItem[] {
  return cartItems.map(toOrderItem);
}

export function parseCartItemIds(raw: string | null): number[] {
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value) && value > 0);
}

export function buildCheckoutHref(cartItemIds: Iterable<number>): string {
  const ids = Array.from(cartItemIds);
  if (ids.length === 0) {
    return "/checkout";
  }

  return `/checkout?cartItemIds=${ids.join(",")}`;
}

export function buildCheckoutAddressHref(
  cartItemIds: Iterable<number>,
  options?: { mode?: "change" },
): string {
  const ids = Array.from(cartItemIds);
  const params = new URLSearchParams();

  if (options?.mode) {
    params.set("mode", options.mode);
  }

  if (ids.length > 0) {
    params.set("cartItemIds", ids.join(","));
  }

  const query = params.toString();
  return query ? `/checkout/address?${query}` : "/checkout/address";
}
