"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { EngagementSummaryDialog } from "./engagement-summary-dialog";
import { EngagementHistory } from "./engagement-history.types";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { getEngagementHistoryColumns } from "./columns";
import { engagementHistoryData } from "./engagement-history.data";
import { DataTable } from "@/app/customer-engagement/components/data-table/data-table";

export function EngagementHistoryTable() {
  const router = useRouter();

  const [summaryOpen, setSummaryOpen] = useState(false);

  const handleView = () => {
    setSummaryOpen(true);
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
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
      />
    </>
  );
}
