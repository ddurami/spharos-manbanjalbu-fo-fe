export type SignupTermAgreementKey =
  | "termsOfService"
  | "privacy"
  | "cardTerms"
  | "marketing"
  | "emailAds"
  | "smsAds";

export type SignupTermAgreements = Record<SignupTermAgreementKey, boolean>;

const SIGNUP_TERMS_AGREEMENTS_KEY = "manbanjalbu-signup-terms-agreements";

export const INITIAL_SIGNUP_TERM_AGREEMENTS: SignupTermAgreements = {
  termsOfService: false,
  privacy: false,
  cardTerms: false,
  marketing: false,
  emailAds: false,
  smsAds: false,
};

export function getSignupTermAgreements(): SignupTermAgreements {
  if (typeof window === "undefined") {
    return INITIAL_SIGNUP_TERM_AGREEMENTS;
  }

  try {
    const stored = sessionStorage.getItem(SIGNUP_TERMS_AGREEMENTS_KEY);
    if (!stored) {
      return INITIAL_SIGNUP_TERM_AGREEMENTS;
    }

    return { ...INITIAL_SIGNUP_TERM_AGREEMENTS, ...JSON.parse(stored) };
  } catch {
    return INITIAL_SIGNUP_TERM_AGREEMENTS;
  }
}

export function setSignupTermAgreements(agreements: SignupTermAgreements) {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(
    SIGNUP_TERMS_AGREEMENTS_KEY,
    JSON.stringify(agreements),
  );
}

export function updateSignupTermAgreement(
  key: SignupTermAgreementKey,
  checked: boolean,
): SignupTermAgreements {
  const current = getSignupTermAgreements();
  const next = { ...current, [key]: checked };

  if (key === "marketing") {
    next.emailAds = checked;
    next.smsAds = checked;
  }

  if (key === "emailAds" || key === "smsAds") {
    next.marketing = next.emailAds && next.smsAds;
  }

  setSignupTermAgreements(next);
  return next;
}

export function setAllSignupTermAgreements(checked: boolean): SignupTermAgreements {
  const next: SignupTermAgreements = {
    termsOfService: checked,
    privacy: checked,
    cardTerms: checked,
    marketing: checked,
    emailAds: checked,
    smsAds: checked,
  };

  setSignupTermAgreements(next);
  return next;
}

export function clearSignupTermAgreements() {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(SIGNUP_TERMS_AGREEMENTS_KEY);
}
