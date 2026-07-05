import { apiClient } from "@/lib/api/client";
import type { MemberProfile } from "@/lib/api/types";

export function getMemberProfile() {
  return apiClient<MemberProfile>("/v1/members/me");
}
