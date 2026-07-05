import { NextResponse } from "next/server";

import {
  DEMO_MEMBER,
  isAuthorizedRequest,
} from "@/lib/api/server/mock-data";

export async function GET(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }

  return NextResponse.json(DEMO_MEMBER);
}
