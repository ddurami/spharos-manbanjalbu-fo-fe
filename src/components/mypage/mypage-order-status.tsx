import { ChevronRight } from "lucide-react";

import { ORDER_STATUS_STAGES } from "@/lib/mypage/menu-data";

export function MypageOrderStatus() {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4">
      {ORDER_STATUS_STAGES.map((stage, index) => (
        <div key={stage.key} className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
          <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
            <span className="text-[32px] font-medium leading-none text-foreground sm:text-[40px]">
              {stage.count}
            </span>
            <span className="text-xs text-sb-text-muted sm:text-sm">
              {stage.label}
            </span>
          </div>
          {index < ORDER_STATUS_STAGES.length - 1 && (
            <ChevronRight
              className="size-4 shrink-0 text-sb-text-muted sm:size-5"
              aria-hidden
            />
          )}
        </div>
      ))}
    </div>
  );
}
