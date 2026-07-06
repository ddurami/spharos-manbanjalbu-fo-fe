"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PopularCategory } from "@/types/home";
import { POPULAR_CATEGORY } from "@/constants/image-sizes";
import { PageContainer } from "@/components/layout/PageContainer";
import { ImagePlaceholder, imageRadiusStyle } from "@/components/home/ImagePlaceholder";
import { HomeSection, SectionHeading } from "@/components/home/SectionLayout";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface PopularCategoriesProps {
  categories: PopularCategory[];
}

const ROW_HEIGHT = POPULAR_CATEGORY.large.height;
const IMAGE_TO_PREV_GAP = 30;
const NAV_BUTTON_GAP = 4;
const NAV_BUTTONS_WIDTH = 28 + NAV_BUTTON_GAP + 28;
const NAV_WIDTH = IMAGE_TO_PREV_GAP + NAV_BUTTONS_WIDTH;

function CategoryCard({
  category,
  featured,
}: {
  category: PopularCategory;
  featured: boolean;
}) {
  const size = featured ? POPULAR_CATEGORY.large : POPULAR_CATEGORY.small;

  return (
    <article
      className="flex shrink-0 flex-col justify-end"
      style={{ width: size.width, height: ROW_HEIGHT }}
    >
      {category.label ? (
        <p
          className="font-normal text-[30px] text-foreground"
          style={{ marginBottom: POPULAR_CATEGORY.subtitleGap }}
        >
          {category.label}
        </p>
      ) : (
        <span className="mb-2 block h-5" aria-hidden="true" />
      )}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: size.width, height: size.height }}
      >
        <ImagePlaceholder
          alt={category.alt}
          src={category.imageSrc}
          rounded="content"
          className="size-full"
        />
      </div>
    </article>
  );
}

function chunkCategories(categories: PopularCategory[]): PopularCategory[][] {
  const pages: PopularCategory[][] = [];

  for (let i = 0; i < categories.length; i += POPULAR_CATEGORY.itemsPerPage) {
    pages.push(categories.slice(i, i + POPULAR_CATEGORY.itemsPerPage));
  }

  return pages.slice(0, POPULAR_CATEGORY.pageCount);
}

export function PopularCategories({ categories }: PopularCategoriesProps) {
  const pages = useMemo(() => chunkCategories(categories), [categories]);
  const [api, setApi] = useState<CarouselApi>();

  return (
    <HomeSection aria-labelledby="popular-categories-heading">
      <PageContainer style={imageRadiusStyle}>
        <SectionHeading id="popular-categories-heading">
          인기 카테고리
        </SectionHeading>

        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start", containScroll: "trimSnaps" }}
            className="w-full"
            aria-label="인기 카테고리 목록"
          >
            <CarouselContent className="-ml-0">
              {pages.map((page, pageIndex) => (
                <CarouselItem
                  key={`popular-page-${pageIndex}`}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-0"
                >
                  <div
                    className="flex items-end justify-between"
                    style={{
                      height: ROW_HEIGHT,
                      paddingRight: NAV_WIDTH,
                    }}
                  >
                    {page.map((category, index) => (
                      <CategoryCard
                        key={category.id}
                        category={category}
                        featured={index === 0}
                      />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div
            className="absolute right-0 bottom-0 flex items-end"
            style={{
              width: NAV_BUTTONS_WIDTH,
              height: POPULAR_CATEGORY.small.height,
              gap: NAV_BUTTON_GAP,
            }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => api?.scrollPrev()}
              aria-label="이전 카테고리"
              className="text-foreground hover:bg-transparent"
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => api?.scrollNext()}
              aria-label="다음 카테고리"
              className="text-foreground hover:bg-transparent"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </PageContainer>
    </HomeSection>
  );
}
