"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { CommandPalette } from "@/components/layout/command-palette";
import { LiveStreamDrawer } from "@/components/dashboard/live-stream-drawer";
import { DashboardProvider } from "@/components/dashboard/dashboard-provider";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [streamCollapsed, setStreamCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-neutral-1/80">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((prev) => !prev)} />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar onCommand={() => setCommandOpen(true)} />
          <main className="flex flex-1 flex-row overflow-hidden">
            <section className="flex-1 overflow-y-auto px-6 pb-12 pt-6">
              <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">{children}</div>
            </section>
            <LiveStreamDrawer collapsed={streamCollapsed} onToggle={() => setStreamCollapsed((prev) => !prev)} />
          </main>
        </div>
      </div>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </DashboardProvider>
  );
}
