import Image from "next/image";
import Link from "next/link";
import { AuthTrigger } from "@/components/layout/AuthTrigger";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { cn } from "@/lib/utils";

const UTILITY_ITEMS = [
  { label: "Search", href: "/search", icon: "/images/icon-search.png" },
  { label: "Cart", href: "/cart", icon: "/images/icon-cart.png" },
] as const;

const utilityLinkClassName =
  "flex items-center gap-1.5 text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-60";

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 shrink-0 border-b border-black/5 bg-white",
        className,
      )}
    >
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

          <HeaderNav />
        </div>

        <div className="flex items-center gap-5 lg:gap-8">
          {UTILITY_ITEMS.map(({ label, href, icon }) => (
            <Link key={href} href={href} className={utilityLinkClassName}>
              <span>{label}</span>
              <Image src={icon} alt="" width={24} height={24} aria-hidden />
            </Link>
          ))}
          <AuthTrigger className={utilityLinkClassName} />
        </div>
      </div>
    </header>
  );
}
