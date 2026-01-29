"use client";

import { useDashboardStore } from "@/lib/data/dashboard-store";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const brandScale = Array.from({ length: 6 }).map((_, idx) => idx + 7);

export default function SettingsPage() {
  const theme = useDashboardStore((state) => state.settings.theme);
  const setThemeSetting = useDashboardStore((state) => state.setThemeSetting);
  const flags = useDashboardStore((state) => state.settings.flags);
  const toggleFlag = useDashboardStore((state) => state.toggleFeatureFlag);
  const integrations = useDashboardStore((state) => state.settings.integrations);

  return (
    <div className="space-y-6">
      <h1 className="text-h1 text-foreground">Settings</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Theme controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[12px] text-muted">
            <div>
              <div className="mb-2 flex items-center justify-between text-foreground">
                <span>Contrast</span>
                <span>{theme.contrast}</span>
              </div>
              <Slider value={[theme.contrast]} onValueChange={([value]) => setThemeSetting("contrast", value)} min={32} max={96} />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-foreground">
                <span>Radius</span>
                <span>{theme.radius}px</span>
              </div>
              <Slider value={[theme.radius]} onValueChange={([value]) => setThemeSetting("radius", value)} min={8} max={24} />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-foreground">
                <span>Shadow</span>
                <span>{theme.shadow}</span>
              </div>
              <Slider value={[theme.shadow]} onValueChange={([value]) => setThemeSetting("shadow", value)} min={8} max={64} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Design tokens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              {brandScale.map((step) => (
                <div key={step} className="flex h-12 flex-1 items-end justify-center rounded-[10px] text-[11px] text-neutral-12" style={{ background: `var(--color-brand-${step})` }}>
                  {step}
                </div>
              ))}
            </div>
            <div className="space-y-2 text-[12px] text-muted">
              <p className="text-h1">Heading 1 — Inter 24/32</p>
              <p className="text-h2">Heading 2 — Inter 18/26</p>
              <p className="text-h3">Heading 3 — Inter 16/24</p>
              <p className="text-base text-foreground">Base body — Inter 14/20</p>
              <p className="font-mono text-[12px] text-muted">Mono 12/18</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between rounded-[10px] border border-border/60 bg-neutral-2/70 px-3 py-2 text-[12px] text-muted">
                <div className="text-[13px] text-foreground">{integration.name}</div>
                <Button variant={integration.connected ? "secondary" : "primary"} size="sm">
                  {integration.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Feature flags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {flags.map((flag) => (
              <div key={flag.id} className="flex items-start justify-between gap-3 rounded-[10px] border border-border/60 bg-neutral-2/70 px-3 py-3 text-[12px] text-muted">
                <div>
                  <div className="text-[13px] font-semibold text-foreground">{flag.label}</div>
                  <p className="mt-1 leading-5">{flag.description}</p>
                </div>
                <Switch checked={flag.enabled} onCheckedChange={() => toggleFlag(flag.id)} aria-label={`Toggle ${flag.label}`} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
