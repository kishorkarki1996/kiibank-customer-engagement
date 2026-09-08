"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  Info,
  MessageSquareText,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Onboarding & Lifecycle",
    desc: "Welcome, activation and lifecycle journeys",
    icon: "01",
  },
  {
    name: "Transaction Behaviour",
    desc: "Target customers using financial activity",
    icon: "02",
  },
  {
    name: "Marketing & Rewards",
    desc: "Promotions, cashback and reactivation",
    icon: "03",
  },
  {
    name: "Exchange Rates",
    desc: "Rate alerts and corridor communications",
    icon: "04",
  },
  {
    name: "Product & What's New",
    desc: "Feature, currency and product announcements",
    icon: "05",
  },
  {
    name: "Newsletter & Customer Education",
    desc: "Educational and recurring content",
    icon: "06",
  },
  {
    name: "Compliance & Account Requirements",
    desc: "Controlled KYC and account notices",
    icon: "07",
  },
  {
    name: "Service & Operational",
    desc: "Incidents, maintenance and restoration",
    icon: "08",
  },
];
const steps = [
  "Basic information",
  "Audience",
  "Trigger & rules",
  "Journey",
  "Review",
];
const currencies = ["All currencies", "GBP", "EUR", "NGN", "XAF"];

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
function ChoiceCard({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition",
        active
          ? "border-primary bg-sky-50 ring-2 ring-primary/10"
          : "bg-white hover:border-slate-300",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border",
            active
              ? "border-primary bg-primary text-white"
              : "border-slate-300",
          )}
        >
          {active && <Check className="h-3 w-3" />}
        </div>
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </div>
        </div>
      </div>
    </button>
  );
}

export function EngagementBuilder() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState(categories[0].name);
  const [includeExisting, setIncludeExisting] = useState(false);
  const categoryData = useMemo(
    () => categories.find((c) => c.name === category)!,
    [category],
  );
  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:py-8">
        <aside>
          <div className="sticky top-24 space-y-1">
            {steps.map((s, i) => (
              <button
                key={s}
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm",
                  i === step
                    ? "bg-white font-semibold shadow-sm"
                    : i < step
                      ? "text-slate-700 hover:bg-white"
                      : "text-slate-400",
                )}
              >
                <span
                  className={cn(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs",
                    i < step && "border-primary bg-primary text-white",
                    i === step && "border-primary text-primary",
                  )}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span>{s}</span>
              </button>
            ))}
          </div>
        </aside>
        <main className="min-w-0">
          <Card className="overflow-hidden shadow-soft">
            <div className="border-b px-5 py-5 md:px-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Step {step + 1} of 5
              </p>
              <h1 className="mt-1 text-xl font-bold md:text-2xl">
                {steps[step]}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {step === 0
                  ? "Define the engagement and choose its category."
                  : step === 1
                    ? "Choose which customers can enter this engagement."
                    : step === 2
                      ? "Define the event or conditions that qualify customers."
                      : step === 3
                        ? "Configure the communication sequence and delivery channels."
                        : "Review the setup and activate when ready."}
              </p>
            </div>
            <div className="p-5 md:p-7">
              {step === 0 && (
                <Basic category={category} setCategory={setCategory} />
              )}{" "}
              {step === 1 && <Audience />}{" "}
              {step === 2 && (
                <Rules
                  category={category}
                  includeExisting={includeExisting}
                  setIncludeExisting={setIncludeExisting}
                />
              )}{" "}
              {step === 3 && <Journey />}{" "}
              {step === 4 && <Review category={categoryData.name} />}
            </div>
            <div className="flex items-center justify-between border-t bg-slate-50 px-5 py-4 md:px-7">
              <Button variant="outline" onClick={back} disabled={step === 0}>
                Back
              </Button>
              {step < 4 ? (
                <Button onClick={next}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Activate engagement
                </Button>
              )}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

