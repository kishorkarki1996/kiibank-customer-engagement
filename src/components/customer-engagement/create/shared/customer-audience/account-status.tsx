import { AppSelect } from "@/components/common/app-select";

const accountStatusOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

type AccountStatusProps = {
  defaultValue?: string;
};

export default function AccountStatus({
  defaultValue = "active",
}: AccountStatusProps) {
  return (
    <AppSelect
      label="Account Status"
      defaultValue={defaultValue}
      placeholder="Select account status"
      options={accountStatusOptions}
    />
  );
}
