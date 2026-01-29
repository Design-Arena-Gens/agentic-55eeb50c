"use client";

import { useMemo, useState } from "react";
import { useDashboardStore } from "@/lib/data/dashboard-store";
import { DataTable } from "@/components/dashboard/data-table";
import type { SessionRow, SessionEvent } from "@/lib/data/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollViewport, Scrollbar } from "@/components/ui/scroll-area";

export default function SessionsPage() {
  const sessions = useDashboardStore((state) => state.sessions.rows);
  const events = useDashboardStore((state) => state.sessions.events);
  const [selected, setSelected] = useState<SessionRow | undefined>(sessions[0]);
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [deviceFilter, setDeviceFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const columns = useMemo<ColumnDef<SessionRow, unknown>[]>(
    () => [
      { accessorKey: "id", header: "Session", cell: ({ row }) => <span className="font-mono text-foreground">{row.getValue("id")}</span> },
      { accessorKey: "user", header: "User" },
      { accessorKey: "country", header: "Country" },
      { accessorKey: "device", header: "Device" },
      { accessorKey: "source", header: "Source" },
      {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row }) => `${Math.round(Number(row.getValue("duration")) / 60)}m`
      },
      { accessorKey: "events", header: "Events" },
      {
        accessorKey: "errors",
        header: "Errors",
        cell: ({ row }) => (
          <Badge variant={Number(row.getValue("errors")) > 0 ? "danger" : "success"}>{row.getValue("errors")}</Badge>
        )
      }
    ],
    []
  );

  const filtered = sessions.filter((session) => {
    if (countryFilter !== "all" && session.country !== countryFilter) return false;
    if (deviceFilter !== "all" && session.device !== deviceFilter) return false;
    if (sourceFilter !== "all" && session.source !== sourceFilter) return false;
    if (search && !session.user.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const timeline = selected ? events.filter((event) => event.sessionId === selected.id) : [];

  return (
    <div className="space-y-6">
      <h1 className="text-h1 text-foreground">Sessions</h1>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center gap-3 rounded-[12px] border border-border/60 bg-neutral-2/70 p-3">
            <Input placeholder="Search user" value={search} onChange={(event) => setSearch(event.target.value)} className="w-48" />
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All countries</SelectItem>
                {[...new Set(sessions.map((session) => session.country))].map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={deviceFilter} onValueChange={setDeviceFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All devices</SelectItem>
                {[...new Set(sessions.map((session) => session.device))].map((device) => (
                  <SelectItem key={device} value={device}>
                    {device}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sources</SelectItem>
                {[...new Set(sessions.map((session) => session.source))].map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DataTable columns={columns} data={filtered} onRowClick={setSelected} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Replay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[12px] text-muted">
            <div className="flex h-40 items-center justify-center rounded-[12px] border border-dashed border-border/60 bg-neutral-3/40">
              <span>Replay renderer placeholder</span>
            </div>
            <Button className="w-full">Launch replay</Button>
            {selected && <p>Selected session {selected.id} • {selected.user}</p>}
          </CardContent>
        </Card>
      </div>

      {selected && (
        <Card>
          <CardHeader>
            <CardTitle>Session timeline • {selected.user}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <ScrollViewport>
                <ul className="space-y-2 text-[12px] text-muted">
                  {timeline.map((event) => (
                    <li key={event.id} className="flex items-center gap-3 rounded-[10px] border border-border/60 bg-neutral-2/80 px-3 py-2">
                      <span className="text-[11px] uppercase tracking-wide text-muted">{new Date(event.timestamp).toLocaleTimeString()}</span>
                      <span className="font-mono text-foreground">{event.action}</span>
                      <span>{event.detail}</span>
                    </li>
                  ))}
                </ul>
              </ScrollViewport>
              <Scrollbar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
