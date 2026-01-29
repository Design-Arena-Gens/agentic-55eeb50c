"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea, ScrollViewport, Scrollbar } from "@/components/ui/scroll-area";
import type { TraceRow } from "@/lib/data/types";

interface RunDetailsDialogProps {
  run?: TraceRow;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export function RunDetailsDialog({ run, open, onOpenChange }: RunDetailsDialogProps) {
  const stepTimeline = run
    ? Array.from({ length: run.steps }).map((_, idx) => ({
        name: `Step ${idx + 1}`,
        detail: idx === run.steps - 1 ? "Finalize output" : `Tool invocation ${idx + 1}`,
        duration: `${(Math.random() * 0.8 + 0.2).toFixed(2)}s`
      }))
    : [];
  const toolCalls = run
    ? Array.from({ length: run.toolCount }).map((_, idx) => ({
        tool: `tool-${idx + 1}`,
        status: idx === run.toolCount - 1 && run.status === "failed" ? "error" : "ok",
        tokens: Math.round(120 + Math.random() * 80)
      }))
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Run details</DialogTitle>
          <DialogDescription>
            {run ? `${run.runId} • ${run.model} • ${run.duration}s` : "Select a run to inspect"}
          </DialogDescription>
        </DialogHeader>
        {run && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[12px] border border-border/60 bg-neutral-3/60 p-3 text-[12px] text-muted">
              <h4 className="text-[13px] font-semibold text-foreground">Timeline</h4>
              <ScrollArea className="mt-2 h-64">
                <ScrollViewport>
                  <ul className="space-y-2">
                    {stepTimeline.map((step) => (
                      <li key={step.name} className="rounded-[10px] border border-border/60 bg-neutral-2/80 px-3 py-2 text-foreground">
                        <div className="flex items-center justify-between text-[12px]">
                          <span>{step.name}</span>
                          <span className="text-muted">{step.duration}</span>
                        </div>
                        <div className="mt-1 text-[12px] text-muted">{step.detail}</div>
                      </li>
                    ))}
                  </ul>
                </ScrollViewport>
                <Scrollbar orientation="vertical" />
              </ScrollArea>
            </div>
            <div className="space-y-3 text-[12px] text-muted">
              <div className="rounded-[12px] border border-border/60 bg-neutral-3/60 p-3">
                <h4 className="text-[13px] font-semibold text-foreground">Tool calls</h4>
                <ul className="mt-2 space-y-2">
                  {toolCalls.map((tool) => (
                    <li key={tool.tool} className="rounded-[10px] border border-border/60 bg-neutral-2/80 px-3 py-2 text-foreground">
                      <div className="flex items-center justify-between">
                        <span>{tool.tool}</span>
                        <span className={tool.status === "error" ? "text-danger-9" : "text-success-9"}>{tool.status}</span>
                      </div>
                      <div className="mt-1 text-[11px] text-muted">Tokens {tool.tokens}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[12px] border border-border/60 bg-neutral-3/60 p-3 text-foreground">
                <div className="flex items-center justify-between text-[12px] text-muted">
                  <span>Tokens in</span>
                  <span>{Math.round(run.cost * 1200)} </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[12px] text-muted">
                  <span>Tokens out</span>
                  <span>{Math.round(run.cost * 1600)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[12px] text-muted">
                  <span>Cost</span>
                  <span>${run.cost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
