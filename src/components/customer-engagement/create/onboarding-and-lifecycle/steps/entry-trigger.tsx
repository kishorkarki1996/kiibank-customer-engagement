"use client";

import { useState } from "react";

import { Info } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const triggerGroups = [
  {
    label: "Signup",
    options: [
      {
        label: "Customer completes signup",
        value: "signup-complete",
      },
    ],
  },
  {
    label: "Account Events",
    options: [
      {
        label: "Customer creates first currency account",
        value: "first-currency-account",
      },
      {
        label: "Customer creates a specific currency account",
        value: "specific-currency-account",
      },
    ],
  },
  {
    label: "Funding",
    options: [
      {
        label: "Customer funds account for the first time",
        value: "first-funding",
      },
    ],
  },
  {
    label: "Transaction",
    options: [
      {
        label: "Customer completes first successful transaction",
        value: "first-successful-transaction",
      },
    ],
  },
  {
    label: "Lifecycle",
    options: [
      {
        label: "Customer reaches a lifecycle milestone since signup",
        value: "lifecycle-milestone",
      },
    ],
  },
];

const journeyEntryOptions = [
  {
    label: "Immediately",
    value: "immediately",
  },
  {
    label: "After a delay",
    value: "after-delay",
  },
];

const timeUnitOptions = [
  {
    label: "Days",
    value: "days",
  },
  {
    label: "Weeks",
    value: "weeks",
  },
  {
    label: "Months",
    value: "months",
  },
];

const currencyAccountOptions = [
  {
    label: "GBP",
    value: "GBP",
  },
  {
    label: "EUR",
    value: "EUR",
  },
  {
    label: "NGN",
    value: "NGN",
  },
  {
    label: "XAF",
    value: "XAF",
  },
];

export function EntryTriggerStep() {
  const [trigger, setTrigger] = useState("signup-complete");

  const [journeyEntry, setJourneyEntry] = useState("immediately");

  const [includeExisting, setIncludeExisting] = useState(false);

  const [lifecycleValue, setLifecycleValue] = useState("30");

  const [lifecycleUnit, setLifecycleUnit] = useState("days");

  const [lookbackValue, setLookbackValue] = useState("30");

  const [lookbackUnit, setLookbackUnit] = useState("days");

  const [specificCurrency, setSpecificCurrency] = useState("GBP");

  const [delayValue, setDelayValue] = useState("1");

  const [delayUnit, setDelayUnit] = useState("days");

  const isSpecificCurrency = trigger === "specific-currency-account";

  const isLifecycle = trigger === "lifecycle-milestone";

  const hasDelayedEntry = journeyEntry === "after-delay";

  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <AppSelect
          label="When should a customer enter this engagement?"
          value={trigger}
          onValueChange={setTrigger}
          placeholder="Select trigger"
          groups={triggerGroups}
        />

        <AppSelect
          label="Journey Entry"
          value={journeyEntry}
          onValueChange={setJourneyEntry}
          placeholder="Select journey entry"
          options={journeyEntryOptions}
        />

        {isSpecificCurrency && (
          <AppSelect
            label="Currency Account"
            value={specificCurrency}
            onValueChange={setSpecificCurrency}
            placeholder="Select currency"
            options={currencyAccountOptions}
          />
        )}

        {isLifecycle && (
          <div className="space-y-2">
            <Label>Lifecycle milestone</Label>

            <div className="grid grid-cols-[1fr_150px] gap-3">
              <Input
                type="number"
                min="1"
                value={lifecycleValue}
                onChange={(event) => setLifecycleValue(event.target.value)}
                placeholder="Enter value"
              />

              <AppSelect
                value={lifecycleUnit}
                onValueChange={setLifecycleUnit}
                options={timeUnitOptions}
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Customer enters when they reach this amount of time since signup.
            </p>
          </div>
        )}

        {hasDelayedEntry && (
          <div className="space-y-2">
            <Label>Entry delay</Label>

            <div className="grid grid-cols-[1fr_150px] gap-3">
              <Input
                type="number"
                min="1"
                value={delayValue}
                onChange={(event) => setDelayValue(event.target.value)}
                placeholder="Enter value"
              />

              <AppSelect
                value={delayUnit}
                onValueChange={setDelayUnit}
                options={timeUnitOptions}
              />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border bg-background p-5">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-sm font-medium">
              Include customers who already meet this condition?
            </p>

            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Keep this disabled for new journeys unless historical customers
              should also be included.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {includeExisting ? "Yes" : "No"}
            </span>

            <Switch
              checked={includeExisting}
              onCheckedChange={setIncludeExisting}
              aria-label="Include existing customers"
            />
          </div>
        </div>

        {includeExisting && (
          <div className="mt-5 border-t pt-5">
            <div className="max-w-xl space-y-2">
              <Label>Lookback</Label>

              <div className="grid grid-cols-[1fr_150px] gap-3">
                <Input
                  type="number"
                  min="1"
                  value={lookbackValue}
                  onChange={(event) => setLookbackValue(event.target.value)}
                  placeholder="Enter value"
                />

                <AppSelect
                  value={lookbackUnit}
                  onValueChange={setLookbackUnit}
                  options={timeUnitOptions}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Customers who qualified within the last {lookbackValue || "X"}{" "}
                {lookbackUnit}.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Info className="size-4" />
          </div>

          <div>
            <p className="text-sm font-medium">
              Historical customer protection
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Existing customers are excluded by default. This prevents a newly
              activated engagement from unintentionally enrolling KiiBank's
              entire historical customer base.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="rounded-xl border bg-muted/30 p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Clock3 className="size-5" />
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Current entry rule
            </p>

            <p className="mt-1 font-semibold">
              {
                triggerGroups
                  .flatMap((group) => group.options)
                  .find((item) => item.value === trigger)?.label
              }
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Journey entry:{" "}
              {
                journeyEntryOptions.find((item) => item.value === journeyEntry)
                  ?.label
              }
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
