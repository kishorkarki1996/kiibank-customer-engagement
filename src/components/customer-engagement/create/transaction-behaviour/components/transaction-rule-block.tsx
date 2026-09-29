"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { TransactionFieldConfig } from "../steps/data/behaviour-rule-data";

import {
  TransactionRuleRow,
  type TransactionRule,
} from "./transaction-rule-row";

export type TransactionRuleGroup = {
  id: string;
  conditions: TransactionRule[];
};

type TransactionRuleBlockProps = {
  block: TransactionRuleGroup;

  availableFields: TransactionFieldConfig[];

  canDeleteBlock: boolean;

  onAddOrCondition: () => void;

  onUpdateCondition: (
    ruleId: string,
    updates: Partial<TransactionRule>,
  ) => void;

  onRemoveCondition: (ruleId: string) => void;

  onRemoveBlock: () => void;
};

export function TransactionRuleBlock({
  block,
  availableFields,
  canDeleteBlock,
  onAddOrCondition,
  onUpdateCondition,
  onRemoveCondition,
  onRemoveBlock,
}: TransactionRuleBlockProps) {
  return (
    <div className="rounded-xl bg-muted/40 p-3">
      <div className="rounded-xl border bg-background p-4 shadow-sm">
        <div className="space-y-4">
          {block.conditions.map((rule, index) => (
            <div key={rule.id} className="space-y-4">
              {index > 0 && (
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 border-t border-dashed" />

                  <span className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-primary shadow-sm">
                    OR
                  </span>

                  <div className="h-px flex-1 border-t border-dashed" />
                </div>
              )}

              <TransactionRuleRow
                rule={rule}
                availableFields={availableFields}
                onUpdate={(updates) => onUpdateCondition(rule.id, updates)}
                onRemove={() => onRemoveCondition(rule.id)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center border-t pt-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onAddOrCondition}
          >
            <Plus className="mr-2 size-4" />
            OR Condition
          </Button>

          {canDeleteBlock && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemoveBlock}
              className="ml-auto text-destructive hover:text-destructive"
            >
              Delete Block
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
