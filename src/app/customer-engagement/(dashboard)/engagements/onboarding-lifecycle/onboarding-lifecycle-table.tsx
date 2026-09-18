"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Edit,
  Eye,
  Filter,
  KeyRound,
  MoreHorizontal,
  Pause,
  Play,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type EngagementStatus =
  | "Active"
  | "Draft"
  | "Scheduled"
  | "Paused"
  | "Pending Approval"
  | "Completed"
  | "Expired"
  | "Canceled";

type ActionType =
  | "approve"
  | "activate"
  | "pause"
  | "resume"
  | "cancel"
  | "delete";

type Engagement = {
  id: number;
  engagementId: string;
  name: string;
  type: string;
  status: EngagementStatus;
  owner: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  startDate: string;
  endDate: string;
  nextExecution: string;
  lastExecution: string;
  lastUpdated: string;
};

const rows: Engagement[] = [
  {
    id: 1,
    engagementId: "ENG-2026-00124",
    name: "New Customer Welcome Journey",
    type: "Customer Journey",
    status: "Active",
    owner: "John Kamau",
    priority: "High",
    startDate: "Sep 10, 2026",
    endDate: "",
    nextExecution: "Sep 18, 2026 10:00",
    lastExecution: "Sep 17, 2026 10:00",
    lastUpdated: "Sep 17, 2026 10:24",
  },
  {
    id: 2,
    engagementId: "ENG-2026-00123",
    name: "Dormant GBP → XAF Customers",
    type: "Customer Journey",
    status: "Draft",
    owner: "Mary Wanjiku",
    priority: "Medium",
    startDate: "",
    endDate: "",
    nextExecution: "",
    lastExecution: "",
    lastUpdated: "Sep 17, 2026 09:12",
  },
  {
    id: 3,
    engagementId: "ENG-2026-00122",
    name: "GBP/XAF Rate Alert",
    type: "Event Based",
    status: "Scheduled",
    owner: "David Ochieng",
    priority: "High",
    startDate: "Sep 15, 2026",
    endDate: "",
    nextExecution: "Event Triggered",
    lastExecution: "Sep 16, 2026 14:32",
    lastUpdated: "Sep 16, 2026 14:35",
  },
  {
    id: 4,
    engagementId: "ENG-2026-00121",
    name: "MTN Cameroon Service Interruption",
    type: "Event Based",
    status: "Paused",
    owner: "Grace Njeri",
    priority: "Critical",
    startDate: "Sep 7, 2026",
    endDate: "",
    nextExecution: "",
    lastExecution: "Sep 12, 2026 11:20",
    lastUpdated: "Sep 12, 2026 11:25",
  },
  {
    id: 5,
    engagementId: "ENG-2026-00120",
    name: "£5 Reactivation Cashback",
    type: "Scheduled",
    status: "Pending Approval",
    owner: "Peter Mwangi",
    priority: "Low",
    startDate: "",
    endDate: "",
    nextExecution: "",
    lastExecution: "",
    lastUpdated: "Sep 16, 2026 16:45",
  },
];

const statusStyles: Record<EngagementStatus, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Draft: "border-slate-200 bg-slate-50 text-slate-600",
  Scheduled: "border-sky-200 bg-sky-50 text-sky-700",
  Paused: "border-amber-200 bg-amber-50 text-amber-700",
  "Pending Approval": "border-purple-200 bg-purple-50 text-purple-700",
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Expired: "border-slate-200 bg-slate-50 text-slate-600",
  Canceled: "border-red-200 bg-red-50 text-red-700",
};

const priorityStyles: Record<Engagement["priority"], string> = {
  Critical: "border-red-200 bg-red-50 text-red-700",
  High: "border-orange-200 bg-orange-50 text-orange-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  Low: "border-slate-200 bg-slate-50 text-slate-600",
};

