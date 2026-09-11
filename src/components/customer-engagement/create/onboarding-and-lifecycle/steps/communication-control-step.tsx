"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Info,
  LockKeyhole,
  Repeat2,
  ShieldCheck,
} from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  frequencyControlOptions,
  frequencyPeriodOptions,
  reEntryOptions,
  reEntryUnitOptions,
} from "../data/communication-control-data";
import { Switch } from "@/components/ui/switch";

export function CommunicationControlsStep() {
  const [frequencyControl, setFrequencyControl] = useState("global");

  const [frequencyCount, setFrequencyCount] = useState("1");

  const [frequencyPeriod, setFrequencyPeriod] = useState("day");

  const [reEntry, setReEntry] = useState<"no" | "yes">("no");

  const [reEntryValue, setReEntryValue] = useState("30");

  const [reEntryUnit, setReEntryUnit] = useState("days");

  return (
    <div className="space-y-8">
      {/* Frequency control */}

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Frequency Control</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Define how communication frequency should be controlled for this
            engagement.
          </p>
        </div>

        <AppSelect
          label="Frequency rule"
          value={frequencyControl}
          onValueChange={setFrequencyControl}
          options={frequencyControlOptions}
        />

        {frequencyControl === "engagement-specific" && (
          <div className="rounded-xl border bg-muted/20 p-4">
            <Label>Maximum messages</Label>

            <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_180px]">
              <Input
                type="number"
                min={1}
                value={frequencyCount}
                onChange={(event) => setFrequencyCount(event.target.value)}
                placeholder="Enter count"
              />

              <AppSelect
                value={frequencyPeriod}
                onValueChange={setFrequencyPeriod}
                options={frequencyPeriodOptions}
              />
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Engagement-specific rules should only be available to authorised
              administrators.
            </p>
          </div>
        )}
      </section>

      {/* Communication preferences */}

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">
            Customer Communication Preferences
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Mandatory communication controls applied by KiiBank.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl border bg-muted/30 p-4">
          <p className="text-sm font-medium">
            Respect customer channel eligibility and communication preferences
          </p>
          <Switch defaultChecked className="size-4" />
        </div>
      </section>

      {/* Channel fallback */}

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Channel Fallback</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Fallback channels are attempted only when permitted for the
            customer.
          </p>
        </div>

        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <ChannelBadge label="Push" />

            <ArrowRight className="size-4 text-muted-foreground" />

            <ChannelBadge label="WhatsApp" />

            <ArrowRight className="size-4 text-muted-foreground" />

            <ChannelBadge label="Email" />
          </div>

          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" />

            <p>
              Each journey step can define its own fallback channel. The system
              will only attempt a fallback when the channel is permitted.
            </p>
          </div>
        </div>
      </section>

      {/* Duplicate protection */}

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Duplicate Protection</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Control whether the same customer can enter this journey more than
            once.
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <RadioGroup
            value={reEntry}
            onValueChange={(value) => setReEntry(value as "no" | "yes")}
            className="space-y-3"
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="no" id="no-re-entry" className="mt-1" />

              <Label htmlFor="no-re-entry" className="cursor-pointer">
                <span className="block font-medium">
                  A customer can enter this journey only once
                </span>

                <span className="mt-1 block text-xs font-normal text-muted-foreground">
                  Recommended for the New Customer Welcome Journey.
                </span>
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <RadioGroupItem
                value="yes"
                id="allow-re-entry"
                className="mt-1"
              />

              <Label htmlFor="allow-re-entry" className="cursor-pointer">
                <span className="block font-medium">Allow re-entry</span>

                <span className="mt-1 block text-xs font-normal text-muted-foreground">
                  Customer may enter this journey again after the configured
                  waiting period.
                </span>
              </Label>
            </div>
          </RadioGroup>

          {reEntry === "yes" && (
            <div className="mt-5 border-t pt-5">
              <div className="max-w-xl space-y-2">
                <Label>Customer may re-enter after</Label>

                <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
                  <Input
                    type="number"
                    min={1}
                    value={reEntryValue}
                    onChange={(event) => setReEntryValue(event.target.value)}
                    placeholder="Enter value"
                  />

                  <AppSelect
                    value={reEntryUnit}
                    onValueChange={setReEntryUnit}
                    options={reEntryUnitOptions}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <Repeat2 className="mt-0.5 size-4 shrink-0 text-primary" />

          <p className="text-xs leading-5 text-muted-foreground">
            For the New Customer Welcome Journey, re-entry should remain
            disabled so customers do not receive the onboarding sequence more
            than once.
          </p>
        </div>
      </section>
    </div>
  );
}

function ChannelBadge({ label }: { label: string }) {
  return (
    <div className="rounded-md border bg-background px-3 py-1.5 text-sm font-medium">
      {label}
    </div>
  );
}
