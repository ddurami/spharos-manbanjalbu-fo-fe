import { cn } from "@/lib/utils";

export const underlineInputClassName =
  "h-auto rounded-none border-0 border-b border-sb-border bg-transparent px-0 py-2 text-base text-foreground shadow-none placeholder:text-sb-text-muted focus-visible:border-primary focus-visible:ring-0 md:text-base";

export const underlineSelectTriggerClassName =
  "h-auto w-full rounded-none border-0 border-b border-sb-border bg-transparent px-0 py-2 text-base shadow-none focus-visible:border-primary focus-visible:ring-0 data-placeholder:text-sb-text-muted";

type AddressFieldProps = {
  label: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  error?: string;
  children: React.ReactNode;
};

export function AddressField({
  label,
  required = false,
  htmlFor,
  className,
  error,
  children,
}: AddressFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-0.5 text-sm font-normal text-sb-text-muted"
      >
        {label}
        {required ? <span className="text-primary">*</span> : null}
      </label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
