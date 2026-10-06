"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { EngagementSummaryDialog } from "./engagement-summary-dialog";
import { TransactionBehaviourEngagement } from "./transaction-behaviour.types";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { getTransactionBehaviourColumns } from "./columns";
import { transactionBehaviourData } from "./transaction-behaviour.data";
import { DataTable } from "@/app/customer-engagement/components/data-table/data-table";

export function TransactionBehaviourTable() {
  const router = useRouter();

  const [summaryOpen, setSummaryOpen] = useState(false);

  const handleView = () => {
    setSummaryOpen(true);
  };

  const handleEdit = (engagement: TransactionBehaviourEngagement) => {
    router.push(
      `/customer-engagement/create?engagementId=${engagement.engagementId}`,
    );
  };

  const handleAction = (
    engagement: TransactionBehaviourEngagement,
    action: EngagementAction,
  ) => {
    console.log(action, engagement);
  };

  const columns = useMemo(
    () =>
      getTransactionBehaviourColumns({
        onView: handleView,
        onEdit: handleEdit,
        onAction: handleAction,
      }),
    [],
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={transactionBehaviourData}
        searchPlaceholder="Search engagements..."
      />

      <EngagementSummaryDialog
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
      />
    </>
  );
}
