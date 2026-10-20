import { Bell, Building2, LayoutDashboard, MessageSquare, Network, ShieldCheck, SquareCode, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { ComposedIcon } from "@/components/ui/ComposedIcon";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/*
  Plan 3.4 [IMAGE]: "A simple left-to-right architecture diagram. Agent and chatbot
  icons on the left, the SaaviAIDR platform in the centre, and alerts, dashboards
  and SOC tools on the right. On mobile, the diagram runs top to bottom."
  Live touches (CSS only): data dashes flow along the connectors, and the four
  SaaviAIDR stages light up in turn (Detect in amber). Static for reduced motion.
*/

const SOURCES = [
  { label: "AI coding agents", icon: <Icon icon={SquareCode} size={18} /> },
  { label: "Employee chatbots", icon: <ComposedIcon base={MessageSquare} badge={Building2} size={18} /> },
  { label: "Customer chatbots", icon: <ComposedIcon base={MessageSquare} badge={UserRound} size={18} /> },
  { label: "Automation agents", icon: <Icon icon={Network} size={18} /> },
];
const STAGES = ["Collect", "Unify", "Detect", "Respond"];
const OUTPUTS = [
  { label: "Alerts", icon: <Icon icon={Bell} size={18} /> },
  { label: "Dashboards", icon: <Icon icon={LayoutDashboard} size={18} /> },
  { label: "SOC tools", icon: <Icon icon={ShieldCheck} size={18} /> },
];

function Chip({ children, icon }: { children: ReactNode; icon: ReactNode }) {
  return (
    <li className="flex items-center gap-3 rounded-[12px] bg-raised px-4 py-3 text-[0.9375rem] font-medium text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
      <span className="bg-inherit text-ink-muted">{icon}</span>
      {children}
    </li>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center">
      <span className="flow-line flow-line-y h-10 lg:hidden" />
      <span className="flow-line flow-line-x hidden w-full lg:block" />
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <figure className="rounded-[1.75rem] bg-sunken p-6 sm:p-10 lg:p-14">
      <figcaption className="sr-only">
        Activity flows from AI coding agents, employee chatbots, customer chatbots and automation agents into SaaviAIDR,
        which collects, unifies, detects and responds, and sends results to alerts, dashboards and SOC tools.
      </figcaption>
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_minmax(2.5rem,4rem)_1.15fr_minmax(2.5rem,4rem)_1fr] lg:gap-0">
        <ul className="grid gap-2.5">
          {SOURCES.map((s) => (
            <Chip key={s.label} icon={s.icon}>
              {s.label}
            </Chip>
          ))}
        </ul>
        <Connector />
        <div className="rounded-[1.25rem] bg-raised p-5 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)] ring-1 ring-line">
          <p className="flex items-center gap-2.5 px-2 pb-4 text-[1.125rem] font-semibold tracking-[-0.02em] text-ink">
            <span aria-hidden="true" className="key-mark h-5" />
            SaaviAIDR
          </p>
          <ol className="grid gap-1.5">
            {STAGES.map((s, i) => (
              <li
                key={s}
                className={cn("arch-stage flex items-center justify-between rounded-[10px] px-4 py-3 text-[0.9375rem] font-medium text-ink-soft")}
                style={
                  {
                    "--i": i,
                    ...(s === "Detect" ? { "--stage-on": "var(--alert)", "--stage-on-text": "#1d1d1f" } : {}),
                  } as React.CSSProperties
                }
              >
                {s}
                <span className="font-mono text-[0.75rem] opacity-60">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
        </div>
        <Connector />
        <ul className="grid gap-2.5">
          {OUTPUTS.map((o) => (
            <Chip key={o.label} icon={o.icon}>
              {o.label}
            </Chip>
          ))}
        </ul>
      </div>
    </figure>
  );
}
