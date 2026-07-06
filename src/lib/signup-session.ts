const SIGNUP_SESSION_KEY = "manbanjalbu-signup";

export type SignupVerifyMethod = "email" | "phone";

export type SignupSession = {
  verifyMethod: SignupVerifyMethod;
  verificationToken: string;
  verifiedValue: string;
  email: string;
  phone: string;
  emailAds: boolean;
  smsAds: boolean;
};

const EMPTY_SESSION: SignupSession = {
  verifyMethod: "email",
  verificationToken: "",
  verifiedValue: "",
  email: "",
  phone: "",
  emailAds: false,
  smsAds: false,
};

export function getSignupSession(): SignupSession {
  if (typeof window === "undefined") {
    return EMPTY_SESSION;
  }

  try {
    const stored = sessionStorage.getItem(SIGNUP_SESSION_KEY);
    if (!stored) {
      return EMPTY_SESSION;
    }

    return { ...EMPTY_SESSION, ...JSON.parse(stored) };
  } catch {
    return EMPTY_SESSION;
  }
}

export function updateSignupSession(partial: Partial<SignupSession>) {
  if (typeof window === "undefined") {
    return;
  }

  const next = { ...getSignupSession(), ...partial };
  sessionStorage.setItem(SIGNUP_SESSION_KEY, JSON.stringify(next));
}

export function clearSignupVerificationSession(
  marketingConsent: Pick<SignupSession, "emailAds" | "smsAds">,
) {
  updateSignupSession({
    verificationToken: "",
    verifiedValue: "",
    email: "",
    phone: "",
    verifyMethod: "email",
    ...marketingConsent,
  });
}
