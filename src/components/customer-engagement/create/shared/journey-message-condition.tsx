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

export type JourneyConditionBlock = {
  id: number;
  conditions: JourneyCondition[];
};

type JourneyMessageConditionProps = {
  mode: "always" | "conditional";
  onModeChange: (value: "always" | "conditional") => void;
  conditionBlocks: JourneyConditionBlock[];
  onConditionBlocksChange: (blocks: JourneyConditionBlock[]) => void;
};

const createCondition = (field = ""): JourneyCondition => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  field,
  operator: "",
  value: "",
});

const createConditionBlock = (field = ""): JourneyConditionBlock => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  conditions: [createCondition(field)],
});

export function JourneyMessageCondition({
  mode,
  onModeChange,
  conditionBlocks,
  onConditionBlocksChange,
}: JourneyMessageConditionProps) {
  const conditionFieldOptions = journeyConditionData.map((item) => ({
    label: item.label,
    value: item.value,
  }));

  const addOrCondition = (blockId: number) => {
    onConditionBlocksChange(
      conditionBlocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              conditions: [...block.conditions, createCondition()],
            }
          : block,
      ),
    );
  };

  const addAndBlock = () => {
    onConditionBlocksChange([...conditionBlocks, createConditionBlock()]);
  };

  const updateCondition = (
    blockId: number,
    conditionId: number,
    updates: Partial<JourneyCondition>,
  ) => {
    onConditionBlocksChange(
      conditionBlocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              conditions: block.conditions.map((condition) =>
                condition.id === conditionId
                  ? {
                      ...condition,
                      ...updates,
                    }
                  : condition,
              ),
            }
          : block,
      ),
    );
  };

  const removeCondition = (blockId: number, conditionId: number) => {
    const updatedBlocks = conditionBlocks
      .map((block) => {
        if (block.id !== blockId) {
          return block;
        }

        const remainingConditions = block.conditions.filter(
          (condition) => condition.id !== conditionId,
        );

        return {
          ...block,
          conditions: remainingConditions,
        };
      })
      .filter((block) => {
        if (block.conditions.length > 0) {
          return true;
        }

        return conditionBlocks.length === 1;
      });

    if (updatedBlocks.length === 0) {
      onConditionBlocksChange([createConditionBlock()]);
      return;
    }

    if (
      updatedBlocks.length === 1 &&
      updatedBlocks[0].conditions.length === 0
    ) {
      updatedBlocks[0].conditions = [createCondition()];
    }

    onConditionBlocksChange(updatedBlocks);
  };

  const removeBlock = (blockId: number) => {
    if (conditionBlocks.length <= 1) {
      return;
    }

    onConditionBlocksChange(
      conditionBlocks.filter((block) => block.id !== blockId),
    );
  };

  const handleModeChange = (value: "always" | "conditional") => {
    onModeChange(value);

    if (value === "conditional" && conditionBlocks.length === 0) {
      onConditionBlocksChange([createConditionBlock()]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Send this message only if...</Label>

        <RadioGroup
          value={mode}
          onValueChange={(value) =>
            handleModeChange(value as "always" | "conditional")
          }
          className="flex items-center gap-6 mt-2"
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
        <div>
          {conditionBlocks.map((block, blockIndex) => (
            <div key={block.id}>
              {/* AND separator */}
              {blockIndex > 0 && (
                <div className="flex items-center gap-3 py-4">
                  <div className="flex-1 border-t border-dashed border-border" />

                  <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-primary shadow-sm ring-1 ring-border">
                    AND
                  </span>

                  <div className="flex-1 border-t border-dashed border-border" />
                </div>
              )}

              {/* OR block */}
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="rounded-lg bg-background p-3 shadow-sm">
                  <div>
                    {block.conditions.map((condition, conditionIndex) => {
                      const selectedCondition = journeyConditionData.find(
                        (item) => item.value === condition.field,
                      );

                      return (
                        <div key={condition.id}>
                          {/* OR separator */}
                          {conditionIndex > 0 && (
                            <div className="flex items-center gap-3 py-4">
                              <div className="flex-1 border-t border-dashed border-border" />

                              <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-primary shadow-sm ring-1 ring-border">
                                OR
                              </span>

                              <div className="flex-1 border-t border-dashed border-border" />
                            </div>
                          )}

                          <div className="grid items-end gap-3 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_40px]">
                            {/* Condition */}
                            <AppSelect
                              value={condition.field}
                              onValueChange={(value) =>
                                updateCondition(block.id, condition.id, {
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

                            {/* Operator */}
                            {selectedCondition?.operatorOptions?.length ? (
                              <AppSelect
                                value={condition.operator}
                                onValueChange={(value) =>
                                  updateCondition(block.id, condition.id, {
                                    operator: value,
                                  })
                                }
                                placeholder="Select operator"
                                options={selectedCondition.operatorOptions}
                                triggerClassName="min-w-0"
                                triggerProps={{
                                  className: "min-w-0",
                                }}
                              />
                            ) : (
                              <div />
                            )}

                            {/* Value */}
                            {selectedCondition?.valueField?.type === "input" ? (
                              <Input
                                type={selectedCondition.valueField.inputType}
                                min={
                                  selectedCondition.valueField.inputType ===
                                  "number"
                                    ? 0
                                    : undefined
                                }
                                value={condition.value}
                                onChange={(event) =>
                                  updateCondition(block.id, condition.id, {
                                    value: event.target.value,
                                  })
                                }
                                placeholder={
                                  selectedCondition.valueField.placeholder
                                }
                              />
                            ) : selectedCondition?.valueField?.type ===
                              "select" ? (
                              <AppSelect
                                value={condition.value}
                                onValueChange={(value) =>
                                  updateCondition(block.id, condition.id, {
                                    value,
                                  })
                                }
                                placeholder={
                                  selectedCondition.valueField.placeholder
                                }
                                options={selectedCondition.valueField.options}
                                triggerClassName="min-w-0"
                                triggerProps={{
                                  className: "min-w-0",
                                }}
                              />
                            ) : (
                              <div />
                            )}

                            {/* Delete condition */}
                            <div className="flex justify-end">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  removeCondition(block.id, condition.id)
                                }
                                aria-label="Remove condition"
                                className="shrink-0"
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Separator before actions */}
                    <div className="mt-4 border-t border-border" />

                    {/* Block actions */}
                    <div className="mt-3 flex items-center justify-between">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addOrCondition(block.id)}
                        className="px-0"
                      >
                        <Plus className="mr-2 size-4" />
                        OR Condition
                      </Button>

                      {conditionBlocks.length > 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBlock(block.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          Delete Block
                        </Button>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add AND block */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addAndBlock}
            className="mt-4"
          >
            <Plus className="mr-2 size-4" />
            AND Condition
          </Button>

          {/* Information */}
          <div className="flex items-start gap-2 rounded-md bg-primary/5 px-3 py-2.5 mt-4">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />

            <p className="text-xs text-muted-foreground">
              The message will be sent only when at least one condition in every
              condition block is satisfied. Conditions within the same block use
              OR logic, while separate blocks use AND logic.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
