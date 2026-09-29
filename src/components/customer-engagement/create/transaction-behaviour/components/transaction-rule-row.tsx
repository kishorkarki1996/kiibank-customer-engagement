"use client";

import { Trash2 } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Button } from "@/components/ui/button";

import {
  getFieldConfig,
  type TransactionFieldConfig,
} from "../steps/data/behaviour-rule-data";

import { TransactionRulePeriod } from "./transaction-rule-period";
import { TransactionRuleValue } from "./transaction-rule-value";

export type TransactionRule = {
  id: string;

  field: string;
  operator: string;

  value: string;
  valueTo: string;

  period: string;
  periodValue: string;

  customFrom?: Date;
  customTo?: Date;
};

type TransactionRuleRowProps = {
  rule: TransactionRule;

  availableFields: TransactionFieldConfig[];

  onUpdate: (updates: Partial<TransactionRule>) => void;

  onRemove: () => void;
};

export function TransactionRuleRow({
  rule,
  availableFields,
  onUpdate,
  onRemove,
}: TransactionRuleRowProps) {
  const fieldConfig = getFieldConfig(rule.field);

  const fieldOptions = availableFields.map((field) => ({
    label: field.label,
    value: field.value,
  }));

  const hasField = Boolean(rule.field);
  const hasOperator = Boolean(rule.operator);

  const handleFieldChange = (value: string) => {
    onUpdate({
      field: value,
      operator: "",
      value: "",
      valueTo: "",
      period: "",
      periodValue: "",
      customFrom: undefined,
      customTo: undefined,
    });
  };

  const handleOperatorChange = (value: string) => {
    onUpdate({
      operator: value,
      value: "",
      valueTo: "",
    });
  };

  return (
    <div className="flex w-full min-w-0 items-center gap-3">
      {/* Field */}

      <div className="min-w-0 basis-[220px] shrink">
        <AppSelect
          value={rule.field}
          onValueChange={handleFieldChange}
          options={fieldOptions}
          placeholder="Select condition"
        />
      </div>

      {/* Operator */}

      {hasField && (
        <div className="min-w-0 basis-[180px] shrink">
          <AppSelect
            value={rule.operator}
            onValueChange={handleOperatorChange}
            options={fieldConfig?.operators ?? []}
            placeholder="Select operator"
          />
        </div>
      )}

      {/* Value + Period */}

      {hasOperator && (
        <>
          {/* Value */}

          <div className="min-w-0 flex-[1_1_220px]">
            <TransactionRuleValue
              operator={rule.operator}
              valueKind={fieldConfig?.valueKind ?? "text"}
              value={rule.value}
              valueTo={rule.valueTo}
              onValueChange={(value) =>
                onUpdate({
                  value,
                })
              }
              onValueToChange={(valueTo) =>
                onUpdate({
                  valueTo,
                })
              }
            />
          </div>

          {/* Period */}

          {fieldConfig?.supportsPeriod && (
            <div className="min-w-0 flex-[1.5_1_360px]">
              <TransactionRulePeriod
                supportsPeriod={fieldConfig.supportsPeriod}
                period={rule.period}
                periodValue={rule.periodValue}
                customFrom={rule.customFrom}
                customTo={rule.customTo}
                onPeriodChange={(period) =>
                  onUpdate({
                    period,
                    periodValue: "",
                    customFrom: undefined,
                    customTo: undefined,
                  })
                }
                onPeriodValueChange={(periodValue) =>
                  onUpdate({
                    periodValue,
                  })
                }
                onCustomFromChange={(customFrom) =>
                  onUpdate({
                    customFrom,
                  })
                }
                onCustomToChange={(customTo) =>
                  onUpdate({
                    customTo,
                  })
                }
              />
            </div>
          )}
        </>
      )}

      {/* Delete - always far right */}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="ml-auto shrink-0"
        aria-label="Remove condition"
      >
        <Trash2 className="size-4 text-muted-foreground" />
      </Button>
    </div>
  );
}
