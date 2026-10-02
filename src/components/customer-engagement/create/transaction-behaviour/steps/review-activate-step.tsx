"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ReviewActivateStepProps = {
  canActivate?: boolean;

  onBack?: () => void;
  onSaveDraft?: () => void;
  onSubmitForApproval?: () => void;
  onActivate?: () => void;
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

export function ReviewActivateStep({
  canActivate = false,
  onBack,
  onSaveDraft,
  onSubmitForApproval,
  onActivate,
}: ReviewActivateStepProps) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePrimaryAction = async () => {
    setIsSubmitting(true);

    try {
      /**
       * Replace this delay with the actual
       * submit/activate request.
       */
      await new Promise((resolve) => setTimeout(resolve, 900));

      if (canActivate) {
        onActivate?.();
      } else {
        onSubmitForApproval?.();
      }

      setConfirmationOpen(false);
      setSuccessOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Review the final engagement configuration before submitting it for
          approval or activating it.
        </p>

        {/* Summary */}

        <section className="overflow-hidden rounded-xl border bg-background">
          <SummaryRow label="Engagement Name" value={engagementSummary.name} />

          <SummaryRow label="Category" value={engagementSummary.category} />

          <SummaryRow label="Owner" value={engagementSummary.owner} />

          <SummaryRow label="Audience" value={engagementSummary.audience} />

          <SummaryRow label="Conditions" value={engagementSummary.conditions} />

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

      {/* Confirmation */}

      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {canActivate ? "Activate Engagement?" : "Submit for Approval?"}
            </DialogTitle>

            <DialogDescription>
              {canActivate
                ? "Once activated, this engagement will run according to the configured execution, audience, frequency, and conditions."
                : "This engagement will be submitted for approval. It will not become active until it has been approved."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setConfirmationOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={isSubmitting}
              onClick={handlePrimaryAction}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />

                  {canActivate ? "Activating..." : "Submitting..."}
                </>
              ) : canActivate ? (
                "Activate Engagement"
              ) : (
                "Submit for Approval"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success */}

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-5 text-primary" />
            </div>

            <DialogTitle>
              {canActivate ? "Engagement Activated" : "Engagement Submitted"}
            </DialogTitle>

            <DialogDescription>
              {canActivate
                ? "The engagement has been activated successfully."
                : "The engagement has been submitted for approval successfully."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="button" onClick={() => setSuccessOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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

      <div className="min-w-0 text-sm font-medium">{children ?? value}</div>
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
