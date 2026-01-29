"use client";

import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { NAV_ITEMS } from "./sidebar-data";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenChange, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[540px] overflow-hidden border-0 bg-neutral-2/95 p-0">
        <Command label="Global Search" className="w-full bg-transparent text-foreground">
          <Command.Input placeholder="Search routes, metrics, agents" className="h-12 border-b border-border/60 px-4 text-[14px] outline-none" />
          <Command.List className="max-h-[360px] overflow-y-auto">
            <Command.Empty className="px-4 py-6 text-center text-[13px] text-muted">No results. Try a different query.</Command.Empty>
            <Command.Group heading="Navigation" className="px-4 py-3 text-[11px] uppercase tracking-wide text-muted">
              {NAV_ITEMS.map((item) => (
                <Command.Item
                  key={item.href}
                  className="flex items-center gap-3 rounded-[10px] px-3 py-2 text-[13px] text-foreground aria-selected:bg-brand-8/20"
                  onSelect={() => {
                    router.push(item.href);
                    onOpenChange(false);
                  }}
                >
                  <HugeiconsIcon icon={item.icon} size={18} />
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
