import { cn } from "@/lib/utils";

type CheckoutSectionProps = {
  title: string;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export function CheckoutSection({
  title,
  subtitle,
  action,
  className,
  children,
}: CheckoutSectionProps) {
  return (
    <section
      className={cn("border border-sb-border bg-white px-[30px] py-5", className)}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <h2 className="text-2xl font-normal text-foreground">{title}</h2>
          {subtitle}
        </div>
        {action}
      </div>
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  );
}
