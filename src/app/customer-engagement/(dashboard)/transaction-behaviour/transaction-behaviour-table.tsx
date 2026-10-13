"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/app/customer-engagement/components/data-table/data-table";
import { EngagementActionConfirmationDialog } from "@/app/customer-engagement/components/engagement-action-confirmation-dialog";

import type { EngagementAction } from "@/app/customer-engagement/components/engagement.type";

import { getTransactionBehaviourColumns } from "./columns";
import { transactionBehaviourData } from "./transaction-behaviour.data";

import type { TransactionBehaviourEngagement } from "./transaction-behaviour.types";
import { EngagementSummaryDialog } from "./engagement-summary-dialog";

export function TransactionBehaviourTable() {
  const router = useRouter();
  const [summaryOpen, setSummaryOpen] = useState(false);

  const [selectedEngagement, setSelectedEngagement] =
    useState<TransactionBehaviourEngagement | null>(null);

  const [selectedAction, setSelectedAction] = useState<EngagementAction | null>(
    null,
  );

  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleView = (engagement: TransactionBehaviourEngagement) => {
    console.log("View", engagement);
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
    setSelectedEngagement(engagement);
    setSelectedAction(action);
    setConfirmationOpen(true);
  };

  const handleConfirmAction = () => {
    if (!selectedEngagement || !selectedAction) {
      return;
    }

    console.log("Confirmed:", selectedAction, selectedEngagement);

    setConfirmationOpen(false);
    setSelectedAction(null);
    setSelectedEngagement(null);
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
      <EngagementActionConfirmationDialog
        open={confirmationOpen}
        onOpenChange={setConfirmationOpen}
        action={selectedAction}
        engagementName={selectedEngagement?.name}
        onConfirm={handleConfirmAction}
      />
    </>
  );
}
