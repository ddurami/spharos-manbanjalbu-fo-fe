import { apiRequest } from "@/lib/api/client";
import type { CartCheckoutResponse, CartListResponse } from "@/lib/cart/types";

export function getCart() {
  return apiRequest<CartListResponse>("/api/cart");
}

export function getCheckoutCart(cartItemIds: number[]) {
  return apiRequest<CartCheckoutResponse>("/api/cart/checkout", {
    method: "POST",
    body: JSON.stringify({ cartItemIds }),
  });
}

export function addCartItem(productId: number, quantity: number) {
  return apiRequest<unknown>("/api/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}

export function updateCartItemQuantity(cartItemId: number, quantity: number) {
  return apiRequest<unknown>(`/api/cart/${cartItemId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });
}

export function deleteCartItems(cartItemIds: number[]) {
  return apiRequest<unknown>("/api/cart", {
    method: "DELETE",
    body: JSON.stringify({ cartItemIds }),
  });
}

export function deleteAllCartItems() {
  return apiRequest<unknown>("/api/cart/all", {
    method: "DELETE",
  });
}

export function getCartCount() {
  return apiRequest<number>("/api/cart/count");
}
