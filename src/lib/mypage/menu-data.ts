import type { LucideIcon } from "lucide-react";
import { CreditCard, FileText, Ticket, Truck, Wallet } from "lucide-react";

export type MypageMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const SHOPPING_MENU_ITEMS: MypageMenuItem[] = [
  { label: "주문내역", href: "#", icon: FileText },
  { label: "주문 취소 내역", href: "#", icon: FileText },
  { label: "배송 예약 내역", href: "#", icon: FileText },
  { label: "배송지 관리", href: "/checkout/address", icon: Truck },
];

export const PAYMENT_MENU_ITEMS: MypageMenuItem[] = [
  { label: "신용카드", href: "#", icon: CreditCard },
  { label: "계좌", href: "#", icon: Wallet },
  { label: "쿠폰", href: "#", icon: Ticket },
];
