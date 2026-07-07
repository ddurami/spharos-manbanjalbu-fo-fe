"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_ITEMS = [
  {
    id: 1,
    bgColor: "#1e3932",
    title: "여름 시즌 MD",
    subtitle: "스타벅스와 함께하는 시원한 여름",
  },
  {
    id: 2,
    bgColor: "#00a864",
    title: "스타벅스 컬렉션",
    subtitle: "다양한 텀블러와 머그를 만나보세요",
  },
  {
    id: 3,
    bgColor: "#d4e9e2",
    title: "BEST 상품",
    subtitle: "가장 사랑받는 스타벅스 MD",
  },
];

function HeroSlide({
  item,
  isCurrent,
}: {
  item: (typeof HERO_ITEMS)[number];
  isCurrent: boolean;
}) {
  return (
    <div
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
    </div>
  );
}

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

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
          {HERO_ITEMS.map((item, idx) => (
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
        className="absolute left-[calc(50%-620px)] top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-[#121212] opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="이전"
      >
        <ChevronLeftIcon className="size-5" />
      </button>

      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-[calc(50%-620px)] top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-[#121212] opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="다음"
      >
        <ChevronRightIcon className="size-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {HERO_ITEMS.map((item, idx) => (
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
