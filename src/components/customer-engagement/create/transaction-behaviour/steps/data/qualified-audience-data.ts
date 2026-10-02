export type QualifiedAudienceMetric = {
    label: string;
    value: number;
  };
  
  export type QualifiedCustomerPreview = {
    id: string;
    name: string;
    accountStatus: string;
    country: string;
    currency: string;
    ruleEvidence: string;
  };
  
  export const qualifiedAudienceMetrics = {
    baseAudience: 18420,
    meetsConditions: 4281,
    excluded: 312,
    estimatedQualified: 3969,
  };
  
  export const qualifiedCustomerPreviewData: QualifiedCustomerPreview[] = [
    {
      id: "customer-1",
      name: "Arthur M.",
      accountStatus: "Active",
      country: "United Kingdom",
      currency: "GBP",
      ruleEvidence:
        "5 successful transactions in the last 30 days",
    },
    {
      id: "customer-2",
      name: "Sarah T.",
      accountStatus: "Active",
      country: "Cameroon",
      currency: "XAF",
      ruleEvidence:
        "Sent more than XAF 50,000 in the last 7 days",
    },
    {
      id: "customer-3",
      name: "Michael R.",
      accountStatus: "Active",
      country: "Nigeria",
      currency: "NGN",
      ruleEvidence:
        "3 outgoing payments in the last 7 days",
    },
    {
      id: "customer-4",
      name: "Louise K.",
      accountStatus: "Active",
      country: "France",
      currency: "EUR",
      ruleEvidence:
        "Received 4 payments in the last 30 days",
    },
    {
      id: "customer-5",
      name: "Daniel P.",
      accountStatus: "Active",
      country: "United Kingdom",
      currency: "GBP",
      ruleEvidence:
        "Destination country matched United Kingdom",
    },
  ];