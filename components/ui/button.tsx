"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "button-primary-sheen inline-flex items-center justify-center rounded-[10px] text-foreground shadow-md transition-all duration-200 ease-smooth-bounce bg-gradient-to-b from-brand-8/80 via-brand-7/70 to-brand-6/70 hover:from-brand-9 hover:via-brand-8 hover:to-brand-7 active:translate-y-px active:shadow-sm",
  secondary:
    "inline-flex items-center justify-center rounded-[10px] border border-border/70 bg-neutral-3/70 hover:bg-neutral-4 text-foreground shadow-sm",
  ghost: "inline-flex items-center justify-center rounded-[10px] hover:bg-neutral-3/60 text-muted",
  destructive:
    "inline-flex items-center justify-center rounded-[10px] bg-danger-8/80 text-foreground shadow-sm hover:bg-danger-9"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-9 px-4",
  lg: "h-11 px-5 text-[15px]",
  icon: "h-9 w-9"
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "group relative font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-9/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
