import Image from "next/image";
import type { CSSProperties } from "react";
import { LAYOUT } from "@/constants/image-sizes";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  alt: string;
  src?: string;
  className?: string;
  rounded?: "none" | "full" | "content";
  priority?: boolean;
  width?: number;
  height?: number;
}

export function ImagePlaceholder({
  alt,
  src,
  className,
  rounded = "none",
  priority = false,
  width,
  height,
}: ImagePlaceholderProps) {
  const roundedClass =
    rounded === "full"
      ? "rounded-full"
      : rounded === "content"
        ? "rounded-[var(--radius-image)]"
        : "rounded-none";

  if (src) {
    if (width && height) {
      return (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={cn("object-cover", roundedClass, className)}
        />
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn("object-cover", roundedClass, className)}
        sizes="(max-width: 768px) 100vw, 1320px"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("bg-placeholder", roundedClass, className)}
      style={
        width && height
          ? { width, height }
          : undefined
      }
    />
  );
}

export const imageRadiusStyle = {
  "--radius-image": `${LAYOUT.imageRadius}px`,
} as CSSProperties;
