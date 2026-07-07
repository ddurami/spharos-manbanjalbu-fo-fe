"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const OPTIMIZED_HOSTS = [
  "picsum.photos",
  "localhost",
  "121.175.193.122",
  "image.istarbucks.co.kr",
  "amazonaws.com",
];

function shouldUseNextImage(src: string): boolean {
  if (src.startsWith("/")) {
    return true;
  }

  try {
    const hostname = new URL(src).hostname;
    return OPTIMIZED_HOSTS.some((host) => hostname.endsWith(host));
  } catch {
    return false;
  }
}

type ImagePlaceholderProps = {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
};

export function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority,
}: ImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-placeholder",
          className,
        )}
        role="img"
        aria-label={alt}
      />
    );
  }

  if (!shouldUseNextImage(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={cn(fill && "absolute inset-0 h-full w-full", className)}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : (width ?? 400)}
      height={fill ? undefined : (height ?? 400)}
      fill={fill}
      className={className}
      priority={priority}
      onError={() => setHasError(true)}
    />
  );
}
