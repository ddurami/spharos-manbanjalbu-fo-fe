import type { Address } from "@/lib/address/types";

export type AddressErrors = Partial<Record<keyof Address, string>>;

const PHONE_PATTERN = /^01[0-9]-?\d{3,4}-?\d{4}$/;

function isValidPhone(value: string): boolean {
  return PHONE_PATTERN.test(value.replace(/\s/g, ""));
}

export function validateAddress(address: Address): AddressErrors {
  const errors: AddressErrors = {};

  if (!address.recipient.trim()) {
    errors.recipient = "받는 분을 입력해 주세요.";
  }

  if (!address.zipCode.trim()) {
    errors.zipCode = "주소검색을 통해 우편번호를 입력해 주세요.";
  } else if (!/^\d{5}$/.test(address.zipCode.trim())) {
    errors.zipCode = "올바른 우편번호가 아닙니다.";
  }

  if (!address.address.trim()) {
    errors.address = "주소검색을 통해 기본주소를 입력해 주세요.";
  }

  if (!address.addressDetail.trim()) {
    errors.addressDetail = "상세주소를 입력해 주세요.";
  }

  if (!address.phone1.trim()) {
    errors.phone1 = "연락처를 입력해 주세요.";
  } else if (!isValidPhone(address.phone1)) {
    errors.phone1 = "올바른 휴대폰 번호를 입력해 주세요. (예: 010-1234-5678)";
  }

  if (address.phone2.trim() && !isValidPhone(address.phone2)) {
    errors.phone2 = "올바른 휴대폰 번호를 입력해 주세요. (예: 010-1234-5678)";
  }

  return errors;
}

export function hasValidationErrors(errors: AddressErrors): boolean {
  return Object.keys(errors).length > 0;
}
