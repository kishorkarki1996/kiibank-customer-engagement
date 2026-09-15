"use client";

import { useState } from "react";

import { AppMultiSelect } from "@/components/common/app-multi-select";

const primaryCurrencies = ["All", "GBP", "NGN", "EUR", "XAF"];

type PrimaryCurrencyProps = {
  defaultValue?: string[];
};

export default function CustomerPrimaryCurrency({
  defaultValue = ["All"],
}: PrimaryCurrencyProps) {
  const [value, setValue] = useState<string[]>(defaultValue);

  return (
    <AppMultiSelect
      label="Customer Primary Currency"
      items={primaryCurrencies}
      value={value}
      setValue={setValue}
      placeholder="Select"
    />
  );
}
