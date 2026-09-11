"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";

const summaryItems = [
  {
    label: "Name",
    value: "New Customer Welcome Journey",
  },
  {
    label: "Category",
    value: "Onboarding & Lifecycle",
  },
  {
    label: "Trigger",
    value: "Customer completes signup",
  },
  {
    label: "Audience",
    value: "All active customers",
  },
  {
    label: "Journey Length",
    value: "14 days",
  },
  {
    label: "Journey Steps",
    value: "5",
  },
  {
    label: "Entry",
    value: "Once per customer",
  },
  {
    label: "Communication Preferences",
    value: "Enforced",
  },
  {
    label: "Frequency Rules",
    value: "KiiBank Global",
  },
  {
    label: "Owner",
    value: "Customer Engagement Team",
  },
];

export function ReviewActivateStep() {
  return (
    <>
      <div className="space-y-6">
        {/* Summary */}
        <section className="overflow-hidden rounded-xl border bg-background">
          <div className="border-b px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold">Engagement Summary</h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Review the engagement configuration before saving, submitting,
                  or activating it.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y">
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className="grid gap-1 px-5 py-4 sm:grid-cols-[220px_1fr] sm:gap-6"
              >
                <p className="text-sm text-muted-foreground">{item.label}</p>

                <p className="text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final checks */}

        <section className="rounded-xl border bg-muted/20 p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="size-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold">Final checks</h3>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Customer communication preferences, frequency rules, duplicate
                protection, and journey conditions will be applied when this
                engagement runs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
