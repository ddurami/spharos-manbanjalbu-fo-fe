export type MemberProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberId: string;
  joinedAt: string;
};

export type OrderStatusId = "paid" | "preparing" | "shipping" | "delivered";

export type OrderStatusSummary = Record<OrderStatusId, number>;

export type OrderItem = {
  orderId: string;
  status: OrderStatusId;
  productName: string;
  orderDate: string;
  totalAmount: number;
  quantity: number;
};

export type OrderListResponse = {
  items: OrderItem[];
  total: number;
};

export type ApiErrorBody = {
  message: string;
  code?: string;
};
