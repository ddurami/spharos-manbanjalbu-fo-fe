"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type MypageSectionCardProps = {
  id: string;
  title: string;
  defaultOpen?: boolean;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
};

export function MypageSectionCard({
  id,
  title,
  defaultOpen = true,
  className,
  contentClassName,
  children,
}: MypageSectionCardProps) {
  return (
    <section
      className={cn(
        "border border-sb-border bg-white px-[30px] py-5",
        className,
      )}
    >
      <Accordion defaultValue={defaultOpen ? [id] : []} className="gap-0">
        <AccordionItem value={id} className="border-0">
          <AccordionTrigger className="items-center py-0 hover:no-underline focus-visible:ring-0 [&>svg]:size-[30px] [&>svg]:text-foreground">
            <h2 className="flex-1 text-2xl font-normal text-foreground">
              {title}
            </h2>
          </AccordionTrigger>
          <AccordionContent className={cn("pt-[30px] pb-0", contentClassName)}>
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
