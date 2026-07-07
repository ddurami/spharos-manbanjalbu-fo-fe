import type { LucideIcon } from "lucide-react";
import { CreditCard, FileText, Ticket, Truck, Wallet } from "lucide-react";

import type {
  MypagePaymentMethods,
  MypageShoppingInfo,
} from "@/types/mypage";

export type MypageMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  count?: number;
  summary?: string;
};

const SHOPPING_MENU_BASE = [
  { key: "orderHistory" as const, label: "주문내역", href: "#", icon: FileText },
  {
    key: "orderCancellation" as const,
    label: "주문 취소 내역",
    href: "#",
    icon: FileText,
  },
  {
    key: "deliveryReservation" as const,
    label: "배송 예약 내역",
    href: "#",
    icon: FileText,
  },
  {
    key: "deliveryAddress" as const,
    label: "배송지 관리",
    href: "/mypage/address",
    icon: Truck,
  },
] as const;

const PAYMENT_MENU_BASE = [
  { key: "creditCard" as const, label: "신용카드", href: "#", icon: CreditCard },
  { key: "bankAccount" as const, label: "계좌", href: "#", icon: Wallet },
  { key: "coupon" as const, label: "쿠폰", href: "#", icon: Ticket },
] as const;

export function buildShoppingMenuItems(
  shoppingInfo: MypageShoppingInfo,
): MypageMenuItem[] {
  return SHOPPING_MENU_BASE.map(({ key, label, href, icon }) => {
    const item = shoppingInfo[key];
    return {
      label,
      href,
      icon,
      count: item.count,
      summary: item.summary,
    };
  });
}

export function buildPaymentMenuItems(
  paymentMethods: MypagePaymentMethods,
): MypageMenuItem[] {
  return PAYMENT_MENU_BASE.map(({ key, label, href, icon }) => {
    const item = paymentMethods[key];
    return {
      label,
      href,
      icon,
      count: item.count,
      summary: item.summary,
    };
  });
}

export const SHOPPING_MENU_ITEMS: MypageMenuItem[] = SHOPPING_MENU_BASE.map(
  ({ label, href, icon }) => ({ label, href, icon }),
);

export const PAYMENT_MENU_ITEMS: MypageMenuItem[] = PAYMENT_MENU_BASE.map(
  ({ label, href, icon }) => ({ label, href, icon }),
);
