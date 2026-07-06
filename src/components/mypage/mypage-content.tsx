"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { MypageMenuList } from "@/components/mypage/mypage-menu-list";
import { MypageOrderStatus } from "@/components/mypage/mypage-order-status";
import { MypageSectionCard } from "@/components/mypage/mypage-section-card";
import { MypageWelcome } from "@/components/mypage/mypage-welcome";
import { useAuth } from "@/contexts/auth-context";
import {
  PAYMENT_MENU_ITEMS,
  SHOPPING_MENU_ITEMS,
} from "@/lib/mypage/menu-data";

export function MypageContent() {
  const router = useRouter();
  const { isLoggedIn, member } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isReady, isLoggedIn, router]);

  if (!isReady || !isLoggedIn || !member) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
      <div className="flex flex-col gap-10 lg:gap-12">
        <MypageWelcome name={member.name} />

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-6">
            <MypageSectionCard id="order-status" title="주문/배송현황">
              <MypageOrderStatus />
            </MypageSectionCard>

            <MypageSectionCard id="shopping-info" title="쇼핑정보">
              <MypageMenuList items={SHOPPING_MENU_ITEMS} />
            </MypageSectionCard>
          </div>

          <MypageSectionCard
            id="payment-methods"
            title="결제수단"
            className="lg:h-full"
            contentClassName="lg:pb-2"
          >
            <MypageMenuList items={PAYMENT_MENU_ITEMS} />
          </MypageSectionCard>
        </div>
      </div>
    </div>
  );
}
