"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon, Share2Icon, ShoppingCartIcon } from "lucide-react";
import type { ProductDetail } from "@/types/product-detail";
import { PRODUCT_DETAIL } from "@/constants/product-detail-sizes";
import { ImagePlaceholder } from "@/components/home/ImagePlaceholder";
import { CartAddedAlert } from "@/components/cart/CartAddedAlert";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ProductDetailHeaderProps {
  product: ProductDetail;
}

export function ProductDetailHeader({ product }: ProductDetailHeaderProps) {
  const [quantity, setQuantity] = useState(1);
  const [isCartAlertOpen, setIsCartAlertOpen] = useState(false);
  const { addToCart } = useCart();

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      thumbnailSrc: product.thumbnailSrc,
    });
    setIsCartAlertOpen(true);
  };

  return (
    <>
      <div
        className="flex w-full items-stretch"
        style={{ gap: PRODUCT_DETAIL.headerGap }}
      >
      <div
        className="relative shrink-0 overflow-hidden rounded-[12px] bg-placeholder"
        style={{ width: PRODUCT_DETAIL.thumbnailSize }}
      >
        <ImagePlaceholder
          alt={product.name}
          src={product.thumbnailSrc}
          rounded="content"
          className="size-full object-cover"
        />
      </div>

      <div
        className="ml-auto flex shrink-0 flex-col"
        style={{ width: PRODUCT_DETAIL.infoWidth }}
      >
        <div className="mt-[10px] flex items-start justify-between gap-4">
          <h1 className="text-[24px] font-bold leading-snug text-[#121212]">
            {product.name}
          </h1>
          <button
            type="button"
            className="shrink-0 text-[#121212] transition-opacity hover:opacity-70"
            aria-label="공유하기"
          >
            <Share2Icon className="size-6" />
          </button>
        </div>

        <p className="mt-[30px] text-[16px] leading-relaxed text-[#121212]">
          {product.description}
        </p>

        <p className="mt-3 text-[14px] text-[#6c6c6c]">{product.origin}</p>

        <div className="mt-[60px] rounded-none bg-[#f5f5f5] px-10 py-5">
          <p className="text-[16px] font-medium text-[#121212]">수량 선택</p>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
              className={cn(
                "flex size-8 items-center justify-center rounded-full border border-[#d9d9d9] bg-white transition-colors",
                quantity <= 1
                  ? "cursor-not-allowed text-[#d9d9d9]"
                  : "text-[#121212] hover:bg-[#fafafa]",
              )}
              aria-label="수량 감소"
            >
              <MinusIcon className="size-4" />
            </button>

            <span className="min-w-[24px] text-center text-[16px] font-medium text-[#121212]">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="flex size-8 items-center justify-center rounded-full border border-[#d9d9d9] bg-white text-[#121212] transition-colors hover:bg-[#fafafa]"
              aria-label="수량 증가"
            >
              <PlusIcon className="size-4" />
            </button>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <span className="text-[16px] font-medium text-[#121212]">
              총 {quantity}개
            </span>
            <span className="text-[20px] font-bold text-[#121212]">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>

        <div className="mt-[30px] flex items-center justify-between">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex size-[52px] shrink-0 items-center justify-center rounded-[8px] border border-[#d9d9d9] bg-white text-[#121212] transition-colors hover:bg-[#fafafa]"
            aria-label="장바구니 담기"
          >
            <ShoppingCartIcon className="size-5" />
          </button>

          <button
            type="button"
            className="h-[52px] w-[250px] shrink-0 rounded-[50px] border border-[#00A864] bg-white text-[16px] font-medium text-[#00A864] transition-colors hover:bg-[#f5fbf8]"
          >
            선물하기
          </button>

          <button
            type="button"
            className="h-[52px] w-[250px] shrink-0 rounded-[50px] bg-[#00A864] text-[16px] font-medium text-white transition-colors hover:bg-[#009658]"
          >
            구매하기
          </button>
        </div>
      </div>
      </div>

      <CartAddedAlert
        open={isCartAlertOpen}
        onClose={() => setIsCartAlertOpen(false)}
      />
    </>
  );
}
