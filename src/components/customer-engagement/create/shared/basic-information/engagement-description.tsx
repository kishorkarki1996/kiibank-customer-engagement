import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EngagementDescription() {
  return (
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="description">Description</Label>

      <Textarea
        id="description"
        placeholder="Describe the purpose of this engagement..."
        className="min-h-24"
        maxLength={255}
      />
    </div>
  );
}
