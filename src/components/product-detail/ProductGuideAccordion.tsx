"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import type { ProductGuideSection } from "@/types/product-detail";
import { cn } from "@/lib/utils";

interface ProductGuideAccordionProps {
  sections: ProductGuideSection[];
}

export function ProductGuideAccordion({ sections }: ProductGuideAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(sections[0]?.id ? [sections[0].id] : []),
  );

  const toggleSection = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div>
      {sections.map((section, index) => {
        const isOpen = openIds.has(section.id);
        const isLast = index === sections.length - 1;

        return (
          <div
            key={section.id}
            className={cn(
              !isLast && "border-b border-[#e5e5e5]",
            )}
          >
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center justify-between py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[18px] font-bold text-[#121212]">
                {section.title}
              </span>
              <ChevronDownIcon
                className={cn(
                  "size-5 shrink-0 text-[#121212] transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>

            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="bg-[#f5f5f5] px-6 py-5">
                  <ul className="space-y-2">
                    {section.content.map((line) => (
                      <li
                        key={line}
                        className="flex gap-2 text-[14px] leading-relaxed text-[#121212]"
                      >
                        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-[#121212]" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
