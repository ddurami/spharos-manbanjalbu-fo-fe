import { cn } from "@/lib/utils";

type MypageSectionCardProps = {
  title: string;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
};

export function MypageSectionCard({
  title,
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
      <h2 className="text-2xl font-normal text-foreground">{title}</h2>
      <div className={cn("pt-[30px]", contentClassName)}>{children}</div>
    </section>
  );
}
