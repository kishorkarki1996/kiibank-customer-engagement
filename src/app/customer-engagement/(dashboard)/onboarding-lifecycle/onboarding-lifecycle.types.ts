import {
  EngagementPriority,
  EngagementStatus,
} from "../../components/engagement.type";

export type OnboardingLifecycleEngagement = {
  id: number;
  engagementId: string;
  name: string;
  type: string;
  status: EngagementStatus;
  owner: string;
  priority: EngagementPriority;
  startDate: string;
  endDate: string;
  nextExecution: string;
  lastExecution: string;
  lastUpdated: string;
};
