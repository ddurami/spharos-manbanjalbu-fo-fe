"use client";

import { useState, useEffect } from "react";
import { getMainPageProducts } from "@/lib/api/product";
import { getCategories } from "@/lib/api/category";
import { PageContainer } from "@/components/common/PageContainer";
import { HeroSection } from "@/components/home/HeroSection";
import { SelectionNav } from "@/components/home/SelectionNav";
import { SeasonProductSection } from "@/components/home/SeasonProductSection";
import type { MainPageSeason } from "@/types/product";
import type { Category } from "@/types/category";

export function HomeContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [seasons, setSeasons] = useState<MainPageSeason[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getCategories(), getMainPageProducts()])
      .then(([cats, seas]) => {
        setCategories(cats);
        setSeasons(seas);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <HeroSection />

      <PageContainer className="pb-16 pt-10">
        <SelectionNav categories={categories} />
      </PageContainer>

      <PageContainer className="pb-16">
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="size-8 animate-spin rounded-full border-2 border-sb-green border-t-transparent" />
          </div>
        )}

        {seasons.map((season) => (
          <SeasonProductSection key={season.seasonId} season={season} />
        ))}
      </PageContainer>
    </>
  );
}
