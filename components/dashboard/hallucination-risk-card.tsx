"use client";

import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function HallucinationRiskCard({ risk }: { risk: number }) {
  const percentage = Math.min(100, Math.round(risk * 100));

  return (
    <div className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-[14px] font-semibold text-foreground">Hallucination risk</h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted" aria-label="Risk explanation">
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Proxy derived from factual consistency scoring + user feedback.</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mt-4">
        <div className="relative h-4 rounded-full bg-neutral-4">
          <div className="absolute inset-y-0 left-0 rounded-full bg-danger-8" style={{ width: `${percentage}%` }} />
        </div>
        <div className="mt-2 text-[12px] text-muted">Current window risk {percentage}%</div>
      </div>
    </div>
  );
}
