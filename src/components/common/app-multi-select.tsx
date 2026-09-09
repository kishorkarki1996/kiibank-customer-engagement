"use client";

import { useRef } from "react";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type AppMultiSelectProps = {
  items: string[];
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;

  label?: string;
  placeholder?: string;
  emptyMessage?: string;

  required?: boolean;
  disabled?: boolean;

  hint?: string;
  error?: string;

  className?: string;
};

export function AppMultiSelect({
  items,
  value,
  setValue,
  label,
  placeholder = "Select options",
  emptyMessage = "No items found.",
  required = false,
  disabled = false,
  hint,
  error,
  className,
}: AppMultiSelectProps) {
  const anchor = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-2">
      {label && (
        <Label>
          {label}

          {required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      )}

      <Combobox
        multiple
        autoHighlight
        items={items}
        value={value}
        onValueChange={(values) => {
          setValue(values);
        }}
        disabled={disabled}
      >
        <ComboboxChips
          ref={anchor}
          className={cn("w-full", error && "border-destructive", className)}
        >
          <ComboboxValue>
            {(values) => (
              <>
                {values.map((value: string) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}

                <ComboboxChipsInput
                  placeholder={values.length === 0 ? placeholder : undefined}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>

          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
