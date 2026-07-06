"use client";

import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";

interface CartAddedAlertProps {
  open: boolean;
  onClose: () => void;
}

export function CartAddedAlert({ open, onClose }: CartAddedAlertProps) {
  const router = useRouter();

  if (!open) return null;

  const handleGoToCart = () => {
    onClose();
    router.push("/cart");
  };

  const handleViewMoreProducts = () => {
    onClose();
    router.push("/all-products");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-[#000000]/15"
        aria-label="알림 닫기"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-added-title"
        className="relative w-[480px] border border-[#00A864] bg-white px-10 pt-16 pb-10"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 flex size-10 items-center justify-center bg-[#00A864] text-white transition-colors hover:bg-[#009658]"
          aria-label="닫기"
        >
          <XIcon className="size-5" strokeWidth={2.5} />
        </button>

        <p
          id="cart-added-title"
          className="text-center text-[18px] font-medium leading-relaxed text-[#121212]"
        >
          장바구니에 상품이 추가되었습니다.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleGoToCart}
            className="h-[52px] w-[180px] rounded-[50px] border border-[#00A864] bg-white text-[16px] font-medium text-[#00A864] transition-colors hover:bg-[#f5fbf8]"
          >
            장바구니 가기
          </button>

          <button
            type="button"
            onClick={handleViewMoreProducts}
            className="h-[52px] w-[180px] rounded-[50px] bg-[#00A864] text-[16px] font-medium text-white transition-colors hover:bg-[#009658]"
          >
            상품 더보기
          </button>
        </div>
      </div>
    </div>
  );
}
