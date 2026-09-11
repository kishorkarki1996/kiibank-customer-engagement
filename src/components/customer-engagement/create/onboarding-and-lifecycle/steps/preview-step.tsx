import { Flag, Users2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const journeyData = [
  {
    timing: "Immediately",
    message: "Welcome to KiiBank",
    channel: "Push",
    condition: "Always",
  },
  {
    timing: "Day 1",
    message: "What You Can Do With KiiBank",
    channel: "Email",
    condition: "Always",
  },
  {
    timing: "Day 3",
    message: "Using Your GBP Account",
    channel: "In-App",
    condition: "Has GBP Account",
  },
  {
    timing: "Day 7",
    message: "Sending Money With KiiBank",
    channel: "Push",
    condition: "Always",
  },
  {
    timing: "Day 14",
    message: "Discover More Features",
    channel: "Email",
    condition: "Always",
  },
];

export function PreviewStep() {
  // Change this to false to preview a future-only trigger.
  const includeExistingCustomers = true;

  return (
    <div className="space-y-6">
      {/* Engagement */}

      <section className="rounded-xl border bg-background p-5">
        <div className="flex items-start gap-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Engagement
            </p>

            <h2 className="mt-1 text-lg font-semibold">
              New Customer Welcome Journey
            </h2>

            <Badge variant="secondary" className="mt-2">
              Onboarding & Lifecycle
            </Badge>
          </div>
        </div>
      </section>

      {/* Audience + trigger */}

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border bg-background p-5">
          <div className="mb-4 flex items-center gap-2">
            <Users2 className="size-4 text-primary" />

            <h3 className="text-sm font-semibold">Audience</h3>
          </div>

          <div className="space-y-3">
            <SummaryRow label="Primary Currency" value="All" />

            <SummaryRow label="Country" value="All" />

            <SummaryRow label="Customer Status" value="Active" />
          </div>
        </section>

        <section className="rounded-xl border bg-background p-5">
          <div className="mb-4 flex items-center gap-2">
            <Flag className="size-4 text-primary" />

            <h3 className="text-sm font-semibold">Entry Trigger</h3>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium">Customer completes signup</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Customer enters the journey immediately after qualifying.
            </p>
          </div>
        </section>
      </div>

      {/* Journey */}

      <section className="overflow-hidden rounded-xl border bg-background">
        <div className="border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Journey</h3>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            Messages are scheduled relative to the previous journey step.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Timing
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Message
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Channel
                </th>

                <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                  Condition
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {journeyData.map((step) => (
                <tr key={`${step.timing}-${step.message}`}>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="font-medium">{step.timing}</span>
                  </td>

                  <td className="px-5 py-4">{step.message}</td>

                  <td className="px-5 py-4">
                    <Badge variant="outline">{step.channel}</Badge>
                  </td>

                  <td className="px-5 py-4">
                    {step.condition === "Always" ? (
                      <span className="text-muted-foreground">Always</span>
                    ) : (
                      <Badge variant="secondary">{step.condition}</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Eligible audience */}

      <section className="rounded-xl border bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users2 className="size-5" />
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Estimated Eligible Audience
            </p>

            {includeExistingCustomers ? (
              <>
                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  12,482
                </p>

                <p className="text-sm text-muted-foreground">
                  existing customers
                </p>
              </>
            ) : (
              <>
                <p className="mt-1 text-lg font-semibold">
                  Future qualifying customers
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Existing customers will not be enrolled when this engagement
                  is activated.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
