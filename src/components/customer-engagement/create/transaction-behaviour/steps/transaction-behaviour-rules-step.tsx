"use client";

import { useState } from "react";

import { getAvailableFields } from "../steps/data/behaviour-rule-data";

import { TransactionBehaviourRules } from "../components/transaction-behaviour-rules";

import { type TransactionRuleGroup } from "../components/transaction-rule-block";

import type { TransactionRule } from "../components/transaction-rule-row";

function createRule(): TransactionRule {
  return {
    id: crypto.randomUUID(),

    field: "",
    operator: "",

    value: "",
    valueTo: "",

    period: "",
    periodValue: "",

    customFrom: undefined,
    customTo: undefined,
  };
}

function createRuleGroup(): TransactionRuleGroup {
  return {
    id: crypto.randomUUID(),

    conditions: [createRule()],
  };
}

export function TransactionBehaviourRulesStep() {
  const [activities, setActivities] = useState<string[]>([]);

  const [conditionBlocks, setConditionBlocks] = useState<
    TransactionRuleGroup[]
  >([]);

  const availableFields = getAvailableFields(activities);

  /**
   * Activity selection
   */

  const handleActivitiesChange = (values: string[]) => {
    setActivities(values);

    const nextFields = getAvailableFields(values);

    const validFields = new Set(nextFields.map((field) => field.value));

    setConditionBlocks((blocks) => {
      /**
       * First selected activity:
       * automatically create first block.
       */
      if (values.length > 0 && blocks.length === 0) {
        return [createRuleGroup()];
      }

      /**
       * Clear only rules whose selected
       * field is no longer valid.
       */
      return blocks.map(
        (block): TransactionRuleGroup => ({
          ...block,

          conditions: block.conditions.map((rule): TransactionRule => {
            if (!rule.field || validFields.has(rule.field)) {
              return rule;
            }

            return {
              ...rule,

              field: "",
              operator: "",

              value: "",
              valueTo: "",

              period: "",
              periodValue: "",

              customFrom: undefined,

              customTo: undefined,
            };
          }),
        }),
      );
    });
  };

  /**
   * Add OR condition
   *
   * Adds another rule inside
   * the same block.
   */

  const handleAddOrCondition = (blockId: string) => {
    setConditionBlocks((blocks) =>
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,

              conditions: [...block.conditions, createRule()],
            }
          : block,
      ),
    );
  };

  /**
   * Add AND block
   *
   * Adds another complete block.
   */

  const handleAddAndBlock = () => {
    setConditionBlocks((blocks) => [...blocks, createRuleGroup()]);
  };

  /**
   * Update rule
   */

  const handleUpdateCondition = (
    blockId: string,
    ruleId: string,
    updates: Partial<TransactionRule>,
  ) => {
    setConditionBlocks((blocks) =>
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,

              conditions: block.conditions.map((rule) =>
                rule.id === ruleId
                  ? {
                      ...rule,
                      ...updates,
                    }
                  : rule,
              ),
            }
          : block,
      ),
    );
  };

  /**
   * Remove OR condition
   */

  const handleRemoveCondition = (blockId: string, ruleId: string) => {
    setConditionBlocks((blocks) =>
      blocks.map((block) => {
        if (block.id !== blockId) {
          return block;
        }

        /**
         * If this is the last condition
         * in the block, keep one empty rule.
         */
        if (block.conditions.length === 1) {
          return {
            ...block,

            conditions: [createRule()],
          };
        }

        return {
          ...block,

          conditions: block.conditions.filter(
            (condition) => condition.id !== ruleId,
          ),
        };
      }),
    );
  };

  /**
   * Delete entire block
   */

  const handleRemoveBlock = (blockId: string) => {
    setConditionBlocks((blocks) =>
      blocks.filter((block) => block.id !== blockId),
    );
  };

  return (
    <TransactionBehaviourRules
      activities={activities}
      availableFields={availableFields}
      conditionBlocks={conditionBlocks}
      onActivitiesChange={handleActivitiesChange}
      onAddOrCondition={handleAddOrCondition}
      onUpdateCondition={handleUpdateCondition}
      onRemoveCondition={handleRemoveCondition}
      onAddAndBlock={handleAddAndBlock}
      onRemoveBlock={handleRemoveBlock}
    />
  );
}
