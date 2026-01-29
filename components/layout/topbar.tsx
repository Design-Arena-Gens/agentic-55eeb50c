"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { CommandIcon, Search01Icon, Clock01Icon } from "@hugeicons/core-free-icons";
import { ChevronDown, Bell, User } from "lucide-react";
import { useDashboardStore } from "@/lib/data/dashboard-store";
import { cn } from "@/lib/utils";

const timeRanges: Array<{ label: string; value: "15m" | "1h" | "24h" | "7d" | "custom" }> = [
  { label: "15m", value: "15m" },
  { label: "1h", value: "1h" },
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
  { label: "Custom", value: "custom" }
];

export function Topbar({ onCommand }: { onCommand: () => void }) {
  const timeRange = useDashboardStore((state) => state.timeRange);
  const setRange = useDashboardStore((state) => state.setTimeRange);
  const realtime = useDashboardStore((state) => state.realtime);
  const toggleRealtime = useDashboardStore((state) => state.toggleRealtime);

  const workspaces = useMemo(() => ["Agentic", "Staging", "Sandbox"], []);

  return (
    <header className="sticky top-0 z-40 flex items-center gap-4 border-b border-border/60 bg-neutral-1/85 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <Select defaultValue="Agentic">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Workspace" />
          </SelectTrigger>
          <SelectContent>
            {workspaces.map((space) => (
              <SelectItem key={space} value={space}>
                {space}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex-1">
          <HugeiconsIcon icon={Search01Icon} size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <Input placeholder="Search metrics, traces, sessions" className="pl-9" aria-label="Search dashboard" />
        </div>
        <Button variant="ghost" className="gap-2" onClick={onCommand}>
          <HugeiconsIcon icon={CommandIcon} size={18} />
          <span className="hidden text-[13px] text-muted md:inline">Command</span>
          <kbd className="rounded border border-border/60 bg-neutral-2 px-1.5 text-[11px] text-muted">⌘K</kbd>
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Select value={timeRange} onValueChange={(value) => setRange(value as typeof timeRange)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 text-[12px] text-muted">
          <HugeiconsIcon icon={Clock01Icon} size={18} aria-hidden className="text-muted" />
          Real-time
          <Switch checked={realtime} onCheckedChange={toggleRealtime} aria-label="Toggle realtime" />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 inline-flex h-1.5 w-1.5 rounded-full bg-danger-8" aria-hidden />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-[12px] border border-border/60 bg-neutral-2/60 px-3 py-2 text-[13px] text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-8/40">
                <User className="h-4 w-4" />
              </div>
              <div className={cn("text-left", "hidden md:block")}>alex@agentic.dev</div>
              <ChevronDown className="h-4 w-4 text-muted" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuItem>Switch workspace</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
