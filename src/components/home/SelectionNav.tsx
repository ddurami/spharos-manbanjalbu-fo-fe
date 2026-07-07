import Link from "next/link";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import type { Category } from "@/types/category";

type SelectionNavProps = {
  categories: Category[];
};

export function SelectionNav({ categories }: SelectionNavProps) {
  const items = [
    {
      id: "all",
      label: "전체 상품",
      href: "/products",
      imageUrl: null as string | null,
    },
    ...categories.map((cat) => ({
      id: String(cat.id),
      label: cat.name,
      href: `/products?categoryId=${cat.id}`,
      imageUrl: cat.imageUrl ?? null,
    })),
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex size-[72px] items-center justify-center overflow-hidden rounded-full border border-sb-border bg-sb-surface transition-colors hover:border-sb-green">
            {item.imageUrl && (
              <ImagePlaceholder
                src={item.imageUrl}
                alt={item.label}
                width={72}
                height={72}
                className="size-full object-cover"
              />
            )}
          </div>
          <span className="text-xs text-sb-text-secondary">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
