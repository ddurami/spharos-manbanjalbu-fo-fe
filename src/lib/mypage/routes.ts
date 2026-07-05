export const MYPAGE_SUBPAGE_ROUTES = {
  profile: {
    title: "개인정보 관리",
    description: "회원 정보를 확인하고 수정할 수 있습니다.",
  },
  orders: {
    title: "주문내역",
    description: "주문 및 배송 내역을 확인할 수 있습니다.",
  },
  gifts: {
    title: "선물함",
    description: "받은 선물과 보낸 선물 내역을 확인할 수 있습니다.",
  },
  addresses: {
    title: "배송지 관리",
    description: "배송지를 등록하고 관리할 수 있습니다.",
  },
  notifications: {
    title: "알림 신청 내역",
    description: "상품 입고 및 이벤트 알림 신청 내역을 확인할 수 있습니다.",
  },
  cards: {
    title: "스타벅스 카드",
    description: "등록된 스타벅스 카드를 관리할 수 있습니다.",
  },
  vouchers: {
    title: "카드교환권",
    description: "보유한 카드교환권을 확인할 수 있습니다.",
  },
  coupons: {
    title: "쿠폰",
    description: "사용 가능한 쿠폰을 확인할 수 있습니다.",
  },
  "mobile-gift": {
    title: "모바일 상품권",
    description: "모바일 상품권을 확인하고 관리할 수 있습니다.",
  },
  "payment-methods": {
    title: "결제수단",
    description: "등록된 결제수단을 관리할 수 있습니다.",
  },
} as const;

export type MypageSubpageSlug = keyof typeof MYPAGE_SUBPAGE_ROUTES;

export const ORDER_STATUS_LINKS: Record<string, string> = {
  paid: "/mypage/orders?status=paid",
  preparing: "/mypage/orders?status=preparing",
  shipping: "/mypage/orders?status=shipping",
  delivered: "/mypage/orders?status=delivered",
};
