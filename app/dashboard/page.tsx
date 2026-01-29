"use client";

import { useDashboardStore } from "@/lib/data/dashboard-store";
import { MetricCard } from "@/components/dashboard/metric-card";
import { TrafficAreaChart } from "@/components/charts/traffic-area-chart";
import { AgentRunsCostChart } from "@/components/charts/agent-runs-cost-chart";
import { ChartContainer, ChartLegendItem } from "@/components/charts/chart-container";
import { CwvGauge } from "@/components/charts/cwv-gauge";
import { FunnelBar } from "@/components/charts/funnel-bar";
import { TopPagesTable } from "@/components/dashboard/top-pages-table";
import { AlertsFeed } from "@/components/dashboard/alerts-feed";
import { LiveSessionsList } from "@/components/dashboard/live-sessions-list";
import { AgentQueueCard } from "@/components/dashboard/agent-queue-card";
import { RegionsList } from "@/components/dashboard/regions-list";
import { SecurityOverviewCard } from "@/components/dashboard/security-overview-card";

export default function OverviewPage() {
  const chartPalette = useDashboardStore((state) => state.chartPalette);
  const kpis = useDashboardStore((state) => state.overview.kpis);
  const traffic = useDashboardStore((state) => state.overview.traffic);
  const agentCost = useDashboardStore((state) => state.overview.agent);
  const cwv = useDashboardStore((state) => state.overview.cwv);
  const funnel = useDashboardStore((state) => state.overview.funnel);
  const topPages = useDashboardStore((state) => state.overview.topPages);
  const alerts = useDashboardStore((state) => state.overview.alerts);
  const sessions = useDashboardStore((state) => state.overview.sessions);
  const queue = useDashboardStore((state) => state.overview.queue);
  const regions = useDashboardStore((state) => state.overview.regions);
  const security = useDashboardStore((state) => state.overview.security);

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartContainer
          title="Traffic & Events"
          description="Requests aggregated per minute"
          legend={
            <>
              <ChartLegendItem label="Pageviews" color={chartPalette[0]} />
              <ChartLegendItem label="Events" color={chartPalette[1]} />
              <ChartLegendItem label="API" color={chartPalette[2]} />
            </>
          }
        >
          <div className="h-72">
            <TrafficAreaChart data={traffic} colors={[chartPalette[0], chartPalette[1], chartPalette[3]]} />
          </div>
        </ChartContainer>
        <ChartContainer
          title="Agent runs & cost"
          description="Successful runs vs model spend"
          legend={
            <>
              <ChartLegendItem label="Runs" color={chartPalette[4]} />
              <ChartLegendItem label="Cost" color={chartPalette[0]} />
            </>
          }
        >
          <div className="h-72">
            <AgentRunsCostChart data={agentCost} colors={{ bar: chartPalette[4], line: chartPalette[0] }} />
          </div>
        </ChartContainer>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        <div className="grid gap-3 xl:col-span-2">
          <div className="grid gap-3 md:grid-cols-3">
            {cwv.map((metric) => (
              <CwvGauge key={metric.metric} metric={metric} />
            ))}
          </div>
          <FunnelBar steps={funnel} />
        </div>
        <div className="xl:col-span-1">
          <div className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4">
            <h4 className="text-[14px] font-semibold text-foreground">Top pages</h4>
            <div className="mt-3">
              <TopPagesTable pages={topPages} />
            </div>
          </div>
        </div>
        <div className="xl:col-span-1">
          <div className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4">
            <h4 className="text-[14px] font-semibold text-foreground">Active alerts</h4>
            <div className="mt-3">
              <AlertsFeed alerts={alerts} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        <div className="xl:col-span-1">
          <h4 className="mb-3 text-[14px] font-semibold text-foreground">Live sessions</h4>
          <LiveSessionsList sessions={sessions} />
        </div>
        <div className="xl:col-span-1">
          <h4 className="mb-3 text-[14px] font-semibold text-foreground">Queue & workers</h4>
          <AgentQueueCard queue={queue} />
        </div>
        <div className="xl:col-span-1">
          <RegionsList regions={regions} />
        </div>
        <div className="xl:col-span-1">
          <SecurityOverviewCard metrics={security} />
        </div>
      </section>
    </div>
  );
}