function Basic({
  category,
  setCategory,
}: {
  category: string;
  setCategory: (v: string) => void;
}) {
  return (
    <div className="space-y-7">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Engagement name" required>
          <Input
            defaultValue="New Customer Welcome Journey"
            placeholder="Enter a clear internal name"
          />
        </Field>
        <Field label="Owner" required>
          <NativeSelect>
            <option>Customer Experience Team</option>
            <option>Marketing Team</option>
            <option>Compliance Operations</option>
          </NativeSelect>
        </Field>
        <div className="md:col-span-2">
          <Field label="Description">
            <Textarea
              placeholder="Describe the purpose of this engagement..."
              defaultValue="Guide newly registered customers through their first KiiBank actions."
            />
          </Field>
        </div>
        <Field label="Priority" required>
          <NativeSelect defaultValue="Normal">
            <option>Critical</option>
            <option>High</option>
            <option>Normal</option>
            <option>Low</option>
          </NativeSelect>
        </Field>
      </div>
      <div>
        <div className="mb-3">
          <Label>
            Category <span className="text-rose-500">*</span>
          </Label>
          <p className="mt-1 text-xs text-slate-500">
            Category determines the targeting and configuration options
            available later.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {categories.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setCategory(c.name)}
              className={cn(
                "flex gap-3 rounded-xl border p-4 text-left transition",
                category === c.name
                  ? "border-primary bg-sky-50 ring-2 ring-primary/10"
                  : "hover:border-slate-300",
              )}
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold",
                  category === c.name
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-500",
                )}
              >
                {c.icon}
              </span>
              <span>
                <span className="block text-sm font-semibold">{c.name}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  {c.desc}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Audience() {
  return (
    <div className="space-y-7">
      <div className="rounded-xl border border-sky-100 bg-sky-50 p-4">
        <div className="flex gap-3">
          <Users2 className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <div className="text-sm font-semibold">Estimated base audience</div>
            <div className="mt-1 text-2xl font-bold">
              12,482{" "}
              <span className="text-sm font-normal text-slate-500">
                customers
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Estimate updates as targeting criteria change. Final eligibility
              is re-evaluated at execution.
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Customer primary currency">
          <NativeSelect>
            {currencies.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Customer country">
          <NativeSelect>
            <option>All countries</option>
            <option>United Kingdom</option>
            <option>Cameroon</option>
            <option>Nigeria</option>
            <option>France</option>
          </NativeSelect>
        </Field>
        <Field label="Customer type">
          <NativeSelect>
            <option>All customer types</option>
            <option>Personal</option>
            <option>Business</option>
          </NativeSelect>
        </Field>
        <Field label="Account type">
          <NativeSelect>
            <option>All account types</option>
            <option>Standard</option>
            <option>Premium</option>
          </NativeSelect>
        </Field>
        <Field label="Customer account currency">
          <NativeSelect>
            {currencies.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Secondary / additional currency">
          <NativeSelect>
            <option>Any</option>
            <option>GBP</option>
            <option>EUR</option>
            <option>NGN</option>
            <option>XAF</option>
          </NativeSelect>
        </Field>
        <Field label="Customer status">
          <NativeSelect>
            <option>Active</option>
            <option>All permitted statuses</option>
          </NativeSelect>
        </Field>
        <Field label="Account status">
          <NativeSelect>
            <option>All eligible accounts</option>
            <option>Active</option>
          </NativeSelect>
        </Field>
      </div>
      <div className="rounded-lg border bg-slate-50 p-4 text-sm text-slate-600">
        <Info className="mr-2 inline h-4 w-4 text-primary" />
        Only customers matching all selected audience conditions will proceed to
        trigger and rule evaluation.
      </div>
    </div>
  );
}

function Rules({
  category,
  includeExisting,
  setIncludeExisting,
}: {
  category: string;
  includeExisting: boolean;
  setIncludeExisting: (v: boolean) => void;
}) {
  if (category === "Onboarding & Lifecycle")
    return (
      <div className="space-y-6">
        <Field label="When should a customer enter this engagement?" required>
          <div className="grid gap-3 md:grid-cols-2">
            <ChoiceCard
              active
              title="Customer completes signup"
              description="Enter the journey after successful registration."
              onClick={() => {}}
            />
            <ChoiceCard
              active={false}
              title="Account or funding event"
              description="Use first account, first funding or first successful transaction."
              onClick={() => {}}
            />
            <ChoiceCard
              active={false}
              title="Lifecycle milestone"
              description="Enter after X days, weeks or months since signup."
              onClick={() => {}}
            />
          </div>
        </Field>
        <Field label="Journey entry">
          <NativeSelect>
            <option>Immediately</option>
            <option>After a delay</option>
          </NativeSelect>
        </Field>
        <div className="rounded-xl border p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">
                Include customers who already meet this condition?
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Keep this off to avoid enrolling the entire historical customer
                base.
              </p>
            </div>
            <button
              onClick={() => setIncludeExisting(!includeExisting)}
              className={cn(
                "relative h-6 w-11 rounded-full transition",
                includeExisting ? "bg-primary" : "bg-slate-200",
              )}
            >
              <span
                className={cn(
                  "absolute top-1 h-4 w-4 rounded-full bg-white transition",
                  includeExisting ? "left-6" : "left-1",
                )}
              />
            </button>
          </div>
          {includeExisting && (
            <div className="mt-4 grid grid-cols-[1fr_130px] gap-3">
              <Input type="number" defaultValue="30" />
              <NativeSelect>
                <option>Days</option>
                <option>Weeks</option>
                <option>Months</option>
              </NativeSelect>
            </div>
          )}
        </div>
      </div>
    );
  return <RuleBuilder category={category} />;
}

function RuleBuilder({ category }: { category: string }) {
  const copy: Record<string, { label: string; field: string; value: string }> =
    {
      "Transaction Behaviour": {
        label: "Behaviour condition",
        field: "Successful transaction count",
        value: "3",
      },
      "Marketing & Rewards": {
        label: "Eligibility condition",
        field: "Last successful GBP → XAF transaction",
        value: "30",
      },
      "Exchange Rates": {
        label: "Rate condition",
        field: "GBP / XAF exchange rate",
        value: "845",
      },
      "Product & What's New": {
        label: "Product relevance",
        field: "Feature activated",
        value: "No",
      },
      "Newsletter & Customer Education": {
        label: "Education relevance",
        field: "Account currency",
        value: "GBP",
      },
      "Compliance & Account Requirements": {
        label: "Authoritative requirement",
        field: "KYC / document status",
        value: "Information required",
      },
      "Service & Operational": {
        label: "Affected service condition",
        field: "Service / channel",
        value: "MTN Cameroon",
      },
    };
  const c = copy[category] || copy["Transaction Behaviour"];
  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="font-semibold">{c.label}</div>
            <p className="mt-1 text-xs text-slate-500">
              All conditions are re-checked before a message is sent.
            </p>
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium">
            AND
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
          <NativeSelect>
            <option>{c.field}</option>
            <option>Customer country</option>
            <option>Account currency</option>
            <option>Transaction status</option>
          </NativeSelect>
          <NativeSelect>
            <option>is equal to</option>
            <option>is greater than or equal to</option>
            <option>is less than</option>
            <option>is not equal to</option>
          </NativeSelect>
          <Input defaultValue={c.value} />
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
          <NativeSelect>
            <option>Customer status</option>
          </NativeSelect>
          <NativeSelect>
            <option>is equal to</option>
          </NativeSelect>
          <NativeSelect>
            <option>Active</option>
          </NativeSelect>
        </div>
        <Button className="mt-4" variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add condition
        </Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Evaluation period">
          <NativeSelect>
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 60 days</option>
            <option>Last 90 days</option>
            <option>Custom period</option>
          </NativeSelect>
        </Field>
        <Field label="Evaluation frequency">
          <NativeSelect>
            <option>Daily</option>
            <option>Hourly</option>
            <option>On qualifying event</option>
          </NativeSelect>
        </Field>
      </div>
      {category === "Compliance & Account Requirements" && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <ShieldCheck className="mr-2 inline h-4 w-4" />
          Compliance eligibility must come from the authoritative KiiBank
          KYC/compliance service. This engagement does not make compliance
          decisions.
        </div>
      )}
    </div>
  );
}

