import { AppSelect } from "@/components/common/app-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ownerOptions = [
  {
    label: "Customer Experience Team",
    value: "customer-experience",
  },
  {
    label: "Marketing Team",
    value: "marketing",
  },
  {
    label: "Operations Team",
    value: "operations",
  },
];

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

export function BasicInformationStep() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="engagement-name">
            Engagement name
            <span className="ml-1 text-destructive">*</span>
          </Label>

          <Input id="engagement-name" placeholder="Enter engagement name" />
        </div>

        <div className="space-y-2">
          <Label>
            Owner
            <span className="ml-1 text-destructive">*</span>
          </Label>

          <AppSelect placeholder="Select owner" options={ownerOptions} />
        </div>

        <div className="space-y-2">
          <Label>
            Priority
            <span className="ml-1 text-destructive">*</span>
          </Label>

          <AppSelect
            defaultValue="normal"
            placeholder="Select priority"
            options={priorityOptions}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>

          <Textarea
            id="description"
            placeholder="Describe the purpose of this engagement..."
            className="min-h-24"
          />
        </div>
      </div>
    </div>
  );
}
