import CustomerPrimaryCurrency from "@/components/customer-engagement/create/shared/customer-audience/customer-primary-currency";
import CustomerCountry from "@/components/customer-engagement/create/shared/customer-audience/customer-country";
import AccountType from "@/components/customer-engagement/create/shared/customer-audience/account-type";
import CustomerAccountCurrency from "@/components/customer-engagement/create/shared/customer-audience/customer-account-currency";
import SecondaryAdditionalCurrency from "@/components/customer-engagement/create/shared/customer-audience/customer-secondary-currency";
import EstimatedBaseCustomers from "@/components/customer-engagement/create/shared/customer-audience/estimated-base-customers";
import AccountStatus from "@/components/customer-engagement/create/shared/customer-audience/account-status";

export function CustomerAudienceStep() {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <CustomerPrimaryCurrency />
        <CustomerCountry />
        <AccountType />
        <CustomerAccountCurrency />
        <SecondaryAdditionalCurrency />
        <AccountStatus />
        <div className="col-span-2">
          <EstimatedBaseCustomers />
        </div>

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
    </div>
  );
}
