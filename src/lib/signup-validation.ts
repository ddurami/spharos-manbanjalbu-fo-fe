const USER_ID_PATTERN = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,12}$/;

const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;

const NICKNAME_PATTERN = /^[가-힣]{0,6}$/;

export function validateUserId(userId: string) {
  const trimmed = userId.trim();

  if (!trimmed) {
    return "아이디를 입력해 주세요.";
  }

  if (!USER_ID_PATTERN.test(trimmed)) {
    return "6~12자의 영문, 숫자 조합으로 입력해 주세요.";
  }

  return null;
}

export function getUserIdFormatError(userId: string) {
  if (!userId) {
    return null;
  }

  if (!USER_ID_PATTERN.test(userId.trim())) {
    return "6~12자의 영문, 숫자 조합으로 입력해 주세요.";
  }

  return null;
}

export function isUserIdFormatValid(userId: string) {
  return USER_ID_PATTERN.test(userId.trim());
}

export function validatePassword(password: string) {
  if (!password) {
    return "비밀번호를 입력해 주세요.";
  }

  if (!PASSWORD_PATTERN.test(password)) {
    return "8~16자리 특수문자 1개 이상, 영문 대소문자를 사용해 주세요.";
  }

  return null;
}

export function getPasswordFormatError(password: string) {
  if (!password) {
    return null;
  }

  if (!PASSWORD_PATTERN.test(password)) {
    return "8~16자리 특수문자 1개 이상, 영문 대소문자를 사용해 주세요.";
  }

  return null;
}

export function validatePasswordConfirm(password: string, confirmPassword: string) {
  if (!confirmPassword) {
    return "비밀번호 확인을 입력해 주세요.";
  }

  if (password !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다.";
  }

  return null;
}

export function getPasswordConfirmFeedback(
  password: string,
  confirmPassword: string,
) {
  if (!confirmPassword) {
    return { error: null, success: null };
  }

  if (password !== confirmPassword) {
    return { error: "비밀번호가 일치하지 않습니다.", success: null };
  }

  return { error: null, success: "비밀번호가 일치 합니다." };
}

export function validateNickname(nickname: string) {
  if (!nickname) {
    return null;
  }

  if (!NICKNAME_PATTERN.test(nickname)) {
    return "닉네임은 한글 최대 6자까지 입력할 수 있습니다.";
  }

  return null;
}

export function validateRequired(value: string, message: string) {
  return value.trim() ? null : message;
}

const PHONE_DIGITS_PATTERN = /^01[0-9]{8,9}$/;

export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function validatePhone(phone: string) {
  const digits = normalizePhone(phone);

  if (!digits) {
    return "휴대폰 번호를 입력해 주세요.";
  }

  if (!PHONE_DIGITS_PATTERN.test(digits)) {
    return "올바른 휴대폰 번호 형식으로 입력해 주세요.";
  }

  return null;
}

export function getPhoneFormatError(phone: string) {
  if (!phone) {
    return null;
  }

  if (!PHONE_DIGITS_PATTERN.test(normalizePhone(phone))) {
    return "올바른 휴대폰 번호 형식으로 입력해 주세요.";
  }

  return null;
}

export function isPhoneFormatValid(phone: string) {
  return PHONE_DIGITS_PATTERN.test(normalizePhone(phone));
}

export function formatPhoneNumber(phone: string) {
  const digits = normalizePhone(phone);

  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return phone;
}

export function formatBirthDateForApi(birthDate: string) {
  const digits = birthDate.replace(/\D/g, "");

  if (digits.length !== 8) {
    return null;
  }

  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
}

export function validateBirthDate(birthDate: string) {
  if (!birthDate.trim()) {
    return "생년월일을 입력해 주세요.";
  }

  if (!formatBirthDateForApi(birthDate)) {
    return "생년월일은 YYYYMMDD 형식으로 입력해 주세요.";
  }

  return null;
}
