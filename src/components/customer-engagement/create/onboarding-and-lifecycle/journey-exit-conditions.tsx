"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  countOperatorOptions,
  exitConditionOptions,
  statusOperatorOptions,
} from "./data/exit-conditions-data";
import {
  accountStatusOptions,
  customerStatusOptions,
} from "./data/journey-condition-data";

type ExitCondition = {
  id: number;
  field: string;
  operator: string;
  value: string;
};

export function JourneyExitConditions() {
  const [exitConditions, setExitConditions] = useState<ExitCondition[]>([]);

  const addExitCondition = () => {
    setExitConditions((conditions) => [
      ...conditions,
      {
        id: Date.now(),
        field: "",
        operator: "",
        value: "",
      },
    ]);
  };

  const updateExitCondition = (id: number, updates: Partial<ExitCondition>) => {
    setExitConditions((conditions) =>
      conditions.map((condition) =>
        condition.id === id
          ? {
              ...condition,
              ...updates,
            }
          : condition,
      ),
    );
  };

  const removeExitCondition = (id: number) => {
    setExitConditions((conditions) =>
      conditions.filter((condition) => condition.id !== id),
    );
  };

  return (
    <div className="space-y-4 pt-2">
      <div>
        <h3 className="text-sm font-semibold">Journey Exit Conditions</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Define when a customer should leave this journey.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 px-4 py-3">
        <p className="text-sm font-medium">Journey completed</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Always included. The customer exits after the final journey step.
        </p>
      </div>

      <div className="space-y-3">
        {exitConditions.map((condition) => {
          const isCustomerStatus = condition.field === "customer-status";

          const isAccountStatus = condition.field === "account-status";

          const isTransactionCount =
            condition.field === "successful-transaction-count";

          return (
            <div
              key={condition.id}
              className="grid items-center gap-3 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_40px]"
            >
              <AppSelect
                value={condition.field}
                onValueChange={(value) =>
                  updateExitCondition(condition.id, {
                    field: value,
                    operator: "",
                    value: "",
                  })
                }
                placeholder="Select exit condition"
                options={exitConditionOptions}
                triggerClassName="min-w-0"
              />

              {isCustomerStatus || isAccountStatus ? (
                <AppSelect
                  value={condition.operator}
                  onValueChange={(value) =>
                    updateExitCondition(condition.id, {
                      operator: value,
                    })
                  }
                  placeholder="Select operator"
                  options={statusOperatorOptions}
                />
              ) : isTransactionCount ? (
                <AppSelect
                  value={condition.operator}
                  onValueChange={(value) =>
                    updateExitCondition(condition.id, {
                      operator: value,
                    })
                  }
                  placeholder="Select operator"
                  options={countOperatorOptions}
                />
              ) : (
                <div />
              )}

              {isCustomerStatus ? (
                <AppSelect
                  value={condition.value}
                  onValueChange={(value) =>
                    updateExitCondition(condition.id, {
                      value,
                    })
                  }
                  placeholder="Select status"
                  options={customerStatusOptions}
                />
              ) : isAccountStatus ? (
                <AppSelect
                  value={condition.value}
                  onValueChange={(value) =>
                    updateExitCondition(condition.id, {
                      value,
                    })
                  }
                  placeholder="Select account status"
                  options={accountStatusOptions}
                />
              ) : isTransactionCount ? (
                <Input
                  type="number"
                  min={0}
                  value={condition.value}
                  onChange={(event) =>
                    updateExitCondition(condition.id, {
                      value: event.target.value,
                    })
                  }
                  placeholder="Enter count"
                />
              ) : (
                <div />
              )}

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExitCondition(condition.id)}
                  aria-label="Remove exit condition"
                  className="shrink-0"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addExitCondition}
      >
        <Plus className="mr-2 size-4" />
        Add Exit Condition
      </Button>
    </div>
  );
}
