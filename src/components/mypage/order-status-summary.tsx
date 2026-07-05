"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import type { OrderStatusStage } from "@/lib/mypage/mock-data";
import { ORDER_STATUS_LINKS } from "@/lib/mypage/routes";
import { cn } from "@/lib/utils";

type OrderStatusSummaryProps = {
  stages: OrderStatusStage[];
};

export function OrderStatusSummary({ stages }: OrderStatusSummaryProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-end justify-between gap-2">
      {stages.map((stage, index) => (
        <div key={stage.id} className="flex flex-1 items-end gap-2">
          <Link
            href={ORDER_STATUS_LINKS[stage.id] ?? "/mypage/orders"}
            aria-current={
              pathname.startsWith("/mypage/orders") ? "page" : undefined
            }
            className={cn(
              "group flex flex-1 flex-col items-center gap-3 rounded-lg py-2 text-center decoration-none",
              pathname.startsWith("/mypage/orders") && "text-primary"
            )}
          >
            <span className="text-sm text-sb-text-muted decoration-none">
              {stage.label}
            </span>
            <span
              className={cn(
                "text-[40px] font-normal leading-none text-foreground decoration-none",
                "group-hover:underline group-hover:underline-offset-4 group-hover:decoration-primary group-hover:text-primary"
              )}
            >
              {stage.count}
            </span>
          </Link>
          {index < stages.length - 1 ? (
            <ChevronRight
              aria-hidden
              className="mb-3 size-5 shrink-0 text-sb-text-muted"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
