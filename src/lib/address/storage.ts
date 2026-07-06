import type { Address, StoredAddress } from "@/lib/address/types";

const ADDRESSES_STORAGE_KEY = "starbucks-addresses";
const STORAGE_KEY = "starbucks-address";
const LEGACY_STORAGE_KEY = "starbucks-shipping-address";

function createId(): string {
  return crypto.randomUUID();
}

function toAddress(stored: StoredAddress): Address {
  return {
    nickname: stored.nickname,
    recipient: stored.recipient,
    zipCode: stored.zipCode,
    address: stored.address,
    addressDetail: stored.addressDetail,
    phone1: stored.phone1,
    phone2: stored.phone2,
    deliveryMemo: stored.deliveryMemo,
  };
}

function readLegacyAddress(): Address | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    let raw = sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
      raw = sessionStorage.getItem(LEGACY_STORAGE_KEY);
    }

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as Address;
  } catch {
    return null;
  }
}

function writeAddresses(addresses: StoredAddress[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
}

function migrateLegacyAddress(addresses: StoredAddress[]): StoredAddress[] {
  if (addresses.length > 0) {
    return addresses;
  }

  const legacyAddress = readLegacyAddress();

  if (!legacyAddress) {
    return addresses;
  }

  return [
    {
      ...legacyAddress,
      id: createId(),
      isDefault: true,
    },
  ];
}

export function getStoredAddresses(): StoredAddress[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(ADDRESSES_STORAGE_KEY);

    if (!raw) {
      const migrated = migrateLegacyAddress([]);
      if (migrated.length > 0) {
        writeAddresses(migrated);
      }
      return migrated;
    }

    const addresses = JSON.parse(raw) as StoredAddress[];
    return migrateLegacyAddress(addresses);
  } catch {
    return [];
  }
}

export function getAddressById(id: string): StoredAddress | null {
  return getStoredAddresses().find((address) => address.id === id) ?? null;
}

export function getAddress(): Address | null {
  const defaultAddress = getStoredAddresses().find((address) => address.isDefault);

  if (defaultAddress) {
    return toAddress(defaultAddress);
  }

  return readLegacyAddress();
}

export function saveAddress(address: Address): void {
  const addresses = getStoredAddresses();
  const defaultIndex = addresses.findIndex((item) => item.isDefault);

  if (defaultIndex >= 0) {
    addresses[defaultIndex] = {
      ...addresses[defaultIndex],
      ...address,
      isDefault: true,
    };
  } else if (addresses.length > 0) {
    addresses[0] = {
      ...addresses[0],
      ...address,
      isDefault: true,
    };

    addresses.forEach((item, index) => {
      item.isDefault = index === 0;
    });
  } else {
    addresses.push({
      ...address,
      id: createId(),
      isDefault: true,
    });
  }

  writeAddresses(addresses);

  const defaultAddress = addresses.find((item) => item.isDefault);
  if (defaultAddress) {
    syncDefaultToSession(defaultAddress);
  }
}

function applyDefaultFlag(addresses: StoredAddress[], defaultId: string): void {
  addresses.forEach((item) => {
    item.isDefault = item.id === defaultId;
  });
}

export function addStoredAddress(
  address: Address,
  options?: { setAsDefault?: boolean },
): StoredAddress {
  const addresses = getStoredAddresses();
  const setAsDefault = options?.setAsDefault ?? addresses.length === 0;
  const storedAddress: StoredAddress = {
    ...address,
    id: createId(),
    isDefault: setAsDefault,
  };

  addresses.push(storedAddress);

  if (setAsDefault) {
    applyDefaultFlag(addresses, storedAddress.id);
  }

  writeAddresses(addresses);

  const defaultAddress = addresses.find((item) => item.isDefault);
  if (defaultAddress) {
    syncDefaultToSession(defaultAddress);
  }

  return storedAddress;
}

export function updateStoredAddress(
  id: string,
  address: Address,
  options?: { setAsDefault?: boolean },
): StoredAddress | null {
  const addresses = getStoredAddresses();
  const index = addresses.findIndex((item) => item.id === id);

  if (index < 0) {
    return null;
  }

  const updated: StoredAddress = {
    ...addresses[index],
    ...address,
  };

  addresses[index] = updated;

  if (options?.setAsDefault) {
    applyDefaultFlag(addresses, id);
  }

  writeAddresses(addresses);

  const defaultAddress = addresses.find((item) => item.isDefault);
  if (defaultAddress) {
    syncDefaultToSession(defaultAddress);
  }

  return addresses[index];
}

export function deleteStoredAddress(id: string): boolean {
  const addresses = getStoredAddresses();
  const target = addresses.find((item) => item.id === id);

  if (!target || target.isDefault) {
    return false;
  }

  writeAddresses(addresses.filter((item) => item.id !== id));
  return true;
}

function syncDefaultToSession(address: StoredAddress): void {
  if (typeof window === "undefined" || !address.isDefault) {
    return;
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toAddress(address)));
}

export function isRegisteredAddress(
  address: Address | null,
): address is Address {
  if (!address) {
    return false;
  }

  return Boolean(
    address.recipient &&
      address.zipCode &&
      address.address &&
      address.addressDetail &&
      address.phone1,
  );
}