const summaryRows = [
  {
    label: "Engagement ID",
    key: "engagementId",
  },
  {
    label: "Engagement Name",
    key: "name",
  },
  {
    label: "Engagement Type",
    key: "type",
  },
  {
    label: "Status",
    key: "status",
  },
  {
    label: "Owner",
    key: "owner",
  },
  {
    label: "Priority",
    key: "priority",
  },
  {
    label: "Start Date",
    key: "startDate",
  },
  {
    label: "End Date",
    key: "endDate",
  },
  {
    label: "Next Execution",
    key: "nextExecution",
  },
  {
    label: "Last Execution",
    key: "lastExecution",
  },
  {
    label: "Last Updated",
    key: "lastUpdated",
  },
] as const;

function canEdit(status: EngagementStatus) {
  return ![
    "Scheduled",
    "Active",
    "Paused",
    "Completed",
    "Expired",
    "Canceled",
  ].includes(status);
}

function canApprove(status: EngagementStatus) {
  return status === "Pending Approval";
}

function canActivate(status: EngagementStatus) {
  return status === "Draft";
}

function canPause(status: EngagementStatus) {
  return status === "Scheduled" || status === "Active";
}

function canResume(status: EngagementStatus) {
  return status === "Paused";
}

function canCancel(status: EngagementStatus) {
  return !["Completed", "Expired", "Canceled"].includes(status);
}

function canDelete(status: EngagementStatus) {
  return status === "Draft" || status === "Pending Approval";
}

