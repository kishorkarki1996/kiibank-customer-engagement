"use client";

import { useState } from "react";

import { TransactionBehaviourRules } from "../components/transaction-behaviour-rules";

import {
  getAvailableFields,
  type TransactionFieldConfig,
} from "./data/behaviour-rule-data";

import type {
  TransactionRule,
  TransactionRuleGroup,
} from "./data/transaction-rule-types";

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

export function ConversionStep() {
  const [activities, setActivities] = useState<string[]>([]);

  const [availableFields, setAvailableFields] = useState<
    TransactionFieldConfig[]
  >([]);

  const [conditionBlocks, setConditionBlocks] = useState<
    TransactionRuleGroup[]
  >([]);

  const handleActivitiesChange = (values: string[]) => {
    setActivities(values);

    const nextAvailableFields = getAvailableFields(values);

    setAvailableFields(nextAvailableFields);

    if (values.length === 0) {
      setConditionBlocks([]);
      return;
    }

    if (conditionBlocks.length === 0) {
      setConditionBlocks([createRuleGroup()]);
      return;
    }

    const validFieldValues = new Set(
      nextAvailableFields.map((field) => field.value),
    );

    setConditionBlocks((currentBlocks) =>
      currentBlocks.map((block) => ({
        ...block,

        conditions: block.conditions.map((condition) => {
          if (!condition.field || validFieldValues.has(condition.field)) {
            return condition;
          }

          return {
            ...condition,
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
      })),
    );
  };

  const handleAddOrCondition = (blockId: string) => {
    setConditionBlocks((currentBlocks) =>
      currentBlocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              conditions: [...block.conditions, createRule()],
            }
          : block,
      ),
    );
  };

  const handleUpdateCondition = (
    blockId: string,
    ruleId: string,
    updates: Partial<TransactionRule>,
  ) => {
    setConditionBlocks((currentBlocks) =>
      currentBlocks.map((block) => {
        if (block.id !== blockId) {
          return block;
        }

        return {
          ...block,

          conditions: block.conditions.map((condition) =>
            condition.id === ruleId
              ? {
                  ...condition,
                  ...updates,
                }
              : condition,
          ),
        };
      }),
    );
  };

  const handleRemoveCondition = (blockId: string, ruleId: string) => {
    setConditionBlocks((currentBlocks) =>
      currentBlocks.map((block) => {
        if (block.id !== blockId) {
          return block;
        }

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

  const handleAddAndBlock = () => {
    setConditionBlocks((currentBlocks) => [
      ...currentBlocks,
      createRuleGroup(),
    ]);
  };

  const handleRemoveBlock = (blockId: string) => {
    setConditionBlocks((currentBlocks) =>
      currentBlocks.filter((block) => block.id !== blockId),
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm text-muted-foreground">
        What customer action represents success?
      </h3>

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
        required={false}
      />
    </div>
  );
}
