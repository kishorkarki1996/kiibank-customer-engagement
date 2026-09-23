export const behaviourTypeOptions = [
    "Transactions",
    "Account Balance",
    "Funding",
    "Money Received",
    "Money Sent",
    "Currency Conversion",
  ];
  
  export type BehaviourType =
    | "Transactions"
    | "Account Balance"
    | "Funding"
    | "Money Received"
    | "Money Sent"
    | "Currency Conversion";
  
  export type FieldOption = {
    label: string;
    value: string;
  };
  
  export const behaviourFieldOptions: Record<
    BehaviourType,
    FieldOption[]
  > = {
    Transactions: [
      {
        label: "Successful Transactions",
        value: "successful-transactions",
      },
      {
        label: "Failed Transactions",
        value: "failed-transactions",
      },
      {
        label: "Pending Transactions",
        value: "pending-transactions",
      },
      {
        label: "Reversed Transactions",
        value: "reversed-transactions",
      },
      {
        label: "Transaction Activity",
        value: "transaction-activity",
      },
      {
        label: "No Transaction Activity",
        value: "no-transaction-activity",
      },
      {
        label: "Successful Transaction Status",
        value: "successful-transaction-status",
      },
      {
        label: "Transaction Amount",
        value: "transaction-amount",
      },
      {
        label: "Successful Transaction Count",
        value: "successful-transaction-count",
      },
      {
        label: "Transaction Type",
        value: "transaction-type",
      },
    ],
  
    "Account Balance": [
      {
        label: "Current Balance",
        value: "current-balance",
      },
      {
        label: "Balance Range",
        value: "balance-range",
      },
    ],
  
    Funding: [
      {
        label: "Account Funding",
        value: "account-funding",
      },
      {
        label: "Funding Channel",
        value: "funding-channel",
      },
      {
        label: "Funding Frequency",
        value: "funding-frequency",
      },
      {
        label: "Funding Amount",
        value: "funding-amount",
      },
    ],
  
    "Money Received": [
      {
        label: "Incoming Payments",
        value: "incoming-payments",
      },
      {
        label: "Incoming Payment Country",
        value: "incoming-payment-country",
      },
      {
        label: "Incoming Payment Currency",
        value: "incoming-payment-currency",
      },
      {
        label: "Incoming Payment Channel",
        value: "incoming-payment-channel",
      },
    ],
  
    "Money Sent": [
      {
        label: "Outgoing Payments",
        value: "outgoing-payments",
      },
      {
        label: "Destination Country",
        value: "destination-country",
      },
      {
        label: "Destination Currency",
        value: "destination-currency",
      },
      {
        label: "Payment Channel",
        value: "payment-channel",
      },
    ],
  
    "Currency Conversion": [
      {
        label: "Source Currency",
        value: "source-currency",
      },
      {
        label: "Destination Currency",
        value: "destination-currency",
      },
      {
        label: "Conversion Amount",
        value: "conversion-amount",
      },
      {
        label: "Conversion Activity",
        value: "conversion-activity",
      },
    ],
  };