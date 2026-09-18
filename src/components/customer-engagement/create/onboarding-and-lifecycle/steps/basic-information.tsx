import EngagementName from "@/components/customer-engagement/create/shared/basic-information/engagement-name";
import EngagementDescription from "@/components/customer-engagement/create/shared/basic-information/engagement-description";
import Category from "@/components/customer-engagement/create/shared/basic-information/category";
import Owner from "@/components/customer-engagement/create/shared/basic-information/owner";
import Priority from "@/components/customer-engagement/create/shared/basic-information/priority";
import {
  TemplatePreview,
  TemplateVariant,
} from "../../shared/template-preview";
import { useState } from "react";

const DEFAULT_CATEGORY = "onboarding-lifecycle";
const OWNER = "John Doe";

export function BasicInformationStep() {
  const [selectedChannel, setSelectedChannel] =
    useState<TemplateVariant>("push");
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <EngagementName />
        <EngagementDescription />
        <Category defaultCategory={DEFAULT_CATEGORY} />
        <Owner defaultValue={OWNER} />
        <Priority />
        {/*   */}
      </div>
    </div>
  );
}
