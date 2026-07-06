import Link from "next/link";

import type { MypageMenuItem } from "@/lib/mypage/menu-data";

type MypageMenuListProps = {
  items: MypageMenuItem[];
};

export function MypageMenuList({ items }: MypageMenuListProps) {
  return (
    <ul className="flex flex-col">
      {items.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <Link
            href={href}
            className="flex items-center gap-4 py-3 text-base text-foreground transition-opacity hover:opacity-70"
          >
            <Icon
              className="size-5 shrink-0 text-sb-text-subtle"
              strokeWidth={1.5}
            />
            <span>{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
