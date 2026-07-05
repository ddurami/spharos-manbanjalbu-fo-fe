export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type CheckoutSummary = {
  itemCount: number;
  productAmount: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
};

export type PaymentMethod =
  | "starbucks-card"
  | "simple-pay"
  | "ssgpay"
  | "credit-card";

export const CHECKOUT_ACTION_BAR_HEIGHT = 132;
