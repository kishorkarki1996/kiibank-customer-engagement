import { AppMultiSelect } from "@/components/common/app-multi-select";
import { useState } from "react";

const additionalCurrencies = ["Any", "GBP", "NGN", "EUR", "XAF"];

type SecondaryAdditionalCurrencyProps = {
  defaultValue?: string[];
};

export default function SecondaryAdditionalCurrency({
  defaultValue = ["Any"],
}: SecondaryAdditionalCurrencyProps) {
  const [value, setValue] = useState<string[]>(defaultValue);

  return (
    <AppMultiSelect
      label="Secondary / Additional Currency"
      items={additionalCurrencies}
      value={value}
      setValue={setValue}
      placeholder="Select"
    />
  );
}
