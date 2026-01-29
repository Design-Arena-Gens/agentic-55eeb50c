"use client";

import { useDashboardStore } from "@/lib/data/dashboard-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeoCards } from "@/components/dashboard/seo-cards";
import { HeatmapGrid } from "@/components/charts/heatmap-grid";
import { ChartContainer, ChartLegendItem } from "@/components/charts/chart-container";
import { WebsiteCwvTrend } from "@/components/charts/website-cwv-trend";
import { ErrorsBreakdownChart } from "@/components/charts/errors-breakdown-chart";
import { DeviceDonutChart } from "@/components/charts/device-donut-chart";
import { ReferrersList } from "@/components/dashboard/referrers-list";
import { GeoBarList } from "@/components/dashboard/geo-bar-list";

export default function WebsitesPage() {
  const domains = useDashboardStore((state) => state.websites.domains);
  const selected = useDashboardStore((state) => state.websites.selectedDomain);
  const heatmap = useDashboardStore((state) => state.websites.heatmap);
  const seo = useDashboardStore((state) => state.websites.seo);
  const cwvTrend = useDashboardStore((state) => state.websites.cwvTrend);
  const errors = useDashboardStore((state) => state.websites.errors);
  const referrers = useDashboardStore((state) => state.websites.referrers);
  const deviceShare = useDashboardStore((state) => state.websites.deviceShare);
  const geoSources = useDashboardStore((state) => state.websites.geoSources);
  const setDomain = useDashboardStore((state) => state.setSelectedDomain);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-h1 text-foreground">Websites</h1>
        <Select value={selected} onValueChange={setDomain}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {domains.map((domain) => (
              <SelectItem key={domain} value={domain}>
                {domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hourly traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <HeatmapGrid cells={heatmap} />
        </CardContent>
      </Card>

      <SeoCards cards={seo} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartContainer
            title="Core Web Vitals trend"
            description="Deploy markers highlight releases impacting vitals"
            legend={
              <>
                <ChartLegendItem label="LCP" color="#6173ef" />
                <ChartLegendItem label="INP" color="#4bbdd6" />
                <ChartLegendItem label="CLS" color="#c25a69" />
              </>
            }
          >
            <div className="h-72">
              <WebsiteCwvTrend data={cwvTrend} />
            </div>
          </ChartContainer>
        </div>
        <div className="h-full rounded-[12px] border border-border/60 bg-neutral-2/70 p-4 shadow-sm">
          <h3 className="text-[14px] font-semibold text-foreground">Errors breakdown</h3>
          <div className="mt-2 h-60">
            <ErrorsBreakdownChart data={errors} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4 shadow-sm">
          <h3 className="text-[14px] font-semibold text-foreground">Top referrers</h3>
          <div className="mt-3">
            <ReferrersList sources={referrers} />
          </div>
        </div>
        <div className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4 shadow-sm">
          <h3 className="text-[14px] font-semibold text-foreground">Device share</h3>
          <div className="mt-4 h-60">
            <DeviceDonutChart data={deviceShare} />
          </div>
        </div>
        <div className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4 shadow-sm">
          <h3 className="text-[14px] font-semibold text-foreground">Geo sources</h3>
          <div className="mt-3">
            <GeoBarList sources={geoSources} />
          </div>
        </div>
      </div>
    </div>
  );
}
