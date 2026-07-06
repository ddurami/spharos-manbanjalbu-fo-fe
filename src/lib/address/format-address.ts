import { DELIVERY_MEMO_OPTIONS } from "@/lib/address/delivery-memo-options";
import type { Address } from "@/lib/address/types";

export function getDeliveryMemoLabel(value: string): string | undefined {
  return DELIVERY_MEMO_OPTIONS.find((option) => option.value === value)?.label;
}

export function formatAddressLine(address: Address): string {
  return `[${address.zipCode}] ${address.address} ${address.addressDetail}`.trim();
}

export function formatAddressListLine(address: Address): string {
  return `(${address.zipCode}) ${address.address} ${address.addressDetail}`.trim();
}
