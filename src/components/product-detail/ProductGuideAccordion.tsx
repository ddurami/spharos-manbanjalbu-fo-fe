"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductPolicy } from "@/types/product";

type ProductGuideAccordionProps = {
  policy: ProductPolicy;
};

type Section = {
  id: string;
  title: string;
  content: string;
};

export function ProductGuideAccordion({ policy }: ProductGuideAccordionProps) {
  const sections: Section[] = [
    { id: "refund", title: "취소/환불 안내", content: policy.refundInfo },
    { id: "exchange", title: "교환/반품 안내", content: policy.exchangeInfo },
    { id: "delivery", title: "이용조건 및 배송 안내", content: policy.deliveryInfo },
  ];

  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-sb-border">
      {sections.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : section.id)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="text-sm font-medium text-[#121212]">
                {section.title}
              </span>
              <ChevronDownIcon
                className={cn(
                  "size-5 text-sb-text-muted transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen && (
              <div className="pb-4 text-sm leading-relaxed text-sb-text-subtle whitespace-pre-line">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