function Journey() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-5">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white">
              <Send className="h-4 w-4" />
            </div>
            <div className="h-full w-px bg-slate-200" />
          </div>
          <div className="min-w-0 flex-1 pb-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Journey step 1</div>
                <div className="text-xs text-slate-500">
                  Send immediately after entry
                </div>
              </div>
              <span className="rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-primary">
                Immediate
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Message template" required>
                <NativeSelect>
                  <option>Welcome to KiiBank</option>
                  <option>What You Can Do With KiiBank</option>
                </NativeSelect>
              </Field>
              <Field label="Channel" required>
                <NativeSelect>
                  <option>Push notification</option>
                  <option>Email</option>
                  <option>WhatsApp</option>
                  <option>SMS</option>
                  <option>In-App</option>
                </NativeSelect>
              </Field>
              <Field label="Fallback channel">
                <NativeSelect>
                  <option>None</option>
                  <option>WhatsApp</option>
                  <option>Email</option>
                  <option>SMS</option>
                  <option>In-App</option>
                </NativeSelect>
              </Field>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="grid h-9 w-9 place-items-center rounded-full border bg-white text-slate-500">
              <Clock3 className="h-4 w-4" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-4">
              <div className="text-sm font-semibold">Journey step 2</div>
              <div className="text-xs text-slate-500">
                Wait, then send follow-up
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Wait">
                <div className="grid grid-cols-[1fr_120px] gap-2">
                  <Input defaultValue="1" type="number" />
                  <NativeSelect>
                    <option>Day</option>
                    <option>Hours</option>
                    <option>Weeks</option>
                    <option>Months</option>
                  </NativeSelect>
                </div>
              </Field>
              <Field label="Message template">
                <NativeSelect>
                  <option>What You Can Do With KiiBank</option>
                </NativeSelect>
              </Field>
              <Field label="Channel">
                <NativeSelect>
                  <option>Email</option>
                  <option>Push notification</option>
                  <option>WhatsApp</option>
                </NativeSelect>
              </Field>
              <Field label="Fallback">
                <NativeSelect>
                  <option>Push notification</option>
                  <option>None</option>
                </NativeSelect>
              </Field>
            </div>
          </div>
        </div>
      </div>
      <Button variant="outline">
        <Plus className="mr-2 h-4 w-4" />
        Add journey step
      </Button>
      <div className="rounded-xl border bg-slate-50 p-4">
        <div className="mb-3 text-sm font-semibold">Pre-send safeguards</div>
        <div className="grid gap-2 text-sm text-slate-600 md:grid-cols-2">
          {[
            "Re-check audience eligibility",
            "Respect communication preferences",
            "Apply suppression rules",
            "Apply frequency controls",
            "Prevent duplicate execution",
            "Resolve approved template variables",
          ].map((x) => (
            <div key={x} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              {x}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Review({ category }: { category: string }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-4">
          <div className="text-xs text-slate-500">Estimated audience</div>
          <div className="mt-1 text-xl font-bold">12,482</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-xs text-slate-500">Journey messages</div>
          <div className="mt-1 text-xl font-bold">2 steps</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-xs text-slate-500">Primary channel</div>
          <div className="mt-1 text-xl font-bold">Push</div>
        </div>
      </div>
      <div className="rounded-xl border divide-y">
        <ReviewRow label="Engagement" value="New Customer Welcome Journey" />
        <ReviewRow label="Category" value={category} />
        <ReviewRow label="Owner" value="Customer Experience Team" />
        <ReviewRow
          label="Audience"
          value="Active customers · All countries · All currencies"
        />
        <ReviewRow
          label="Entry"
          value="Customer completes signup · Immediately"
        />
        <ReviewRow
          label="Frequency control"
          value="Maximum once per journey step"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <button className="rounded-xl border p-5 text-left hover:bg-slate-50">
          <Eye className="h-5 w-5 text-primary" />
          <div className="mt-3 font-semibold">Preview qualified audience</div>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Run the configured rules against current data and inspect a safe
            sample before activation.
          </p>
        </button>
        <button className="rounded-xl border p-5 text-left hover:bg-slate-50">
          <MessageSquareText className="h-5 w-5 text-primary" />
          <div className="mt-3 font-semibold">Preview & test messages</div>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Preview Push, WhatsApp, Email, SMS and In-App content without
            creating production history.
          </p>
        </button>
      </div>
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-700" />
          <div>
            <div className="text-sm font-semibold text-emerald-900">
              Ready for activation
            </div>
            <p className="mt-1 text-xs leading-5 text-emerald-800">
              Required configuration is complete. Customers will still be
              re-evaluated at execution time and suppression, consent, frequency
              and duplicate protections will be applied.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 px-4 py-3.5 sm:grid-cols-[170px_1fr]">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
