export type TransactionRule = {
    id: string;
    field: string;
    operator: string;
    value: string;
    valueTo: string;
    period: string;
    periodValue: string;
    customFrom?: Date;
    customTo?: Date;
  };
  
  export type TransactionRuleGroup = {
    id: string;
    conditions: TransactionRule[];
  };