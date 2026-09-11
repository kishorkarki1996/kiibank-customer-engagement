"use client";

import { ComponentProps, ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type AppSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type AppSelectGroup = {
  label?: string;
  options: AppSelectOption[];
};

type SelectProps = ComponentProps<typeof Select>;

type SelectTriggerProps = ComponentProps<typeof SelectTrigger>;

type SelectContentProps = ComponentProps<typeof SelectContent>;

type AppSelectProps = SelectProps & {
  options?: AppSelectOption[];
  groups?: AppSelectGroup[];

  label?: string;

  placeholder?: string;

  triggerClassName?: string;

  triggerProps?: Omit<SelectTriggerProps, "children">;

  contentProps?: SelectContentProps;

  children?: ReactNode;
};

export function AppSelect({
  options,
  groups,
  label,
  placeholder = "Select an option",
  triggerClassName,
  triggerProps,
  contentProps,
  children,
  ...selectProps
}: AppSelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label>
          {label}
          {selectProps.required && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </Label>
      )}

      <Select {...selectProps}>
        <SelectTrigger
          {...triggerProps}
          className={cn("w-full", triggerClassName, triggerProps?.className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent {...contentProps}>
          {groups?.map((group, index) => (
            <SelectGroup
              key={`${group.label}-${index}`}
              className={cn(index !== 0 && "mt-3")}
            >
              {group.label && (
                <SelectLabel className="px-2 pb-0 pt-0 text-xs font-semibold text-muted-foreground">
                  {group.label}
                </SelectLabel>
              )}

              <div>
                {group.options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </div>
            </SelectGroup>
          ))}

          {!groups &&
            options?.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}

          {children}
        </SelectContent>
      </Select>
    </div>
  );
}
