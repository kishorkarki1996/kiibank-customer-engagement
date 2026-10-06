"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { EngagementSummaryDialog } from "./engagement-summary-dialog";
import { OnboardingLifecycleEngagement } from "./onboarding-lifecycle.types";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { getOnboardingLifecycleColumns } from "./columns";
import { onboardingLifecycleData } from "./onboarding-lifecycle.data";
import { DataTable } from "@/app/customer-engagement/components/data-table/data-table";

export function OnboardingLifecycleTable() {
  const router = useRouter();

  const [summaryOpen, setSummaryOpen] = useState(false);

  const handleView = () => {
    setSummaryOpen(true);
  };

  const handleEdit = (engagement: OnboardingLifecycleEngagement) => {
    router.push(
      `/customer-engagement/create?engagementId=${engagement.engagementId}`,
    );
  };

  const handleAction = (
    engagement: OnboardingLifecycleEngagement,
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
        data={onboardingLifecycleData}
        searchPlaceholder="Search engagements..."
      />

      <EngagementSummaryDialog
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
      />
    </>
  );
}
