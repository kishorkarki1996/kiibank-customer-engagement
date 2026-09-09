import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type CategoryCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export function CategoryCard({
  title,
  description,
  href,
  icon: Icon,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-4 rounded-xl border bg-background p-5",
        "transition-all",
        "hover:border-primary/30 hover:bg-primary/[0.03] hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      )}
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold">{title}</h3>

        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
    </Link>
  );
}
