"use client";

import { useCallback, useEffect, useState } from "react";
import type { HeroSlide } from "@/types/home";
import { HERO, LAYOUT } from "@/constants/image-sizes";
import { ImagePlaceholder } from "@/components/home/ImagePlaceholder";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  slides: HeroSlide[];
}

export function HeroSection({ slides }: HeroSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, HERO.autoplayInterval);

    return () => clearInterval(interval);
  }, [api, isPaused]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section
      aria-labelledby="hero-heading"
      style={{ marginBottom: LAYOUT.sectionGap }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <h2 id="hero-heading" className="sr-only">
        메인 프로모션
      </h2>

      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "center",
          containScroll: false,
        }}
        className="w-full"
        aria-label="메인 프로모션 슬라이드"
      >
        <CarouselContent
          className="-ml-0"
          style={{ marginLeft: -HERO.gap }}
        >
          {slides.map((slide, index) => (
            <CarouselItem
              key={slide.id}
              className="min-w-0 shrink-0 grow-0 basis-auto pl-0"
              style={{ paddingLeft: HERO.gap }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  width: `min(${HERO.width}px, calc(100vw - 80px))`,
                  aspectRatio: `${HERO.width} / ${HERO.height}`,
                }}
              >
                <ImagePlaceholder
                  alt={slide.alt}
                  src={slide.imageSrc}
                  priority={index === 0}
                  className="size-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-2"
          role="tablist"
          aria-label="슬라이드 페이지"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={selectedIndex === index}
              aria-label={`${index + 1}번 슬라이드`}
              onClick={() => scrollTo(index)}
              className={cn(
                "pointer-events-auto size-2.5 rounded-full border transition-colors",
                selectedIndex === index
                  ? "border-[#00A864] bg-[#00A864]"
                  : "border-white bg-white",
              )}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
