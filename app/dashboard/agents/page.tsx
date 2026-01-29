"use client";

import { useMemo } from "react";
import { useDashboardStore } from "@/lib/data/dashboard-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgentKpiGrid } from "@/components/dashboard/agent-kpi-grid";
import { DataTable } from "@/components/dashboard/data-table";
import { Badge } from "@/components/ui/badge";
import { HallucinationRiskCard } from "@/components/dashboard/hallucination-risk-card";
import { MemoryUsageCard } from "@/components/dashboard/memory-usage-card";
import { ConcurrencyChart } from "@/components/charts/concurrency-chart";
import { ChartContainer, ChartLegendItem } from "@/components/charts/chart-container";
import { RunDetailsDialog } from "@/components/dashboard/run-details-dialog";
import type { ToolCall, TraceRow } from "@/lib/data/types";
import type { ColumnDef } from "@tanstack/react-table";

const statusVariant: Record<TraceRow["status"], "brand" | "danger" | "warning"> = {
  success: "brand",
  failed: "danger",
  running: "warning"
};

export default function AgentsPage() {
  const agents = useDashboardStore((state) => state.agents.agents);
  const selectedAgent = useDashboardStore((state) => state.agents.selectedAgent);
  const setSelectedAgent = useDashboardStore((state) => state.setSelectedAgent);
  const kpis = useDashboardStore((state) => state.agents.kpis);
  const toolCalls = useDashboardStore((state) => state.agents.toolCalls);
  const traces = useDashboardStore((state) => state.agents.traces);
  const hallucinationRisk = useDashboardStore((state) => state.agents.hallucinationRisk);
  const memory = useDashboardStore((state) => state.agents.memory);
  const concurrency = useDashboardStore((state) => state.agents.concurrency);
  const selectedRun = useDashboardStore((state) => state.agents.selectedRun);
  const setSelectedRun = useDashboardStore((state) => state.setSelectedRun);

  const toolColumns = useMemo<ColumnDef<ToolCall, unknown>[]>(
    () => [
      { accessorKey: "tool", header: "Tool", cell: ({ row }) => <span className="text-foreground">{row.getValue("tool")}</span> },
      { accessorKey: "calls", header: "Calls", cell: ({ row }) => Number(row.getValue("calls")).toLocaleString() },
      {
        accessorKey: "errors",
        header: "Errors",
        cell: ({ row }) => (
          <span className={Number(row.getValue("errors")) > 5 ? "text-warning-9" : "text-success-9"}>
            {row.getValue("errors")}
          </span>
        )
      },
      {
        accessorKey: "p95",
        header: "P95 latency",
        cell: ({ row }) => `${Number(row.getValue("p95")).toFixed(2)} s`
      }
    ],
    []
  );

  const traceColumns = useMemo<ColumnDef<TraceRow, unknown>[]>(
    () => [
      { accessorKey: "runId", header: "Run id", cell: ({ row }) => <span className="font-mono text-foreground">{row.getValue("runId")}</span> },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as TraceRow["status"];
          return <Badge variant={statusVariant[status]}>{status}</Badge>;
        }
      },
      { accessorKey: "steps", header: "Steps" },
      {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row }) => `${Number(row.getValue("duration")).toFixed(1)} s`
      },
      {
        accessorKey: "cost",
        header: "Cost",
        cell: ({ row }) => `$${Number(row.getValue("cost")).toFixed(2)}`
      },
      { accessorKey: "model", header: "Model" },
      { accessorKey: "toolCount", header: "Tools" }
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-h1 text-foreground">AI Agents</h1>
        <Select value={selectedAgent.id} onValueChange={setSelectedAgent}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select agent" />
          </SelectTrigger>
          <SelectContent>
            {agents.map((agent) => (
              <SelectItem key={agent.id} value={agent.id}>
                {agent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AgentKpiGrid kpis={kpis} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartContainer
            title="Concurrency & queue"
            description="Realtime concurrency saturation vs queue depth"
            legend={
              <>
                <ChartLegendItem label="Concurrency" color="#6173ef" />
                <ChartLegendItem label="Queue" color="#c25a69" />
              </>
            }
          >
            <div className="h-72">
              <ConcurrencyChart data={concurrency} />
            </div>
          </ChartContainer>
        </div>
        <div className="space-y-4">
          <HallucinationRiskCard risk={hallucinationRisk} />
          <MemoryUsageCard data={memory} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 text-[14px] font-semibold text-foreground">Tool calls</h3>
          <DataTable columns={toolColumns} data={toolCalls} />
        </div>
        <div>
          <h3 className="mb-2 text-[14px] font-semibold text-foreground">Trace explorer</h3>
          <DataTable columns={traceColumns} data={traces} onRowClick={(row) => setSelectedRun(row)} />
        </div>
      </div>

      <RunDetailsDialog run={selectedRun} open={Boolean(selectedRun)} onOpenChange={(open) => !open && setSelectedRun(undefined)} />
    </div>
  );
}
