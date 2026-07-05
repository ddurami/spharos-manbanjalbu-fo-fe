import type { ShippingAddress } from "@/lib/address/types";

export function formatAddressLine(address: Pick<ShippingAddress, "zipCode" | "address" | "addressDetail">) {
  return `(${address.zipCode}) ${address.address} ${address.addressDetail}`;
}
