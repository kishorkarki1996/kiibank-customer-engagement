import { cn } from "@/lib/utils";

export type ConditionPreviewItem = {
  id: string;
  field: string;
  operator: string;
  value: string | number;
  period?: string;
};

export type ConditionPreviewGroup = {
  id: string;
  conditions: ConditionPreviewItem[];
};

type ConditionPreviewProps = {
  groups: ConditionPreviewGroup[];
  className?: string;
};

export function ConditionPreview({ groups, className }: ConditionPreviewProps) {
  if (!groups.length) {
    return (
      <div
        className={cn(
          "rounded-xl border border-dashed p-6 text-sm text-muted-foreground",
          className,
        )}
      >
        No conditions configured.
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {groups.map((group, groupIndex) => (
        <div key={group.id}>
          <ConditionGroup group={group} />

          {groupIndex < groups.length - 1 && <ConditionConnector type="AND" />}
        </div>
      ))}
    </div>
  );
}

type ConditionGroupProps = {
  group: ConditionPreviewGroup;
};

function ConditionGroup({ group }: ConditionGroupProps) {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <div>
        {group.conditions.map((condition, index) => (
          <div key={condition.id}>
            <ConditionSentence condition={condition} />

            {index < group.conditions.length - 1 && (
              <ConditionConnector type="OR" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

type ConditionSentenceProps = {
  condition: ConditionPreviewItem;
};

function ConditionSentence({ condition }: ConditionSentenceProps) {
  return (
    <p className="text-sm text-foreground ">
      {condition.field} {condition.operator}{" "}
      <span className="">{condition.value}</span>
      {condition.period && (
        <>
          {" "}
          <span className="">{condition.period}</span>
        </>
      )}
      {"."}
    </p>
  );
}

type ConditionConnectorProps = {
  type: "AND" | "OR";
};

function ConditionConnector({ type }: ConditionConnectorProps) {
  const isAnd = type === "AND";

  return (
    <div
      className={cn("flex items-center", isAnd ? "my-4 px-8" : "my-1 px-2")}
      aria-label={`${type} condition`}
    >
      <div className="flex-1 border-t border-dashed border-border" />

      <span
        className={cn(
          "mx-4 font-semibold text-primary",
          isAnd &&
            "rounded-full border border-primary/30 bg-primary/5 px-4 py-1 text-sm",
          !isAnd && "text-sm",
        )}
      >
        {type}
      </span>

      <div className="flex-1 border-t border-dashed border-border" />
    </div>
  );
}
