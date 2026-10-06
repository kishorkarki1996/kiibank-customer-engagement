"use client";

import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";

export function TransactionBehaviourFilters() {
  return (
    <Button variant="outline">
      <Filter className="size-4" />
      Filter
    </Button>
  );
}
