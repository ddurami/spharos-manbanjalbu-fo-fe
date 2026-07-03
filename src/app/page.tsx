import { HeroSection } from "@/components/home/HeroSection";
import { PopularCategories } from "@/components/home/PopularCategories";
import { ProductSection } from "@/components/home/ProductSection";
import { SelectionNav } from "@/components/home/SelectionNav";
import {
  HERO_SLIDES,
  POPULAR_CATEGORIES,
  PRODUCT_SECTIONS,
  SELECTION_ITEMS,
} from "@/constants/home-mock-data";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection slides={HERO_SLIDES} />
      <SelectionNav items={SELECTION_ITEMS} />
      <PopularCategories categories={POPULAR_CATEGORIES} />
      {PRODUCT_SECTIONS.map((section, index) => (
        <ProductSection
          key={section.id}
          section={section}
          isLast={index === PRODUCT_SECTIONS.length - 1}
        />
      ))}
    </main>
  );
}
