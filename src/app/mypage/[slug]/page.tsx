import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MypageSubpage } from "@/components/mypage/mypage-subpage";
import {
  MYPAGE_SUBPAGE_ROUTES,
  type MypageSubpageSlug,
} from "@/lib/mypage/routes";

type MypageSubpageRouteProps = {
  params: Promise<{ slug: string }>;
};

function isMypageSubpageSlug(slug: string): slug is MypageSubpageSlug {
  return slug in MYPAGE_SUBPAGE_ROUTES;
}

export function generateStaticParams() {
  return Object.keys(MYPAGE_SUBPAGE_ROUTES)
    .filter((slug) => !["profile", "orders", "addresses"].includes(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: MypageSubpageRouteProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isMypageSubpageSlug(slug)) {
    return {};
  }

  const route = MYPAGE_SUBPAGE_ROUTES[slug];

  return {
    title: `${route.title} | Starbucks`,
    description: route.description,
  };
}

export default async function MypageSubpageRoute({
  params,
}: MypageSubpageRouteProps) {
  const { slug } = await params;

  if (!isMypageSubpageSlug(slug)) {
    notFound();
  }

  const route = MYPAGE_SUBPAGE_ROUTES[slug];

  return <MypageSubpage title={route.title} description={route.description} />;
}
