import { ShoppingCart } from "lucide-react";

export function CartEmpty() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center gap-4">
      <ShoppingCart className="size-12 stroke-[1.2] text-sb-text-muted" />
      <p className="text-base text-sb-text-muted">장바구니가 비어있습니다.</p>
    </div>
  );
}
