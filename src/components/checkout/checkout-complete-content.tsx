"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { PriceDisplay } from "@/components/common/price-display";
import { Button } from "@/components/ui/button";
import {
  clearOrderResult,
  getOrderResult,
} from "@/lib/checkout/order-session";
import type { OrderCreateResponse } from "@/types/order";

const outlineButtonClassName =
  "h-14 rounded-full border-[1.5px] border-primary px-8 text-[17px] tracking-tight text-primary hover:bg-sb-green-soft hover:text-primary";

export function CheckoutCompleteContent() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderCreateResponse | null>(null);

  useEffect(() => {
    const result = getOrderResult();

    if (!result) {
      router.replace("/");
      return;
    }

    setOrder(result);
    clearOrderResult();
  }, [router]);

  if (!order) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <p className="text-base text-sb-text-muted">주문 정보를 불러오는 중...</p>
      </div>
    );
  }

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
          <dt className="text-sb-text-muted">결제금액</dt>
          <dd>
            <PriceDisplay
              amount={order.orderAmount}
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
