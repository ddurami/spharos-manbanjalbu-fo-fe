"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";
import { PRODUCT_DETAIL } from "@/constants/product-detail-sizes";
import { cn } from "@/lib/utils";

interface ProductDetailImageProps {
  imageSrc?: string;
  alt: string;
}

export function ProductDetailImage({ imageSrc, alt }: ProductDetailImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const collapsedMaxHeight = Math.round(
    (PRODUCT_DETAIL.detailImageMaxHeight * PRODUCT_DETAIL.detailImageDisplayWidth) /
      PRODUCT_DETAIL.contentMaxWidth,
  );

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative mx-auto w-full overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{
          maxWidth: PRODUCT_DETAIL.detailImageDisplayWidth,
          maxHeight: isExpanded ? undefined : collapsedMaxHeight,
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={alt}
            width={PRODUCT_DETAIL.detailImageDisplayWidth}
            height={PRODUCT_DETAIL.detailImageDisplayHeight}
            className="mx-auto h-auto w-full object-cover object-top"
            sizes={`${PRODUCT_DETAIL.detailImageDisplayWidth}px`}
          />
        ) : (
          <div
            className="w-full bg-placeholder"
            style={{ height: collapsedMaxHeight }}
            role="img"
            aria-label={alt}
          />
        )}

        {!isExpanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="mt-6 flex items-center gap-2 rounded-full border border-[#00A864] px-8 py-3 text-[16px] font-medium text-[#00A864] transition-colors hover:bg-[#f5fbf8]"
      >
        {isExpanded ? "상품 정보 접기" : "상품 정보 더보기"}
        <ChevronDownIcon
          className={cn(
            "size-4 transition-transform duration-300",
            isExpanded && "rotate-180",
          )}
          aria-hidden
        />
      </button>
    </div>
  );
}
