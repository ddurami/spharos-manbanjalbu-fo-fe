const FIND_ID_SESSION_KEY = "manbanjalbu-find-id";

export type FindIdVerifyMethod = "email" | "phone";

export type FindIdSession = {
  verifyMethod: FindIdVerifyMethod;
  verificationToken: string;
  verifiedValue: string;
  loginId: string;
};

const EMPTY_SESSION: FindIdSession = {
  verifyMethod: "email",
  verificationToken: "",
  verifiedValue: "",
  loginId: "",
};

export function getFindIdSession(): FindIdSession {
  if (typeof window === "undefined") {
    return EMPTY_SESSION;
  }

  try {
    const stored = sessionStorage.getItem(FIND_ID_SESSION_KEY);
    if (!stored) {
      return EMPTY_SESSION;
    }

    return { ...EMPTY_SESSION, ...JSON.parse(stored) };
  } catch {
    return EMPTY_SESSION;
  }
}

export function updateFindIdSession(partial: Partial<FindIdSession>) {
  if (typeof window === "undefined") {
    return;
  }

  const next = { ...getFindIdSession(), ...partial };
  sessionStorage.setItem(FIND_ID_SESSION_KEY, JSON.stringify(next));
}

export function clearFindIdSession() {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(FIND_ID_SESSION_KEY);
}
