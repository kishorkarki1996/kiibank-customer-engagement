"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { EngagementSummaryDialog } from "./engagement-summary-dialog";
import { OnboardingLifecycleEngagement } from "./onboarding-lifecycle.types";
import { EngagementAction } from "@/app/customer-engagement/components/engagement.type";
import { getOnboardingLifecycleColumns } from "./columns";
import { onboardingLifecycleData } from "./onboarding-lifecycle.data";
import { DataTable } from "@/app/customer-engagement/components/data-table/data-table";
import { EngagementActionConfirmationDialog } from "../../components/engagement-action-confirmation-dialog";

export function OnboardingLifecycleTable() {
  const router = useRouter();

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [selectedEngagement, setSelectedEngagement] =
    useState<OnboardingLifecycleEngagement | null>(null);

  const [selectedAction, setSelectedAction] = useState<EngagementAction | null>(
    null,
  );

  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleView = () => {
    setSummaryOpen(true);
  };

  const handleEdit = (engagement: OnboardingLifecycleEngagement) => {
    router.push(`/customer-engagement/create/onboarding-and-lifecycle`);
  };

  const handleAction = (
    engagement: OnboardingLifecycleEngagement,
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

    console.log("Confirmed action:", selectedAction, selectedEngagement);

    // Later:
    // await executeEngagementAction(...)

    setConfirmationOpen(false);
    setSelectedAction(null);
    setSelectedEngagement(null);
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
