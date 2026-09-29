"use client";

import { AppSelect } from "@/components/common/app-select";
import { DatePicker } from "@/components/common/date-picker";
import { Input } from "@/components/ui/input";

import { periodOptions } from "../steps/data/behaviour-rule-data";

type TransactionRulePeriodProps = {
  supportsPeriod: boolean;

  period: string;
  periodValue: string;

  customFrom?: Date;
  customTo?: Date;

  onPeriodChange: (value: string) => void;

  onPeriodValueChange: (value: string) => void;

  onCustomFromChange: (value: Date | undefined) => void;

  onCustomToChange: (value: Date | undefined) => void;
};

export function TransactionRulePeriod({
  supportsPeriod,
  period,
  periodValue,
  customFrom,
  customTo,
  onPeriodChange,
  onPeriodValueChange,
  onCustomFromChange,
  onCustomToChange,
}: TransactionRulePeriodProps) {
  if (!supportsPeriod) {
    return null;
  }

  const isLastX =
    period === "last-x-days" ||
    period === "last-x-weeks" ||
    period === "last-x-months";

  const isCustomRange = period === "custom-date-range";

  /**
   * Normal period
   */

  if (!isLastX && !isCustomRange) {
    return (
      <div className="min-w-0">
        <AppSelect
          value={period}
          onValueChange={onPeriodChange}
          options={periodOptions}
          placeholder="Select period"
        />
      </div>
    );
  }

  /**
   * Last X Days / Weeks / Months
   */

  if (isLastX) {
    return (
      <div className="grid min-w-0 grid-cols-[minmax(0,1.4fr)_minmax(70px,0.6fr)] gap-2">
        <div className="min-w-0">
          <AppSelect
            value={period}
            onValueChange={onPeriodChange}
            options={periodOptions}
            placeholder="Select period"
          />
        </div>

        <Input
          type="number"
          min={1}
          value={periodValue}
          onChange={(event) => onPeriodValueChange(event.target.value)}
          placeholder={getPeriodValuePlaceholder(period)}
          className="min-w-0"
        />
      </div>
    );
  }

  /**
   * Custom Date Range
   */

  return (
    <div className="grid min-w-0 grid-cols-3 gap-2">
      <div className="min-w-0">
        <AppSelect
          value={period}
          onValueChange={onPeriodChange}
          options={periodOptions}
          placeholder="Select period"
        />
      </div>

      <div className="min-w-0">
        <DatePicker
          placeholder="From"
          value={customFrom}
          onChange={onCustomFromChange}
        />
      </div>

      <div className="min-w-0">
        <DatePicker
          placeholder="To"
          value={customTo}
          onChange={onCustomToChange}
        />
      </div>
    </div>
  );
}

function getPeriodValuePlaceholder(period: string) {
  switch (period) {
    case "last-x-days":
      return "Days";

    case "last-x-weeks":
      return "Weeks";

    case "last-x-months":
      return "Months";

    default:
      return "Value";
  }
}
