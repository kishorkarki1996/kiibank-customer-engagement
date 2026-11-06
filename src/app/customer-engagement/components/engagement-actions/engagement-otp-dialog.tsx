"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EngagementOtpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (otp: string) => Promise<void>;
  onTryAnotherWay?: () => void;
};

const OTP_LENGTH = 6;

export function EngagementOtpDialog({
  open,
  onOpenChange,
  onConfirm,
  onTryAnotherWay,
}: EngagementOtpDialogProps) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;

    setOtp(updatedOtp);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedValue) {
      return;
    }

    const updatedOtp = Array(OTP_LENGTH).fill("");

    pastedValue.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);

    const nextIndex = Math.min(pastedValue.length, OTP_LENGTH - 1);

    inputRefs.current[nextIndex]?.focus();
  };

  const handleConfirm = async () => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onConfirm(code);

      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    onOpenChange(false);
  };

  const isComplete = otp.join("").length === OTP_LENGTH;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
          return;
        }

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="
          top-6
          translate-y-0
          gap-0
          overflow-hidden
          p-0
          sm:top-10
          sm:max-w-lg
        "
      >
        {/* Header */}
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle>Verification Required</DialogTitle>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={handleClose}
            >
              <X className="size-5" />

              <span className="sr-only">Close</span>
            </Button>
          </div>

          <DialogDescription className="sr-only">
            Enter the 6-digit authentication code to confirm this action.
          </DialogDescription>
        </DialogHeader>

        {/* OTP */}
        <div className="px-6 py-8">
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Enter the 6 digit code from your authenticator.
          </p>

          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                aria-label={`OTP digit ${index + 1}`}
                className="
                  size-12
                  rounded-md
                  border
                  bg-background
                  text-center
                  text-lg
                  font-medium
                  outline-none
                  transition
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                "
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-6 py-4">
          <Button
            type="button"
            variant="link"
            className="px-0"
            onClick={onTryAnotherWay}
          >
            Try Another Way
          </Button>

          <Button
            type="button"
            disabled={!isComplete || isSubmitting}
            onClick={handleConfirm}
          >
            {isSubmitting ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
