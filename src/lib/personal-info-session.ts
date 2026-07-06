const PERSONAL_INFO_DRAFT_KEY = "manbanjalbu-personal-info-draft";
const PERSONAL_INFO_PASSWORD_KEY = "manbanjalbu-personal-info-password";

export type PersonalInfoDraft = {
  marketingUtilizationAgreed?: boolean;
  emailAgreed?: boolean;
  smsAgreed?: boolean;
  pendingPassword?: string;
  passwordVerificationToken?: string;
  hasPasswordDraft?: boolean;
};

export type PersonalInfoPasswordSession = {
  verificationToken: string;
  loginId: string;
};

function readDraft(): PersonalInfoDraft {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = sessionStorage.getItem(PERSONAL_INFO_DRAFT_KEY);
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as PersonalInfoDraft;
  } catch {
    return {};
  }
}

export function getPersonalInfoDraft(): PersonalInfoDraft {
  return readDraft();
}

export function updatePersonalInfoDraft(patch: Partial<PersonalInfoDraft>) {
  if (typeof window === "undefined") {
    return;
  }

  const next = { ...readDraft(), ...patch };
  sessionStorage.setItem(PERSONAL_INFO_DRAFT_KEY, JSON.stringify(next));
}

export function clearPersonalInfoDraft() {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(PERSONAL_INFO_DRAFT_KEY);
}

export function getPersonalInfoPasswordSession(): PersonalInfoPasswordSession {
  if (typeof window === "undefined") {
    return { verificationToken: "", loginId: "" };
  }

  const raw = sessionStorage.getItem(PERSONAL_INFO_PASSWORD_KEY);
  if (!raw) {
    return { verificationToken: "", loginId: "" };
  }

  try {
    return JSON.parse(raw) as PersonalInfoPasswordSession;
  } catch {
    return { verificationToken: "", loginId: "" };
  }
}

export function updatePersonalInfoPasswordSession(
  patch: Partial<PersonalInfoPasswordSession>,
) {
  if (typeof window === "undefined") {
    return;
  }

  const next = {
    ...getPersonalInfoPasswordSession(),
    ...patch,
  };
  sessionStorage.setItem(PERSONAL_INFO_PASSWORD_KEY, JSON.stringify(next));
}

export function clearPersonalInfoPasswordSession() {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(PERSONAL_INFO_PASSWORD_KEY);
}
