import { PriceDisplay } from "@/components/checkout/price-display";
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
        "w-full max-w-[440px] shrink-0 lg:sticky lg:top-6 lg:self-start",
        className
      )}
    >
      <div className="flex min-h-[440px] flex-col justify-center gap-5 border border-sb-border bg-white px-[30px] py-5">
        <div className="flex flex-1 flex-col justify-between gap-8">
          <dl className="space-y-2 text-lg">
            <div className="flex items-end justify-between">
              <dt className="font-medium text-foreground">상품 금액</dt>
              <dd>
                <PriceDisplay amount={summary.productAmount} />
              </dd>
            </div>
            <div className="flex items-end justify-between">
              <dt className="font-medium text-foreground">할인 금액</dt>
              <dd>
                <PriceDisplay amount={summary.discountAmount} />
              </dd>
            </div>
            <div className="flex items-end justify-between">
              <dt className="font-medium text-foreground">배송비</dt>
              <dd>
                <PriceDisplay amount={summary.shippingFee} />
              </dd>
            </div>
          </dl>

          <div className="flex items-center justify-between">
            <p className="text-[22px] font-semibold text-sb-text-secondary">
              총 결제 예정금액
            </p>
            <PriceDisplay
              amount={summary.totalAmount}
              amountClassName="text-[26px] font-semibold"
            />
          </div>
        </div>

        <div className="space-y-1.5 bg-sb-surface px-[23px] py-6">
          {NOTICE_ITEMS.map((item) => (
            <div key={item} className="flex gap-2.5">
              <span className="mt-2 size-[3px] shrink-0 bg-sb-text-subtle" />
              <p className="text-sm leading-snug text-sb-text-subtle">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
