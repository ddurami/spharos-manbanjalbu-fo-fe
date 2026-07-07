"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/api/category";
import type { Category } from "@/types/category";

type MenuPanelProps = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function MenuPanel({ onMouseEnter, onMouseLeave }: MenuPanelProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <div
      className="border-b border-sb-border bg-white"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto max-w-[1280px] px-6 py-6 lg:px-10">
        <div className="flex gap-12">
          <Link
            href="/products"
            className="text-sm font-bold text-sb-green"
          >
            전체 상품
          </Link>

          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col gap-3">
              <Link
                href={`/products?categoryId=${cat.id}`}
                className="text-sm font-medium text-[#121212] hover:text-sb-green"
              >
                {cat.name}
              </Link>
              {cat.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/products?categoryId=${cat.id}&subcategoryId=${sub.id}`}
                  className="text-xs text-sb-text-subtle hover:text-sb-green"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
