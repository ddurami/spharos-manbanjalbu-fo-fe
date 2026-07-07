"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ALLOWED_HOSTS = ["picsum.photos", "localhost"];

function isAllowedSrc(src: string): boolean {
  try {
    const url = new URL(src);
    return ALLOWED_HOSTS.some((host) => url.hostname.endsWith(host));
  } catch {
    return src.startsWith("/");
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

  if (!src || hasError || !isAllowedSrc(src)) {
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
