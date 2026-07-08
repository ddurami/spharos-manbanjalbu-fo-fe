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

export type DeliveryStatus =
  | "READY"
  | "PREPARING"
  | "SHIPPING"
  | "DELIVERED"
  | "RETURNED";

export type OrderListPeriod = "1M" | "3M" | "6M" | "1Y" | "ALL";

export type OrderListParams = {
  page?: number;
  size?: number;
  period?: OrderListPeriod;
  orderType?: OrderType;
};

export type OrderSummary = {
  orderId: number;
  orderNo: string;
  orderName: string;
  orderStatus: OrderStatus;
  orderType: OrderType;
  orderAmount: number;
  orderedAt: string;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  reservationDeliveryDate?: string | null;
  thumbnailUrl?: string | null;
  cancelable: boolean;
};

export type OrderListResponse = {
  orders: OrderSummary[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
};

export type OrderCreateRequest = {
  cartItemIds: number[];
  memberAddressId: number;
  paymentMethod: OrderPaymentMethod;
  deliveryMemo?: string;
  memberCouponId?: number;
  orderType?: OrderType;
  orderCategory?: OrderCategory;
  reservationDeliveryDate?: string;
};

export type OrderCreateResponse = {
  orderId: number;
  orderNo: string;
  orderName: string;
  orderStatus: OrderStatus;
  orderType: OrderType;
  amount: number;
  deliveryFee: number;
  orderAmount: number;
  paymentStatus: PaymentStatus;
  paymentNo: string;
  reservationDeliveryDate?: string;
};

export type OrderDetailItem = {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineAmount: number;
  thumbnailUrl?: string | null;
};

export type OrderDetailAddress = {
  recipientName: string;
  addressName?: string | null;
  zipcode: string;
  baseAddress: string;
  detailAddress: string;
  phone1: string;
  isDefault: boolean;
};

export type OrderDetailPayment = {
  orderAmount: number;
  productAmount: number;
  deliveryFee: number;
  discountAmount: number;
  paidAmount: number;
  paymentMethod: OrderPaymentMethod;
  paymentStatus: PaymentStatus;
};

export type OrderDetailPolicy = {
  refundInfo: string;
  exchangeInfo: string;
  deliveryInfo: string;
};

export type OrderDetailResponse = {
  orderId: number;
  orderNo: string;
  orderName: string;
  orderStatus: OrderStatus;
  orderType: OrderType;
  orderAmount: number;
  orderedAt: string;
  thumbnailUrl?: string | null;
  items: OrderDetailItem[];
  payment: OrderDetailPayment;
  deliveryAddress: OrderDetailAddress;
  policy: OrderDetailPolicy;
  cancelable: boolean;
  changeableAddress: boolean;
  reservationDeliveryDate?: string | null;
};
