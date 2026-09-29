"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
  className?: string;
};

export function DatePicker({
  label,
  placeholder = "Select date",
  required = false,
  value,
  onChange,
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    onChange(date);

    if (date) {
      setOpen(false);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      {label && (
        <Label>
          {label}

          {required && (
            <span className="ml-1 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            aria-required={required}
            data-empty={!value}
            className={cn(
              "w-full justify-start text-left font-normal",
              "data-[empty=true]:text-muted-foreground",
            )}
          >
            <CalendarIcon className="size-4" />

            {value ? value.toLocaleDateString() : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={value} onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
