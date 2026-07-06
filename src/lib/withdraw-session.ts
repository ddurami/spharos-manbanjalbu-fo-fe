const WITHDRAW_SESSION_KEY = "manbanjalbu-withdraw";

export type WithdrawSession = {
  verificationToken: string;
};

export function getWithdrawSession(): WithdrawSession {
  if (typeof window === "undefined") {
    return { verificationToken: "" };
  }

  const raw = sessionStorage.getItem(WITHDRAW_SESSION_KEY);
  if (!raw) {
    return { verificationToken: "" };
  }

  try {
    return JSON.parse(raw) as WithdrawSession;
  } catch {
    return { verificationToken: "" };
  }
}

export function updateWithdrawSession(patch: Partial<WithdrawSession>) {
  if (typeof window === "undefined") {
    return;
  }

  const next = { ...getWithdrawSession(), ...patch };
  sessionStorage.setItem(WITHDRAW_SESSION_KEY, JSON.stringify(next));
}

export function clearWithdrawSession() {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(WITHDRAW_SESSION_KEY);
}
