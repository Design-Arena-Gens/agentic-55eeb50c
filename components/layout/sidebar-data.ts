import {
  LayoutGridIcon,
  InternetIcon,
  RobotIcon,
  Notification02Icon,
  RecordIcon,
  Settings01Icon
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutGridIcon },
  { href: "/dashboard/websites", label: "Websites", icon: InternetIcon },
  { href: "/dashboard/agents", label: "Agents", icon: RobotIcon },
  { href: "/dashboard/alerts", label: "Alerts", icon: Notification02Icon },
  { href: "/dashboard/sessions", label: "Sessions", icon: RecordIcon },
  { href: "/dashboard/settings", label: "Settings", icon: Settings01Icon }
] as const satisfies readonly { href: string; label: string; icon: IconSvgElement }[];
