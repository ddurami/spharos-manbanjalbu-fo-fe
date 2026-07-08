"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import type { ProductMedia } from "@/types/product";

type ProductDetailImageProps = {
  images: ProductMedia[];
};

export function ProductDetailImage({ images }: ProductDetailImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (images.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-sm text-sb-text-muted">
        상세 이미지가 없습니다.
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      <div className={!isExpanded ? "relative max-h-[600px] overflow-hidden" : ""}>
        <div className="flex flex-col items-center gap-4">
          {images.map((img) => (
            <ImagePlaceholder
              key={img.id}
              src={img.mediaUrl}
              alt="상품 상세 이미지"
              width={800}
              height={1200}
              className="w-full max-w-[600px]"
            />
          ))}
        </div>

        {!isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-[120px] bg-[linear-gradient(transparent,white)]" />
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`z-10 flex items-center gap-1 rounded-full border border-sb-green bg-white px-6 py-2 text-sm font-medium text-sb-green hover:bg-sb-green-soft ${!isExpanded ? "-mt-6" : "mt-4"}`}
      >
        {isExpanded ? "상품 정보 접기" : "상품 정보 더보기"}
        <ChevronDownIcon
          className={`size-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
