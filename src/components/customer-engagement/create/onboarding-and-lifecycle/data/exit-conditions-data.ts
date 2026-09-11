export type ExitConditionOption = {
    label: string;
    value: string;
  };
  
  export const exitConditionOptions: ExitConditionOption[] = [
    {
      label: "Customer Status",
      value: "customer-status",
    },
    {
      label: "Account Status",
      value: "account-status",
    },
    {
      label: "Successful Transaction Count",
      value: "successful-transaction-count",
    },
  ];
  
  export const statusOperatorOptions: ExitConditionOption[] = [
    {
      label: "Is",
      value: "is",
    },
    {
      label: "Is not",
      value: "is-not",
    },
  ];
  
  export const countOperatorOptions: ExitConditionOption[] = [
    {
      label: "Equals",
      value: "equals",
    },
    {
      label: "Greater than",
      value: "greater-than",
    },
    {
      label: "Less than",
      value: "less-than",
    },
  ];
  
  export const customerStatusOptions: ExitConditionOption[] = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    },
  ];
  
  export const accountStatusOptions: ExitConditionOption[] = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    },
    {
      label: "Closed",
      value: "closed",
    },
  ];