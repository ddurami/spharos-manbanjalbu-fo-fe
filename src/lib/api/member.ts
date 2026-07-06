import { apiRequest } from "@/lib/api/client";
import type {
  FindLoginIdResponse,
  LoginIdCheckResponse,
  MemberJoinCompleteResponse,
  MemberJoinRequest,
  MemberLoginResponse,
  ResetPasswordResponse,
  TermAgreementItemRequest,
  TermsAgreementResponse,
  TermsResponse,
  VerificationConfirmResponse,
  VerificationSendResponse,
} from "@/types/member";

export function sendEmailVerification(email: string) {
  return apiRequest<VerificationSendResponse>("/api/member/auth/email/send", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function confirmEmailVerification(email: string, code: string) {
  return apiRequest<VerificationConfirmResponse>(
    "/api/member/auth/email/verify",
    {
      method: "POST",
      body: JSON.stringify({ email, code }),
    },
  );
}

export function sendPhoneVerification(phone: string) {
  return apiRequest<VerificationSendResponse>("/api/member/auth/phone/send", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

export function confirmPhoneVerification(phone: string, code: string) {
  return apiRequest<VerificationConfirmResponse>(
    "/api/member/auth/phone/verify",
    {
      method: "POST",
      body: JSON.stringify({ phone, code }),
    },
  );
}

export function getTerms() {
  return apiRequest<TermsResponse[]>("/api/member/terms");
}

export function agreeTerms(
  verificationToken: string,
  agreements: TermAgreementItemRequest[],
) {
  return apiRequest<TermsAgreementResponse>("/api/member/join/terms", {
    method: "POST",
    body: JSON.stringify({ verificationToken, agreements }),
  });
}

export function checkLoginId(loginId: string) {
  const params = new URLSearchParams({ loginId });
  return apiRequest<LoginIdCheckResponse>(
    `/api/member/join/login-id/check?${params.toString()}`,
  );
}

export function joinMember(request: MemberJoinRequest) {
  return apiRequest<MemberJoinCompleteResponse>("/api/member/join", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export function loginMember(loginId: string, password: string) {
  return apiRequest<MemberLoginResponse>("/api/member/login", {
    method: "POST",
    body: JSON.stringify({ loginId, password }),
  });
}

export function findLoginId(verificationToken: string) {
  return apiRequest<FindLoginIdResponse>("/api/member/find-id", {
    method: "POST",
    body: JSON.stringify({ verificationToken }),
  });
}

export function verifyAccountForPasswordReset(verificationToken: string) {
  return apiRequest<FindLoginIdResponse>("/api/member/find-password/verify", {
    method: "POST",
    body: JSON.stringify({ verificationToken }),
  });
}

export function resetPassword(verificationToken: string, password: string) {
  return apiRequest<ResetPasswordResponse>("/api/member/find-password/reset", {
    method: "POST",
    body: JSON.stringify({ verificationToken, password }),
  });
}
