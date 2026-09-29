"use client";

import { Input } from "@/components/ui/input";

import type { RuleValueKind } from "../steps/data/behaviour-rule-data";

type TransactionRuleValueProps = {
  operator: string;

  valueKind: RuleValueKind;

  value: string;
  valueTo: string;

  onValueChange: (value: string) => void;

  onValueToChange: (value: string) => void;
};

export function TransactionRuleValue({
  operator,
  valueKind,
  value,
  valueTo,
  onValueChange,
  onValueToChange,
}: TransactionRuleValueProps) {
  if (!operator) {
    return null;
  }

  if (operator === "exists" || operator === "does-not-exist") {
    return null;
  }

  const inputType = valueKind === "number" ? "number" : "text";

  const isRange = operator === "between" || operator === "not-between";

  if (isRange) {
    return (
      <div className="grid min-w-0 grid-cols-2 gap-2">
        <Input
          type={inputType}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder="From"
        />

        <Input
          type={inputType}
          value={valueTo}
          onChange={(event) => onValueToChange(event.target.value)}
          placeholder="To"
        />
      </div>
    );
  }

  return (
    <Input
      type={inputType}
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      placeholder={
        operator === "is-one-of" || operator === "is-not-one-of"
          ? "Enter values"
          : "Enter value"
      }
    />
  );
}
