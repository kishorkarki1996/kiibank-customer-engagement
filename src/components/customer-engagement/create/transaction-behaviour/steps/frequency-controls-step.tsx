"use client";

import { useState } from "react";

import { AppSelect } from "@/components/common/app-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FrequencyControl =
  | "once-only"
  | "once-every-days"
  | "once-every-weeks"
  | "once-every-months";

const frequencyControlOptions = [
  {
    label: "Once Only",
    value: "once-only",
  },
  {
    label: "Once every [X] days",
    value: "once-every-days",
  },
  {
    label: "Once every [X] weeks",
    value: "once-every-weeks",
  },
  {
    label: "Once every [X] months",
    value: "once-every-months",
  },
];

export function FrequencyControlsStep() {
  const [frequencyControl, setFrequencyControl] = useState<
    FrequencyControl | ""
  >("");

  const [frequencyValue, setFrequencyValue] = useState("");

  const requiresFrequencyValue =
    frequencyControl !== "" && frequencyControl !== "once-only";

  const handleFrequencyChange = (value: string) => {
    setFrequencyControl(value as FrequencyControl);

    if (value === "once-only") {
      setFrequencyValue("");
      return;
    }

    setFrequencyValue("1");
  };

  return (
    <div className="space-y-6">
      <p className="mt-1 text-sm text-muted-foreground">
        Define how often the same customer can receive this engagement.
      </p>

      <div className="grid max-w-3xl gap-4 ">
        <AppSelect
          label="How often can the same customer receive this engagement?"
          value={frequencyControl}
          onValueChange={handleFrequencyChange}
          options={frequencyControlOptions}
          placeholder="Select frequency"
          required
        />

        {requiresFrequencyValue && (
          <div className="space-y-2">
            <Label htmlFor="frequency-value">
              {getFrequencyValueLabel(frequencyControl)}
              <span className="ml-1 text-destructive">*</span>
            </Label>

            <Input
              id="frequency-value"
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              value={frequencyValue}
              onChange={(event) => {
                const value = event.target.value;

                /**
                 * Prevent decimal/negative values
                 * from being stored.
                 */
                if (value === "" || /^\d+$/.test(value)) {
                  setFrequencyValue(value);
                }
              }}
              placeholder={getFrequencyValuePlaceholder(frequencyControl)}
            />
          </div>
        )}
      </div>

      {frequencyControl && (
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">
            {getFrequencySummary(frequencyControl, frequencyValue)}
          </p>
        </div>
      )}
    </div>
  );
}

function getFrequencyValueLabel(frequency: FrequencyControl | "") {
  switch (frequency) {
    case "once-every-days":
      return "Number of Days";

    case "once-every-weeks":
      return "Number of Weeks";

    case "once-every-months":
      return "Number of Months";

    default:
      return "Frequency Value";
  }
}

function getFrequencyValuePlaceholder(frequency: FrequencyControl | "") {
  switch (frequency) {
    case "once-every-days":
      return "Enter number of days";

    case "once-every-weeks":
      return "Enter number of weeks";

    case "once-every-months":
      return "Enter number of months";

    default:
      return "Enter value";
  }
}

function getFrequencySummary(frequency: FrequencyControl, value: string) {
  if (frequency === "once-only") {
    return "Each customer can receive this engagement only once.";
  }

  if (!value) {
    return "Enter a numeric value to complete the frequency control.";
  }

  const amount = Number(value);

  switch (frequency) {
    case "once-every-days":
      return `The same customer can receive this engagement once every ${amount} ${
        amount === 1 ? "day" : "days"
      }.`;

    case "once-every-weeks":
      return `The same customer can receive this engagement once every ${amount} ${
        amount === 1 ? "week" : "weeks"
      }.`;

    case "once-every-months":
      return `The same customer can receive this engagement once every ${amount} ${
        amount === 1 ? "month" : "months"
      }.`;

    default:
      return "";
  }
}
