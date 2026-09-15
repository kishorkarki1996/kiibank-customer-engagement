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
import TransactionBehaviourPage from "@/app/customer-engagement/create/transaction-behaviour/page";
import { TransactionBehaviourTable } from "./transaction-behaviour-table";

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

export default function OnboardingLifecyclePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-primary">Engagements</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            Transaction Behaviour
          </h1>
        </div>
        <Button asChild>
          <Link href="/customer-engagement/create/transaction-behaviour">
            <Plus className="mr-2 size-4" />
            Create engagement
          </Link>
        </Button>
      </div>

      <div>
        <TransactionBehaviourTable />
      </div>
    </div>
  );
}
