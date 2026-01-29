"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitive.Provider;
const ToastViewport = ({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Viewport>) => (
  <ToastPrimitive.Viewport
    className={cn(
      "fixed right-5 top-5 z-50 flex max-h-screen w-[340px] flex-col gap-3",
      className
    )}
    {...props}
  />
);

const Toast = ({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Root>) => (
  <ToastPrimitive.Root
    className={cn(
      "relative overflow-hidden rounded-[12px] border border-border/60 bg-neutral-2/95 p-4 shadow-lg backdrop-blur",
      className
    )}
    {...props}
  />
);

const ToastTitle = ({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Title>) => (
  <ToastPrimitive.Title className={cn("text-[13px] font-semibold text-foreground", className)} {...props} />
);

const ToastDescription = ({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Description>) => (
  <ToastPrimitive.Description className={cn("mt-1 text-[12px] text-muted", className)} {...props} />
);

const ToastAction = ({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Action>) => (
  <ToastPrimitive.Action className={cn("mt-3 inline-flex", className)} {...props} />
);

const ToastClose = () => (
  <ToastPrimitive.Close className="absolute right-3 top-3 text-muted hover:text-foreground">
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </ToastPrimitive.Close>
);

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastAction, ToastClose };
