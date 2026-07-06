import type { Address } from "@/lib/address/types";

const STORAGE_KEY = "starbucks-address";
const LEGACY_STORAGE_KEY = "starbucks-shipping-address";

export function getAddress(): Address | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    let raw = sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
      raw = sessionStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) {
        sessionStorage.setItem(STORAGE_KEY, raw);
        sessionStorage.removeItem(LEGACY_STORAGE_KEY);
      }
    }

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as Address;
  } catch {
    return null;
  }
}

export function saveAddress(address: Address): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(address));
}

export function isRegisteredAddress(
  address: Address | null
): address is Address {
  if (!address) {
    return false;
  }

  return Boolean(
    address.recipient &&
      address.zipCode &&
      address.address &&
      address.addressDetail &&
      address.phone1
  );
}
