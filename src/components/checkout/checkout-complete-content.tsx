"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { PriceDisplay } from "@/components/common/price-display";
import { Button } from "@/components/ui/button";
import {
  clearOrderResult,
  getOrderResult,
  type CheckoutResult,
} from "@/lib/checkout/order-session";
import {
  formatReservationDateLabel,
  parseReservationDate,
} from "@/lib/checkout/reservation-delivery";

const outlineButtonClassName =
  "h-14 rounded-full border-[1.5px] border-primary px-8 text-[17px] tracking-tight text-primary hover:bg-sb-green-soft hover:text-primary";

const PAYMENT_STATUS_LABEL: Record<string, string> = {
  SUCCESS: "결제 완료",
  CANCEL: "결제 취소",
  READY: "결제 대기",
  IN_PROGRESS: "결제 진행 중",
  FAILED: "결제 실패",
  REFUNDED: "환불 완료",
};

const PG_NAME_LABEL: Record<string, string> = {
  MOCK: "모의 결제",
  TOSS: "토스페이먼츠",
  INICIS: "KG이니시스",
  KAKAO_PAY: "카카오페이",
};

type OrderInfoRowProps = {
  label: string;
  children: ReactNode;
};

function OrderInfoRow({ label, children }: OrderInfoRowProps) {
  return (
    <div className="flex w-full min-w-0 items-start justify-between gap-6">
      <dt className="shrink-0 whitespace-nowrap text-base text-sb-text-muted">
        {label}
      </dt>
      <dd className="min-w-0 flex-1 text-right text-base font-medium leading-relaxed text-foreground">
        {children}
      </dd>
    </div>
  );
}

export function CheckoutCompleteContent() {
  const router = useRouter();
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResult | null>(
    null,
  );

  useEffect(() => {
    const result = getOrderResult();

    if (!result) {
      router.replace("/");
      return;
    }

    setCheckoutResult(result);
    window.dispatchEvent(new Event("cart-updated"));

    const handlePageHide = () => {
      clearOrderResult();
    };

    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [router]);

  if (!checkoutResult) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <p className="text-base text-sb-text-muted">주문 정보를 불러오는 중...</p>
      </div>
    );
  }

  const { order, payment } = checkoutResult;
  const reservationDateLabel = order.reservationDeliveryDate
    ? formatReservationDateLabel(
        parseReservationDate(order.reservationDeliveryDate) ?? new Date(),
      )
    : null;

  return (
    <div className="mx-auto flex w-full max-w-[850px] flex-1 flex-col px-[50px] py-[50px] lg:px-[300px]">
      <div className="flex w-[375px] max-w-full flex-col gap-[50px]">
        <h1 className="text-[36px] font-medium leading-tight text-foreground">
          <span className="block">주문이</span>
          <span className="block">완료되었습니다</span>
        </h1>

        <section className="box-border h-[375px] w-[375px] min-w-[375px] max-w-full border border-sb-border bg-white px-8 py-8">
          <dl className="flex h-full w-full min-w-0 flex-col justify-center gap-5">
            <OrderInfoRow label="주문 상품">{order.orderName}</OrderInfoRow>
            <OrderInfoRow label="주문번호">{order.orderNo}</OrderInfoRow>
            <OrderInfoRow label="승인번호">{payment.approvedNumber}</OrderInfoRow>
            <OrderInfoRow label="결제상태">
              {PAYMENT_STATUS_LABEL[payment.paymentStatus] ??
                payment.paymentStatus}
            </OrderInfoRow>
            <OrderInfoRow label="결제수단">
              {PG_NAME_LABEL[payment.pgName] ?? payment.pgName}
            </OrderInfoRow>
            {reservationDateLabel ? (
              <OrderInfoRow label="예약 배송일">
                {reservationDateLabel}
              </OrderInfoRow>
            ) : null}
            <OrderInfoRow label="결제금액">
              <PriceDisplay
                amount={payment.paidAmount}
                amountClassName="text-xl font-bold text-foreground"
                className="inline-flex justify-end text-foreground"
              />
            </OrderInfoRow>
          </dl>
        </section>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Link href="/">
            <Button className="h-14 rounded-full px-8 text-[17px]">
              쇼핑 계속하기
            </Button>
          </Link>
          <Link href="/mypage">
            <Button variant="outline" className={outlineButtonClassName}>
              마이페이지
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
