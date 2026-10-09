"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { EngagementSummaryDialog } from "./engagement-summary-dialog";
import {
  ArchivedEngagement,
  ArchivedEngagementStatus,
} from "./archived-engagements.types";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { getOnboardingLifecycleColumns } from "./columns";
import { archivedEngagementsData } from "./archived-engagements.data";
import { DataTable } from "@/app/customer-engagement/components/data-table/data-table";

export function ArchivedEngagementsTable() {
  const router = useRouter();

  const [summaryOpen, setSummaryOpen] = useState(false);

  const handleView = () => {
    setSummaryOpen(true);
  };

  const handleEdit = (engagement: ArchivedEngagement) => {
    router.push(
      `/customer-engagement/create?engagementId=${engagement.engagementId}`,
    );
  };

  const handleAction = (
    engagement: ArchivedEngagement,
    action: EngagementAction,
  ) => {
    console.log(action, engagement);
  };

  const columns = useMemo(
    () =>
      getOnboardingLifecycleColumns({
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
        data={archivedEngagementsData}
        searchPlaceholder="Search engagements..."
      />

      <EngagementSummaryDialog
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
      />
    </>
  );
}
