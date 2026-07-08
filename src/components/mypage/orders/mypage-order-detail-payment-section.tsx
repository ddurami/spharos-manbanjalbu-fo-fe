import { PriceDisplay } from "@/components/common/price-display";
import { OrderDetailInfoRow } from "@/components/mypage/orders/order-detail-info-row";
import { getOrderPaymentMethodLabel } from "@/lib/order/order-labels";
import type { OrderDetailPayment } from "@/types/order";

type MypageOrderDetailPaymentSectionProps = {
  payment: OrderDetailPayment;
};

export function MypageOrderDetailPaymentSection({
  payment,
}: MypageOrderDetailPaymentSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-base font-semibold text-foreground">결제정보</h2>

      <dl className="space-y-2.5 text-[15px]">
        <OrderDetailInfoRow
          label="주문금액"
          labelClassName="font-semibold text-foreground"
        >
          <PriceDisplay amount={payment.orderAmount} />
        </OrderDetailInfoRow>
        <OrderDetailInfoRow
          label="상품금액"
          labelClassName="font-semibold text-foreground"
        >
          <PriceDisplay amount={payment.productAmount} />
        </OrderDetailInfoRow>
        <OrderDetailInfoRow
          label="배송비"
          labelClassName="font-semibold text-foreground"
        >
          <PriceDisplay amount={payment.deliveryFee} />
        </OrderDetailInfoRow>
        <OrderDetailInfoRow
          label="할인금액"
          labelClassName="font-semibold text-foreground"
        >
          <PriceDisplay amount={payment.discountAmount} />
        </OrderDetailInfoRow>
      </dl>

      <div className="flex items-baseline justify-between border-t border-sb-border pt-6">
        <p className="text-xl font-semibold text-foreground">결제금액</p>
        <PriceDisplay
          amount={payment.paidAmount}
          amountClassName="text-[26px] font-semibold text-foreground"
          className="text-foreground"
        />
      </div>

      <div className="flex items-baseline justify-between">
        <p className="text-[15px] font-semibold text-foreground">
          {getOrderPaymentMethodLabel(payment.paymentMethod)}
        </p>
        <PriceDisplay amount={payment.paidAmount} />
      </div>
    </section>
  );
}
