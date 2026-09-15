import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EngagementName() {
  return (
    <div className="space-y-2">
      <Label htmlFor="engagement-name">
        Engagement name
        <span className="ml-1 text-destructive">*</span>
      </Label>

      <Input
        id="engagement-name"
        placeholder="Enter engagement name"
        maxLength={100}
      />
    </div>
  );
}
