export type OrderPaymentMethod =
  | "CARD"
  | "MOBILE"
  | "BANK_TRANSFER"
  | "VIRTUAL_ACCOUNT"
  | "EASY_PAY";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PREPARING"
  | "SHIPPING"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentStatus =
  | "READY"
  | "IN_PROGRESS"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export type OrderType = "DELIVERY" | "RESERVATION";
export type OrderCategory = "GENERAL" | "GIFT";

export type OrderCreateRequest = {
  cartItemIds: number[];
  memberAddressId: number;
  paymentMethod: OrderPaymentMethod;
  deliveryMemo?: string;
  memberCouponId?: number;
  orderType?: OrderType;
  orderCategory?: OrderCategory;
};

export type OrderCreateResponse = {
  orderId: number;
  orderNo: string;
  orderName: string;
  orderStatus: OrderStatus;
  amount: number;
  deliveryFee: number;
  orderAmount: number;
  paymentStatus: PaymentStatus;
  paymentNo: string;
};
