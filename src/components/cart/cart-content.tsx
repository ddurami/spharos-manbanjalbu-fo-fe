"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { CartActionBar, ACTION_BAR_HEIGHT } from "@/components/cart/cart-action-bar";
import { CartEmpty } from "@/components/cart/cart-empty";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { PriceSummarySidebar } from "@/components/common/price-summary-sidebar";
import {
  getCart,
  updateCartItemQuantity,
  deleteCartItems,
  deleteAllCartItems,
} from "@/lib/api/cart";
import type { CartItem } from "@/lib/cart/types";
import type { CheckoutSummary } from "@/lib/checkout/types";

function calculateSummary(
  items: CartItem[],
  selectedIds: Set<number>,
): CheckoutSummary {
  const selected = items.filter((item) => selectedIds.has(item.cartItemId));
  const productAmount = selected.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return {
    itemCount: selected.length,
    productAmount,
    discountAmount: 0,
    shippingFee: 0,
    totalAmount: productAmount,
  };
}

export function CartContent() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    try {
      const data = await getCart();
      const cartItems = data.cartItems ?? [];
      setItems(cartItems);
      setSelectedIds(new Set(cartItems.map((item) => item.cartItemId)));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const summary = useMemo(
    () => calculateSummary(items, selectedIds),
    [items, selectedIds],
  );

  const allSelected = items.length > 0 && selectedIds.size === items.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(items.map((item) => item.cartItemId)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleItemCheckedChange = (cartItemId: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(cartItemId);
      } else {
        next.delete(cartItemId);
      }
      return next;
    });
  };

  const handleQuantityChange = async (
    cartItemId: number,
    quantity: number,
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item,
      ),
    );

    try {
      await updateCartItemQuantity(cartItemId, quantity);
    } catch {
      fetchCart();
    }
  };

  const handleRemove = async (cartItemId: number) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(cartItemId);
      return next;
    });

    try {
      await deleteCartItems([cartItemId]);
    } catch {
      /* 낙관적 업데이트 유지 */
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;

    const idsToDelete = Array.from(selectedIds);
    setItems((prev) =>
      prev.filter((item) => !selectedIds.has(item.cartItemId)),
    );
    setSelectedIds(new Set());

    try {
      await deleteCartItems(idsToDelete);
    } catch {
      /* 낙관적 업데이트 유지 */
    }
  };

  const handleDeleteAll = async () => {
    if (items.length === 0) return;

    setItems([]);
    setSelectedIds(new Set());

    try {
      await deleteAllCartItems();
    } catch {
      /* 낙관적 업데이트 유지 */
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <p className="text-base text-sb-text-muted">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div
        className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-8 px-6 pt-10 pb-10 lg:px-10"
        style={{ paddingBottom: ACTION_BAR_HEIGHT }}
      >
        <h1 className="text-[36px] font-medium text-foreground">장바구니</h1>

        <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-stretch">
          <div className="flex w-full min-w-0 flex-1 flex-col">
            <div className="flex flex-1 flex-col border border-sb-border bg-white">
              <div className="flex h-14 items-center justify-between border-b border-sb-border px-[30px]">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="size-[18px] cursor-pointer accent-[#00704A]"
                  />
                  <span className="text-[15px] font-medium leading-none text-foreground">
                    전체 선택
                  </span>
                </label>

                <div className="flex items-center gap-2 text-[13px] text-sb-text-subtle">
                  <button
                    type="button"
                    onClick={handleDeleteSelected}
                    className="cursor-pointer underline-offset-2 hover:underline"
                  >
                    선택 삭제
                  </button>
                  <span className="text-sb-border">|</span>
                  <button
                    type="button"
                    onClick={handleDeleteAll}
                    className="cursor-pointer underline-offset-2 hover:underline"
                  >
                    전체 삭제
                  </button>
                </div>
              </div>

              {items.length === 0 ? (
                <CartEmpty />
              ) : (
                <div>
                  {items.map((item, index) => (
                    <div key={item.cartItemId}>
                      {index > 0 && (
                        <div className="mx-[30px] border-t border-sb-border" />
                      )}
                      <CartItemRow
                        item={item}
                        checked={selectedIds.has(item.cartItemId)}
                        onCheckedChange={handleItemCheckedChange}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <PriceSummarySidebar summary={summary} />
        </div>
      </div>

      <CartActionBar
        summary={summary}
        selectedCartItemIds={Array.from(selectedIds)}
      />
    </div>
  );
}
