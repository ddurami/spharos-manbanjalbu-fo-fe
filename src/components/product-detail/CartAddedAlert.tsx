"use client";

import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";

type CartAddedAlertProps = {
  open: boolean;
  onClose: () => void;
};

export function CartAddedAlert({ open, onClose }: CartAddedAlertProps) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-[480px] rounded-lg border border-sb-green bg-white px-8 py-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-sb-green hover:opacity-70"
          aria-label="닫기"
        >
          <XIcon className="size-5" />
        </button>

        <p className="text-center text-base font-medium text-[#121212]">
          장바구니에 상품이 추가되었습니다.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="h-[48px] w-[180px] rounded-full border border-sb-green text-sm font-medium text-sb-green hover:bg-sb-green-soft"
          >
            장바구니 가기
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-[48px] w-[180px] rounded-full bg-sb-green text-sm font-medium text-white hover:bg-[#009658]"
          >
            상품 더보기
          </button>
        </div>
      </div>
    </div>
  );
}
