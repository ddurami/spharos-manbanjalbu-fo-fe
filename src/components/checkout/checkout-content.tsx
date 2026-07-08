"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CheckoutActionBar } from "@/components/checkout/checkout-action-bar";
import { DiscountSection } from "@/components/checkout/discount-section";
import { OrderSection } from "@/components/checkout/order-section";
import { PaymentMethodSection } from "@/components/checkout/payment-method-section";
import { PriceSummarySidebar } from "@/components/common/price-summary-sidebar";
import { AddressSection } from "@/components/checkout/address-section";
import { Button } from "@/components/ui/button";
import { fetchDefaultAddress } from "@/lib/address/address-service";
import type { Address } from "@/lib/address/types";
import { isRegisteredAddress } from "@/lib/address/validate-address";
import {
  deleteCartItems,
  getCheckoutCart,
  updateCartItemQuantity,
} from "@/lib/api/cart";
import { ApiError } from "@/lib/api/client";
import { parseCartItemIds, toOrderItems } from "@/lib/cart/checkout";
import { MAX_ITEM_QUANTITY } from "@/lib/cart/types";
import { calculateCheckoutSummary } from "@/lib/checkout/calculate-summary";
import { CHECKOUT_ACTION_BAR_HEIGHT } from "@/lib/checkout/types";
import type { OrderItem, PaymentMethod } from "@/lib/checkout/types";
import { useAuth } from "@/contexts/auth-context";

export function CheckoutContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, logout } = useAuth();
  const cartItemIds = useMemo(
    () => parseCartItemIds(searchParams.get("cartItemIds")),
    [searchParams],
  );

  const [items, setItems] = useState<OrderItem[]>([]);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("starbucks-card");
  const [address, setAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadCheckoutItems = useCallback(async () => {
    if (cartItemIds.length === 0) {
      setItems([]);
      setErrorMessage(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await getCheckoutCart(cartItemIds);
      setItems(toOrderItems(data.cartItems));
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        logout();
        router.replace("/login");
        return;
      }

      setItems([]);
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : "결제 상품을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [cartItemIds, logout, router]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    void loadCheckoutItems();
  }, [isLoggedIn, loadCheckoutItems, router]);

  useEffect(() => {
    if (pathname !== "/checkout") {
      return;
    }

    const loadAddress = async () => {
      try {
        setAddress(await fetchDefaultAddress());
      } catch {
        setAddress(null);
      }
    };

    void loadAddress();
    const handleFocus = () => {
      void loadAddress();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [pathname]);

  const summary = useMemo(() => calculateCheckoutSummary(items), [items]);
  const hasAddress = isRegisteredAddress(address);

  const handleQuantityChange = async (id: string, quantity: number) => {
    const nextQuantity = Math.min(MAX_ITEM_QUANTITY, Math.max(1, quantity));
    const previousItems = items;

    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item,
      ),
    );

    try {
      await updateCartItemQuantity(Number(id), nextQuantity);
    } catch {
      setItems(previousItems);
    }
  };

  const handleRemove = async (id: string) => {
    const previousItems = items;
    const nextItems = items.filter((item) => item.id !== id);

    setItems(nextItems);

    const nextIds = nextItems.map((item) => Number(item.id));
    const nextQuery =
      nextIds.length > 0 ? `?cartItemIds=${nextIds.join(",")}` : "";

    router.replace(`/checkout${nextQuery}`);

    try {
      await deleteCartItems([Number(id)]);
    } catch {
      setItems(previousItems);
      router.replace(
        `/checkout?cartItemIds=${previousItems.map((item) => item.id).join(",")}`,
      );
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <p className="text-base text-sb-text-muted">결제 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (cartItemIds.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-[850px] flex-1 flex-col items-center justify-center gap-6 px-[50px] py-20 lg:px-[300px]">
        <p className="text-base text-sb-text-muted">
          결제할 상품이 없습니다. 장바구니에서 상품을 선택해 주세요.
        </p>
        <Link href="/cart">
          <Button className="rounded-full px-8">장바구니로 이동</Button>
        </Link>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="mx-auto flex w-full max-w-[850px] flex-1 flex-col items-center justify-center gap-6 px-[50px] py-20 lg:px-[300px]">
        <p className="text-base text-destructive">{errorMessage}</p>
        <Link href="/cart">
          <Button variant="outline" className="rounded-full px-8">장바구니로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div
        className="mx-auto flex w-full max-w-[1920px] flex-1 flex-col gap-[50px] px-[50px] pt-[50px] lg:px-[300px]"
        style={{ paddingBottom: CHECKOUT_ACTION_BAR_HEIGHT }}
      >
        <h1 className="w-full max-w-[850px] text-[36px] font-medium text-foreground">
          결제하기
        </h1>

        <div className="flex flex-1 flex-col gap-[50px] lg:flex-row lg:items-start">
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
      </div>

      <CheckoutActionBar summary={summary} hasAddress={hasAddress} />
    </div>
  );
}
