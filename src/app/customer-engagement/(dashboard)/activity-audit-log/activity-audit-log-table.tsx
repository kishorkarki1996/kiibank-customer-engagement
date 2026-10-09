"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { EngagementSummaryDialog } from "./engagement-summary-dialog";
import { ActivityAuditLog } from "./activity-audit-log.types";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { getEngagementHistoryColumns } from "./columns";
import { activityAuditLogData } from "./activity-audit-log.data";
import { DataTable } from "@/app/customer-engagement/components/data-table/data-table";

export function ActivityAuditLogTable() {
  const router = useRouter();

  const [summaryOpen, setSummaryOpen] = useState(false);

  const handleView = () => {
    setSummaryOpen(true);
  };

  const handleEdit = (engagement: ActivityAuditLog) => {
    router.push(`/customer-engagement/create?engagementId=${engagement.id}`);
  };

  const handleAction = (
    engagement: ActivityAuditLog,
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
        data={activityAuditLogData}
        searchPlaceholder="Search activity logs..."
      />

      <EngagementSummaryDialog
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
      />
    </>
  );
}
