"use client";

import { useState } from "react";

import { AppMultiSelect } from "@/components/common/app-multi-select";

const countries = ["All", "United Kingdom", "Cameroon", "Nigeria", "France"];

type CustomerCountryProps = {
  defaultValue?: string[];
};

export default function CustomerCountry({
  defaultValue = ["All"],
}: CustomerCountryProps) {
  const [value, setValue] = useState<string[]>(defaultValue);

  return (
    <AppMultiSelect
      label="Customer Country"
      items={countries}
      value={value}
      setValue={setValue}
      placeholder="Select"
    />
  );
}
