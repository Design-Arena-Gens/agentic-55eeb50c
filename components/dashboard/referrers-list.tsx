import type { ReferrerSource } from "@/lib/data/types";
import type { ReactNode } from "react";
import { Globe, Twitter, Rocket, Code, Compass } from "lucide-react";

const iconMap: Record<string, ReactNode> = {
  Globe: <Globe className="h-4 w-4" />,
  Twitter: <Twitter className="h-4 w-4" />,
  Rocket: <Rocket className="h-4 w-4" />,
  Code: <Code className="h-4 w-4" />,
  Compass: <Compass className="h-4 w-4" />
};

export function ReferrersList({ sources }: { sources: ReferrerSource[] }) {
  return (
    <div className="space-y-2">
      {sources.map((source) => (
        <div key={source.source} className="flex items-center justify-between rounded-[10px] border border-border/60 bg-neutral-3/60 px-3 py-2 text-[12px] text-muted">
          <div className="flex items-center gap-2 text-foreground">
            {iconMap[source.icon] ?? iconMap.Globe}
            {source.source}
          </div>
          <span>{source.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
