export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) {
    return phone;
  }

  return `${digits.slice(0, 3)}****${digits.slice(-4)}`;
}

export function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) {
    return email;
  }

  if (local.length <= 2) {
    return `${local[0] ?? ""}*@${domain}`;
  }

  return `${local.slice(0, 2)}${"*".repeat(Math.max(local.length - 2, 3))}@${domain}`;
}

export function parseBirthDate(birthDate: string) {
  const [year, month, day] = birthDate.split("-").map(Number);
  return {
    year: Number.isFinite(year) ? year : null,
    month: Number.isFinite(month) ? month : null,
    day: Number.isFinite(day) ? day : null,
  };
}
