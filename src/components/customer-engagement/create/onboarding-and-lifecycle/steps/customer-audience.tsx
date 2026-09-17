"use client";

import { useState } from "react";

import { AppMultiSelect } from "@/components/common/app-multi-select";

import CustomerPrimaryCurrency from "@/components/customer-engagement/create/shared/customer-audience/customer-primary-currency";
import CustomerCountry from "@/components/customer-engagement/create/shared/customer-audience/customer-country";
import AccountType from "@/components/customer-engagement/create/shared/customer-audience/account-type";
import CustomerAccountCurrency from "@/components/customer-engagement/create/shared/customer-audience/customer-account-currency";
import SecondaryAdditionalCurrency from "@/components/customer-engagement/create/shared/customer-audience/customer-secondary-currency";
import EstimatedBaseCustomers from "@/components/customer-engagement/create/shared/customer-audience/estimated-base-customers";
import AccountStatus from "@/components/customer-engagement/create/shared/customer-audience/account-status";

const regions = ["All", "Centre", "Littoral", "North West", "South West"];

const cities = ["All", "Douala", "Yaoundé", "Bamenda", "Buea"];

export function CustomerAudienceStep() {
  const [countries, setCountries] = useState<string[]>(["All"]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["All"]);
  const [selectedCities, setSelectedCities] = useState<string[]>(["All"]);

  const hasSpecificCountry = countries.length > 0 && !countries.includes("All");

  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <CustomerPrimaryCurrency />
        <CustomerCountry value={countries} setValue={setCountries} />
        {hasSpecificCountry && (
          <>
            <AppMultiSelect
              label="State/Province/Region"
              items={regions}
              value={selectedRegions}
              setValue={setSelectedRegions}
              placeholder="Select"
            />

            <AppMultiSelect
              label="City"
              items={cities}
              value={selectedCities}
              setValue={setSelectedCities}
              placeholder="Select"
            />
          </>
        )}
        <AccountType />
        <CustomerAccountCurrency />
        <SecondaryAdditionalCurrency />
        <AccountStatus />
        <div className="col-span-2">
          <EstimatedBaseCustomers />
        </div>
      </div>
    </div>
  );
}
