"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useDashboardStore } from "@/lib/data/dashboard-store";

export function DashboardProvider({ children }: { children: ReactNode }) {
  const tick = useDashboardStore((state) => state.tick);
  const interval = useDashboardStore((state) => state.updateInterval);

  useEffect(() => {
    const id = setInterval(() => {
      tick();
    }, interval);
    return () => clearInterval(id);
  }, [interval, tick]);

  return <>{children}</>;
}
