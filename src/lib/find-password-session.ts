const FIND_PASSWORD_SESSION_KEY = "manbanjalbu-find-password";

export type FindPasswordSession = {
  verificationToken: string;
  loginId: string;
};

const EMPTY_SESSION: FindPasswordSession = {
  verificationToken: "",
  loginId: "",
};

export function getFindPasswordSession(): FindPasswordSession {
  if (typeof window === "undefined") {
    return EMPTY_SESSION;
  }

  try {
    const stored = sessionStorage.getItem(FIND_PASSWORD_SESSION_KEY);
    if (!stored) {
      return EMPTY_SESSION;
    }

    return { ...EMPTY_SESSION, ...JSON.parse(stored) };
  } catch {
    return EMPTY_SESSION;
  }
}

export function updateFindPasswordSession(partial: Partial<FindPasswordSession>) {
  if (typeof window === "undefined") {
    return;
  }

  const next = { ...getFindPasswordSession(), ...partial };
  sessionStorage.setItem(FIND_PASSWORD_SESSION_KEY, JSON.stringify(next));
}

export function clearFindPasswordSession() {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(FIND_PASSWORD_SESSION_KEY);
}
