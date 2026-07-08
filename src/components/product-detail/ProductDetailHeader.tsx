"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Minus, Plus, Share2Icon } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { addCartItem } from "@/lib/api/cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { ProductBadge } from "@/components/common/ProductBadge";
import { CartAddedAlert } from "@/components/product-detail/CartAddedAlert";
import type { ProductDetail } from "@/types/product";
import type { CategoryBreadcrumb } from "@/components/product-detail/ProductDetailPageContent";

type ProductDetailHeaderProps = {
  product: ProductDetail;
  thumbnailUrl?: string;
  categoryBreadcrumb?: CategoryBreadcrumb | null;
};

export function ProductDetailHeader({
  product,
  thumbnailUrl,
  categoryBreadcrumb,
}: ProductDetailHeaderProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isCartAlertOpen, setIsCartAlertOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const totalPrice = product.price * quantity;

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요");
      return;
    }
    setIsAdding(true);
    try {
      await addCartItem(product.id, quantity);
      window.dispatchEvent(new Event("cart-updated"));
      setIsCartAlertOpen(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "장바구니 추가에 실패했습니다.";
      alert(message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요");
      return;
    }
    router.push(`/checkout?productId=${product.id}&quantity=${quantity}`);
  };

  const handleShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("URL이 복사되었습니다.");
    } catch {
      alert("URL 복사에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1280px] gap-10 px-6 lg:px-10">
        <div className="relative aspect-square w-[600px] shrink-0 overflow-hidden rounded-image bg-placeholder">
          <ImagePlaceholder
            src={thumbnailUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col py-2">
          <Link
            href={
              categoryBreadcrumb?.childId
                ? `/products?categoryId=${categoryBreadcrumb.parentId}&subcategoryId=${categoryBreadcrumb.childId}`
                : categoryBreadcrumb
                  ? `/products?categoryId=${categoryBreadcrumb.parentId}`
                  : "/products"
            }
            className="text-sm text-sb-text-muted hover:text-sb-green"
          >
            {categoryBreadcrumb?.childName
              ? `${categoryBreadcrumb.parentName} > ${categoryBreadcrumb.childName}`
              : categoryBreadcrumb?.parentName ?? product.categoryName}
          </Link>

          <div className="mt-1 flex items-start justify-between gap-4">
            <div className="flex items-end gap-2">
              <h1 className="text-xl font-bold leading-snug text-[#121212]">
                {product.name}
              </h1>
              {(product.isNew || product.isBest) && (
                <div className="mb-0.5 flex shrink-0 items-center gap-1.5">
                  {product.isNew && <ProductBadge type="NEW" />}
                  {product.isBest && <ProductBadge type="BEST" />}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleShareUrl}
              className="mt-0.5 shrink-0 text-sb-text-muted hover:text-[#121212]"
              aria-label="공유하기"
            >
              <Share2Icon className="size-[18px]" />
            </button>
          </div>

          {(product.capacity || product.seasonName) && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.capacity && (
                <span className="rounded border border-sb-border px-2 py-0.5 text-xs text-sb-text-muted">
                  {product.capacity}
                </span>
              )}
              {product.seasonName && (
                <span className="rounded border border-sb-border px-2 py-0.5 text-xs text-sb-text-muted">
                  {product.seasonName}
                </span>
              )}
            </div>
          )}

          <p className="mt-4 text-xl font-bold text-[#121212]">
            {formatPrice(product.price)}원
          </p>

          <p className="mt-4 text-[13px] leading-relaxed text-sb-text-muted">
            {product.shortDescription}
          </p>

          <div className="mt-auto">
            <div className="flex items-center justify-between border-t border-sb-border py-5">
              <div className="flex w-[110px] items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="수량 줄이기"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="size-7 cursor-pointer rounded-full border border-sb-border text-foreground"
                >
                  <Minus className="size-3.5" />
                </Button>

                <span className="min-w-[24px] text-center text-[15px] font-medium text-foreground">
                  {quantity}
                </span>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="수량 늘리기"
                  disabled={quantity >= 20}
                  onClick={() => setQuantity((prev) => Math.min(20, prev + 1))}
                  className="size-7 cursor-pointer rounded-full border border-sb-border text-foreground"
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>

              <span className="text-xl font-bold text-[#121212]">
                {formatPrice(totalPrice)}원
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding}
                className="h-[48px] flex-1 rounded-full border border-sb-green text-sm font-medium text-sb-green hover:bg-sb-green-soft disabled:opacity-50"
              >
                장바구니 담기
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="h-[48px] flex-1 rounded-full bg-sb-green text-sm font-medium text-white hover:bg-[#009658]"
              >
                구매하기
              </button>
            </div>
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
