import { cn } from "@/lib/utils";
import { LAYOUT } from "@/constants/image-sizes";

interface SectionHeadingProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ id, children, className }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "text-lg font-bold text-foreground sm:text-xl",
        className,
      )}
      style={{ marginBottom: LAYOUT.titleGap }}
    >
      {children}
    </h2>
  );
}

interface HomeSectionProps extends React.ComponentProps<"section"> {
  children: React.ReactNode;
}

export function HomeSection({ children, className, ...props }: HomeSectionProps) {
  return (
    <section
      className={cn(className)}
      style={{ marginBottom: LAYOUT.sectionGap }}
      {...props}
    >
      {children}
    </section>
  );
}
