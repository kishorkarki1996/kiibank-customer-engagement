import { Filter, MoreHorizontal, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const rows = [
  {
    name: "New Customer Welcome Journey",
    audience: "12,482",
    channel: "Push + Email",
    status: "Active",
    updated: "Today, 10:24",
  },
  {
    name: "Dormant GBP → XAF Customers",
    audience: "3,106",
    channel: "WhatsApp",
    status: "Draft",
    updated: "Today, 09:12",
  },
  {
    name: "GBP/XAF Rate Alert",
    audience: "8,941",
    channel: "Push",
    status: "Scheduled",
    updated: "Yesterday",
  },
  {
    name: "MTN Cameroon Service Interruption",
    audience: "5,222",
    channel: "In-App + SMS",
    status: "Paused",
    updated: "Sep 7, 2026",
  },
  {
    name: "£5 Reactivation Cashback",
    audience: "1,904",
    channel: "Email + Push",
    status: "Active",
    updated: "Sep 6, 2026",
  },
];

const styles: Record<string, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Draft: "border-slate-200 bg-slate-50 text-slate-600",
  Scheduled: "border-sky-200 bg-sky-50 text-sky-700",
  Paused: "border-amber-200 bg-amber-50 text-amber-700",
};

export function OnboardingLifeCycleTable() {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      {/* Table Toolbar */}
      <div className="flex items-center justify-between gap-3 border-b p-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input placeholder="Search engagements..." className="pl-9" />
        </div>

        <Button variant={"outline"} className="shrink-0">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[860px] w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Engagement</th>
              <th className="px-5 py-3 font-medium">Audience</th>
              <th className="px-5 py-3 font-medium">Channel</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Updated</th>
              <th className="w-12" />
            </tr>
          </thead>

          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.name} className="hover:bg-slate-50/70">
                <td className="px-5 py-4">
                  <div className="font-medium text-slate-900">{r.name}</div>
                </td>

                <td className="px-5 py-4 text-slate-600">{r.audience}</td>

                <td className="px-5 py-4 text-slate-600">{r.channel}</td>

                <td className="px-5 py-4">
                  <Badge className={styles[r.status]}>{r.status}</Badge>
                </td>

                <td className="px-5 py-4 text-slate-500">{r.updated}</td>

                <td className="px-4">
                  <button className="rounded-md p-2 hover:bg-slate-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
