import Image from "next/image";
import Link from "next/link";
import { AuthTrigger } from "@/components/layout/AuthTrigger";

const NAV_ITEMS = [
  { label: "MENU", href: "/menu" },
  { label: "EVENT", href: "/event" },
  { label: "BEST", href: "/best" },
  { label: "MY PAGE", href: "/mypage" },
] as const;

const UTILITY_ITEMS = [
  { label: "검색", href: "/search", icon: "/images/icon-search.png" },
  { label: "장바구니", href: "/cart", icon: "/images/icon-cart.png" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-10 lg:gap-14">
          <Link href="/" className="shrink-0" aria-label="스타벅스 홈">
            <Image
              src="/images/logo.png"
              alt="Starbucks"
              width={40}
              height={40}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex lg:gap-10">
            {NAV_ITEMS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-60"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5 lg:gap-6">
          {UTILITY_ITEMS.map(({ label, href, icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="transition-opacity hover:opacity-60"
            >
              <Image src={icon} alt="" width={24} height={24} aria-hidden />
            </Link>
          ))}
          <AuthTrigger />
        </div>
      </div>
    </header>
  );
}
