"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type OtpMethod = "authenticator" | "sms" | "email";

type OtpVerificationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  onVerify: (method: OtpMethod, code: string) => Promise<void>;
  onSendOtp: (method: "sms" | "email") => Promise<void>;

  maskedPhone?: string;
  maskedEmail?: string;
};

export function OtpVerificationDialog({
  open,
  onOpenChange,
  onVerify,
  onSendOtp,
  maskedPhone = "98******20",
  maskedEmail = "ga******@np.technofex.com",
}: OtpVerificationDialogProps) {
  const [screen, setScreen] = useState<"verify" | "alternative">("verify");

  const [method, setMethod] = useState<OtpMethod>("authenticator");

  const [selectedMethod, setSelectedMethod] = useState<"sms" | "email">("sms");

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    if (loading) return;

    if (!nextOpen) {
      setScreen("verify");
      setMethod("authenticator");
      setSelectedMethod("sms");
      setCode("");
      setError("");
    }

    onOpenChange(nextOpen);
  };

  const handleVerify = async () => {
    if (code.length !== 6) return;

    setLoading(true);
    setError("");

    try {
      await onVerify(method, code);
      handleOpenChangeAfterSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChangeAfterSuccess = () => {
    setScreen("verify");
    setMethod("authenticator");
    setCode("");
    setError("");
    onOpenChange(false);
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      await onSendOtp(selectedMethod);
      setMethod(selectedMethod);
      setCode("");
      setScreen("verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          fixed
          left-1/2
          top-6
          bottom-auto
          w-[calc(100%-2rem)]
          max-w-lg
          -translate-x-1/2
          translate-y-0
          gap-0
          overflow-hidden
          p-0
          data-[state=open]:slide-in-from-top-8
          data-[state=closed]:slide-out-to-top-8
          sm:top-8
        "
      >
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {screen === "alternative" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setScreen("verify")}
                  disabled={loading}
                >
                  <ArrowLeft className="size-4" />
                </Button>
              )}

              <DialogTitle>Verification Required</DialogTitle>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-destructive"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              <X className="size-5" />
            </Button>
          </div>

          <DialogDescription className="sr-only">
            Verify your identity before continuing.
          </DialogDescription>
        </DialogHeader>

        {screen === "verify" ? (
          <>
            <div className="space-y-6 px-6 py-8">
              <p className="text-center text-sm text-muted-foreground">
                {method === "authenticator"
                  ? "Enter the 6-digit code from your authenticator."
                  : `Enter the 6-digit OTP sent to your ${
                      method === "sms" ? "phone" : "email"
                    }.`}
              </p>

              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={setCode}
                  disabled={loading}
                  autoFocus
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-center text-sm text-destructive"
                >
                  {error}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between border-t px-6 py-4">
              <Button
                variant="link"
                className="px-0"
                disabled={loading}
                onClick={() => {
                  setError("");
                  setScreen("alternative");
                }}
              >
                Try Another Way
              </Button>

              <Button
                disabled={code.length !== 6 || loading}
                onClick={handleVerify}
              >
                {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Confirm
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-6 px-6 py-7">
              <p className="text-sm text-muted-foreground">
                Try an alternative way to validate.
              </p>

              <RadioGroup
                value={selectedMethod}
                onValueChange={(value) =>
                  setSelectedMethod(value as "sms" | "email")
                }
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="sms" id="otp-sms" />
                  <Label
                    htmlFor="otp-sms"
                    className="cursor-pointer font-normal"
                  >
                    Tel: {maskedPhone}
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem value="email" id="otp-email" />
                  <Label
                    htmlFor="otp-email"
                    className="cursor-pointer font-normal"
                  >
                    Email: {maskedEmail}
                  </Label>
                </div>
              </RadioGroup>

              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>

            <div className="border-t px-6 py-4">
              <Button onClick={handleSendOtp} disabled={loading}>
                {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Send OTP
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
