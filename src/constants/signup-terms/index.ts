export type SignupTermSlug =
  | "terms-of-service"
  | "privacy"
  | "card-terms"
  | "marketing";

export type SignupTermAgreementKey =
  | "termsOfService"
  | "privacy"
  | "cardTerms"
  | "marketing";

export type SignupTermConfig = {
  slug: SignupTermSlug;
  agreementKey: SignupTermAgreementKey;
  title: string;
  listLabel: string;
  required: boolean;
  contentFile?: string;
};

export const SIGNUP_TERM_CONFIGS: SignupTermConfig[] = [
  {
    slug: "terms-of-service",
    agreementKey: "termsOfService",
    title: "이용약관 동의",
    listLabel: "[필수] 이용약관 동의",
    required: true,
    contentFile: "terms-of-service.txt",
  },
  {
    slug: "privacy",
    agreementKey: "privacy",
    title: "개인정보 수집 및 이용 동의",
    listLabel: "[필수] 개인정보 수집 및 이용 동의",
    required: true,
    contentFile: "privacy.txt",
  },
  {
    slug: "card-terms",
    agreementKey: "cardTerms",
    title: "스타벅스 카드 이용약관",
    listLabel: "[필수] 스타벅스 카드 이용약관",
    required: true,
    contentFile: "card-terms.txt",
  },
  {
    slug: "marketing",
    agreementKey: "marketing",
    title: "마케팅 개인정보 수집·이용 동의 (선택)",
    listLabel: "[선택] 마케팅 활용 수집 이용 동의",
    required: false,
  },
];

const slugSet = new Set(SIGNUP_TERM_CONFIGS.map((config) => config.slug));

export function isValidSignupTermSlug(slug: string): slug is SignupTermSlug {
  return slugSet.has(slug as SignupTermSlug);
}

export function getSignupTermConfig(slug: string): SignupTermConfig | null {
  return (
    SIGNUP_TERM_CONFIGS.find((config) => config.slug === slug) ?? null
  );
}

export const SIGNUP_TERM_SLUG_BY_AGREEMENT_KEY = Object.fromEntries(
  SIGNUP_TERM_CONFIGS.map((config) => [config.agreementKey, config.slug]),
) as Record<SignupTermAgreementKey, SignupTermSlug>;
