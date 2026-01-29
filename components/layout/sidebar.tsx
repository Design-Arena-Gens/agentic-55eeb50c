"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu } from "lucide-react";
import { NAV_ITEMS } from "./sidebar-data";

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "group flex h-full flex-col gap-6 border-r border-border/60 bg-neutral-2/60 px-3 py-4 backdrop-blur transition-[width] duration-300",
        collapsed ? "w-[76px]" : "w-[248px]"
      )}
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-[12px] bg-brand-8/30" />
          {!collapsed && (
            <div className="text-[14px] font-semibold text-foreground">Agentic Ops</div>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group/nav relative block rounded-[10px]",
                active && "after:absolute after:-left-3 after:top-1/2 after:h-8 after:w-1 after:-translate-y-1/2 after:rounded-r-full after:bg-brand-8"
              )}
            >
              <span
                className={cn(
                  "flex items-center gap-3 rounded-[10px] px-3 py-2 text-[13px] font-medium text-muted transition group-hover/nav:bg-neutral-3/60 group-hover/nav:text-foreground",
                  active && "bg-brand-8/15 text-foreground"
                )}
              >
                <HugeiconsIcon icon={Icon} size={20} />
                {!collapsed && item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className={cn("rounded-[12px] border border-border/60 bg-neutral-3/60 p-3 text-[12px] text-muted", collapsed && "hidden")}
        aria-hidden={collapsed}
      >
        <div className="text-[13px] font-medium text-foreground">Status</div>
        <p className="mt-2 leading-5">All systems nominal. 3 minor alerts acknowledged.</p>
      </div>
    </aside>
  );
}
