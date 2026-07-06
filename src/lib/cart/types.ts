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
};

export type CartListResponse = {
  cartItems: CartItem[];
  totalCartCount: number;
};

export const MAX_CART_ITEMS = 20;
export const MAX_ITEM_QUANTITY = 20;
