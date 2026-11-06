"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { OnboardingLifecycleEngagement } from "./onboarding-lifecycle.types";
import { getOnboardingLifecycleColumns } from "./columns";
import { onboardingLifecycleData } from "./onboarding-lifecycle.data";

import { DataTable } from "@/app/customer-engagement/components/data-table/data-table";

import { onboardingEngagement } from "../../components/engagement-summary/engagement-summary-data";
import { EngagementSummaryDialog } from "../../components/engagement-summary/engagement-summary-dialog";

import { EngagementActionDialog } from "@/app/customer-engagement/components/engagement-actions/engagement-action-dialog";
import { EngagementOtpDialog } from "@/app/customer-engagement/components/engagement-actions/engagement-otp-dialog";

import type {
  EngagementAction,
  ActionRequest,
  VerificationRequest,
} from "@/app/customer-engagement/components/engagement-actions/engagement-action.types";

type SelectedAction = {
  engagement: OnboardingLifecycleEngagement;
  action: EngagementAction;
};

export function OnboardingLifecycleTable() {
  const router = useRouter();

  const [summaryOpen, setSummaryOpen] = useState(false);

  const [selectedAction, setSelectedAction] = useState<SelectedAction | null>(
    null,
  );

  const [actionRequest, setActionRequest] = useState<ActionRequest | null>(
    null,
  );

  const [otpOpen, setOtpOpen] = useState(false);

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
    setSelectedAction({
      engagement,
      action,
    });
  };

  /**
   * User confirms the action in the first dialog.
   *
   * We close the confirmation dialog and open
   * the separate authenticator OTP dialog.
   */
  const handleActionConfirmation = (request: ActionRequest) => {
    setActionRequest(request);

    setSelectedAction(null);

    setOtpOpen(true);
  };

  const handleVerifyOtp = async (request: VerificationRequest) => {
    console.log("OTP verification requested:", {
      engagementId: request.engagementId,
      action: request.action,
      method: request.method,
    });

    // TODO:
    // Integrate OTP verification API here.
    //
    // Do not log the OTP code.
  };

  const handleExecuteAction = async (request: ActionRequest) => {
    console.log("Executing engagement action:", {
      engagementId: request.engagementId,
      action: request.action,
      reason: request.reason,
    });

    // TODO:
    // Integrate engagement action API here.
    //
    // Backend must verify:
    // - user permission
    // - OTP verification
    // - current engagement status
    // - allowed status transition
  };

  const handleOtpConfirm = async (otp: string) => {
    if (!actionRequest) {
      return;
    }

    await handleVerifyOtp({
      engagementId: actionRequest.engagementId,
      action: actionRequest.action,
      method: "authenticator",
      code: otp,
    });

    await handleExecuteAction(actionRequest);

    setOtpOpen(false);
    setActionRequest(null);
  };

  const handleTryAnotherWay = () => {
    // TODO:
    // Later open SMS / Email verification options.
    console.log("Try another verification method");
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
        engagement={onboardingEngagement}
      />

      {/* Action confirmation */}
      <EngagementActionDialog
        open={selectedAction !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAction(null);
          }
        }}
        engagementId={selectedAction?.engagement.engagementId ?? ""}
        engagementName={selectedAction?.engagement.name ?? ""}
        action={selectedAction?.action ?? null}
        onConfirm={handleActionConfirmation}
      />

      {/* Separate OTP verification */}
      <EngagementOtpDialog
        open={otpOpen}
        onOpenChange={(open) => {
          setOtpOpen(open);

          if (!open) {
            setActionRequest(null);
          }
        }}
        onConfirm={handleOtpConfirm}
        onTryAnotherWay={handleTryAnotherWay}
      />
    </>
  );
}
