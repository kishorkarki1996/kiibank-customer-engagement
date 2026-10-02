"use client";

import { useState } from "react";

import { AppSelect } from "@/components/common/app-select";
import { DatePicker } from "@/components/common/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ExecutionType = "one-time" | "scheduled" | "recurring" | "event-triggered";

type RecurringFrequency = "daily" | "weekly" | "monthly";

const executionTypeOptions = [
  {
    label: "One-Time",
    value: "one-time",
  },
  {
    label: "Scheduled",
    value: "scheduled",
  },
  {
    label: "Recurring",
    value: "recurring",
  },
  {
    label: "Event-Triggered",
    value: "event-triggered",
  },
];

const recurringFrequencyOptions = [
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
];

const dayOfWeekOptions = [
  {
    label: "Monday",
    value: "monday",
  },
  {
    label: "Tuesday",
    value: "tuesday",
  },
  {
    label: "Wednesday",
    value: "wednesday",
  },
  {
    label: "Thursday",
    value: "thursday",
  },
  {
    label: "Friday",
    value: "friday",
  },
  {
    label: "Saturday",
    value: "saturday",
  },
  {
    label: "Sunday",
    value: "sunday",
  },
];

const dayOfMonthOptions = [
  ...Array.from({ length: 28 }, (_, index) => ({
    label: String(index + 1),
    value: String(index + 1),
  })),
  {
    label: "Last day of month",
    value: "last-day",
  },
];

const eventTriggerOptions = [
  {
    label: "Signup completed",
    value: "signup-completed",
  },
  {
    label: "Account funded",
    value: "account-funded",
  },
  {
    label: "Transaction completed",
    value: "transaction-completed",
  },
  {
    label: "Transaction failed",
    value: "transaction-failed",
  },
  {
    label: "Currency account created",
    value: "currency-account-created",
  },
  {
    label: "KYC status changed",
    value: "kyc-status-changed",
  },
];

export function ExecutionTypeStep() {
  const [executionType, setExecutionType] = useState<ExecutionType | "">("");

  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();

  const [scheduledTime, setScheduledTime] = useState("");

  const [recurringFrequency, setRecurringFrequency] = useState<
    RecurringFrequency | ""
  >("");

  const [recurringTime, setRecurringTime] = useState("");

  const [recurringDayOfWeek, setRecurringDayOfWeek] = useState("");

  const [recurringDayOfMonth, setRecurringDayOfMonth] = useState("");

  const [triggeringEvent, setTriggeringEvent] = useState("");

  return (
    <div className="space-y-6">
      {/* Execution Type */}

      <p className="mt-1 text-sm text-muted-foreground">
        Define how and when this engagement should run.
      </p>

      <div className="max-w-xl">
        <AppSelect
          label="How should this engagement run?"
          value={executionType}
          onValueChange={(value) => setExecutionType(value as ExecutionType)}
          options={executionTypeOptions}
          placeholder="Select execution type"
          required
        />
      </div>

      {/* One-Time */}

      {executionType === "one-time" && (
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium">One-Time Execution</p>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            The system will evaluate eligible customers and execute this
            engagement once.
          </p>
        </div>
      )}

      {/* Scheduled */}

      {executionType === "scheduled" && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Execution Date
                <span className="ml-1 text-destructive">*</span>
              </Label>

              <DatePicker
                placeholder="Select date"
                value={scheduledDate}
                onChange={setScheduledDate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduled-time">
                Execution Time
                <span className="ml-1 text-destructive">*</span>
              </Label>

              <Input
                id="scheduled-time"
                type="time"
                value={scheduledTime}
                onChange={(event) => setScheduledTime(event.target.value)}
              />
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              The engagement will execute once at the configured future date and
              time.
            </p>
          </div>
        </div>
      )}

      {/* Recurring */}

      {executionType === "recurring" && (
        <div className="space-y-4">
          <div className="max-w-sm">
            <AppSelect
              label="Recurring Frequency"
              value={recurringFrequency}
              onValueChange={(value) =>
                setRecurringFrequency(value as RecurringFrequency)
              }
              options={recurringFrequencyOptions}
              placeholder="Select frequency"
              required
            />
          </div>

          {/* Daily */}

          {recurringFrequency === "daily" && (
            <div className="max-w-sm space-y-2">
              <Label htmlFor="daily-time">
                Execution Time
                <span className="ml-1 text-destructive">*</span>
              </Label>

              <Input
                id="daily-time"
                type="time"
                value={recurringTime}
                onChange={(event) => setRecurringTime(event.target.value)}
              />
            </div>
          )}

          {/* Weekly */}

          {recurringFrequency === "weekly" && (
            <div className="grid gap-4 md:grid-cols-2">
              <AppSelect
                label="Day of Week"
                value={recurringDayOfWeek}
                onValueChange={setRecurringDayOfWeek}
                options={dayOfWeekOptions}
                placeholder="Select day"
                required
              />

              <div className="space-y-2">
                <Label htmlFor="weekly-time">
                  Execution Time
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <Input
                  id="weekly-time"
                  type="time"
                  value={recurringTime}
                  onChange={(event) => setRecurringTime(event.target.value)}
                />
              </div>
            </div>
          )}

          {/* Monthly */}

          {recurringFrequency === "monthly" && (
            <div className="grid gap-4 md:grid-cols-2">
              <AppSelect
                label="Day of Month"
                value={recurringDayOfMonth}
                onValueChange={setRecurringDayOfMonth}
                options={dayOfMonthOptions}
                placeholder="Select day"
                required
              />

              <div className="space-y-2">
                <Label htmlFor="monthly-time">
                  Execution Time
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <Input
                  id="monthly-time"
                  type="time"
                  value={recurringTime}
                  onChange={(event) => setRecurringTime(event.target.value)}
                />
              </div>
            </div>
          )}

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-medium">Audience re-evaluation</p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Target customers will be checked again before every recurring
              execution.
            </p>
          </div>
        </div>
      )}

      {/* Event Triggered */}

      {executionType === "event-triggered" && (
        <div className="space-y-4">
          <div className="max-w-xl">
            <AppSelect
              label="Triggering Event"
              value={triggeringEvent}
              onValueChange={setTriggeringEvent}
              options={eventTriggerOptions}
              placeholder="Select triggering event"
              required
            />
          </div>

          {triggeringEvent && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm font-medium">Event-Triggered Execution</p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                This engagement will start when the selected triggering event
                occurs.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
