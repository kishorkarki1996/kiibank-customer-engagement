"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function CreateCustomerEngagementHeader() {
  return (
    <header className="sticky top-0 z-[60] flex h-12 shrink-0 items-center border-b bg-white px-3 shadow-sm">
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between gap-2">
        <Image
          src="/kiibank-logo.svg"
          alt="KiiBank Logo"
          width={72}
          height={72}
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm">
              <X className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Exit</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
