"use client";

import { Bell, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";

export function CustomerEngagementHeader() {
  return (
    <header className="sticky top-0 z-[60] flex h-12 shrink-0 items-center border-b bg-white px-3 shadow-sm">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger className="text-slate-600" />
        <Image
          src="/kiibank-logo.svg"
          alt="KiiBank Logo"
          width={72}
          height={72}
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden w-56 lg:block">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
          <Input
            className="h-8 bg-white pl-8 text-xs"
            placeholder="Search..."
          />
        </div>

        <button
          className="relative grid size-8 place-items-center rounded-full text-slate-600 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute right-1 top-1 size-1.5 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2 border-l pl-3">
          <div className="grid size-7 place-items-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
            AB
          </div>
          <div className="hidden leading-tight sm:block">
            <div className="text-xs font-semibold text-slate-800">
              Admin User
            </div>
            <div className="text-[10px] text-slate-500">KiiBank Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
