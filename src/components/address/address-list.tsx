import { AddressCard } from "@/components/address/address-card";
import type { ShippingAddress } from "@/lib/address/types";

type AddressListProps = {
  addresses: ShippingAddress[];
  onDelete: (id: string) => void;
};

export function AddressList({ addresses, onDelete }: AddressListProps) {
  if (addresses.length === 0) {
    return (
      <p className="py-16 text-center text-base text-sb-text-muted">
        등록된 배송지가 없습니다.
      </p>
    );
  }

  return (
    <div className="mt-[30px] grid grid-cols-1 gap-x-[60px] lg:grid-cols-2">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
