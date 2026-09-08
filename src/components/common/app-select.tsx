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

  placeholder?: string;

  triggerClassName?: string;
  triggerProps?: Omit<SelectTriggerProps, "children">;
  contentProps?: SelectContentProps;

  children?: ReactNode;
};

export function AppSelect({
  options,
  groups,
  placeholder = "Select an option",
  triggerClassName,
  triggerProps,
  contentProps,
  children,
  ...selectProps
}: AppSelectProps) {
  return (
    <Select {...selectProps}>
      <SelectTrigger
        {...triggerProps}
        className={cn("w-full", triggerClassName, triggerProps?.className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent {...contentProps}>
        {groups?.map((group, index) => (
          <SelectGroup key={`${group.label}-${index}`}>
            {group.label && <SelectLabel>{group.label}</SelectLabel>}

            {group.options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
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
  );
}
