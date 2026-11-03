"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { EngagementHistory } from "./engagement-history.types";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { getEngagementHistoryColumns } from "./columns";
import { engagementHistoryData } from "./engagement-history.data";
import { DataTable } from "@/app/customer-engagement/components/data-table/data-table";
import { EngagementSummaryDialog } from "../../components/engagement-summary/engagement-summary-dialog";
import { EngagementSummary } from "../../components/engagement-summary/engagement-summary-type";

export function EngagementHistoryTable() {
  const router = useRouter();

  const [selectedEngagement, setSelectedEngagement] =
    useState<EngagementSummary | null>(null);

  const handleView = (engagement: EngagementHistory) => {
    // Use the full summary stored on the history row
    setSelectedEngagement(engagement.summary);
  };

  const handleEdit = (engagement: EngagementHistory) => {
    router.push(`/customer-engagement/create?engagementId=${engagement.id}`);
  };

  const handleAction = (
    engagement: EngagementHistory,
    action: EngagementAction,
  ) => {
    console.log(action, engagement);
  };

  const columns = useMemo(
    () =>
      getEngagementHistoryColumns({
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
        data={engagementHistoryData}
        searchPlaceholder="Search engagements..."
      />

      <EngagementSummaryDialog
        open={selectedEngagement !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedEngagement(null);
        }}
        engagement={selectedEngagement}
      />
    </>
  );
}
