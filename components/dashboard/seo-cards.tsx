import type { SeoCard } from "@/lib/data/types";

export function SeoCards({ cards }: { cards: SeoCard[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="rounded-[12px] border border-border/60 bg-neutral-2/70 p-4">
          <div className="text-[12px] uppercase tracking-wide text-muted">{card.label}</div>
          <div className="mt-2 text-[18px] font-semibold text-foreground">{card.impressions.toLocaleString()}</div>
          <div className="mt-2 text-[12px] text-muted">CTR {(card.ctr * 100).toFixed(2)}% • Avg pos {card.position.toFixed(1)}</div>
        </div>
      ))}
    </div>
  );
}
