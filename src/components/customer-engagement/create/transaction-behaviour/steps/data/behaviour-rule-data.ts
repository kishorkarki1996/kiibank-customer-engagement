export type BehaviourActivity =
  | "Transactions"
  | "Account Balance"
  | "Funding"
  | "Money Received"
  | "Money Sent"
  | "Currency Conversion";

export type RuleValueKind =
  | "number"
  | "text"
  | "presence";

export type OperatorOption = {
  label: string;
  value: string;
};

export type TransactionFieldConfig = {
  label: string;
  value: string;
  activity: BehaviourActivity;
  valueKind: RuleValueKind;
  operators: OperatorOption[];
  supportsPeriod: boolean;
  periodRequired?: boolean;
};

export const transactionActivityOptions: BehaviourActivity[] = [
  "Transactions",
  "Account Balance",
  "Funding",
  "Money Received",
  "Money Sent",
  "Currency Conversion",
];

export const numericOperators: OperatorOption[] = [
  {
    label: "Equals",
    value: "equals",
  },
  {
    label: "Does not equal",
    value: "does-not-equal",
  },
  {
    label: "Greater than",
    value: "greater-than",
  },
  {
    label: "Less than",
    value: "less-than",
  },
  {
    label: "At least",
    value: "at-least",
  },
  {
    label: "At most",
    value: "at-most",
  },
  {
    label: "Between",
    value: "between",
  },
  {
    label: "Not between",
    value: "not-between",
  },
  {
    label: "Exists",
    value: "exists",
  },
  {
    label: "Does not exist",
    value: "does-not-exist",
  },
];

export const textOperators: OperatorOption[] = [
  {
    label: "Equals",
    value: "equals",
  },
  {
    label: "Does not equal",
    value: "does-not-equal",
  },
  {
    label: "Is one of",
    value: "is-one-of",
  },
  {
    label: "Is not one of",
    value: "is-not-one-of",
  },
  {
    label: "Exists",
    value: "exists",
  },
  {
    label: "Does not exist",
    value: "does-not-exist",
  },
];

export const presenceOperators: OperatorOption[] = [
  {
    label: "Exists",
    value: "exists",
  },
  {
    label: "Does not exist",
    value: "does-not-exist",
  },
];

export const transactionFieldData: Record<
  BehaviourActivity,
  TransactionFieldConfig[]
> = {
  Transactions: [
    {
      label: "Successful Transactions",
      value: "successful-transactions",
      activity: "Transactions",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Failed Transactions",
      value: "failed-transactions",
      activity: "Transactions",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Pending Transactions",
      value: "pending-transactions",
      activity: "Transactions",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Reversed Transactions",
      value: "reversed-transactions",
      activity: "Transactions",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Transaction Activity",
      value: "transaction-activity",
      activity: "Transactions",
      valueKind: "presence",
      operators: presenceOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "No Transaction Activity",
      value: "no-transaction-activity",
      activity: "Transactions",
      valueKind: "presence",
      operators: presenceOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Successful Transaction Status",
      value: "successful-transaction-status",
      activity: "Transactions",
      valueKind: "text",
      operators: textOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Transaction Amount",
      value: "transaction-amount",
      activity: "Transactions",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Successful Transaction Count",
      value: "successful-transaction-count",
      activity: "Transactions",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Transaction Type",
      value: "transaction-type",
      activity: "Transactions",
      valueKind: "text",
      operators: textOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
  ],

  "Account Balance": [
    {
      label: "Current Balance",
      value: "current-balance",
      activity: "Account Balance",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: false,
    },
    {
      label: "Balance Range",
      value: "balance-range",
      activity: "Account Balance",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: false,
    },
  ],

  Funding: [
    {
      label: "Account Funding",
      value: "account-funding",
      activity: "Funding",
      valueKind: "presence",
      operators: presenceOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Funding Channel",
      value: "funding-channel",
      activity: "Funding",
      valueKind: "text",
      operators: textOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Funding Frequency",
      value: "funding-frequency",
      activity: "Funding",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Funding Amount",
      value: "funding-amount",
      activity: "Funding",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
  ],

  "Money Received": [
    {
      label: "Incoming Payments",
      value: "incoming-payments",
      activity: "Money Received",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Incoming Payment Country",
      value: "incoming-payment-country",
      activity: "Money Received",
      valueKind: "text",
      operators: textOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Incoming Payment Currency",
      value: "incoming-payment-currency",
      activity: "Money Received",
      valueKind: "text",
      operators: textOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Incoming Payment Channel",
      value: "incoming-payment-channel",
      activity: "Money Received",
      valueKind: "text",
      operators: textOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
  ],

  "Money Sent": [
    {
      label: "Outgoing Payments",
      value: "outgoing-payments",
      activity: "Money Sent",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Destination Country",
      value: "destination-country",
      activity: "Money Sent",
      valueKind: "text",
      operators: textOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Destination Currency",
      value: "destination-currency",
      activity: "Money Sent",
      valueKind: "text",
      operators: textOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Payment Channel",
      value: "payment-channel",
      activity: "Money Sent",
      valueKind: "text",
      operators: textOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
  ],

  "Currency Conversion": [
    {
      label: "Source Currency",
      value: "source-currency",
      activity: "Currency Conversion",
      valueKind: "text",
      operators: textOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Destination Currency",
      value: "conversion-destination-currency",
      activity: "Currency Conversion",
      valueKind: "text",
      operators: textOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Conversion Amount",
      value: "conversion-amount",
      activity: "Currency Conversion",
      valueKind: "number",
      operators: numericOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
    {
      label: "Conversion Activity",
      value: "conversion-activity",
      activity: "Currency Conversion",
      valueKind: "presence",
      operators: presenceOperators,
      supportsPeriod: true,
      periodRequired: true,
    },
  ],
};

export const periodOptions = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Yesterday",
    value: "yesterday",
  },
  {
    label: "Last 24 Hours",
    value: "last-24-hours",
  },
  {
    label: "Last 7 Days",
    value: "last-7-days",
  },
  {
    label: "Last 30 Days",
    value: "last-30-days",
  },
  {
    label: "Last 60 Days",
    value: "last-60-days",
  },
  {
    label: "Last 90 Days",
    value: "last-90-days",
  },
  {
    label: "Last X Days",
    value: "last-x-days",
  },
  {
    label: "Last X Weeks",
    value: "last-x-weeks",
  },
  {
    label: "Last X Months",
    value: "last-x-months",
  },
  {
    label: "Since Signup",
    value: "since-signup",
  },
  {
    label: "Custom Date Range",
    value: "custom-date-range",
  },
];

export function getAvailableFields(
  activities: string[],
) {
  const combined =
    activities.flatMap((activity) => {
      return (
        transactionFieldData[
          activity as BehaviourActivity
        ] ?? []
      );
    });

  return Array.from(
    new Map(
      combined.map((field) => [
        field.value,
        field,
      ]),
    ).values(),
  );
}

export function getFieldConfig(
  field: string,
) {
  return Object.values(
    transactionFieldData,
  )
    .flat()
    .find(
      (item) =>
        item.value === field,
    );
}