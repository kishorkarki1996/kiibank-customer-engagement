"use client";

import { Bell, CheckCheck } from "lucide-react";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export type TemplateVariant = "push" | "whatsapp" | "email" | "in-app" | "sms";

type TemplatePreviewProps = {
  title?: string;
  description?: string;
  channels: TemplateVariant | TemplateVariant[];
  variant?: TemplateVariant;
  onVariantChange?: (variant: TemplateVariant) => void;
  htmlContent: string;
};

const channelLabels: Record<TemplateVariant, string> = {
  push: "Push",
  whatsapp: "WhatsApp",
  email: "Email",
  "in-app": "In-App",
  sms: "SMS",
};

export function TemplatePreview({
  title = "Message Preview",
  description = "Preview how this template may appear across different communication channels.",
  channels,
  variant,
  onVariantChange,
  htmlContent,
}: TemplatePreviewProps) {
  const availableChannels = useMemo(() => {
    const channelList = Array.isArray(channels) ? channels : [channels];

    // Remove duplicates and empty values
    return [...new Set(channelList.filter(Boolean))];
  }, [channels]);

  const defaultVariant =
    variant && availableChannels.includes(variant)
      ? variant
      : availableChannels[0];

  const [activeVariant, setActiveVariant] = useState<
    TemplateVariant | undefined
  >(defaultVariant);

  /*
   * Keep the internal active tab in sync when the parent changes
   * the selected channel/fallback channel.
   */
  useEffect(() => {
    if (
      variant &&
      availableChannels.includes(variant) &&
      variant !== activeVariant
    ) {
      setActiveVariant(variant);
    }
  }, [variant, availableChannels, activeVariant]);

  /*
   * If the currently selected tab is removed from channels,
   * fall back to the first available channel.
   */
  useEffect(() => {
    if (activeVariant && availableChannels.includes(activeVariant)) {
      return;
    }

    setActiveVariant(availableChannels[0]);
  }, [availableChannels, activeVariant]);

  const handleVariantChange = (value: string) => {
    const newVariant = value as TemplateVariant;

    setActiveVariant(newVariant);
    onVariantChange?.(newVariant);
  };

  if (!availableChannels.length || !activeVariant) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-xl border bg-background">
      <div className="border-b px-5 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>

            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>

          {availableChannels.length > 1 && (
            <Tabs value={activeVariant} onValueChange={handleVariantChange}>
              <TabsList className="h-auto flex-wrap bg-muted/50">
                {availableChannels.map((channel) => (
                  <TabsTrigger
                    key={channel}
                    value={channel}
                    className="px-3 data-[state=active]:bg-background"
                  >
                    {channelLabels[channel]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>
      </div>

      <div className="bg-muted/30 p-5 md:p-8">
        <div className="mx-auto flex max-w-md items-center justify-center">
          <ChannelPreview variant={activeVariant} htmlContent={htmlContent} />
        </div>
      </div>
    </section>
  );
}

function ChannelPreview({
  variant,
  htmlContent,
}: {
  variant: TemplateVariant;
  htmlContent: string;
}) {
  switch (variant) {
    case "push":
      return <PushPreview htmlContent={htmlContent} />;

    case "whatsapp":
      return <WhatsAppPreview htmlContent={htmlContent} />;

    case "email":
      return <EmailPreview htmlContent={htmlContent} />;

    case "in-app":
      return <InAppPreview htmlContent={htmlContent} />;

    case "sms":
      return <SmsPreview htmlContent={htmlContent} />;

    default:
      return null;
  }
}

function PushPreview({ htmlContent }: { htmlContent: string }) {
  return (
    <div className="w-full rounded-2xl border bg-background p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/kiibank-logo.svg"
            width={60}
            height={20}
            alt="KiiBank Logo"
          />
        </div>

        <span className="text-xs text-muted-foreground">Just now</span>
      </div>

      <div
        className="prose prose-sm mt-3 max-w-none text-sm"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

function WhatsAppPreview({ htmlContent }: { htmlContent: string }) {
  return (
    <div className="w-full rounded-2xl border bg-background p-4">
      <div className="mb-4 flex items-center gap-2 pb-3">
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            KB
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="text-xs font-semibold">KiiBank</p>
          <p className="text-[10px] text-muted-foreground">Business account</p>
        </div>
      </div>

      <div className="ml-auto max-w-[90%] rounded-xl rounded-tr-sm bg-[#D9FDD3] p-3">
        <div
          className="prose prose-xs max-w-none text-xs leading-5"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="mt-2 flex items-center justify-end gap-1">
          <span className="text-[10px] text-muted-foreground">10:42</span>

          <CheckCheck className="size-3.5 text-primary" />
        </div>
      </div>
    </div>
  );
}

function EmailPreview({ htmlContent }: { htmlContent: string }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-background p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Avatar className="size-7">
          <AvatarFallback className="bg-primary text-primary-foreground">
            KB
          </AvatarFallback>
        </Avatar>

        <p className="text-sm font-semibold">kiibank@help.com</p>

        <p className="ml-auto text-xs text-muted-foreground">12:41 PM</p>
      </div>

      <div
        className="prose prose-sm max-w-none text-sm"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div className="mt-4 text-sm">
        <p>
          Thank you,
          <br />
          The KiiBank Team
        </p>
      </div>
    </div>
  );
}

function InAppPreview({ htmlContent }: { htmlContent: string }) {
  return (
    <div className="w-full rounded-2xl border bg-background p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Bell className="size-5 text-primary" />
        </div>

        <div className="min-w-0 flex-1 text-sm">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <Button type="button" variant="outline" size="xs" className="mt-4">
            View Account
          </Button>
        </div>
      </div>
    </div>
  );
}

function SmsPreview({ htmlContent }: { htmlContent: string }) {
  return (
    <div className="w-full rounded-2xl border bg-background p-4">
      <div
        className="prose prose-xs max-w-none text-xs leading-5"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div className="mt-2 text-xs text-muted-foreground">3:05 PM</div>
    </div>
  );
}
