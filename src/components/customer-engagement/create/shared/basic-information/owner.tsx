import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type OwnerProps = {
  defaultValue?: string;
};

export default function Owner({ defaultValue = "Admin" }: OwnerProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="owner">
        Owner
        <span className="ml-1 text-destructive">*</span>
      </Label>

      <Input
        id="owner"
        placeholder="Enter owner's name"
        defaultValue={defaultValue}
        disabled
      />
    </div>
  );
}
