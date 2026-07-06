export type MarketingConsentResponse = {
  termsId: number;
  termsTitle: string;
  marketingUtilizationAgreed: boolean;
  emailAgreed: boolean;
  smsAgreed: boolean;
};

export type MemberPersonalInfoResponse = {
  loginId: string;
  name: string;
  birthDate: string;
  phone: string;
  email: string;
  marketingConsent: MarketingConsentResponse;
};

export type MemberMarketingConsentUpdateRequest = {
  marketingUtilizationAgreed: boolean;
  emailAgreed: boolean;
  smsAgreed: boolean;
};

export type MemberWithdrawResponse = {
  loginId: string;
  message: string;
};

export type MemberWithdrawRequest = {
  verificationToken: string;
};
