import type { TemplateVariant } from "../../shared/template-preview";

export type JourneyPreviewItem = {
  id: number;
  timing: string;
  message: string;

  send: "immediately" | "delayed-notification";
  waitValue?: number;
  waitUnit?: "hours" | "days" | "weeks" | "months";

  channel: TemplateVariant;
  fallbackChannels: TemplateVariant[];

  conditionMode: "always" | "conditional";
  condition: string;

  htmlContent: string;
};

export const journeyData: JourneyPreviewItem[] = [
  {
    id: 1,
    timing: "Immediately",
    message: "Welcome to KiiBank",

    send: "immediately",

    channel: "push",
    fallbackChannels: ["whatsapp", "email"],

    conditionMode: "always",
    condition: "Always send",

    htmlContent: `
      <p class="font-semibold mb-2">
        Welcome to KiiBank, Arthur!
      </p>

      <p>
        Your KiiBank account is ready. Discover simple and secure
        ways to manage and move your money.
      </p>
    `,
  },

  {
    id: 2,
    timing: "Day 1",
    message: "What You Can Do With KiiBank",

    send: "delayed-notification",
    waitValue: 1,
    waitUnit: "days",

    channel: "email",
    fallbackChannels: ["whatsapp"],

    conditionMode: "always",
    condition: "Always send",

    htmlContent: `
      <h3 class="font-semibold mb-2">
        What You Can Do With KiiBank
      </h3>

      <p>
        Explore your KiiBank account and discover the different
        ways you can manage, receive, and send money.
      </p>
    `,
  },

  {
    id: 3,
    timing: "Day 3",
    message: "Using Your GBP Account",

    send: "delayed-notification",
    waitValue: 2,
    waitUnit: "days",

    channel: "in-app",
    fallbackChannels: ["push", "email"],

    conditionMode: "conditional",
    condition: "Has GBP Account",

    htmlContent: `
      <h3 class="font-semibold mb-2">
        Using Your GBP Account
      </h3>

      <p>
        Your GBP account gives you access to convenient ways to
        receive, hold, and manage GBP.
      </p>
    `,
  },

  {
    id: 4,
    timing: "Day 7",
    message: "Sending Money With KiiBank",

    send: "delayed-notification",
    waitValue: 4,
    waitUnit: "days",

    channel: "push",
    fallbackChannels: [],

    conditionMode: "always",
    condition: "Always send",

    htmlContent: `
      <h3 class="font-semibold mb-2">
        Sending Money With KiiBank
      </h3>

      <p>
        Send money simply and securely from your KiiBank account.
      </p>
    `,
  },

  {
    id: 5,
    timing: "Day 14",
    message: "Discover More Features",

    send: "delayed-notification",
    waitValue: 7,
    waitUnit: "days",

    channel: "email",
    fallbackChannels: ["push"],

    conditionMode: "always",
    condition: "Always send",

    htmlContent: `
      <h3 class="font-semibold mb-2">
        Discover More Features
      </h3>

      <p>
        There is more you can do with KiiBank. Explore additional
        tools and features available from your account.
      </p>
    `,
  },
];

export const channelLabels: Record<
  TemplateVariant,
  string
> = {
  push: "Push",
  whatsapp: "WhatsApp",
  email: "Email",
  "in-app": "In-App",
  sms: "SMS",
};