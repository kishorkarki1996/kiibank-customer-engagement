"use client";

import { useState } from "react";

import { Info, Plus, Trash2 } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { exitConditionOptions } from "./data/exit-conditions-data";

import { journeyConditionData } from "./data/journey-condition-data";

export type ExitCondition = {
  id: number;
  field: string;
  operator: string;
  value: string;
};

export type ExitConditionBlock = {
  id: number;
  conditions: ExitCondition[];
};

type ExitMode = "final-step" | "condition";

const createCondition = (field = ""): ExitCondition => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  field,
  operator: "",
  value: "",
});

const createConditionBlock = (field = ""): ExitConditionBlock => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  conditions: [createCondition(field)],
});

export function JourneyExitConditions() {
  const [exitMode, setExitMode] = useState<ExitMode>("final-step");

  const [conditionBlocks, setConditionBlocks] = useState<ExitConditionBlock[]>(
    [],
  );

  /**
   * Add another condition to an existing OR block.
   */
  const addOrCondition = (blockId: number) => {
    setConditionBlocks((blocks) =>
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              conditions: [...block.conditions, createCondition()],
            }
          : block,
      ),
    );
  };

  /**
   * Create a completely new AND block.
   *
   * Conditions inside the same block use OR.
   * Separate blocks use AND.
   */
  const addAndBlock = () => {
    setConditionBlocks((blocks) => [...blocks, createConditionBlock()]);
  };

  /**
   * Update an individual condition.
   */
  const updateCondition = (
    blockId: number,
    conditionId: number,
    updates: Partial<ExitCondition>,
  ) => {
    setConditionBlocks((blocks) =>
      blocks.map((block) =>
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

  /**
   * Remove one condition from an OR block.
   *
   * If the condition was the only condition:
   * - remove the block when multiple blocks exist
   * - otherwise keep one empty condition
   */
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

    /**
     * Always keep at least one block with one condition.
     */
    if (updatedBlocks.length === 0) {
      setConditionBlocks([createConditionBlock()]);
      return;
    }

    /**
     * If the only remaining block has no conditions,
     * give it a fresh condition row.
     */
    if (
      updatedBlocks.length === 1 &&
      updatedBlocks[0].conditions.length === 0
    ) {
      updatedBlocks[0].conditions = [createCondition()];
    }

    setConditionBlocks(updatedBlocks);
  };

  /**
   * Delete an entire AND block.
   *
   * Only available when multiple blocks exist.
   */
  const removeBlock = (blockId: number) => {
    if (conditionBlocks.length <= 1) {
      return;
    }

    setConditionBlocks(conditionBlocks.filter((block) => block.id !== blockId));
  };

  /**
   * When switching to exit conditions, make sure
   * there is an initial condition block.
   */
  const handleExitModeChange = (value: ExitMode) => {
    setExitMode(value);

    if (value === "condition" && conditionBlocks.length === 0) {
      setConditionBlocks([createConditionBlock()]);
    }
  };

  const conditionFieldOptions = exitConditionOptions.map((item) => ({
    label: item.label,
    value: item.value,
  }));

  return (
    <div className="space-y-4 pt-2">
      {/* Exit mode */}
      <div className="grid gap-2">
        <Label>When should the customer leave this journey?</Label>

        <RadioGroup
          value={exitMode}
          onValueChange={(value) => handleExitModeChange(value as ExitMode)}
          className="flex flex-col gap-3 sm:flex-row sm:gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="final-step" id="exit-after-final-step" />

            <Label
              htmlFor="exit-after-final-step"
              className="cursor-pointer font-normal"
            >
              Exit after the final journey step
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="condition" id="add-exit-condition" />

            <Label
              htmlFor="add-exit-condition"
              className="cursor-pointer font-normal"
            >
              Add exit condition
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Journey completed */}
      {exitMode === "final-step" && (
        <div className="rounded-lg border bg-muted/30 px-4 py-3">
          <p className="text-sm font-medium">Journey completed</p>

          <p className="mt-1 text-xs text-muted-foreground">
            The customer exits after the final journey step.
          </p>
        </div>
      )}

      {/* Exit conditions */}
      {exitMode === "condition" && (
        <div className="space-y-4">
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
                            {/* Exit condition */}
                            <AppSelect
                              value={condition.field}
                              onValueChange={(value) =>
                                updateCondition(block.id, condition.id, {
                                  field: value,
                                  operator: "",
                                  value: "",
                                })
                              }
                              placeholder="Select exit condition"
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
                                aria-label="Remove exit condition"
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
          >
            <Plus className="mr-2 size-4" />
            AND Condition
          </Button>

          {/* Information */}
          <div className="mt-4 flex items-start gap-2 rounded-md bg-primary/5 px-3 py-2.5">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" />

            <p className="text-xs text-muted-foreground">
              The customer will exit when at least one condition in every
              condition block is satisfied. Conditions within the same block use
              OR logic, while separate blocks use AND logic.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
