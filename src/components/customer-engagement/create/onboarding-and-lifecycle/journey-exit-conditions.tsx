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
   * Create a completely new OR block.
   *
   * Blocks are connected with AND.
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
   * If it was the only condition in that block:
   * - remove the block when multiple blocks exist
   * - otherwise keep one empty condition
   */
  const removeCondition = (blockId: number, conditionId: number) => {
    setConditionBlocks((blocks) => {
      const updatedBlocks = blocks
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

          return blocks.length === 1;
        });

      /**
       * Always keep at least one block with one condition.
       */
      if (updatedBlocks.length === 0) {
        return [createConditionBlock()];
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

      return updatedBlocks;
    });
  };

  /**
   * Delete an entire OR block.
   *
   * The delete block action is only available when
   * there are multiple AND blocks.
   */
  const removeBlock = (blockId: number) => {
    setConditionBlocks((blocks) => {
      if (blocks.length <= 1) {
        return blocks;
      }

      return blocks.filter((block) => block.id !== blockId);
    });
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
          The customer exits after the final journey step.
        </p>
      </div>

      <div className="space-y-4">
        {conditionBlocks.map((block, blockIndex) => (
          <div key={block.id}>
            {/* AND divider between OR blocks */}
            {blockIndex > 0 && (
              <div className="flex items-center gap-3 py-3">
                <div className="h-px flex-1 bg-border" />

                <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-primary shadow-sm ring-1 ring-border">
                  AND
                </span>

                <div className="h-px flex-1 bg-border" />
              </div>
            )}

            {/* OR block */}
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="rounded-lg bg-background p-3 shadow-sm">
                <div className="space-y-3">
                  {block.conditions.map((condition, conditionIndex) => {
                    const isCustomerStatus =
                      condition.field === "customer-status";

                    const isAccountStatus =
                      condition.field === "account-status";

                    const isTransactionCount =
                      condition.field === "successful-transaction-count";

                    return (
                      <div key={condition.id}>
                        {/* OR divider between conditions */}
                        {conditionIndex > 0 && (
                          <div className="flex items-center gap-3 py-1">
                            <div className="h-px flex-1 bg-border" />

                            <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-primary shadow-sm ring-1 ring-border">
                              OR
                            </span>

                            <div className="h-px flex-1 bg-border" />
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
                            options={exitConditionOptions}
                            triggerClassName="min-w-0"
                            triggerProps={{
                              className: "min-w-0",
                            }}
                          />

                          {/* Operator */}
                          {isCustomerStatus || isAccountStatus ? (
                            <AppSelect
                              value={condition.operator}
                              onValueChange={(value) =>
                                updateCondition(block.id, condition.id, {
                                  operator: value,
                                })
                              }
                              placeholder="Select operator"
                              options={statusOperatorOptions}
                              triggerClassName="min-w-0"
                              triggerProps={{
                                className: "min-w-0",
                              }}
                            />
                          ) : isTransactionCount ? (
                            <AppSelect
                              value={condition.operator}
                              onValueChange={(value) =>
                                updateCondition(block.id, condition.id, {
                                  operator: value,
                                })
                              }
                              placeholder="Select operator"
                              options={countOperatorOptions}
                              triggerClassName="min-w-0"
                              triggerProps={{
                                className: "min-w-0",
                              }}
                            />
                          ) : (
                            <div />
                          )}

                          {/* Value */}
                          {isCustomerStatus ? (
                            <AppSelect
                              value={condition.value}
                              onValueChange={(value) =>
                                updateCondition(block.id, condition.id, {
                                  value,
                                })
                              }
                              placeholder="Select status"
                              options={customerStatusOptions}
                              triggerClassName="min-w-0"
                              triggerProps={{
                                className: "min-w-0",
                              }}
                            />
                          ) : isAccountStatus ? (
                            <AppSelect
                              value={condition.value}
                              onValueChange={(value) =>
                                updateCondition(block.id, condition.id, {
                                  value,
                                })
                              }
                              placeholder="Select account status"
                              options={accountStatusOptions}
                              triggerClassName="min-w-0"
                              triggerProps={{
                                className: "min-w-0",
                              }}
                            />
                          ) : isTransactionCount ? (
                            <Input
                              type="number"
                              min={0}
                              value={condition.value}
                              onChange={(event) =>
                                updateCondition(block.id, condition.id, {
                                  value: event.target.value,
                                })
                              }
                              placeholder="Enter count"
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

                  {/* Add OR condition */}
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
                </div>

                {/* Delete OR block */}
                {conditionBlocks.length > 1 && (
                  <div className="mt-1 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBlock(block.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      Delete Block
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add AND block */}
        <Button type="button" variant="outline" size="sm" onClick={addAndBlock}>
          <Plus className="mr-2 size-4" />
          AND Condition
        </Button>
      </div>
    </div>
  );
}
