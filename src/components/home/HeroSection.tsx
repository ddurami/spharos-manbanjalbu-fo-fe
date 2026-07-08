"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { getMainCarouselBanners, type BannerItem } from "@/lib/api/banner";
import { cn } from "@/lib/utils";

type FallbackHeroItem = {
  id: number;
  bgColor: string;
  title: string;
  subtitle: string;
  linkUrl: string;
};

const FALLBACK_HERO_ITEMS: FallbackHeroItem[] = [
  {
    id: 1,
    bgColor: "#1e3932",
    title: "여름 시즌 MD",
    subtitle: "스타벅스와 함께하는 시원한 여름",
    linkUrl: "/products",
  },
  {
    id: 2,
    bgColor: "#00a864",
    title: "스타벅스 컬렉션",
    subtitle: "다양한 텀블러와 머그를 만나보세요",
    linkUrl: "/products",
  },
  {
    id: 3,
    bgColor: "#d4e9e2",
    title: "BEST 상품",
    subtitle: "가장 사랑받는 스타벅스 MD",
    linkUrl: "/best",
  },
];

type CarouselSlide =
  | { kind: "banner"; item: BannerItem }
  | { kind: "fallback"; item: FallbackHeroItem };

function toFallbackSlides(): CarouselSlide[] {
  return FALLBACK_HERO_ITEMS.map((item) => ({ kind: "fallback", item }));
}

function ApiHeroSlide({
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

function FallbackHeroSlide({
  item,
  isCurrent,
}: {
  item: FallbackHeroItem;
  isCurrent: boolean;
}) {
  return (
    <Link
      href={item.linkUrl}
      className={cn(
        "flex h-[360px] items-center justify-center transition-opacity duration-300",
        isCurrent ? "opacity-100" : "opacity-40",
      )}
      style={{ backgroundColor: item.bgColor }}
    >
      <div className="text-center">
        <h2
          className={cn(
            "text-3xl font-bold",
            item.bgColor === "#d4e9e2" ? "text-[#1e3932]" : "text-white",
          )}
        >
          {item.title}
        </h2>
        <p
          className={cn(
            "mt-3 text-base",
            item.bgColor === "#d4e9e2"
              ? "text-[#1e3932]/70"
              : "text-white/70",
          )}
        >
          {item.subtitle}
        </p>
      </div>
    </Link>
  );
}

export function HeroSection() {
  const [slides, setSlides] = useState<CarouselSlide[]>(toFallbackSlides());
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    getMainCarouselBanners()
      .then((banners) => {
        if (banners.length > 0) {
          setSlides(banners.map((item) => ({ kind: "banner", item })));
        }
      })
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

  return (
    <section className="group relative w-full">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, idx) => (
            <div
              key={slide.kind === "banner" ? slide.item.id : slide.item.id}
              className="min-w-0 px-5"
              style={{ flex: "0 0 1280px" }}
            >
              {slide.kind === "banner" ? (
                <ApiHeroSlide item={slide.item} isCurrent={idx === selectedIndex} />
              ) : (
                <FallbackHeroSlide
                  item={slide.item}
                  isCurrent={idx === selectedIndex}
                />
              )}
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
        {slides.map((slide, idx) => (
          <button
            key={slide.kind === "banner" ? slide.item.id : slide.item.id}
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
