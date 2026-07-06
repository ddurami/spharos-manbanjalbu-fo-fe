"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/types/cart";

interface AddToCartPayload {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  thumbnailSrc?: string;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  addToCart: (payload: AddToCartPayload) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((payload: AddToCartPayload) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.productId === payload.productId,
      );

      if (existingIndex === -1) {
        return [...current, { ...payload }];
      }

      return current.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + payload.quantity }
          : item,
      );
    });
  }, []);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, totalCount, addToCart }),
    [items, totalCount, addToCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
