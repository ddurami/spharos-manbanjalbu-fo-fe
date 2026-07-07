"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";
import type { MainPageSeason } from "@/types/product";

type SeasonProductSectionProps = {
  season: MainPageSeason;
};

export function SeasonProductSection({ season }: SeasonProductSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 5,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    updateButtons();
  }, [emblaApi, updateButtons]);

  if (season.products.length === 0) return null;

  return (
    <section className="mt-16 first:mt-0">
      <h3 className="text-xl font-bold text-[#121212]">{season.seasonName}</h3>

      <div className="group relative mt-4">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="-ml-4 flex">
            {season.products.map((product) => (
              <div key={product.id} className="min-w-0 flex-[0_0_20%] pl-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {canPrev && (
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute -left-3 top-1/3 flex size-9 items-center justify-center rounded-full border border-sb-border bg-white text-[#121212] shadow-sm opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="이전"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
        )}

        {canNext && (
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute -right-3 top-1/3 flex size-9 items-center justify-center rounded-full border border-sb-border bg-white text-[#121212] shadow-sm opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="다음"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        )}
      </div>
    </section>
  );
}
