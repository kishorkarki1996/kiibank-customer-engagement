import {
  ArrowLeftRight,
  BookOpen,
  Gift,
  HeartPulse,
  RefreshCw,
  Rocket,
  ShieldCheck,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";

export type EngagementCategoryItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const engagementCategories: EngagementCategoryItem[] = [
  {
    title: "Onboarding & Lifecycle",
    description: "Welcome, activation and lifecycle journeys",
    href: "/customer-engagement/create/onboarding-and-lifecycle",
    icon: UserRoundCheck,
  },
  {
    title: "Transaction Behaviour",
    description: "Target customers using financial activity",
    href: "/customer-engagement/create/transaction-behaviour",
    icon: ArrowLeftRight,
  },
  {
    title: "Marketing & Rewards",
    description: "Promotions, cashback and reactivation",
    href: "/customer-engagement/create/marketing-rewards",
    icon: Gift,
  },
  {
    title: "Exchange Rates",
    description: "Rate alerts and corridor communications",
    href: "/customer-engagement/create/exchange-rates",
    icon: RefreshCw,
  },
  {
    title: "Product & What's New",
    description: "Feature, currency and product announcements",
    href: "/customer-engagement/create/product-whats-new",
    icon: Rocket,
  },
  {
    title: "Newsletter & Customer Education",
    description: "Educational and recurring content",
    href: "/customer-engagement/create/newsletter-education",
    icon: BookOpen,
  },
  {
    title: "Compliance & Account Requirements",
    description: "Controlled KYC and account notices",
    href: "/customer-engagement/create/compliance-account",
    icon: ShieldCheck,
  },
  {
    title: "Service & Operational",
    description: "Incidents, maintenance and restoration",
    href: "/customer-engagement/create/service-operational",
    icon: HeartPulse,
  },
];
