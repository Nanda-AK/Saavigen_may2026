import { Building2, MessageSquare, Network, SquareCode, UserRound } from "lucide-react";
import { ComposedIcon } from "@/components/ui/ComposedIcon";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Tile";
import { VendorStrip } from "@/components/ui/VendorStrip";

// Plan 2.2 (Home) and 3.2 (Platform reuses the same tiles and logo strip with its own headline).
const TILES = [
  {
    title: "AI coding agents",
    body: "Developer agents that run commands, edit code and call tools.",
    icon: <Icon icon={SquareCode} size={22} />, // code window
  },
  {
    title: "Employee chatbots",
    body: "Internal assistants that work with company data.",
    icon: <ComposedIcon base={MessageSquare} badge={Building2} />, // speech bubble with a building
  },
  {
    title: "Customer chatbots",
    body: "Public-facing assistants that speak for your brand.",
    icon: <ComposedIcon base={MessageSquare} badge={UserRound} />, // speech bubble with a person
  },
  {
    title: "Automation agents",
    body: "Workflows that act across your systems on their own.",
    icon: <Icon icon={Network} size={22} />, // connected nodes
  },
];

export function WhatWeSecure({ headline, id = "what-we-secure" }: { headline: string; id?: string }) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <h2 id={`${id}-title`} data-reveal className="max-w-[18ch] text-h2 text-ink">
        {headline}
      </h2>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {TILES.map((t, i) => (
          <Tile key={t.title} index={i} icon={t.icon} title={t.title} body={t.body} />
        ))}
      </div>
      <div data-reveal className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:gap-10 lg:mt-20">
        <p className="shrink-0 font-mono text-label uppercase text-ink-muted">Works with</p>
        <VendorStrip className="min-w-0 flex-1" />
      </div>
    </Section>
  );
}
