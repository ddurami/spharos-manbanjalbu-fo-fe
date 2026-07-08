import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type OrderDetailInfoRowProps = {
  label: string;
  children: ReactNode;
  labelClassName?: string;
  valueClassName?: string;
};

export function OrderDetailInfoRow({
  label,
  children,
  labelClassName,
  valueClassName,
}: OrderDetailInfoRowProps) {
  return (
    <div className="flex w-full min-w-0 items-start justify-between gap-6">
      <dt
        className={cn(
          "shrink-0 whitespace-nowrap text-base text-sb-text-muted",
          labelClassName,
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          "min-w-0 flex-1 text-right text-base font-medium leading-relaxed text-foreground",
          valueClassName,
        )}
      >
        {children}
      </dd>
    </div>
  );
}
