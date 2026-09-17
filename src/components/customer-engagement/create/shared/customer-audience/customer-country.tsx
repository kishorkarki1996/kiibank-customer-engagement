"use client";

import type { Dispatch, SetStateAction } from "react";

import { AppMultiSelect } from "@/components/common/app-multi-select";

const countries = ["All", "United Kingdom", "Cameroon", "Nigeria", "France"];

type CustomerCountryProps = {
  value: string[];
  setValue: Dispatch<SetStateAction<string[]>>;
};

export default function CustomerCountry({
  value,
  setValue,
}: CustomerCountryProps) {
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
