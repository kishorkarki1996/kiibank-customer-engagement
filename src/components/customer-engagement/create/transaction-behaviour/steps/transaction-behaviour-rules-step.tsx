"use client";

import { useEffect, useMemo, useState } from "react";
import { Info } from "lucide-react";

import { AppMultiSelect } from "@/components/common/app-multi-select";
import { AppSelect } from "@/components/common/app-select";

import {
  behaviourFieldOptions,
  behaviourTypeOptions,
  type BehaviourType,
} from "./data/behaviour-rule-data";

export function BehaviourRulesStep() {
  const [behaviourTypes, setBehaviourTypes] = useState<string[]>([]);

  const [field, setField] = useState("");

  const fieldOptions = useMemo(() => {
    const selectedTypes = behaviourTypes as BehaviourType[];

    const combinedOptions = selectedTypes.flatMap(
      (type) => behaviourFieldOptions[type] ?? [],
    );

    return Array.from(
      new Map(combinedOptions.map((option) => [option.value, option])).values(),
    );
  }, [behaviourTypes]);

  useEffect(() => {
    if (!field) {
      return;
    }

    const fieldStillAvailable = fieldOptions.some(
      (option) => option.value === field,
    );

    if (!fieldStillAvailable) {
      setField("");
    }
  }, [fieldOptions, field]);

  return (
    <div className="space-y-6">
      <section className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <AppMultiSelect
            label="What customer activity do you want to evaluate?"
            items={behaviourTypeOptions}
            value={behaviourTypes}
            setValue={setBehaviourTypes}
            placeholder="Select customer activity"
          />

          <AppSelect
            label="Field"
            value={field}
            onValueChange={setField}
            placeholder={
              behaviourTypes.length
                ? "Select field"
                : "Select customer activity first"
            }
            options={fieldOptions}
            disabled={behaviourTypes.length === 0}
            required
          />
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />

          <p className="text-xs leading-5 text-muted-foreground">
            You can select more than one customer activity. The Field dropdown
            will combine the available fields from all selected activity types.
          </p>
        </div>
      </section>
    </div>
  );
}
