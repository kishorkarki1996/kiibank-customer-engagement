"use client";

import { Info, Plus, Trash2 } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { journeyConditionData } from "@/components/customer-engagement/create/onboarding-and-lifecycle/data/journey-condition-data";

export type JourneyCondition = {
  id: number;
  field: string;
  operator: string;
  value: string;
};

type JourneyMessageConditionProps = {
  mode: "always" | "conditional";
  onModeChange: (value: "always" | "conditional") => void;

  conditions: JourneyCondition[];
  onConditionsChange: (conditions: JourneyCondition[]) => void;
};

export function JourneyMessageCondition({
  mode,
  onModeChange,
  conditions,
  onConditionsChange,
}: JourneyMessageConditionProps) {
  const addCondition = () => {
    onConditionsChange([
      ...conditions,
      {
        id: Date.now(),
        field: "",
        operator: "",
        value: "",
      },
    ]);
  };

  const updateCondition = (id: number, updates: Partial<JourneyCondition>) => {
    onConditionsChange(
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

  const removeCondition = (id: number) => {
    onConditionsChange(conditions.filter((condition) => condition.id !== id));
  };

  const handleModeChange = (value: "always" | "conditional") => {
    onModeChange(value);

    if (value === "conditional" && conditions.length === 0) {
      onConditionsChange([
        {
          id: Date.now(),
          field: "has-gbp-account",
          operator: "",
          value: "",
        },
      ]);
    }
  };

  const conditionFieldOptions = journeyConditionData.map((item) => ({
    label: item.label,
    value: item.value,
  }));

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="space-y-3">
        <Label>Send this message only if...</Label>

        <RadioGroup
          value={mode}
          onValueChange={(value) =>
            handleModeChange(value as "always" | "conditional")
          }
          className="flex items-center gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="always" id="always-send" />

            <Label htmlFor="always-send" className="cursor-pointer font-normal">
              Always send
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="conditional" id="add-condition" />

            <Label
              htmlFor="add-condition"
              className="cursor-pointer font-normal"
            >
              Add condition
            </Label>
          </div>
        </RadioGroup>
      </div>

      {mode === "conditional" && (
        <div className="space-y-3">
          {conditions.map((condition) => {
            const selectedCondition = journeyConditionData.find(
              (item) => item.value === condition.field,
            );

            return (
              <div
                key={condition.id}
                className="grid items-center gap-3 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_40px]"
              >
                <AppSelect
                  value={condition.field}
                  onValueChange={(value) =>
                    updateCondition(condition.id, {
                      field: value,
                      operator: "",
                      value: "",
                    })
                  }
                  placeholder="Select condition"
                  options={conditionFieldOptions}
                  triggerClassName="min-w-0"
                  triggerProps={{
                    className: "min-w-0",
                  }}
                />

                {selectedCondition?.operatorOptions &&
                selectedCondition.operatorOptions.length > 0 ? (
                  <AppSelect
                    value={condition.operator}
                    onValueChange={(value) =>
                      updateCondition(condition.id, {
                        operator: value,
                      })
                    }
                    placeholder="Select operator"
                    options={selectedCondition.operatorOptions}
                  />
                ) : (
                  <div />
                )}

                {selectedCondition?.valueField.type === "input" ? (
                  <Input
                    type={selectedCondition.valueField.inputType}
                    min={
                      selectedCondition.valueField.inputType === "number"
                        ? 0
                        : undefined
                    }
                    value={condition.value}
                    onChange={(event) =>
                      updateCondition(condition.id, {
                        value: event.target.value,
                      })
                    }
                    placeholder={selectedCondition.valueField.placeholder}
                  />
                ) : selectedCondition?.valueField.type === "select" ? (
                  <AppSelect
                    value={condition.value}
                    onValueChange={(value) =>
                      updateCondition(condition.id, {
                        value,
                      })
                    }
                    placeholder={selectedCondition.valueField.placeholder}
                    options={selectedCondition.valueField.options}
                  />
                ) : (
                  <div />
                )}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCondition(condition.id)}
                    aria-label="Remove condition"
                    className="shrink-0"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            );
          })}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCondition}
          >
            <Plus className="mr-2 size-4" />
            Add another condition
          </Button>

          <div className="flex items-start gap-2 rounded-md bg-primary/5 px-3 py-2.5">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />

            <p className="text-xs text-muted-foreground">
              If the customer no longer meets the condition, this message will
              be skipped and the journey will continue.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
