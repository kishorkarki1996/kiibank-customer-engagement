import { AppSelect } from "@/components/common/app-select";

const accountTypeOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Personal",
    value: "personal",
  },
  {
    label: "Business - Sole Trader",
    value: "business-sole-trader",
  },
  {
    label: "Business - Charitable Organization",
    value: "business-charitable-organization",
  },
  {
    label: "Business - Limited Company",
    value: "business-limited-company",
  },
  {
    label: "Business - Public Sector",
    value: "business-public-sector",
  },
];

type AccountTypeProps = {
  defaultValue?: string;
};

export default function AccountType({
  defaultValue = "all",
}: AccountTypeProps) {
  return (
    <AppSelect
      label="Account Type"
      defaultValue={defaultValue}
      placeholder="Select account type"
      options={accountTypeOptions}
    />
  );
}
