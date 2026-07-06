/**
 * Unsplash 기반 스타벅스·커피·상품 관련 이미지 URL
 * @see https://unsplash.com/license
 */
import type { BestCategory } from "@/types/best";
import { PRODUCT_IMAGE } from "@/constants/image-sizes";

function unsplash(photoId: string): string {
  const { width, height } = PRODUCT_IMAGE;
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

const PRODUCT_IMAGES: Record<BestCategory, string[]> = {
  tumbler: [
    unsplash("photo-1602143407151-7111542de69e"),
    unsplash("photo-1514228742587-6b1558fcca3d"),
    unsplash("photo-1511920170033-f8396924c10b"),
    unsplash("photo-1541167760496-1628856ab936"),
    unsplash("photo-1602141488692-78494897fde9"),
    unsplash("photo-1523362628743-f0bcfffad360"),
  ],
  mug: [
    unsplash("photo-1578662996442-48f60103fc96"),
    unsplash("photo-1514228742587-6b1558fcca3d"),
    unsplash("photo-1544787219-7bfdffb92a08"),
    unsplash("photo-1511920170033-f8396924c10b"),
    unsplash("photo-1509042239860-f550ce710b93"),
    unsplash("photo-1495474472287-4d71bcdd2085"),
  ],
  "home-living": [
    unsplash("photo-1586023492125-27b2c045efd7"),
    unsplash("photo-1517705008121-23dab237b9e2"),
    unsplash("photo-1521104220451-849572f1f971"),
    unsplash("photo-1549465220-1a1d923d5070"),
    unsplash("photo-1555041469-a586c61ea9bc"),
    unsplash("photo-1616486338812-3ada4544d4ab"),
  ],
  coffee: [
    unsplash("photo-1559056199-641a7ae80872"),
    unsplash("photo-1447933601403-0c6688de566e"),
    unsplash("photo-1611854779393-1a2a4a566b98"),
    unsplash("photo-1509042239860-f550ce710b93"),
    unsplash("photo-1461023058943-07fcbe716331"),
    unsplash("photo-1497935586351-67d0bfb2770f"),
  ],
  "cake-bread": [
    unsplash("photo-1578314679510-de4466b187f5"),
    unsplash("photo-1509440159596-0249088772ff"),
    unsplash("photo-1555507036-ab1f4038808a"),
    unsplash("photo-1528735602785-4622dee237ec"),
    unsplash("photo-1525351483423-750ebbe577fa"),
    unsplash("photo-1486427946785-444686043753"),
  ],
  "chocolate-snack": [
    unsplash("photo-1511381939411-440f770d5570"),
    unsplash("photo-1549007953-2f2e0e1d4f10"),
    unsplash("photo-1558961363-fa8fdf82db35"),
    unsplash("photo-1499636136210-d6caddf199eb"),
    unsplash("photo-1606312619070-d48eccba1420"),
    unsplash("photo-1558961363-fa8fdf82db35"),
  ],
  engraving: [
    unsplash("photo-1602143407151-7111542de69e"),
    unsplash("photo-1578662996442-48f60103fc96"),
    unsplash("photo-1514228742587-6b1558fcca3d"),
    unsplash("photo-1544787219-7bfdffb92a08"),
  ],
  set: [
    unsplash("photo-1517705008121-23dab237b9e2"),
    unsplash("photo-1549465220-1a1d923d5070"),
    unsplash("photo-1544787219-7bfdffb92a08"),
    unsplash("photo-1559056199-641a7ae80872"),
    unsplash("photo-1495474472287-4d71bcdd2085"),
    unsplash("photo-1447933601403-0c6688de566e"),
  ],
};

export function getProductImage(
  category: BestCategory,
  index: number,
): string {
  const images = PRODUCT_IMAGES[category];
  return images[index % images.length];
}
