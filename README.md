# Agentic Ops Dashboard

Production-grade real-time operations dashboard built with Next.js App Router, TypeScript, Tailwind CSS, Radix UI, and Recharts. It visualizes live metrics for web properties, AI agents, infrastructure, and security in a cohesive, dark UI system designed for Vercel deployment.

## Features
- **Overview analytics** with KPI strip, live traffic and agent cost charts, Core Web Vitals gauges, funnel analytics, and regional health panels.
- **Websites insights** including hourly heatmap, SEO cards, vitals trend with deploy markers, error breakdown, referrer intelligence, device mix, and geo performance.
- **AI agents monitoring** covering runs, cost, tool usage, trace explorer with run details dialog, hallucination risk, memory stats, and real-time concurrency/queue tracking.
- **Alerts command center** providing active incident statuses, Radix-powered rule builder, and notifications timeline.
- **Session intelligence** with sortable/filterable live sessions table, replay placeholder, and per-session event timeline.
- **Design system settings** to tweak contrast, radius, shadows, preview tokens, manage integrations, and feature flags.
- **Collapsible layout** with sidebar navigation, top command bar, command palette (`⌘K`), time-range selector, and live stream drawer.
- **Seeded real-time data** powered by Zustand and simulated telemetry updating every second.

## Tech Stack
- [Next.js 14](https://nextjs.org/) with App Router & React Server Components
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with custom token mapping
- [Radix UI](https://www.radix-ui.com/) primitives (Dialog, Select, Tabs, Tooltip, Popover, ScrollArea, Switch, Slider, Toast, Accordion)
- [Recharts](https://recharts.org/) for data visualizations
- [Zustand](https://zustand-demo.pmnd.rs/) for global state & realtime simulation
- [cmdk](https://cmdk.paco.me/) for the command palette
- [@hugeicons/react](https://hugeicons.com/) iconography

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to explore the dashboard. Real-time data updates every second; toggle the live stream or real-time switch from the top bar.

## Project Structure

```
app/
  layout.tsx            # Root layout
  page.tsx              # Redirect to dashboard
  dashboard/            # Routes: overview, websites, agents, alerts, sessions, settings
components/
  charts/               # Recharts wrappers & visual components
  dashboard/            # Dashboard-specific UI (metric cards, tables, dialogs)
  layout/               # Sidebar, topbar, command palette
  ui/                   # Tailwind + Radix UI primitives
lib/
  data/                 # Mock data generators and Zustand store
  utils.ts              # Shared utilities
```

## Scripts
- `npm run dev` – Start local development
- `npm run build` – Create production build
- `npm start` – Serve the production build
- `npm run lint` – Lint with ESLint + Next.js config

## Deployment
The app is optimized for Vercel. After verifying locally (`npm run build`), deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-55eeb50c
```

## License
MIT
