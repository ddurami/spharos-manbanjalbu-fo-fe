import type { CheckoutSummary, OrderItem } from "@/lib/checkout/types";

export function calculateCheckoutSummary(items: OrderItem[]): CheckoutSummary {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const productAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = 0;
  const shippingFee = 0;

  return {
    itemCount,
    productAmount,
    discountAmount,
    shippingFee,
    totalAmount: productAmount - discountAmount + shippingFee,
  };
}

export { formatPrice } from "@/lib/format";
