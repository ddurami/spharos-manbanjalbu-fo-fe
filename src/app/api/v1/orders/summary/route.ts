import { NextResponse } from "next/server";

import {
  getMockOrderStatusSummary,
  isAuthorizedRequest,
} from "@/lib/api/server/mock-data";

export async function GET(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }

  return NextResponse.json(getMockOrderStatusSummary());
}
