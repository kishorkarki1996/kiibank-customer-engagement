"use client";

import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TransactionBehaviourSummaryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const engagementSummary = {
  name: "Dormant GBP→XAF Customers",
  category: "Transaction Behaviour",
  owner: "Customer Engagement Team",
  audience: "UK / GBP + XAF / Active Customers",
  conditions: "Previous GBP→XAF activity + 30-day inactivity",
  execution: "Daily",
  channels: ["Push Notification", "WhatsApp"],
  frequency: "Once every 30 days/customer",
  exitCondition: "Successful GBP→XAF transaction",
  conversionWindow: "7 days",
};

export function EngagementSummaryDialog({
  open,
  onOpenChange,
}: TransactionBehaviourSummaryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-hidden sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Engagement Summary</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto">
          <section className="overflow-hidden rounded-xl border bg-background">
            <SummaryRow
              label="Engagement Name"
              value={engagementSummary.name}
            />

            <SummaryRow label="Category" value={engagementSummary.category} />

            <SummaryRow label="Owner" value={engagementSummary.owner} />

            <SummaryRow label="Audience" value={engagementSummary.audience} />

            <SummaryRow
              label="Conditions"
              value={engagementSummary.conditions}
            />

            <SummaryRow label="Execution" value={engagementSummary.execution} />

            <SummaryRow label="Channel">
              <ChannelFlow channels={engagementSummary.channels} />
            </SummaryRow>

            <SummaryRow label="Frequency" value={engagementSummary.frequency} />

            <SummaryRow
              label="Exit Condition"
              value={engagementSummary.exitCondition}
            />

            <SummaryRow
              label="Conversion Window"
              value={engagementSummary.conversionWindow}
              last
            />
          </section>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SummaryRow({
  label,
  value,
  children,
  last = false,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`grid gap-2 px-5 py-4 md:grid-cols-[220px_minmax(0,1fr)] ${
        last ? "" : "border-b"
      }`}
    >
      <p className="text-sm font-medium text-muted-foreground">{label}</p>

      <div className="min-w-0 text-sm font-medium">
        {children ?? value ?? "-"}
      </div>
    </div>
  );
}

function ChannelFlow({ channels }: { channels: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {channels.map((channel, index) => (
        <div key={`${channel}-${index}`} className="flex items-center gap-2">
          <Badge variant="outline" className="bg-background font-medium">
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
