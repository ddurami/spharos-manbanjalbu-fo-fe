"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type MypageSectionProps = {
  id: string;
  title: string;
  subtitle?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  onExpandedChange?: (expanded: boolean) => void;
  children: React.ReactNode;
};

export function MypageSection({
  id,
  title,
  subtitle,
  defaultOpen = true,
  className,
  onExpandedChange,
  children,
}: MypageSectionProps) {
  const [openItems, setOpenItems] = useState<string[]>(
    defaultOpen ? [id] : []
  );
  const isExpanded = openItems.includes(id);

  return (
    <section
      data-expanded={isExpanded}
      className={cn(
        "w-full self-start overflow-hidden border border-sb-border bg-white px-[30px] py-5 transition-[height,padding] duration-300 ease-in-out",
        className
      )}
    >
      <Accordion
        value={openItems}
        onValueChange={(nextValue) => {
          const nextItems = nextValue as string[];
          setOpenItems(nextItems);
          onExpandedChange?.(nextItems.includes(id));
        }}
        className="gap-0"
      >
        <AccordionItem value={id} className="border-0">
          <AccordionTrigger className="items-center py-0 hover:no-underline focus-visible:ring-0 [&>svg]:size-[30px] [&>svg]:text-foreground">
            <div className="flex flex-1 items-center gap-3.5">
              <h2 className="text-2xl font-normal text-foreground">{title}</h2>
              {subtitle}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-[30px] pb-0">{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
