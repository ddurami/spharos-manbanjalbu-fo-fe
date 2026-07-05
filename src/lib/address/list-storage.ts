import { MOCK_SHIPPING_ADDRESSES } from "@/lib/address/mock-data";
import {
  createAddressId,
  formToShippingAddress,
} from "@/lib/address/mappers";
import type { Address, ShippingAddress } from "@/lib/address/types";

const STORAGE_KEY = "starbucks-shipping-addresses";

function readAddresses(): ShippingAddress[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as ShippingAddress[];
  } catch {
    return null;
  }
}

function writeAddresses(addresses: ShippingAddress[]) {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
}

export function getShippingAddresses(): ShippingAddress[] {
  const stored = readAddresses();

  if (stored) {
    return stored;
  }

  writeAddresses(MOCK_SHIPPING_ADDRESSES);
  return MOCK_SHIPPING_ADDRESSES;
}

export function getShippingAddressById(id: string): ShippingAddress | undefined {
  return getShippingAddresses().find((address) => address.id === id);
}

export function addShippingAddress(form: Address): ShippingAddress {
  const addresses = getShippingAddresses();
  const nextAddress = formToShippingAddress(
    form,
    createAddressId(),
    addresses.length === 0
  );

  writeAddresses([...addresses, nextAddress]);
  return nextAddress;
}

export function updateShippingAddress(id: string, form: Address): ShippingAddress {
  const addresses = getShippingAddresses();
  const current = addresses.find((address) => address.id === id);

  if (!current) {
    throw new Error("배송지를 찾을 수 없습니다.");
  }

  const nextAddress = formToShippingAddress(form, id, current.isDefault);
  const nextAddresses = addresses.map((address) =>
    address.id === id ? nextAddress : address
  );

  writeAddresses(nextAddresses);
  return nextAddress;
}

export function deleteShippingAddress(id: string): void {
  const addresses = getShippingAddresses();
  const target = addresses.find((address) => address.id === id);

  if (!target) {
    return;
  }

  if (target.isDefault) {
    return;
  }

  writeAddresses(addresses.filter((address) => address.id !== id));
}
