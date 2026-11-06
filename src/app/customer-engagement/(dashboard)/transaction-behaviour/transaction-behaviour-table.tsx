"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/app/customer-engagement/components/data-table/data-table";
import { EngagementActionDialog } from "@/app/customer-engagement/components/engagement-actions/engagement-action-dialog";
import { EngagementOtpDialog } from "@/app/customer-engagement/components/engagement-actions/engagement-otp-dialog";
import type {
  ActionRequest,
  EngagementAction,
  VerificationRequest,
} from "@/app/customer-engagement/components/engagement-actions/engagement-action.types";

import { getTransactionBehaviourColumns } from "./columns";
import { transactionBehaviourData } from "./transaction-behaviour.data";

import type { TransactionBehaviourEngagement } from "./transaction-behaviour.types";
import { transactionEngagement } from "../../components/engagement-summary/engagement-summary-data";
import { EngagementSummaryDialog } from "../../components/engagement-summary/engagement-summary-dialog";

type SelectedAction = {
  engagement: TransactionBehaviourEngagement;
  action: EngagementAction;
};

const actionSuccessMessages: Record<EngagementAction, string> = {
  edit: "Engagement edit confirmed.",
  approve: "Engagement approved successfully.",
  activate: "Engagement activated successfully.",
  pause: "Engagement paused successfully.",
  resume: "Engagement resumed successfully.",
  cancel: "Engagement canceled successfully.",
  delete: "Engagement deleted successfully.",
};

export function TransactionBehaviourTable() {
  const router = useRouter();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<SelectedAction | null>(
    null,
  );
  const [actionRequest, setActionRequest] = useState<ActionRequest | null>(null);
  const [otpOpen, setOtpOpen] = useState(false);

  const handleView = () => {
    setSummaryOpen(true);
  };

  const handleEdit = (engagement: TransactionBehaviourEngagement) => {
    router.push(
      `/customer-engagement/create/transaction-behaviour?engagementId=${engagement.engagementId}`,
    );
  };

  const handleAction = (
    engagement: TransactionBehaviourEngagement,
    action: EngagementAction,
  ) => {
    setSelectedAction({ engagement, action });
  };

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

    // TODO: Integrate OTP verification API. Do not log the OTP code.
  };

  const handleExecuteAction = async (request: ActionRequest) => {
    console.log("Executing engagement action:", {
      engagementId: request.engagementId,
      action: request.action,
      reason: request.reason,
    });

    // TODO: Integrate the engagement action API.
  };

  const handleTryAnotherWay = () => {
    // TODO: Add SMS and email verification options.
    console.log("Try another verification method");
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
    toast.success(actionSuccessMessages[actionRequest.action]);

    setOtpOpen(false);
    setActionRequest(null);
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
        engagement={transactionEngagement}
      />
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
