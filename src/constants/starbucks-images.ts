/**
 * Unsplash 기반 스타벅스·커피·상품 관련 이미지 URL
 * @see https://unsplash.com/license
 */
function unsplash(photoId: string, width: number, height: number): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

export const STARBUCKS_IMAGES = {
  hero: {
    banner1: unsplash("photo-1511920185603-7cb56a319547", 1300, 600),
    banner2: unsplash("photo-1495474472287-4d71bcdd2085", 1300, 600),
    banner3: unsplash("photo-1442512595331-e89e73853f31", 1300, 600),
    banner4: unsplash("photo-1497935586351-67d0bfb2770f", 1300, 600),
  },
  selection: {
    all: unsplash("photo-1447933601403-0c6688de566e", 190, 190),
    best: unsplash("photo-1514431169694-80fa26681a71", 190, 190),
    season: unsplash("photo-1509042239860-f550ce710b93", 190, 190),
    online: unsplash("photo-1511920170033-f8396924c10b", 190, 190),
    sale: unsplash("photo-1559056199-641a7ae80872", 190, 190),
    stanley: unsplash("photo-1602143407151-7111542de69e", 190, 190),
    food: unsplash("photo-1509440159596-0249088772ff", 190, 190),
    gift: unsplash("photo-1517705008121-23dab237b9e2", 190, 190),
  },
  popular: {
    featured1: unsplash("photo-1453614512564-127968148985", 365, 430),
    featured2: unsplash("photo-1554118811-1e0d58224f24", 365, 430),
    featured3: unsplash("photo-1442512595331-e89e73853f31", 365, 430),
    featured4: unsplash("photo-1497935586351-67d0bfb2770f", 365, 430),
    featured5: unsplash("photo-1511920185603-7cb56a319547", 365, 430),
    umbrella: unsplash("photo-1521104220451-849572f1f971", 238, 280),
    tumbler: unsplash("photo-1514228742587-6b1558fcca3d", 238, 280),
    mug: unsplash("photo-1578662996442-48f60103fc96", 238, 280),
    beans: unsplash("photo-1559056199-641a7ae80872", 238, 280),
    food: unsplash("photo-1578314679510-de4466b187f5", 238, 280),
    gift: unsplash("photo-1549465220-1a1d923d5070", 238, 280),
    coldCup: unsplash("photo-1511920170033-f8396924c10b", 238, 280),
    bottle: unsplash("photo-1602143407151-7111542de69e", 238, 280),
    syrup: unsplash("photo-1495474472287-4d71bcdd2085", 238, 280),
    sandwich: unsplash("photo-1509440159596-0249088772ff", 238, 280),
    cake: unsplash("photo-1578314679510-de4466b187f5", 238, 280),
    tea: unsplash("photo-1564890369478-c89ca4d5dda4", 238, 280),
    accessory: unsplash("photo-1517705008121-23dab237b9e2", 238, 280),
  },
  products: {
    beans: [
      unsplash("photo-1559056199-641a7ae80872", 200, 235),
      unsplash("photo-1447933601403-0c6688de566e", 200, 235),
      unsplash("photo-1611854779393-1a2a4a566b98", 200, 235),
      unsplash("photo-1509042239860-f550ce710b93", 200, 235),
      unsplash("photo-1461023058943-07fcbe716331", 200, 235),
      unsplash("photo-1514431169694-80fa26681a71", 200, 235),
    ],
    tumbler: [
      unsplash("photo-1602143407151-7111542de69e", 200, 235),
      unsplash("photo-1514228742587-6b1558fcca3d", 200, 235),
      unsplash("photo-1511920170033-f8396924c10b", 200, 235),
      unsplash("photo-1511920185603-7cb56a319547", 200, 235),
      unsplash("photo-1541167760496-1628856ab936", 200, 235),
      unsplash("photo-1495474472287-4d71bcdd2085", 200, 235),
    ],
    mug: [
      unsplash("photo-1578662996442-48f60103fc96", 200, 235),
      unsplash("photo-1514228742587-6b1558fcca3d", 200, 235),
      unsplash("photo-1511920170033-f8396924c10b", 200, 235),
      unsplash("photo-1544787219-7bfdffb92a08", 200, 235),
      unsplash("photo-1517705008121-23dab237b9e2", 200, 235),
      unsplash("photo-1509042239860-f550ce710b93", 200, 235),
    ],
    food: [
      unsplash("photo-1578314679510-de4466b187f5", 200, 235),
      unsplash("photo-1509440159596-0249088772ff", 200, 235),
      unsplash("photo-1555507036-ab1f4038808a", 200, 235),
      unsplash("photo-1528735602785-4622dee237ec", 200, 235),
      unsplash("photo-1525351483423-750ebbe577fa", 200, 235),
      unsplash("photo-1486427946785-444686043753", 200, 235),
    ],
    giftSet: [
      unsplash("photo-1517705008121-23dab237b9e2", 200, 235),
      unsplash("photo-1549465220-1a1d923d5070", 200, 235),
      unsplash("photo-1544787219-7bfdffb92a08", 200, 235),
      unsplash("photo-1559056199-641a7ae80872", 200, 235),
      unsplash("photo-1495474472287-4d71bcdd2085", 200, 235),
      unsplash("photo-1447933601403-0c6688de566e", 200, 235),
    ],
  },
} as const;

export type ProductImageCategory = keyof typeof STARBUCKS_IMAGES.products;
