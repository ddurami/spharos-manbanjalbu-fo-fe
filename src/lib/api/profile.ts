import { apiRequest } from "@/lib/api/client";
import type {
  MarketingConsentResponse,
  MemberMarketingConsentUpdateRequest,
  MemberPersonalInfoResponse,
  MemberWithdrawRequest,
  MemberWithdrawResponse,
} from "@/types/profile";

export function getPersonalInfo() {
  return apiRequest<MemberPersonalInfoResponse>("/api/member/profile");
}

export function updateMarketingConsent(
  request: MemberMarketingConsentUpdateRequest,
) {
  return apiRequest<MarketingConsentResponse>(
    "/api/member/profile/marketing-consent",
    {
      method: "PATCH",
      body: JSON.stringify(request),
    },
  );
}

export function withdrawMember(request: MemberWithdrawRequest) {
  return apiRequest<MemberWithdrawResponse>("/api/member/withdraw", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
