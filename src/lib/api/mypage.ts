import { apiRequest } from "@/lib/api/client";
import type { MypageSummaryResponse } from "@/types/mypage";

export function getMypageSummary() {
  return apiRequest<MypageSummaryResponse>("/api/member/mypage");
}
