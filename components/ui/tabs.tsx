"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;
const TabsList = TabsPrimitive.List;

const TabsTrigger = TabsPrimitive.Trigger;
const TabsContent = TabsPrimitive.Content;

export { Tabs, TabsList, TabsTrigger, TabsContent };

export const StyledTabsList = ({ className, ...props }: ComponentProps<typeof TabsList>) => (
  <TabsList
    className={cn(
      "inline-flex items-center gap-2 rounded-[12px] border border-border/60 bg-neutral-2/60 p-1",
      className
    )}
    {...props}
  />
);

export const StyledTabsTrigger = ({ className, ...props }: ComponentProps<typeof TabsTrigger>) => (
  <TabsTrigger
    className={cn(
      "inline-flex min-w-[96px] items-center justify-center rounded-[10px] px-3 py-1.5 text-[13px] font-medium text-muted transition-colors data-[state=active]:bg-brand-8/20 data-[state=active]:text-foreground",
      className
    )}
    {...props}
  />
);

export const StyledTabsContent = ({ className, ...props }: ComponentProps<typeof TabsContent>) => (
  <TabsContent className={cn("mt-4", className)} {...props} />
);
