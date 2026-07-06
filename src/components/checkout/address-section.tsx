import Link from "next/link";

import { CheckoutSection } from "@/components/checkout/checkout-section";
import { Button } from "@/components/ui/button";
import {
  formatAddressLine,
  getDeliveryMemoLabel,
} from "@/lib/address/format-address";
import type { Address } from "@/lib/address/types";

const outlineButtonClassName =
  "h-10 shrink-0 rounded-full border-[1.5px] border-primary px-5 text-[17px] tracking-tight text-primary hover:bg-sb-green-soft hover:text-primary";

type AddressSectionProps = {
  address: Address | null;
};

export function AddressSection({ address }: AddressSectionProps) {
  const hasAddress = Boolean(
    address?.recipient &&
      address.zipCode &&
      address.address &&
      address.addressDetail &&
      address.phone1
  );

  const deliveryMemoLabel = address?.deliveryMemo
    ? getDeliveryMemoLabel(address.deliveryMemo)
    : undefined;

  return (
    <CheckoutSection title="배송정보">
      <div className="flex items-center justify-between gap-4">
        {hasAddress && address ? (
          <div className="space-y-1 text-base leading-snug text-foreground">
            {address.nickname ? (
              <p className="font-medium text-foreground">{address.nickname}</p>
            ) : null}
            <p>
              {address.recipient}
              <span className="text-sb-text-secondary"> · {address.phone1}</span>
            </p>
            <p className="text-sb-text-secondary">
              {formatAddressLine(address)}
            </p>
            {deliveryMemoLabel ? (
              <p className="text-sm text-sb-text-muted">{deliveryMemoLabel}</p>
            ) : null}
          </div>
        ) : (
          <p className="text-base leading-snug text-foreground">
            등록된 배송지가 없습니다.
            <br />
            배송지를 등록해주세요.
          </p>
        )}

        <Link href={hasAddress ? "/mypage/address" : "/mypage/address/new"}>
          <Button variant="outline" className={outlineButtonClassName}>
            {hasAddress ? "배송지 변경" : "배송지 등록"}
          </Button>
        </Link>
      </div>
    </CheckoutSection>
  );
}
