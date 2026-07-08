import type { OrderDetailResponse } from "@/types/order";

const DEFAULT_POLICY = {
  refundInfo:
    "주문 취소는 상품 준비 전까지 가능합니다.\n취소 완료 후 결제 수단에 따라 환불 처리 기간이 달라질 수 있습니다.",
  exchangeInfo:
    "상품 수령 후 7일 이내 교환/반품이 가능합니다.\n단, 상품 특성상 교환/반품이 제한될 수 있습니다.",
  deliveryInfo:
    "배송은 주문 완료 후 영업일 기준 2~3일 소요됩니다.\n도서산간 지역은 추가 배송비가 발생할 수 있습니다.",
};

export const MOCK_ORDER_DETAIL: OrderDetailResponse = {
  orderId: 1,
  orderNo: "1234567890",
  orderName: "클래식 넛츠 타르트 외 1개",
  orderStatus: "PAID",
  orderType: "DELIVERY",
  orderAmount: 30000,
  orderedAt: "2026-07-10T16:00:00",
  thumbnailUrl: null,
  items: [
    {
      productId: 1,
      productName: "클래식 넛츠 타르트",
      quantity: 1,
      unitPrice: 15000,
      lineAmount: 15000,
      thumbnailUrl: null,
    },
    {
      productId: 2,
      productName: "시그니처 초콜릿 케이크",
      quantity: 1,
      unitPrice: 15000,
      lineAmount: 15000,
      thumbnailUrl: null,
    },
  ],
  payment: {
    orderAmount: 30000,
    productAmount: 30000,
    deliveryFee: 3000,
    discountAmount: 0,
    paidAmount: 30000,
    paymentMethod: "EASY_PAY",
    paymentStatus: "PAID",
  },
  deliveryAddress: {
    recipientName: "홍길동",
    addressName: "집",
    zipcode: "12345",
    baseAddress: "부산광역시 중구 초량중로 29 한국방송통신전파진흥원",
    detailAddress: "3층 스파로스 아카데미",
    phone1: "010-1234-5678",
    isDefault: true,
  },
  policy: DEFAULT_POLICY,
  cancelable: true,
  changeableAddress: true,
};

export function getMockOrderDetail(orderNo: string): OrderDetailResponse {
  return {
    ...MOCK_ORDER_DETAIL,
    orderNo,
  };
}
