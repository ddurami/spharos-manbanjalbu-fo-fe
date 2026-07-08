export type CartItem = {
  cartItemId: number;
  productId: number;
  productName: string;
  price: number;
  thumbnailUrl: string;
  isBest: boolean;
  isNew: boolean;
  quantity: number;
  createdAt: string;
  reservationAvailable?: boolean;
};

export type CartListResponse = {
  cartItems: CartItem[];
  totalCartCount: number;
};

export type CartCheckoutResponse = {
  cartItems: CartItem[];
  productAmount: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
};

export const MAX_CART_ITEMS = 20;
export const MAX_ITEM_QUANTITY = 20;
