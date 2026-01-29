"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollViewport, Scrollbar } from "@/components/ui/scroll-area";
import { useDashboardStore } from "@/lib/data/dashboard-store";
import { cn } from "@/lib/utils";
import { Pause, Play, SlidersHorizontal } from "lucide-react";

const categoryLabels = {
  traffic: "Traffic",
  agent: "Agents",
  infra: "Infra",
  security: "Security"
};

const levelColors = {
  info: "bg-info-8/20 text-info-11",
  warn: "bg-warning-9/20 text-warning-11",
  error: "bg-danger-9/20 text-danger-11"
};

export function LiveStreamDrawer({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const events = useDashboardStore((state) => state.overview.stream);
  const streamPaused = useDashboardStore((state) => state.streamPaused);
  const toggleStream = useDashboardStore((state) => state.toggleStream);
  const [filter, setFilter] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (!filter.length) return events;
    return events.filter((event) => filter.includes(event.category));
  }, [events, filter]);

  return (
    <div
      className={cn(
        "flex h-full flex-col border-l border-border/60 bg-neutral-2/70 transition-[width] duration-300",
        collapsed ? "w-[42px]" : "w-[320px]"
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggle} aria-label={collapsed ? "Expand live stream" : "Collapse live stream"}>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          {!collapsed && <span className="text-[13px] font-semibold text-foreground">Live Stream</span>}
        </div>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleStream} aria-label={streamPaused ? "Resume stream" : "Pause stream"}>
              {streamPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>
      {!collapsed && (
        <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const active = filter.includes(key);
            return (
              <Badge
                key={key}
                onClick={() =>
                  setFilter((prev) =>
                    prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
                  )
                }
                className={cn(
                  "cursor-pointer select-none rounded-full bg-neutral-3/70 text-[11px]",
                  active && "bg-brand-8/30 text-foreground"
                )}
              >
                {label}
              </Badge>
            );
          })}
        </div>
      )}
      <ScrollArea className="flex-1">
        <ScrollViewport>
          <ul className="space-y-2 px-3 py-3">
            <AnimatePresence initial={false}>
              {filtered.map((event) => (
                <motion.li
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="rounded-[10px] border border-border/60 bg-neutral-3/60 p-3 text-[12px] text-muted"
                >
                  <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-wide">
                    <span className="text-muted">{new Date(event.timestamp).toLocaleTimeString()}</span>
                    <span className={cn("rounded-full px-2 py-0.5", levelColors[event.level])}>{event.level}</span>
                  </div>
                  <div className="text-[13px] text-foreground">{event.message}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-wide text-brand-9">{categoryLabels[event.category]}</div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </ScrollViewport>
        <Scrollbar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
