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

export type MypageMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const ORDER_STATUS_STAGES = [
  { key: "paid", label: "결제완료", count: 0 },
  { key: "preparing", label: "상품준비중", count: 0 },
  { key: "shipping", label: "배송중", count: 0 },
  { key: "delivered", label: "배송완료", count: 0 },
] as const;

export const SHOPPING_MENU_ITEMS: MypageMenuItem[] = [
  { label: "주문내역", href: "#", icon: FileText },
  { label: "선물함", href: "#", icon: Gift },
  { label: "배송지 관리", href: "/checkout/address", icon: Truck },
  { label: "알림 신청 내역", href: "#", icon: Bell },
];

export const PAYMENT_MENU_ITEMS: MypageMenuItem[] = [
  { label: "스타벅스 카드", href: "#", icon: CreditCard },
  { label: "카드교환권", href: "#", icon: Gift },
  { label: "쿠폰", href: "#", icon: Ticket },
  { label: "모바일 상품권", href: "#", icon: Smartphone },
  { label: "결제수단", href: "#", icon: Wallet },
];
