export type Subcategory = {
  id: number;
  name: string;
  displayOrder: number;
};

export type Category = {
  id: number;
  name: string;
  displayOrder: number;
  subcategories: Subcategory[];
};

export type Season = {
  id: number;
  name: string;
  createdAt: string;
};
