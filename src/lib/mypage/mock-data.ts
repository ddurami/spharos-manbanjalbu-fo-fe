import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CreditCard,
  FileText,
  Gift,
  Smartphone,
  Ticket,
  Truck,
  Wallet,
} from "lucide-react";

export type OrderStatusStage = {
  id: string;
  label: string;
  count: number;
};

export type MypageMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const SHOPPING_MENU_ITEMS: MypageMenuItem[] = [
  { label: "주문내역", href: "/mypage/orders", icon: FileText },
  { label: "선물함", href: "/mypage/gifts", icon: Gift },
  { label: "배송지 관리", href: "/mypage/addresses", icon: Truck },
  { label: "알림 신청 내역", href: "/mypage/notifications", icon: Bell },
];

export const PAYMENT_MENU_ITEMS: MypageMenuItem[] = [
  { label: "스타벅스 카드", href: "/mypage/cards", icon: CreditCard },
  { label: "카드교환권", href: "/mypage/vouchers", icon: Gift },
  { label: "쿠폰", href: "/mypage/coupons", icon: Ticket },
  { label: "모바일 상품권", href: "/mypage/mobile-gift", icon: Smartphone },
  { label: "결제수단", href: "/mypage/payment-methods", icon: Wallet },
];
