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

export default function OnboardingLifecyclePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            Engagements
          </h1>
          <p>Category: Transaction Behvaiour</p>
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
