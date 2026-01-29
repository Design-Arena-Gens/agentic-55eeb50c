"use client";

import { useDashboardStore } from "@/lib/data/dashboard-store";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { StyledTabsContent, StyledTabsList, StyledTabsTrigger, Tabs } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea, ScrollViewport, Scrollbar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const severityVariant: Record<string, "success" | "warning" | "danger"> = {
  low: "success",
  medium: "warning",
  high: "danger"
};

export default function AlertsPage() {
  const incidents = useDashboardStore((state) => state.alerts.incidents);
  const rules = useDashboardStore((state) => state.alerts.rules);
  const notifications = useDashboardStore((state) => state.alerts.notifications);
  const [threshold, setThreshold] = useState([rules[0]?.threshold ?? 5]);

  return (
    <div className="space-y-6">
      <h1 className="text-h1 text-foreground">Alerts & incidents</h1>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active incidents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {incidents.map((incident) => (
              <div key={incident.id} className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-3 text-[12px] text-muted">
                <div className="flex items-center justify-between">
                  <div className="text-[14px] font-semibold text-foreground">{incident.service}</div>
                  <Badge variant={severityVariant[incident.severity]}>Severity {incident.severity}</Badge>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-muted">
                  <span>Status: {incident.status}</span>
                  <span>•</span>
                  <span>Since {new Date(incident.startedAt).toLocaleTimeString()}</span>
                </div>
                <p className="mt-2 text-foreground">{incident.updates}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert rules builder</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="configure">
              <StyledTabsList>
                <StyledTabsTrigger value="configure">Configure</StyledTabsTrigger>
                <StyledTabsTrigger value="existing">Existing</StyledTabsTrigger>
              </StyledTabsList>
              <StyledTabsContent value="configure" className="space-y-4 pt-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="text-[12px] uppercase tracking-wide text-muted">Metric</label>
                    <Select defaultValue="error_rate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="error_rate">Error rate</SelectItem>
                        <SelectItem value="latency_p95">P95 latency</SelectItem>
                        <SelectItem value="agent_retries">Agent retries</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-[12px] uppercase tracking-wide text-muted">Operator</label>
                    <Select defaultValue=">">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=">">Greater than</SelectItem>
                        <SelectItem value=">=">Greater equal</SelectItem>
                        <SelectItem value="<">Less than</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-[12px] uppercase tracking-wide text-muted">Threshold</label>
                    <div className="mt-2 flex items-center gap-3">
                      <Slider value={threshold} onValueChange={setThreshold} min={1} max={20} step={1} />
                      <Input value={threshold[0]} readOnly className="w-16" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] uppercase tracking-wide text-muted">Duration</label>
                    <Select defaultValue="5m">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1m">1 minute</SelectItem>
                        <SelectItem value="5m">5 minutes</SelectItem>
                        <SelectItem value="15m">15 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-[12px] uppercase tracking-wide text-muted">Channels</label>
                  <Accordion type="multiple" className="mt-2 space-y-2">
                    <AccordionItem value="slack">
                      <AccordionTrigger>
                        Slack
                      </AccordionTrigger>
                      <AccordionContent>Send notifications to #ops-ai.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="pagerduty">
                      <AccordionTrigger>PagerDuty</AccordionTrigger>
                      <AccordionContent>Escalate to on-call runbook.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <Button className="w-full">Create rule</Button>
              </StyledTabsContent>
              <StyledTabsContent value="existing" className="space-y-3 pt-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-3 text-[12px] text-muted">
                    <div className="flex items-center justify-between text-foreground">
                      <span>{rule.metric}</span>
                      <Badge variant="neutral">{rule.channel}</Badge>
                    </div>
                    <div className="mt-1">{rule.operator} {rule.threshold} for {rule.duration}</div>
                  </div>
                ))}
              </StyledTabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72">
            <ScrollViewport>
              <ul className="space-y-3">
                {notifications.map((notif) => (
                  <li key={notif.id} className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-3 text-[12px] text-muted">
                    <div className="flex items-center justify-between text-[13px] text-foreground">
                      <span>{notif.channel}</span>
                      <Badge variant={notif.status === "failed" ? "danger" : "brand"}>{notif.status}</Badge>
                    </div>
                    <p className="mt-2 text-foreground">{notif.message}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-wide text-muted">{new Date(notif.timestamp).toLocaleTimeString()}</p>
                  </li>
                ))}
              </ul>
            </ScrollViewport>
            <Scrollbar orientation="vertical" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
