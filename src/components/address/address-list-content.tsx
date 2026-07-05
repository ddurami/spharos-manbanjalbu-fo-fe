"use client";

import { AddressList } from "@/components/address/address-list";
import { AddressListHeader } from "@/components/address/address-list-header";
import { useShippingAddresses } from "@/hooks/use-shipping-addresses";

export function AddressListContent() {
  const { addresses, removeAddress } = useShippingAddresses();

  return (
    <div className="flex flex-1 flex-col bg-white px-[50px] py-[50px] lg:px-[300px]">
      <AddressListHeader />
      <AddressList addresses={addresses} onDelete={removeAddress} />
    </div>
  );
}
