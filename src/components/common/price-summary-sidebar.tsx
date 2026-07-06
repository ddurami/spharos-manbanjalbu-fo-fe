import { PriceDisplay } from "@/components/common/price-display";
import type { CheckoutSummary } from "@/lib/checkout/types";
import { cn } from "@/lib/utils";

const NOTICE_ITEMS = [
  "장바구니에는 최대 20개까지 담을 수 있습니다.",
  "총 결제예정금액은 결제 단계에서 추가 할인 수단 적용으로 달라질 수 있습니다.",
  "가격, 옵션 등 정보가 변경된 경우 주문이 불가할 수 있습니다.",
] as const;

type PriceSummarySidebarProps = {
  summary: CheckoutSummary;
  className?: string;
};

export function PriceSummarySidebar({
  summary,
  className,
}: PriceSummarySidebarProps) {
  return (
    <aside
      className={cn(
        "w-full max-w-[440px] shrink-0 lg:sticky lg:top-[96px] lg:self-start",
        className,
      )}
    >
      <div className="flex h-full flex-col justify-between gap-5 border border-sb-border bg-white px-[30px] py-[30px]">
        <div className="flex flex-col gap-8">
          <dl className="space-y-2.5 text-[15px]">
            <div className="flex items-baseline justify-between">
              <dt className="font-semibold text-foreground">상품 금액</dt>
              <dd>
                <PriceDisplay amount={summary.productAmount} />
              </dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="font-semibold text-foreground">할인 금액</dt>
              <dd>
                <PriceDisplay amount={summary.discountAmount} />
              </dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="font-semibold text-foreground">배송비</dt>
              <dd>
                <PriceDisplay amount={summary.shippingFee} />
              </dd>
            </div>
          </dl>

          <div className="flex items-baseline justify-between border-t border-sb-border pt-6">
            <p className="text-xl font-semibold text-sb-text-secondary">
              총 결제 예정금액
            </p>
            <PriceDisplay
              amount={summary.totalAmount}
              amountClassName="text-[26px] font-semibold"
            />
          </div>
        </div>

        <div className="space-y-1.5 bg-sb-surface px-[23px] py-5">
          {NOTICE_ITEMS.map((item) => (
            <div key={item} className="flex gap-2.5">
              <span className="mt-[7px] size-[3px] shrink-0 rounded-full bg-sb-text-subtle" />
              <p className="text-[13px] leading-relaxed text-sb-text-subtle">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
