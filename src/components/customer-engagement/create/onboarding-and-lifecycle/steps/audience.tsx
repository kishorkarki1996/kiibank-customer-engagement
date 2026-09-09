"use client";

import React, { useState } from "react";
import { Users2 } from "lucide-react";

import { AppSelect } from "@/components/common/app-select";
import { Label } from "@/components/ui/label";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { AppMultiSelect } from "@/components/common/app-multi-select";

const primaryCurrencies = ["All", "GBP", "NGN", "EUR", "XAF"];
const accountCurrencies = ["All", "GBP", "NGN", "EUR", "XAF"];
const additionalCurrencies = ["Any", "GBP", "NGN", "EUR", "XAF"];

const countries = ["All", "United Kingdom", "Cameroon", "Nigeria", "France"];

const customerTypeOptions = [
  { label: "All", value: "all" },
  { label: "Personal", value: "personal" },
  { label: "Business", value: "business" },
];

const accountTypeOptions = [
  { label: "All", value: "all" },
  { label: "Standard", value: "standard" },
  { label: "Premium", value: "premium" },
];

const customerStatusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Suspended", value: "suspended" },
];

const additionalCurrencyOptions = [
  { label: "Any", value: "any" },
  { label: "GBP", value: "GBP" },
  { label: "EUR", value: "EUR" },
  { label: "NGN", value: "NGN" },
  { label: "XAF", value: "XAF" },
];

export function AudienceStep() {
  //   const primaryCurrency = ["All"];
  const [primaryCurrency, setPrimaryCurrency] = useState<string[]>(["All"]);

  const [country, setCountry] = useState<string[]>(["All"]);

  const [regions, setRegions] = useState<string[]>(["all"]);

  const [cities, setCities] = useState<string[]>(["all"]);

  const [accountCurrency, setAccountCurrency] = useState<string[]>(["All"]);

  const [additionalCurrency, setAdditionalCurrency] = useState<string[]>([
    "Any",
  ]);
  const [customerStatus, setCustomerStatus] = useState<string[]>(["Active"]);

  const hasSpecificCountry = countries.length > 0 && !countries.includes("all");

  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <AppMultiSelect
          label="Customer Primary Currency"
          items={primaryCurrencies}
          value={primaryCurrency}
          setValue={setPrimaryCurrency}
          placeholder="Select"
        />
        <AppMultiSelect
          label="Customer Country"
          items={countries}
          value={country}
          setValue={setCountry}
          placeholder="Select"
        />
        <AppSelect
          label="Customer Type"
          defaultValue="all"
          placeholder="Select customer type"
          options={customerTypeOptions}
        />
        <AppSelect
          label="Account Type"
          defaultValue="all"
          placeholder="Select account type"
          options={accountTypeOptions}
        />
        <AppMultiSelect
          label="Customer Account Currency"
          items={accountCurrencies}
          value={accountCurrency}
          setValue={setAccountCurrency}
          placeholder="Select"
        />
        <AppMultiSelect
          label="Secondary / Additional Currency"
          items={additionalCurrencies}
          value={additionalCurrency}
          setValue={setAdditionalCurrency}
          placeholder="Select"
        />
        <AppSelect
          label="Customer Status"
          defaultValue={"active"}
          placeholder="Select "
          options={customerStatusOptions}
        />

        {/* {hasSpecificCountry && (
          <>
            <div className="space-y-2">
              <Label>Province / State / Region</Label>

              <AppMultiSelect
                placeholder="Select region"
                options={[
                  { label: "All", value: "all" },
                  { label: "Centre", value: "centre" },
                  { label: "Littoral", value: "littoral" },
                  { label: "North West", value: "north-west" },
                  { label: "South West", value: "south-west" },
                ]}
                value={regions}
                onValueChange={setRegions}
              />
            </div>

            <div className="space-y-2">
              <Label>City</Label>

              <AppMultiSelect
                placeholder="Select city"
                options={[
                  { label: "All", value: "all" },
                  { label: "Douala", value: "douala" },
                  { label: "Yaoundé", value: "yaounde" },
                  { label: "Bamenda", value: "bamenda" },
                  { label: "Buea", value: "buea" },
                ]}
                value={cities}
                onValueChange={setCities}
              />
            </div>
          </>
        )} */}
      </div>

      <div className="rounded-xl border bg-muted/30 p-5">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users2 className="size-5" />
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Estimated Audience
            </p>

            <p className="mt-1 text-2xl font-semibold tracking-tight">
              12,482 customers
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Estimated based on the currently selected audience filters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
