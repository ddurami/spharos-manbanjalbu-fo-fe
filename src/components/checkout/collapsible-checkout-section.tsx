"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type CollapsibleCheckoutSectionProps = {
  id: string;
  title: string;
  subtitle?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function CollapsibleCheckoutSection({
  id,
  title,
  subtitle,
  defaultOpen = true,
  className,
  children,
}: CollapsibleCheckoutSectionProps) {
  return (
    <section
      className={cn("border border-sb-border bg-white px-[30px] py-5", className)}
    >
      <Accordion
        defaultValue={defaultOpen ? [id] : []}
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
