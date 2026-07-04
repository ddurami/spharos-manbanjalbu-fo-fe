import { LAYOUT } from "@/constants/image-sizes";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "section" | "main" | "nav" | "header" | "footer";
}

export function PageContainer({
  children,
  className,
  style,
  as: Component = "div",
}: PageContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full", className)}
      style={{ maxWidth: LAYOUT.contentMaxWidth, ...style }}
    >
      {children}
    </Component>
  );
}
