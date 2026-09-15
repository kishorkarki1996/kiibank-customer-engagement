import { Users2 } from "lucide-react";

export default function EstimatedBaseCustomers() {
  return (
    <div className="rounded-xl border bg-muted/30 p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Users2 className="size-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Estimated Base Audience
          </p>

          <p className="mt-1 text-2xl font-semibold tracking-tight">
            12,482 customers
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Estimated based on the currently selected audience filters.
          </p>
        </div>
      </div>
    </div>
  );
}
