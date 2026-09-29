"use client";

import { Plus } from "lucide-react";

import { AppMultiSelect } from "@/components/common/app-multi-select";
import { Button } from "@/components/ui/button";

import {
  transactionActivityOptions,
  type TransactionFieldConfig,
} from "../steps/data/behaviour-rule-data";

import {
  TransactionRuleBlock,
  type TransactionRuleGroup,
} from "./transaction-rule-block";
type TransactionBehaviourRulesProps = {
  activities: string[];

  availableFields: TransactionFieldConfig[];

  conditionBlocks: TransactionRuleGroup[];

  onActivitiesChange: (values: string[]) => void;

  onAddOrCondition: (blockId: string) => void;

  onUpdateCondition: (
    blockId: string,
    ruleId: string,
    updates: Partial<TransactionRuleGroup["conditions"][number]>,
  ) => void;

  onRemoveCondition: (blockId: string, ruleId: string) => void;

  onAddAndBlock: () => void;

  onRemoveBlock: (blockId: string) => void;
};

export function TransactionBehaviourRules({
  activities,
  availableFields,
  conditionBlocks,
  onActivitiesChange,
  onAddOrCondition,
  onUpdateCondition,
  onRemoveCondition,
  onAddAndBlock,
  onRemoveBlock,
}: TransactionBehaviourRulesProps) {
  return (
    <div className="space-y-6">
      {/* Activity */}

      <section className="space-y-4">
        <div className="max-w-xl">
          <AppMultiSelect
            label="What customer activity do you want to evaluate?"
            items={transactionActivityOptions}
            value={activities}
            setValue={(value) => {
              const nextValue =
                typeof value === "function" ? value(activities) : value;

              onActivitiesChange(nextValue);
            }}
            placeholder="Select customer activity"
            required
          />
        </div>
      </section>

      {/* Rules */}

      {activities.length > 0 && (
        <section className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Define the behaviour conditions customers must meet.
          </p>

          {conditionBlocks.map((block, blockIndex) => (
            <div key={block.id} className="space-y-4">
              {/* AND separator */}

              {blockIndex > 0 && (
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 border-t border-dashed" />

                  <span className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-primary shadow-sm">
                    AND
                  </span>

                  <div className="h-px flex-1 border-t border-dashed" />
                </div>
              )}

              <TransactionRuleBlock
                block={block}
                availableFields={availableFields}
                canDeleteBlock={conditionBlocks.length >= 2}
                onAddOrCondition={() => onAddOrCondition(block.id)}
                onUpdateCondition={(ruleId, updates) =>
                  onUpdateCondition(block.id, ruleId, updates)
                }
                onRemoveCondition={(ruleId) =>
                  onRemoveCondition(block.id, ruleId)
                }
                onRemoveBlock={() => onRemoveBlock(block.id)}
              />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddAndBlock}
          >
            <Plus className="mr-2 size-4" />
            AND Condition
          </Button>
        </section>
      )}
    </div>
  );
}
