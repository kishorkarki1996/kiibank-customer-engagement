"use client";

import { useState } from "react";
import { Info, InfoIcon, LockKeyhole, ShieldCheck } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  communicationPreferenceOptions,
  duplicateProtectionOptions,
  entryFrequencyOptions,
  reEntryUnitOptions,
} from "../data/communication-control-data";

export function CommunicationControlsStep() {
  const [entryFrequency, setEntryFrequency] = useState("");

  const [entryFrequencyValue, setEntryFrequencyValue] = useState("");

  const [communicationPreference, setCommunicationPreference] = useState(
    "respect-preferences",
  );

  const [duplicateProtection, setDuplicateProtection] = useState("once");

  const [reEntryValue, setReEntryValue] = useState("");

  const [reEntryUnit, setReEntryUnit] = useState("days");

  /**
   * UI permission simulation for now.
   *
   * true:
   * User can override customer communication preferences.
   *
   * false:
   * User can only use the default option.
   */
  const canOverrideCustomerPreference = true;

  const showEntryFrequencyValue = entryFrequency !== "once-only";

  const allowReEntry = duplicateProtection === "allow-re-entry";

  const handleEntryFrequencyChange = (value: string) => {
    setEntryFrequency(value);

    if (value === "once-only") {
      setEntryFrequencyValue("");
    }
  };

  const handleDuplicateProtectionChange = (value: string) => {
    setDuplicateProtection(value);

    if (value !== "allow-re-entry") {
      setReEntryValue("");
      setReEntryUnit("days");
    }
  };

  return (
    <div className="space-y-8">
      {/* Entry Frequency Control */}

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Entry Frequency Control</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Define how frequently the same customer can qualify to enter this
            engagement.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <AppSelect
            label="Entry Frequency"
            value={entryFrequency}
            onValueChange={handleEntryFrequencyChange}
            options={entryFrequencyOptions}
            required
          />

          {showEntryFrequencyValue && (
            <div className="space-y-2">
              <Label htmlFor="entry-frequency-value">
                Frequency Value
                <span className="ml-1 text-destructive">*</span>
              </Label>

              <Input
                id="entry-frequency-value"
                type="number"
                min={1}
                step={1}
                value={entryFrequencyValue}
                onChange={(event) => setEntryFrequencyValue(event.target.value)}
                placeholder={getEntryFrequencyPlaceholder(entryFrequency)}
                required
              />
            </div>
          )}
        </div>

        {showEntryFrequencyValue && (
          <div className="flex items-start gap-2 rounded-lg border bg-muted/30 px-4 py-3">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />

            <p className="text-xs leading-5 text-muted-foreground">
              A customer may enter this engagement again only after the
              configured entry frequency period has passed.
            </p>
          </div>
        )}
      </section>

      {/* Customer Communication Preferences */}

      <section className="space-y-4">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <AppSelect
            label="Communication Preference"
            value={communicationPreference}
            onValueChange={setCommunicationPreference}
            options={communicationPreferenceOptions}
            disabled={!canOverrideCustomerPreference}
            required
          />

          {!canOverrideCustomerPreference && (
            <div className="flex h-9 items-center gap-2 rounded-md border bg-muted/30 px-3 text-xs text-muted-foreground">
              <LockKeyhole className="size-3.5" />
              Restricted
            </div>
          )}
        </div>

        {!canOverrideCustomerPreference ? (
          <div className="flex items-start gap-3 rounded-xl border bg-muted/30 p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="size-4" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Customer preferences will be respected
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Only authorised users can override customer communication
                preferences.
              </p>
            </div>
          </div>
        ) : (
          communicationPreference === "override-preferences" && (
            <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <Info className="mt-0.5 size-4 shrink-0 text-destructive" />

              <div>
                <p className="text-sm font-medium">
                  Customer preferences will be overridden
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Notifications may be sent even when the customer's
                  communication preference would normally prevent delivery.
                </p>
              </div>
            </div>
          )
        )}
      </section>

      {/* Duplicate Protection */}

      <section className="space-y-4">
        <AppSelect
          label="Duplicate Protection"
          value={duplicateProtection}
          onValueChange={handleDuplicateProtectionChange}
          options={duplicateProtectionOptions}
          required
        />

        {allowReEntry && (
          <div className="rounded-xl border bg-muted/20 p-4">
            <div className="grid gap-5 md:grid-cols-[1fr_180px]">
              <div className="space-y-2">
                <Label htmlFor="re-entry-value">
                  Customer may re-enter after
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <Input
                  id="re-entry-value"
                  type="number"
                  min={1}
                  step={1}
                  value={reEntryValue}
                  onChange={(event) => setReEntryValue(event.target.value)}
                  placeholder="Enter value"
                  required
                />
              </div>

              <AppSelect
                label="Unit"
                value={reEntryUnit}
                onValueChange={setReEntryUnit}
                options={reEntryUnitOptions}
                required
              />
            </div>
          </div>
        )}

        <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-primary" />

          <p className="text-xs leading-5 text-muted-foreground">
            For the New Customer Welcome Journey, re-entry should remain
            disabled. A customer should enter the onboarding journey only once.
          </p>
        </div>
      </section>
    </div>
  );
}

function getEntryFrequencyPlaceholder(value: string) {
  switch (value) {
    case "every-days":
      return "Number of days";

    case "every-weeks":
      return "Number of weeks";

    case "every-months":
      return "Number of months";

    default:
      return "Enter value";
  }
}
