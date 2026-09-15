import { AppSelect } from "@/components/common/app-select";

const categoryOptions = [
  {
    label: "Onboarding & Lifecycle",
    value: "onboarding-lifecycle",
  },
  {
    label: "Transaction Behaviour",
    value: "transaction-behaviour",
  },
  {
    label: "Marketing & Rewards",
    value: "marketing-rewards",
  },
  {
    label: "Exchange Rates",
    value: "exchange-rates",
  },
  {
    label: "Product & What's New",
    value: "product-whats-new",
  },
  {
    label: "Newsletter & Customer Education",
    value: "newsletter-customer-education",
  },
  {
    label: "Compliance & Account Requirements",
    value: "compliance-account-requirements",
  },
  {
    label: "Service & Operational",
    value: "service-operational",
  },
];

type CategoryProps = { defaultCategory: string };

export default function Category({ defaultCategory }: CategoryProps) {
  return (
    <AppSelect
      label="Category"
      placeholder="Select"
      value={defaultCategory}
      options={categoryOptions}
      disabled
      required
    />
  );
}
