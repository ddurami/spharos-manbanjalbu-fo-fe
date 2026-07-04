import { cn } from "@/lib/utils";
import { LAYOUT } from "@/constants/image-sizes";

interface SectionHeadingProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  size?: "primary" | "secondary";
}

export function SectionHeading({
  id,
  children,
  className,
  size = "primary",
}: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "font-bold text-foreground",
        size === "primary" ? "text-[36px]" : "text-[30px]",
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
