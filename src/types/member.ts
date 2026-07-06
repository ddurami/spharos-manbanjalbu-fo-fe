export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string | null;
};

export type VerificationSendResponse = {
  message: string;
  devCode: string | null;
  authCode: string | null;
  receivePhoneNumber: string | null;
};

export type VerificationConfirmResponse = {
  verificationToken: string;
  authMethod: "EMAIL" | "PASS";
  verifiedValue: string;
};

export type TermsResponse = {
  id: number;
  title: string;
  content: string;
  mandatory: boolean;
};

export type TermAgreementItemRequest = {
  termsId: number;
  agreed: boolean;
};

export type MarketingConsentResultResponse = {
  termsId: number;
  title: string;
  agreed: boolean;
  resultMessage: string;
};

export type TermsAgreementResponse = {
  verificationToken: string;
  message: string;
  marketingConsent: MarketingConsentResultResponse;
};

export type LoginIdCheckResponse = {
  available: boolean;
  message: string;
};

export type MemberJoinRequest = {
  verificationToken: string;
  loginId: string;
  password: string;
  name: string;
  birthDate: string;
  phone: string;
  email: string;
  nickname?: string;
};

export type MemberJoinCompleteResponse = {
  memberId: number;
  loginId: string;
  name: string;
  marketingConsent: MarketingConsentResultResponse;
  agreementResults: Array<{
    termsId: number;
    title: string;
    agreed: boolean;
    resultMessage: string;
  }>;
};

export type MemberLoginResponse = {
  accessToken: string;
  memberId: number;
  loginId: string;
  name: string;
  grade: string;
};
