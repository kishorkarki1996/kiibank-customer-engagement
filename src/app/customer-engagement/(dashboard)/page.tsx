import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Megaphone,
  MousePointerClick,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EngagementTable } from "@/components/engagement-table";

const metrics = [
  {
    label: "Active engagements",
    value: "18",
    detail: "4 scheduled",
    icon: Megaphone,
  },
  {
    label: "Customers reached",
    value: "42.8K",
    detail: "Last 30 days",
    icon: MousePointerClick,
  },
  {
    label: "Delivery rate",
    value: "96.4%",
    detail: "Across all channels",
    icon: CheckCircle2,
  },
  {
    label: "Needs review",
    value: "3",
    detail: "Draft or paused",
    icon: Clock3,
  },
];

export default function CustomerEngagementPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            Customer Engagement
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            Engagement overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, automate and monitor customer communications from one place.
          </p>
        </div>
        <Button asChild>
          <Link href="/customer-engagement/new">
            <Plus className="mr-2 size-4" />
            Create engagement
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, icon: Icon }) => (
          <Card key={label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="mt-2 text-2xl font-bold">{value}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {detail}
                </div>
              </div>
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border border-primary/15 bg-gradient-to-r from-primary/8 to-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-semibold">
              Build targeted engagement journeys
            </div>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Choose a category, define who qualifies, configure triggers and
              communication steps, then preview the final audience before
              activation.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/customer-engagement/engagements/new">
              Open builder <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Recent engagements</h2>
            <p className="text-sm text-muted-foreground">
              Latest customer journeys and operational communications.
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/customer-engagement/engagements">View all</Link>
          </Button>
        </div>
        <EngagementTable />
      </div>
    </div>
  );
}
