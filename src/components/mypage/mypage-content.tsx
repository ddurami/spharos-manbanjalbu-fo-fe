"use client";

import { useState } from "react";

import { MypageSection } from "@/components/mypage/mypage-section";
import { MypageMenuList } from "@/components/mypage/mypage-menu-list";
import { OrderStatusSummary } from "@/components/mypage/order-status-summary";
import { useOrderStatusSummary } from "@/hooks/use-order-status-summary";
import {
  PAYMENT_MENU_ITEMS,
  SHOPPING_MENU_ITEMS,
} from "@/lib/mypage/mock-data";
import { cn } from "@/lib/utils";

export function MypageContent() {
  const { stages, isLoading, error } = useOrderStatusSummary();
  const [isPaymentExpanded, setIsPaymentExpanded] = useState(true);

  return (
    <div className="grid grid-cols-1 items-start gap-[30px] lg:grid-cols-2 lg:grid-rows-[auto_auto]">
      <MypageSection
        id="order-status"
        title="주문/배송현황"
        className="lg:col-start-1 lg:row-start-1"
      >
        {isLoading ? (
          <p className="py-6 text-center text-muted-foreground">불러오는 중...</p>
        ) : error ? (
          <p className="py-6 text-center text-destructive">{error}</p>
        ) : (
          <OrderStatusSummary stages={stages} />
        )}
      </MypageSection>

      <MypageSection
        id="shopping-info"
        title="쇼핑정보"
        className="lg:col-start-1 lg:row-start-2"
      >
        <MypageMenuList items={SHOPPING_MENU_ITEMS} ariaLabel="쇼핑정보" />
      </MypageSection>

      <MypageSection
        id="payment-methods"
        title="결제수단"
        onExpandedChange={setIsPaymentExpanded}
        className={cn(
          "lg:col-start-2 lg:row-start-1",
          isPaymentExpanded && "lg:row-span-2"
        )}
      >
        <MypageMenuList items={PAYMENT_MENU_ITEMS} ariaLabel="결제수단" />
      </MypageSection>
    </div>
  );
}
