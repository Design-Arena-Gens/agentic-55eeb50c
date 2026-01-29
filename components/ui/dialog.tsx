"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { HTMLAttributes } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = DialogPrimitive.Overlay;

const DialogContent = ({ className, children, ...props }: DialogPrimitive.DialogContentProps) => (
  <DialogPortal>
    <DialogOverlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur" />
    <DialogPrimitive.Content
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-[min(800px,95vw)] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[16px] border border-border/60 bg-neutral-2/95 p-4 shadow-lg backdrop-blur",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full bg-neutral-3/80 p-1 text-muted hover:text-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4 flex flex-col gap-1", className)} {...props} />
);

const DialogTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-h2 text-foreground", className)} {...props} />
);

const DialogDescription = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <p className={cn("text-[13px] text-muted", className)} {...props} />
);

export { Dialog, DialogTrigger, DialogPortal, DialogClose, DialogContent, DialogOverlay, DialogHeader, DialogTitle, DialogDescription };
