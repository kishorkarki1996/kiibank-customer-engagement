"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CreateCustomerEngagementHeader() {
  const router = useRouter();

  const [exitOpen, setExitOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDraftAndExit = async () => {
    setIsSaving(true);

    try {
      // TODO:
      // Save the current engagement state here.
      // This should ideally use the same save-draft logic
      // as the StepActions footer.

      await new Promise((resolve) => setTimeout(resolve, 700));

      setExitOpen(false);

      router.push("/customer-engagement/engagements");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscardAndExit = () => {
    setExitOpen(false);

    router.push("/customer-engagement");
  };

  return (
    <>
      <header className="sticky top-0 z-[60] flex h-12 shrink-0 items-center border-b bg-white px-3 shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2">
          <Image
            src="/kiibank-logo.svg"
            alt="KiiBank Logo"
            width={72}
            height={72}
          />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setExitOpen(true)}
                aria-label="Exit engagement creation"
              >
                <X className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Exit</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>

      <AlertDialog open={exitOpen} onOpenChange={setExitOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You have unsaved changes</AlertDialogTitle>

            <AlertDialogDescription>
              If you leave now, any unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel disabled={isSaving}>
              Continue Editing
            </AlertDialogCancel>

            <Button
              type="button"
              variant="destructive"
              onClick={handleDiscardAndExit}
              disabled={isSaving}
              className="ml-2"
            >
              Discard & Exit
            </Button>

            {/* <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();

                handleSaveDraftAndExit();
              }}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save as Draft"}
            </AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
