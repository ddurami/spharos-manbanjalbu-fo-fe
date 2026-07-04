import Link from "next/link";
import type { SelectionItem } from "@/types/home";
import { SELECTION } from "@/constants/image-sizes";
import { PageContainer } from "@/components/layout/PageContainer";
import { ImagePlaceholder } from "@/components/home/ImagePlaceholder";
import { HomeSection, SectionHeading } from "@/components/home/SectionLayout";

interface SelectionNavProps {
  items: SelectionItem[];
}

function SelectionNavItem({ item }: { item: SelectionItem }) {
  const size = SELECTION.circleDiameter;

  return (
    <li>
      <Link
        href={item.href}
        className="group flex flex-col items-center gap-3"
        style={{ width: size }}
      >
        <span
          className="relative shrink-0 overflow-hidden rounded-full"
          style={{ width: size, height: size }}
        >
          <ImagePlaceholder
            alt={`${item.label} 카테고리`}
            src={item.imageSrc}
            rounded="full"
            className="size-full transition-opacity group-hover:opacity-80"
          />
        </span>
        <span className="text-center text-[20px] leading-tight text-foreground">
          {item.label}
        </span>
      </Link>
    </li>
  );
}

function SelectionRowFirst({ rowItems }: { rowItems: SelectionItem[] }) {
  return (
    <ul className="flex w-full justify-between">
      {rowItems.map((item) => (
        <SelectionNavItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

function SelectionRowSecond({ rowItems }: { rowItems: SelectionItem[] }) {
  return (
    <ul
      className="flex w-full justify-start"
      style={{ gap: SELECTION.rowGap }}
    >
      {rowItems.map((item) => (
        <SelectionNavItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export function SelectionNav({ items }: SelectionNavProps) {
  return (
    <HomeSection aria-labelledby="selection-heading">
      <PageContainer>
        <SectionHeading id="selection-heading">스타벅스 셀렉션</SectionHeading>
        <nav aria-label="스타벅스 셀렉션 카테고리">
          <div className="flex flex-col gap-10">
            <SelectionRowFirst rowItems={items.slice(0, SELECTION.firstRowCount)} />
            <SelectionRowSecond rowItems={items.slice(SELECTION.firstRowCount)} />
          </div>
        </nav>
      </PageContainer>
    </HomeSection>
  );
}
