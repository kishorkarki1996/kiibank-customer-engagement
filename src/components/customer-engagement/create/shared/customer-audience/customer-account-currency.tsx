"use client";

import { useState } from "react";

import { AppMultiSelect } from "@/components/common/app-multi-select";

const primaryCurrencies = ["All", "GBP", "NGN", "EUR", "XAF"];

type AccountCurrencyProps = {
  defaultValue?: string[];
};

export default function CustomerAccountCurrency({
  defaultValue = ["All"],
}: AccountCurrencyProps) {
  const [value, setValue] = useState<string[]>(defaultValue);

  return (
    <AppMultiSelect
      label="Customer Account Currency"
      items={primaryCurrencies}
      value={value}
      setValue={setValue}
      placeholder="Select"
    />
  );
}
