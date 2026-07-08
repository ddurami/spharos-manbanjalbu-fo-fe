import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { PriceDisplay } from "@/components/common/price-display";
import { MypageOrderDetailPaymentSection } from "@/components/mypage/orders/mypage-order-detail-payment-section";
import {
  MypageOrderDetailOrderHeader,
  MypageOrderDetailShippingSection,
} from "@/components/mypage/orders/mypage-order-detail-shipping-section";
import { OrderStatusLabel } from "@/components/mypage/orders/order-status-label";
import { ProductGuideAccordion } from "@/components/product-detail/ProductGuideAccordion";
import type { OrderDetailResponse } from "@/types/order";

type MypageOrderDetailContentProps = {
  order: OrderDetailResponse;
};

export function MypageOrderDetailContent({ order }: MypageOrderDetailContentProps) {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
      <div className="flex flex-col gap-8">
        <h1 className="text-[28px] font-medium text-foreground sm:text-[32px]">
          주문 상세 정보
        </h1>

        <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-2 lg:items-start">
          <article className="border border-sb-border bg-white">
            <div className="px-8 pt-8 pb-6">
              <MypageOrderDetailOrderHeader
                orderedAt={order.orderedAt}
                orderNo={order.orderNo}
              />
            </div>

            <div className="border-t border-sb-border px-8 py-6">
              <div className="flex gap-5">
                <div className="size-[110px] shrink-0 overflow-hidden bg-placeholder">
                  <ImagePlaceholder
                    src={order.thumbnailUrl}
                    alt={order.orderName}
                    width={110}
                    height={110}
                    className="size-full object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-2 py-1">
                  <OrderStatusLabel status={order.orderStatus} />
                  <p className="text-base font-medium text-foreground">
                    {order.orderName}
                  </p>
                  <PriceDisplay
                    amount={order.orderAmount}
                    amountClassName="text-base"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-sb-border px-8 py-8">
              <MypageOrderDetailPaymentSection payment={order.payment} />
            </div>
          </article>

          <div className="flex flex-col gap-6">
            <MypageOrderDetailShippingSection order={order} />
            <ProductGuideAccordion policy={order.policy} />
          </div>
        </div>
      </div>
    </div>
  );
}
