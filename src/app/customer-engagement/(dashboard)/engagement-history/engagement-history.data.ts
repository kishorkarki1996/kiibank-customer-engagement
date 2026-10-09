import { EngagementHistory } from "./engagement-history.types";

export const engagementHistoryData: EngagementHistory[] = [
  {
    id: 1,
    dateTime: "01/08/2026 09:00",
    name: "Onboarding Welcome Email",
    category: "Onboarding & Lifecycle",
    channel: "Email",
    deliveryResult: "Delivered",
  },
  {
    id: 2,
    dateTime: "03/08/2026 14:30",
    name: "Dormant Customer Reactivation",
    category: "Transaction Behaviour",
    channel: "Push Notification",
    deliveryResult: "Delivered",
  },
  {
    id: 3,
    dateTime: "05/08/2026 10:15",
    name: "Account Funding Reminder",
    category: "Transaction Behaviour",
    channel: "WhatsApp",
    deliveryResult: "Failed",
  },
  {
    id: 4,
    dateTime: "08/08/2026 16:45",
    name: "KYC Completion Reminder",
    category: "Onboarding & Lifecycle",
    channel: "SMS",
    deliveryResult: "Delivered",
  },
  {
    id: 5,
    dateTime: "12/08/2026 11:20",
    name: "Currency Conversion Follow-up",
    category: "Transaction Behaviour",
    channel: "Email",
    deliveryResult: "Delivered",
  },
];
