import type { MemberProfile, OrderItem, OrderStatusId } from "@/lib/api/types";

export const DEMO_MEMBER: MemberProfile = {
  id: "member-1",
  memberId: "starbucks01",
  name: "홍길동",
  email: "hong@example.com",
  phone: "010-1234-5678",
  joinedAt: "2024-03-15",
};

export const DEMO_ORDERS: OrderItem[] = [
  {
    orderId: "202603010001",
    status: "paid",
    productName: "딸기 라떼 텀블러 세트",
    orderDate: "2026-03-01",
    totalAmount: 39000,
    quantity: 1,
  },
  {
    orderId: "202602280014",
    status: "paid",
    productName: "스타벅스 카드 3만원",
    orderDate: "2026-02-28",
    totalAmount: 30000,
    quantity: 1,
  },
  {
    orderId: "202602250008",
    status: "preparing",
    productName: "돌체 라떼 원두 200g",
    orderDate: "2026-02-25",
    totalAmount: 18000,
    quantity: 2,
  },
  {
    orderId: "202602200003",
    status: "shipping",
    productName: "SS 사이렌 텀블러",
    orderDate: "2026-02-20",
    totalAmount: 41000,
    quantity: 1,
  },
  {
    orderId: "202602150021",
    status: "delivered",
    productName: "카라멜 마키아또 믹스 5입",
    orderDate: "2026-02-15",
    totalAmount: 12500,
    quantity: 1,
  },
  {
    orderId: "202602100017",
    status: "delivered",
    productName: "스타벅스 머그컵",
    orderDate: "2026-02-10",
    totalAmount: 22000,
    quantity: 1,
  },
];

export function getMockOrderStatusSummary() {
  return DEMO_ORDERS.reduce(
    (summary, order) => {
      summary[order.status] += 1;
      return summary;
    },
    {
      paid: 0,
      preparing: 0,
      shipping: 0,
      delivered: 0,
    } satisfies Record<OrderStatusId, number>
  );
}

export function getMockOrders(status?: OrderStatusId) {
  const items = status
    ? DEMO_ORDERS.filter((order) => order.status === status)
    : DEMO_ORDERS;

  return {
    items,
    total: items.length,
  };
}

export function isAuthorizedRequest(request: Request) {
  const authorization = request.headers.get("Authorization");

  return authorization?.startsWith("Bearer ") ?? false;
}
