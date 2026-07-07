import type { CartItem } from "@/lib/cart/types";
import type { OrderItem } from "@/lib/checkout/types";

export function toOrderItem(cartItem: CartItem): OrderItem {
  return {
    id: String(cartItem.cartItemId),
    name: cartItem.productName,
    price: cartItem.price,
    quantity: cartItem.quantity,
    image: cartItem.thumbnailUrl || "/images/products/nuts-tart.png",
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
