import { AppSelect } from "@/components/common/app-select";

const priorityOptions = [
  {
    label: "Critical",
    value: "critical",
  },
  {
    label: "High",
    value: "high",
  },
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "Low",
    value: "low",
  },
];
export default function () {
  return (
    <AppSelect
      label="Priority"
      defaultValue="normal"
      placeholder="Select priority"
      options={priorityOptions}
      required
    />
  );
}
