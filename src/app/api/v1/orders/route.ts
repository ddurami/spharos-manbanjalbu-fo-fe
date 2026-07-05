import { NextResponse } from "next/server";

import type { OrderStatusId } from "@/lib/api/types";
import {
  getMockOrders,
  isAuthorizedRequest,
} from "@/lib/api/server/mock-data";

const VALID_STATUSES = new Set<OrderStatusId>([
  "paid",
  "preparing",
  "shipping",
  "delivered",
]);

export async function GET(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  if (status && !VALID_STATUSES.has(status as OrderStatusId)) {
    return NextResponse.json(
      { message: "유효하지 않은 주문 상태입니다." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    getMockOrders(status ? (status as OrderStatusId) : undefined)
  );
}
