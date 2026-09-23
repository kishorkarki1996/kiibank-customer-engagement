"use client";

import { useState } from "react";
import { Eye, Users2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TemplatePreview } from "../../shared/template-preview";

import {
  channelLabels,
  journeyData,
  type JourneyPreviewItem,
} from "../data/journey-preview-data";

export function PreviewStep() {
  const includeExistingCustomers = true;

  const [previewMessage, setPreviewMessage] =
    useState<JourneyPreviewItem | null>(null);

  return (
    <>
      <div className="space-y-6">
        {/* Engagement */}

        <section className="rounded-xl border bg-background p-5">
          <p className="text-xs font-medium text-muted-foreground">
            Engagement
          </p>

          <h2 className="mt-1 text-lg font-semibold">
            New Customer Welcome Journey
          </h2>

          <div className="mt-3">
            <p className="text-xs text-muted-foreground">Category</p>

            <Badge variant="secondary" className="mt-1">
              Onboarding & Lifecycle
            </Badge>
          </div>
        </section>

        {/* Audience + Entry Trigger */}

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-xl border bg-background p-5">
            <h3 className="mb-4 text-sm font-semibold">Audience</h3>

            <div className="space-y-3">
              <SummaryRow label="Primary Currency" value="All" />

              <SummaryRow label="Country" value="All" />

              <SummaryRow label="Customer Status" value="Active" />
            </div>
          </section>

          <section className="rounded-xl border bg-background p-5">
            <h3 className="mb-4 text-sm font-semibold">Entry Trigger</h3>

            <p className="text-sm font-medium">Customer completes signup</p>
          </section>
        </div>

        {/* Journey */}

        <section className="overflow-hidden rounded-xl border bg-background">
          <div className="border-b px-5 py-4">
            <h3 className="text-sm font-semibold">Journey</h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Review the configured journey messages and preview each message
              before continuing.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/30">
                <tr>
                  <th className="whitespace-nowrap px-5 py-3 text-left font-medium text-muted-foreground">
                    Timing
                  </th>

                  <th className="min-w-[240px] px-5 py-3 text-left font-medium text-muted-foreground">
                    Message
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-left font-medium text-muted-foreground">
                    Channel
                  </th>

                  <th className="w-[90px] px-5 py-3 text-center font-medium text-muted-foreground">
                    Preview
                  </th>

                  <th className="min-w-[160px] px-5 py-3 text-left font-medium text-muted-foreground">
                    Condition
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {journeyData.map((step) => (
                  <tr key={step.id}>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="font-medium">{step.timing}</span>
                    </td>

                    <td className="px-5 py-4">{step.message}</td>

                    <td className="px-5 py-4">
                      <Badge variant="outline">
                        {channelLabels[step.channel]}
                      </Badge>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setPreviewMessage(step)}
                            aria-label={`Preview ${step.message}`}
                          >
                            <Eye className="size-4" />
                          </Button>
                        </TooltipTrigger>

                        <TooltipContent>Preview message</TooltipContent>
                      </Tooltip>
                    </td>

                    <td className="px-5 py-4">{step.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Estimated Audience */}

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

                  <p className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">
                    Existing customers will not be enrolled when this engagement
                    is activated.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Quick Preview Dialog */}

      <Dialog
        open={Boolean(previewMessage)}
        onOpenChange={(open) => {
          if (!open) {
            setPreviewMessage(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto p-10 sm:max-w-2xl">
          {previewMessage && (
            <TemplatePreview
              title={previewMessage.message}
              description={`Preview for ${
                channelLabels[previewMessage.channel]
              }`}
              channels={previewMessage.channel}
              variant={previewMessage.channel}
              htmlContent={previewMessage.htmlContent}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
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
