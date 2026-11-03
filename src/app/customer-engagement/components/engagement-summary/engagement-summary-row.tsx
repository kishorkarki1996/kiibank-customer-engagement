import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type SummaryRowProps = {
  label: string;
  value?: string | number | null;
  children?: ReactNode;
};

export function SummaryRow({ label, value, children }: SummaryRowProps) {
  return (
    <div className="grid gap-1 px-5 py-4 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6">
      <p className="text-sm text-muted-foreground">{label}</p>

      <div className="min-w-0 break-words text-sm font-medium">
        {children ?? value ?? "-"}
      </div>
    </div>
  );
}

export function ChannelFlow({ channels }: { channels: string[] }) {
  if (!channels.length) return <span>-</span>;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {channels.map((channel, index) => (
        <div key={`${channel}-${index}`} className="flex items-center gap-2">
          <Badge variant="outline" className="font-medium">
            {channel}
          </Badge>

          {index < channels.length - 1 && (
            <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  );
}
