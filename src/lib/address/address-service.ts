import {
  createMemberAddress,
  deleteMemberAddress,
  getMemberAddress,
  getMemberAddresses,
  updateMemberAddress,
} from "@/lib/api/address";
import { ApiError } from "@/lib/api/client";
import {
  toAddress,
  toCreateRequest,
  toStoredAddress,
  toUpdateRequest,
} from "@/lib/address/mapper";
import {
  addStoredAddress,
  deleteStoredAddress,
  getAddress,
  getAddressById,
  getStoredAddresses,
  saveAddress,
  updateStoredAddress,
} from "@/lib/address/storage";
import type { Address, StoredAddress } from "@/lib/address/types";

const ACCESS_TOKEN_KEY = "manbanjalbu-access-token";

function hasAccessToken(): boolean {
  return (
    typeof window !== "undefined" &&
    Boolean(localStorage.getItem(ACCESS_TOKEN_KEY))
  );
}

export async function fetchAddresses(): Promise<StoredAddress[]> {
  if (!hasAccessToken()) {
    return getStoredAddresses();
  }

  const addresses = await getMemberAddresses();
  return addresses.map(toStoredAddress);
}

export async function fetchAddressById(
  id: string,
): Promise<StoredAddress | null> {
  if (!hasAccessToken()) {
    return getAddressById(id);
  }

  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return null;
  }

  try {
    const address = await getMemberAddress(numericId);
    return toStoredAddress(address);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function fetchDefaultAddress(): Promise<Address | null> {
  if (!hasAccessToken()) {
    return getAddress();
  }

  const addresses = await fetchAddresses();
  const defaultAddress = addresses.find((address) => address.isDefault);

  if (defaultAddress) {
    return toAddress(defaultAddress);
  }

  return addresses[0] ? toAddress(addresses[0]) : null;
}

export async function createAddress(
  address: Address,
  options?: { setAsDefault?: boolean },
): Promise<StoredAddress> {
  if (!hasAccessToken()) {
    return addStoredAddress(address, options);
  }

  const created = await createMemberAddress(
    toCreateRequest(address, options?.setAsDefault),
  );
  return toStoredAddress(created);
}

export async function updateAddress(
  id: string,
  address: Address,
  options?: { setAsDefault?: boolean },
): Promise<StoredAddress | null> {
  if (!hasAccessToken()) {
    return updateStoredAddress(id, address, options);
  }

  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return null;
  }

  const updated = await updateMemberAddress(
    numericId,
    toUpdateRequest(address, options?.setAsDefault),
  );
  return toStoredAddress(updated);
}

export async function removeAddress(id: string): Promise<boolean> {
  if (!hasAccessToken()) {
    return deleteStoredAddress(id);
  }

  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return false;
  }

  await deleteMemberAddress(numericId);
  return true;
}

export async function saveCheckoutAddress(address: Address): Promise<void> {
  if (!hasAccessToken()) {
    saveAddress(address);
    return;
  }

  const addresses = await fetchAddresses();
  const defaultAddress = addresses.find((item) => item.isDefault);

  if (defaultAddress) {
    await updateAddress(defaultAddress.id, address, { setAsDefault: true });
    return;
  }

  await createAddress(address, { setAsDefault: true });
}
