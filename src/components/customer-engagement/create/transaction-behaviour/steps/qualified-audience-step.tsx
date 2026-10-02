"use client";

import { useState } from "react";
import { CheckCircle2, Info, Loader2, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  qualifiedAudienceMetrics,
  qualifiedCustomerPreviewData,
} from "./data/qualified-audience-data";

export function PreviewQualifiedAudienceStep() {
  const [isCalculating, setIsCalculating] = useState(false);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [lastCalculatedAt, setLastCalculatedAt] = useState<string>(
    " Oct 1, 2026, 3:29 PM",
  );

  const handleCalculateAudience = async () => {
    setIsCalculating(true);

    try {
      /**
       * Replace this with your real API/server action.
       *
       * const result = await calculateQualifiedAudience({
       *   audienceConfiguration,
       *   behaviourRules,
       * });
       */

      await new Promise((resolve) => setTimeout(resolve, 900));

      setLastCalculatedAt(
        new Intl.DateTimeFormat("en", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date()),
      );
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Intro */}

        <div className="max-w-2xl">
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Calculate the estimated number of customers who currently qualify
            based on the selected audience and transaction behaviour rules.
          </p>
        </div>

        {/* Results */}

        <section className="rounded-xl border bg-background">
          <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold">Audience Calculation</h3>

              {lastCalculatedAt && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Last calculated: {lastCalculatedAt}
                </p>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCalculateAudience}
              disabled={isCalculating}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Recalculating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 size-4" />
                  Recalculate
                </>
              )}
            </Button>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
            <AudienceMetricCard
              label="Base Audience"
              value={qualifiedAudienceMetrics.baseAudience}
            />

            <AudienceMetricCard
              label="Meets Transaction Conditions"
              value={qualifiedAudienceMetrics.meetsConditions}
            />

            <AudienceMetricCard
              label="Excluded"
              value={qualifiedAudienceMetrics.excluded}
            />

            <AudienceMetricCard
              label="Estimated Qualified Audience"
              value={qualifiedAudienceMetrics.estimatedQualified}
              emphasized
            />
          </div>
        </section>

        {/* Validation Note */}

        <section className="flex items-start justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />

            <div>
              <p className="text-sm font-medium">
                Validate the audience before continuing
              </p>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
                Preview a sample of qualifying customers to confirm that the
                configured transaction rules are producing the expected result.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setIsPreviewOpen(true)}
            disabled={qualifiedAudienceMetrics.estimatedQualified === 0}
            className="shrink-0"
          >
            Preview Customers
          </Button>
        </section>

        {/* Estimated Audience Notice */}

        <section className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">This is an estimated audience</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              The final execution audience may change before the engagement runs
              as customer activity and account status change.
            </p>
          </div>
        </section>
      </div>

      {/* Preview Customers */}

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Preview Qualified Customers</DialogTitle>

            <DialogDescription>
              Showing a sample of customers who currently match the configured
              audience and transaction behaviour rules.
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/30">
                  <tr>
                    <th className="min-w-[160px] px-4 py-3 text-left font-medium text-muted-foreground">
                      Customer
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                      Account Status
                    </th>

                    <th className="min-w-[150px] px-4 py-3 text-left font-medium text-muted-foreground">
                      Country
                    </th>

                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground">
                      Currency
                    </th>

                    <th className="min-w-[280px] px-4 py-3 text-left font-medium text-muted-foreground">
                      Rule Evidence
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {qualifiedCustomerPreviewData.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-4 py-4 font-medium">{customer.name}</td>

                      <td className="px-4 py-4">{customer.accountStatus}</td>

                      <td className="px-4 py-4">{customer.country}</td>

                      <td className="px-4 py-4">{customer.currency}</td>

                      <td className="px-4 py-4 text-muted-foreground">
                        {customer.ruleEvidence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-4">
            <p className="text-xs leading-5 text-muted-foreground">
              This is a sample preview only. It is intended to help validate the
              configured rules before the engagement is activated.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function AudienceMetricCard({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: number;
  emphasized?: boolean;
}) {
  return (
    <div
      className={
        emphasized
          ? "rounded-xl border border-primary/20 bg-primary/5 p-4"
          : "rounded-xl border bg-background p-4"
      }
    >
      <p className="text-sm text-muted-foreground">{label}</p>

      <p
        className={
          emphasized
            ? "mt-2 text-2xl font-semibold tracking-tight text-primary"
            : "mt-2 text-2xl font-semibold tracking-tight"
        }
      >
        {value.toLocaleString()}
      </p>
    </div>
  );
}
