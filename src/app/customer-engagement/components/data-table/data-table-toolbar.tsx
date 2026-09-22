"use client";

import type { ReactNode } from "react";

import { Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DataTableToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  actions?: ReactNode;
};

export function DataTableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  actions,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b p-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button variant="outline">
          <Filter className="size-4" />
          Filter
        </Button>

        {actions}
      </div>
    </div>
  );
}
