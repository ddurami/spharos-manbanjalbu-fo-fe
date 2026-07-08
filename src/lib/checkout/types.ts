export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  reservationAvailable?: boolean;
};

export type CheckoutSummary = {
  itemCount: number;
  productAmount: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
};

export type PaymentMethod = "credit-card" | "simple-pay" | "ssgpay";

export const CHECKOUT_ACTION_BAR_HEIGHT = 132;
