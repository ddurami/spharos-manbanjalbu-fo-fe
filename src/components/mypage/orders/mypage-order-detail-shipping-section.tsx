import Link from "next/link";

import { OrderDetailInfoRow } from "@/components/mypage/orders/order-detail-info-row";
import {
  formatOrderDateLabel,
  formatOrderDateTime,
} from "@/lib/order/format-order-date";
import type { OrderDetailAddress, OrderDetailResponse } from "@/types/order";

type MypageOrderDetailShippingSectionProps = {
  order: Pick<
    OrderDetailResponse,
    "orderNo" | "orderedAt" | "deliveryAddress" | "changeableAddress"
  >;
};

function formatRecipientTitle(address: OrderDetailAddress): string {
  return address.addressName
    ? `${address.recipientName} (${address.addressName})`
    : address.recipientName;
}

function formatAddressLine(address: OrderDetailAddress): string {
  return `(${address.zipcode}) ${address.baseAddress} ${address.detailAddress}`.trim();
}

export function MypageOrderDetailShippingSection({
  order,
}: MypageOrderDetailShippingSectionProps) {
  const { deliveryAddress } = order;

  return (
    <article className="border border-sb-border bg-white px-8 py-8">
      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-base font-semibold text-foreground">배송정보</h2>
          {order.changeableAddress ? (
            <Link
              href="#"
              className="shrink-0 text-sm text-sb-text-muted transition-opacity hover:text-foreground hover:opacity-70"
            >
              배송지 변경
            </Link>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <p className="text-lg font-medium text-foreground">
            {formatRecipientTitle(deliveryAddress)}
          </p>
          {deliveryAddress.isDefault ? (
            <span className="inline-flex h-6 items-center rounded-full border border-sb-green px-2.5 text-xs font-medium text-sb-green">
              기본
            </span>
          ) : null}
        </div>

        <div className="space-y-2 text-sm leading-relaxed text-sb-text-secondary">
          <p>{formatAddressLine(deliveryAddress)}</p>
          <p>{deliveryAddress.phone1}</p>
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-5 border-t border-sb-border pt-8">
        <h2 className="text-base font-semibold text-foreground">주문정보</h2>

        <dl className="space-y-4">
          <OrderDetailInfoRow label="주문일시">
            {formatOrderDateTime(order.orderedAt)}
          </OrderDetailInfoRow>
          <OrderDetailInfoRow label="주문번호">{order.orderNo}</OrderDetailInfoRow>
        </dl>
      </section>
    </article>
  );
}

export function MypageOrderDetailOrderHeader({
  orderedAt,
  orderNo,
}: {
  orderedAt: string;
  orderNo: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[28px] font-medium leading-tight text-foreground">
        {formatOrderDateLabel(orderedAt)}
      </p>
      <p className="text-sm text-sb-text-muted">주문번호 {orderNo}</p>
    </div>
  );
}
