import * as React from "react";
import { cn } from "@/lib/utils";
export function NativeSelect({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-lg border bg-white px-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
