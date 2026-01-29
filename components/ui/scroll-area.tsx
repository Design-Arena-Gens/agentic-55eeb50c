"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

const ScrollArea = ScrollAreaPrimitive.Root;
const ScrollViewport = ScrollAreaPrimitive.Viewport;

const Scrollbar = ({ className, orientation = "vertical", ...props }: ScrollAreaPrimitive.ScrollAreaScrollbarProps) => (
  <ScrollAreaPrimitive.Scrollbar
    orientation={orientation}
    className={cn(
      "flex touch-none select-none bg-neutral-4/40 transition-colors",
      orientation === "vertical" ? "h-full w-2.5" : "h-2.5 w-full",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-brand-8/50" />
  </ScrollAreaPrimitive.Scrollbar>
);

const Corner = ScrollAreaPrimitive.Corner;

export { ScrollArea, ScrollViewport, Scrollbar, Corner };
