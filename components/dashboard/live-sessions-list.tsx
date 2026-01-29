import type { LiveSession } from "@/lib/data/types";
import { ScrollArea, ScrollViewport, Scrollbar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function LiveSessionsList({ sessions }: { sessions: LiveSession[] }) {
  return (
    <div className="h-64 rounded-[12px] border border-border/60 bg-neutral-2/70">
      <ScrollArea className="h-full">
        <ScrollViewport>
          <ul className="space-y-2 p-3">
            {sessions.map((session) => (
              <li key={session.id} className="rounded-[10px] border border-border/60 bg-neutral-3/60 p-3 text-[12px] text-muted">
                <div className="flex items-center justify-between text-[13px] text-foreground">
                  <span>{session.user}</span>
                  <Badge variant={session.status === "active" ? "brand" : "neutral"}>{session.status}</Badge>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-muted">
                  <span>{session.country}</span>
                  <span>•</span>
                  <span>{session.device}</span>
                  <span>•</span>
                  <span>{Math.round(session.duration / 60)}m</span>
                  <span>•</span>
                  <span>{session.page}</span>
                </div>
              </li>
            ))}
          </ul>
        </ScrollViewport>
        <Scrollbar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
