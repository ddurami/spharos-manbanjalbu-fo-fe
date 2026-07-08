"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { getMainCarouselBanners, type BannerItem } from "@/lib/api/banner";
import { cn } from "@/lib/utils";

function HeroSlide({
  item,
  isCurrent,
}: {
  item: BannerItem;
  isCurrent: boolean;
}) {
  return (
    <Link
      href={item.linkUrl}
      className={cn(
        "relative block h-[360px] cursor-pointer overflow-hidden transition-opacity duration-300",
        isCurrent ? "opacity-100" : "opacity-40",
      )}
    >
      <ImagePlaceholder
        src={item.imageUrl}
        alt={item.title}
        fill
        className="object-cover"
      />
    </Link>
  );
}

export function HeroSection() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    getMainCarouselBanners()
      .then(setBanners)
      .catch(() => {});
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  if (banners.length === 0) return null;

  return (
    <section className="group relative w-full">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {banners.map((item, idx) => (
            <div
              key={item.id}
              className="min-w-0 px-5"
              style={{ flex: "0 0 1280px" }}
            >
              <HeroSlide item={item} isCurrent={idx === selectedIndex} />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-[calc(50%-580px)] top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-[#121212] opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="이전"
      >
        <ChevronLeftIcon className="size-5" />
      </button>

      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-[calc(50%-580px)] top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-[#121212] opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="다음"
      >
        <ChevronRightIcon className="size-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {banners.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(idx)}
            className={cn(
              "size-2 rounded-full transition-colors",
              idx === selectedIndex ? "bg-white" : "bg-white/40",
            )}
            aria-label={`슬라이드 ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
