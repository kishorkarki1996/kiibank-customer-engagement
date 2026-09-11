export type ConditionOption = {
  label: string;
  value: string;
};

export type JourneyConditionConfig = {
  label: string;
  value: string;

  operatorOptions?: ConditionOption[];

  valueField:
    | {
        type: "none";
      }
    | {
        type: "input";
        inputType: "number" | "text";
        placeholder?: string;
      }
    | {
        type: "select";
        placeholder?: string;
        options: ConditionOption[];
      };
};

/* -------------------------------------------------------------------------- */
/* Operators                                                                  */
/* -------------------------------------------------------------------------- */

export const gbpInboundTransactionOperatorOptions: ConditionOption[] = [
  {
    label: "Is not",
    value: "is-not",
  },
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

export const successfulTransactionOperatorOptions: ConditionOption[] = [
  {
    label: "Is not",
    value: "is-not",
  },
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

export const customerStatusOperatorOptions: ConditionOption[] = [
  {
    label: "Is",
    value: "is",
  },
  {
    label: "Is not",
    value: "is-not",
  },
];

export const accountStatusOperatorOptions: ConditionOption[] = [
  {
    label: "Is",
    value: "is",
  },
  {
    label: "Is not",
    value: "is-not",
  },
];

/* -------------------------------------------------------------------------- */
/* Values                                                                     */
/* -------------------------------------------------------------------------- */

export const customerStatusOptions: ConditionOption[] = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

export const accountStatusOptions: ConditionOption[] = [
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

/* -------------------------------------------------------------------------- */
/* Journey Conditions                                                         */
/* -------------------------------------------------------------------------- */

export const journeyConditionData: JourneyConditionConfig[] = [
  {
    label: "Customer has GBP Account",
    value: "has-gbp-account",

    // This condition is complete by itself.
    operatorOptions: undefined,

    valueField: {
      type: "none",
    },
  },

  {
    label: "GBP Account Successful Inbound Transaction Count",
    value: "gbp-inbound-transaction-count",

    operatorOptions: gbpInboundTransactionOperatorOptions,

    valueField: {
      type: "input",
      inputType: "number",
      placeholder: "Enter count",
    },
  },

  {
    label: "Successful Transaction Count",
    value: "successful-transaction-count",

    operatorOptions: successfulTransactionOperatorOptions,

    valueField: {
      type: "input",
      inputType: "number",
      placeholder: "Enter count",
    },
  },

  {
    label: "Customer Status",
    value: "customer-status",

    operatorOptions: customerStatusOperatorOptions,

    valueField: {
      type: "select",
      placeholder: "Select status",
      options: customerStatusOptions,
    },
  },

  {
    label: "Account Status",
    value: "account-status",

    operatorOptions: accountStatusOperatorOptions,

    valueField: {
      type: "select",
      placeholder: "Select account status",
      options: accountStatusOptions,
    },
  },
];
