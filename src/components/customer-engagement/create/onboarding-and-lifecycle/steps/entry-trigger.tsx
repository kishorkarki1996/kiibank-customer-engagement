"use client";

import { useState } from "react";

import { AppSelect } from "@/components/common/app-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const triggerTypeOptions = [
  {
    label: "Signup",
    value: "signup",
  },
  {
    label: "Account Events",
    value: "account-events",
  },
  {
    label: "Funding",
    value: "funding",
  },
  {
    label: "Transaction",
    value: "transaction",
  },
  {
    label: "Lifecycle",
    value: "lifecycle",
  },
];

const triggerFieldOptions = {
  signup: [
    {
      label: "Customer completes signup",
      value: "signup-complete",
    },
  ],
  "account-events": [
    {
      label: "Customer creates first currency account",
      value: "first-currency-account",
    },
    {
      label: "Customer creates a specific currency account",
      value: "specific-currency-account",
    },
  ],
  funding: [
    {
      label: "Customer funds account for the first time",
      value: "first-funding",
    },
  ],
  transaction: [
    {
      label: "Customer completes first successful transaction",
      value: "first-successful-transaction",
    },
  ],
  lifecycle: [
    {
      label: "Customer reaches X days/weeks/months since signup",
      value: "lifecycle-milestone",
    },
  ],
};

// Replace this with your actual KiiBank-supported currency source/API.
const supportedCurrencies = ["GBP", "EUR", "NGN", "XAF"];

const currencyAccountOptions = [
  {
    label: "Any",
    value: "any",
  },
  ...supportedCurrencies.map((currency) => ({
    label: currency,
    value: currency,
  })),
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

export function EntryTriggerStep() {
  const [triggerType, setTriggerType] = useState("");
  const [triggerField, setTriggerField] = useState("");

  const [currencyAccount, setCurrencyAccount] = useState("any");

  const [lifecycleValue, setLifecycleValue] = useState("");
  const [lifecycleUnit, setLifecycleUnit] = useState("days");

  const [includeExisting, setIncludeExisting] = useState(false);
  const [lookbackValue, setLookbackValue] = useState("");
  const [lookbackUnit, setLookbackUnit] = useState("days");

  const currentTriggerFields = triggerType
    ? triggerFieldOptions[triggerType as keyof typeof triggerFieldOptions]
    : [];

  const isSpecificCurrency = triggerField === "specific-currency-account";

  const isLifecycle = triggerField === "lifecycle-milestone";

  const handleTriggerTypeChange = (value: string) => {
    setTriggerType(value);

    const fields =
      triggerFieldOptions[value as keyof typeof triggerFieldOptions];

    if (fields.length === 1) {
      setTriggerField(fields[0].value);
    } else {
      setTriggerField("");
    }

    setCurrencyAccount("any");
    setLifecycleValue("");
    setLifecycleUnit("days");
  };

  const handleTriggerFieldChange = (value: string) => {
    setTriggerField(value);

    if (value !== "specific-currency-account") {
      setCurrencyAccount("any");
    }

    if (value !== "lifecycle-milestone") {
      setLifecycleValue("");
      setLifecycleUnit("days");
    }
  };

  const handleIncludeExistingChange = (checked: boolean) => {
    setIncludeExisting(checked);

    if (!checked) {
      setLookbackValue("");
      setLookbackUnit("days");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <AppSelect
          label="When should a customer enter this engagement?"
          value={triggerType}
          onValueChange={handleTriggerTypeChange}
          placeholder="Select trigger type"
          options={triggerTypeOptions}
        />

        <AppSelect
          label="Trigger Field"
          value={triggerField}
          onValueChange={handleTriggerFieldChange}
          placeholder={
            triggerType ? "Select trigger field" : "Select trigger type first"
          }
          options={currentTriggerFields}
          disabled={!triggerType}
        />

        {isSpecificCurrency && (
          <AppSelect
            label="Customer Account Currency"
            value={currencyAccount}
            onValueChange={setCurrencyAccount}
            placeholder="Select currency"
            options={currencyAccountOptions}
          />
        )}

        {isLifecycle && (
          <>
            <div className="space-y-2">
              <Label htmlFor="lifecycle-value">
                Lifecycle Value
                <span className="ml-1 text-destructive">*</span>
              </Label>

              <Input
                id="lifecycle-value"
                type="number"
                min="1"
                step="1"
                value={lifecycleValue}
                onChange={(event) => setLifecycleValue(event.target.value)}
                placeholder="Enter value"
              />
            </div>

            <AppSelect
              label="Lifecycle Unit"
              value={lifecycleUnit}
              onValueChange={setLifecycleUnit}
              placeholder="Select unit"
              options={timeUnitOptions}
            />
          </>
        )}
      </div>

      <div className="rounded-xl border bg-background p-5">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-sm font-medium">
              Include Customers Who Already Meet This Condition?
            </p>

            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Prevents unintentionally enrolling the complete historical
              customer base.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {includeExisting ? "Yes" : "No"}
            </span>

            <Switch
              checked={includeExisting}
              onCheckedChange={handleIncludeExistingChange}
              aria-label="Include customers who already meet this condition"
            />
          </div>
        </div>

        {includeExisting && (
          <div className="mt-5 border-t pt-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lookback-value">
                  Lookback Value
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <Input
                  id="lookback-value"
                  type="number"
                  min="1"
                  step="1"
                  value={lookbackValue}
                  onChange={(event) => setLookbackValue(event.target.value)}
                  placeholder="Enter value"
                />
              </div>

              <AppSelect
                label="Lookback Unit"
                value={lookbackUnit}
                onValueChange={setLookbackUnit}
                placeholder="Select unit"
                options={timeUnitOptions}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
