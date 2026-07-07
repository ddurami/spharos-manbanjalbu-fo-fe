"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PriceDisplay } from "@/components/common/price-display";
import { Button } from "@/components/ui/button";
import {
  clearOrderResult,
  getOrderResult,
  type CheckoutResult,
} from "@/lib/checkout/order-session";

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

  return (
    <div className="mx-auto flex w-full max-w-[850px] flex-1 flex-col gap-[50px] px-[50px] py-[50px] lg:px-[300px]">
      <div className="flex flex-col gap-4">
        <h1 className="text-[36px] font-medium text-foreground">
          주문이 완료되었습니다
        </h1>
        <p className="text-base leading-relaxed text-sb-text-secondary">
          {order.orderName}
        </p>
      </div>

      <dl className="flex flex-col gap-5 border border-sb-border px-8 py-8">
        <div className="flex items-center justify-between gap-4 text-base">
          <dt className="text-sb-text-muted">주문번호</dt>
          <dd className="font-medium text-foreground">{order.orderNo}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 text-base">
          <dt className="text-sb-text-muted">승인번호</dt>
          <dd className="font-medium text-foreground">{payment.approvedNumber}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 text-base">
          <dt className="text-sb-text-muted">결제상태</dt>
          <dd className="font-medium text-foreground">
            {PAYMENT_STATUS_LABEL[payment.paymentStatus] ?? payment.paymentStatus}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 text-base">
          <dt className="text-sb-text-muted">결제수단</dt>
          <dd className="font-medium text-foreground">
            {PG_NAME_LABEL[payment.pgName] ?? payment.pgName}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 text-base">
          <dt className="text-sb-text-muted">결제금액</dt>
          <dd>
            <PriceDisplay
              amount={payment.paidAmount}
              amountClassName="text-xl font-bold text-foreground"
              className="text-foreground"
            />
          </dd>
        </div>
      </dl>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
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
  );
}
