"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ArchivedEngagement } from "./archived-engagements.types";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { getOnboardingLifecycleColumns } from "./columns";
import { archivedEngagementsData } from "./archived-engagements.data";
import { DataTable } from "@/app/customer-engagement/components/data-table/data-table";

import { EngagementSummaryDialog } from "../../components/engagement-summary/engagement-summary-dialog";
import type { EngagementSummary } from "../../components/engagement-summary/engagement-summary-type";

export function ArchivedEngagementsTable() {
  const router = useRouter();

  const [selectedEngagement, setSelectedEngagement] =
    useState<EngagementSummary | null>(null);

  const handleView = (engagement: ArchivedEngagement) => {
    setSelectedEngagement(engagement.summary);
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
        open={selectedEngagement !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedEngagement(null);
          }
        }}
        engagement={selectedEngagement}
      />
    </>
  );
}
