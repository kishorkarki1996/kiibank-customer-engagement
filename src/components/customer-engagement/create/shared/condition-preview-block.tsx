import {
  ConditionPreview,
  type ConditionPreviewGroup,
} from "@/components/common/condition-preview";

const conditionGroups: ConditionPreviewGroup[] = [
  {
    id: "group-1",
    conditions: [
      {
        id: "condition-1",
        field: "Successful transactions",
        operator: "equal",
        value: 2,
        period: "last 24 hours",
      },
      {
        id: "condition-2",
        field: "Pending transactions",
        operator: "less than",
        value: 5,
        period: "last 30 days",
      },
      {
        id: "condition-3",
        field: "Transaction amount",
        operator: "is greater than",
        value: 10,
        period: "last 30 days",
      },
    ],
  },
  {
    id: "group-2",
    conditions: [
      {
        id: "condition-4",
        field: "Successful transactions",
        operator: "are greater than",
        value: 20,
        period: "last 7 days",
      },
      {
        id: "condition-5",
        field: "Failed transactions",
        operator: "are fewer than",
        value: 2,
        period: " last 30 days",
      },
    ],
  },
];

export default function ConditionPreviewBlock() {
  return <ConditionPreview groups={conditionGroups} />;
}
