import Link from "next/link";

import type { MypageMenuItem } from "@/lib/mypage/menu-data";

type MypageMenuListProps = {
  items: MypageMenuItem[];
};

export function MypageMenuList({ items }: MypageMenuListProps) {
  return (
    <ul className="flex flex-col">
      {items.map(({ label, href, icon: Icon, count, summary }) => (
        <li key={label}>
          <Link
            href={href}
            className="flex items-center gap-4 py-3 text-base text-foreground transition-opacity hover:opacity-70"
          >
            <Icon
              className="size-5 shrink-0 text-sb-text-subtle"
              strokeWidth={1.5}
            />
            <span className="min-w-0 flex-1">{label}</span>
            {(count != null || summary) && (
              <span className="shrink-0 max-w-[50%] text-right text-sm text-sb-text-subtle">
                {count != null && (
                  <span>{label === "쿠폰" ? `${count}장` : `${count}건`}</span>
                )}
                {count != null && summary ? " · " : null}
                {summary}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
