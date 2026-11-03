import { EngagementSummary } from "../../components/engagement-summary/engagement-summary-type";

export type EngagementHistory = {
  id: string;
  name: string;
  category: EngagementSummary["category"];
  dateTime: string;
  channel: string;
  deliveryResult: string;
  summary: EngagementSummary;
};