export function OnboardingLifeCycleTable() {
  const router = useRouter();

  const [selectedEngagement, setSelectedEngagement] =
    useState<Engagement | null>(null);

  const [summaryOpen, setSummaryOpen] = useState(false);

  const [actionType, setActionType] = useState<ActionType | null>(null);

  const [reason, setReason] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const openSummary = (engagement: Engagement) => {
    setSelectedEngagement(engagement);
    setSummaryOpen(true);
  };

  const openAction = (engagement: Engagement, action: ActionType) => {
    setSelectedEngagement(engagement);
    setActionType(action);
    setReason("");
    setOtp("");
    setConfirmationOpen(true);
  };

  const handleEdit = (engagement: Engagement) => {
    router.push(
      `/customer-engagement/create?engagementId=${engagement.engagementId}`,
    );
  };

  const handleConfirmation = () => {
    if (!selectedEngagement || !actionType) {
      return;
    }

    if (
      actionType === "pause" ||
      actionType === "resume" ||
      actionType === "cancel"
    ) {
      if (!reason.trim()) {
        return;
      }
    }

    setConfirmationOpen(false);

    if (actionType === "delete") {
      handleDelete();
      return;
    }

    setOtpOpen(true);
  };

  const handleOtpSubmit = () => {
    if (!otp.trim()) {
      return;
    }

    /*
     * TODO:
     * Call your backend API here to verify the Google Authenticator OTP
     * and execute the selected action.
     *
     * Example:
     *
     * await executeEngagementAction({
     *   engagementId: selectedEngagement.engagementId,
     *   action: actionType,
     *   reason,
     *   otp,
     * });
     */

    setOtpOpen(false);
    setActionType(null);
    setReason("");
    setOtp("");
  };

  const handleDelete = () => {
    /*
     * TODO:
     * Call your backend API here.
     *
     * The engagement configuration should be deleted,
     * but its audit log must remain.
     */

    setActionType(null);
    setReason("");
  };

  const getActionTitle = () => {
    switch (actionType) {
      case "approve":
        return "Approve Engagement";
      case "activate":
        return "Activate Engagement";
      case "pause":
        return "Pause Engagement";
      case "resume":
        return "Resume Engagement";
      case "cancel":
        return "Cancel Engagement";
      case "delete":
        return "Delete Engagement";
      default:
        return "";
    }
  };

  const getActionDescription = () => {
    switch (actionType) {
      case "approve":
        return "Are you sure you want to approve this engagement? It will be moved to Scheduled status.";
      case "activate":
        return "Are you sure you want to activate this engagement? It will be moved to Scheduled status.";
      case "pause":
        return "Pausing this engagement will temporarily stop it from running.";
      case "resume":
        return "Resuming this engagement will allow it to continue running.";
      case "cancel":
        return "Canceling this engagement will permanently stop it from running.";
      case "delete":
        return "This will permanently delete the engagement configuration. The audit log will be retained.";
      default:
        return "";
    }
  };

  const requiresReason =
    actionType === "pause" ||
    actionType === "resume" ||
    actionType === "cancel";

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-xl border bg-white">
      {/* Toolbar */}
      <div className="flex w-full min-w-0 items-center justify-between gap-3 border-b p-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input placeholder="Search engagements..." className="pl-9" />
        </div>

        <Button variant="outline" className="shrink-0">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Table */}
      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-max min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="w-16 px-5 py-3 font-medium">#SN</th>
              <th className="px-5 py-3 font-medium">Engagement ID</th>
              <th className="px-5 py-3 font-medium">Engagement Name</th>
              <th className="px-5 py-3 font-medium">Engagement Type</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Owner</th>
              <th className="px-5 py-3 font-medium">Priority</th>
              <th className="px-5 py-3 font-medium">Start Date</th>
              <th className="px-5 py-3 font-medium">End Date</th>
              <th className="px-5 py-3 font-medium">Next Execution</th>
              <th className="px-5 py-3 font-medium">Last Execution</th>
              <th className="px-5 py-3 font-medium">View Summary</th>
              <th className="px-5 py-3 font-medium">Last Updated</th>
              <th className="w-12 px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row, index) => (
              <tr key={row.engagementId} className="hover:bg-slate-50/70">
                <td className="px-5 py-4 text-slate-600"> {index + 1} </td>
                <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">
                  {row.engagementId}
                </td>
                <td className="min-w-[240px] px-5 py-4">
                  <div className="font-medium text-slate-900">{row.name}</div>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                  {row.type}
                </td>
                <td className="px-5 py-4">
                  <Badge className={statusStyles[row.status]}>
                    {row.status}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                  {row.owner}
                </td>
                <td className="px-5 py-4">
                  <Badge className={priorityStyles[row.priority]}>
                    {row.priority}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                  {row.startDate || "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                  {row.endDate || "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                  {row.nextExecution || "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                  {row.lastExecution || "—"}
                </td>
                <td className="px-5 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={() => openSummary(row)}
                  >
                    <Eye className="h-4 w-4" /> View
                  </Button>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                  {row.lastUpdated}
                </td>
                <td className="px-4 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-md"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {canEdit(row.status) && (
                        <DropdownMenuItem onClick={() => handleEdit(row)}>
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                      )}
                      {canApprove(row.status) && (
                        <DropdownMenuItem
                          onClick={() => openAction(row, "approve")}
                        >
                          <Check className="h-4 w-4" /> Approve
                        </DropdownMenuItem>
                      )}
                      {canActivate(row.status) && (
                        <DropdownMenuItem
                          onClick={() => openAction(row, "activate")}
                        >
                          <Play className="h-4 w-4" /> Activate
                        </DropdownMenuItem>
                      )}
                      {canPause(row.status) && (
                        <DropdownMenuItem
                          onClick={() => openAction(row, "pause")}
                        >
                          <Pause className="h-4 w-4" /> Pause
                        </DropdownMenuItem>
                      )}
                      {canResume(row.status) && (
                        <DropdownMenuItem
                          onClick={() => openAction(row, "resume")}
                        >
                          <Play className="h-4 w-4" /> Resume
                        </DropdownMenuItem>
                      )}
                      {canCancel(row.status) && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => openAction(row, "cancel")}
                          >
                            <X className="h-4 w-4" /> Cancel
                          </DropdownMenuItem>
                        </>
                      )}
                      {canDelete(row.status) && (
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => openAction(row, "delete")}
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* =========================================================
          VIEW SUMMARY
          ========================================================= */}
      <Dialog open={summaryOpen} onOpenChange={setSummaryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Engagement Summary</DialogTitle>

            <DialogDescription>
              Read-only summary of the configured customer engagement.
            </DialogDescription>
          </DialogHeader>

          {selectedEngagement && (
            <ScrollArea className="max-h-[65vh] pr-4">
              <div className="space-y-5">
                <div className="rounded-lg border bg-slate-50 p-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Engagement
                  </div>

                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    {selectedEngagement.name}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {selectedEngagement.engagementId}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {summaryRows.map((item) => {
                    const value = selectedEngagement[item.key];

                    return (
                      <div key={item.key} className="space-y-1">
                        <div className="text-xs font-medium text-slate-500">
                          {item.label}
                        </div>

                        {item.key === "status" ? (
                          <Badge
                            className={statusStyles[selectedEngagement.status]}
                          >
                            {selectedEngagement.status}
                          </Badge>
                        ) : item.key === "priority" ? (
                          <Badge
                            className={
                              priorityStyles[selectedEngagement.priority]
                            }
                          >
                            {selectedEngagement.priority}
                          </Badge>
                        ) : (
                          <div className="text-sm font-medium text-slate-900">
                            {value || "—"}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <Separator />

                <div>
                  <div className="mb-3 text-sm font-semibold text-slate-900">
                    Configuration
                  </div>

                  <div className="rounded-lg border">
                    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
                      <div>
                        <div className="text-xs text-slate-500">
                          Execution Type
                        </div>
                        <div className="mt-1 text-sm font-medium">
                          {selectedEngagement.type}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-slate-500">Trigger</div>
                        <div className="mt-1 text-sm font-medium">
                          {selectedEngagement.nextExecution ===
                          "Event Triggered"
                            ? "Event Triggered"
                            : "Scheduled"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-3 text-sm font-semibold text-slate-900">
                    Execution Information
                  </div>

                  <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2">
                    <div>
                      <div className="text-xs text-slate-500">
                        Last Execution
                      </div>
                      <div className="mt-1 text-sm font-medium">
                        {selectedEngagement.lastExecution || "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500">
                        Next Execution
                      </div>
                      <div className="mt-1 text-sm font-medium">
                        {selectedEngagement.nextExecution || "—"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSummaryOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* =========================================================
          ACTION CONFIRMATION
          ========================================================= */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{getActionTitle()}</DialogTitle>

            <DialogDescription>{getActionDescription()}</DialogDescription>
          </DialogHeader>

          {selectedEngagement && (
            <div className="rounded-lg border bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">
                {selectedEngagement.name}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                {selectedEngagement.engagementId}
              </div>
            </div>
          )}

          {requiresReason && (
            <div className="space-y-2">
              <label htmlFor="action-reason" className="text-sm font-medium">
                Reason
              </label>

              <Textarea
                id="action-reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder={`Enter reason for ${actionType}...`}
                className="min-h-24 resize-none"
              />
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmationOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant={
                actionType === "cancel" || actionType === "delete"
                  ? "destructive"
                  : "default"
              }
              disabled={requiresReason && !reason.trim()}
              onClick={handleConfirmation}
            >
              {actionType === "delete" ? "Delete" : "Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* =========================================================
          GOOGLE AUTHENTICATOR OTP
          ========================================================= */}
      <Dialog open={otpOpen} onOpenChange={setOtpOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Authenticator Verification</DialogTitle>

            <DialogDescription>
              Enter the 6-digit code from your Google Authenticator app to
              confirm this action.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border bg-slate-50 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <KeyRound className="h-4 w-4 text-slate-600" />
              </div>

              <div>
                <div className="text-sm font-medium text-slate-900">
                  {getActionTitle()}
                </div>

                <div className="text-xs text-slate-500">
                  {selectedEngagement?.engagementId}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">
                Authentication Code
              </label>

              <Input
                id="otp"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="000000"
                className="text-center text-lg tracking-[0.4em]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOtpOpen(false)}>
              Cancel
            </Button>

            <Button disabled={otp.length !== 6} onClick={handleOtpSubmit}>
              Verify & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
