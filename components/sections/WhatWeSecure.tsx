import { Building2, MessageSquare, Network, SquareCode, UserRound } from "lucide-react";
import { ComposedIcon } from "@/components/ui/ComposedIcon";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Tile";
import { VendorStrip } from "@/components/ui/VendorStrip";

// Plan 2.2 (Home) and 3.2 (Platform reuses the same tiles and logo strip with its own headline).
const TILES = [
  {
    title: "AI coding agents",
    body: "Developer agents that run commands, edit code and call tools.",
    icon: <Icon icon={SquareCode} size={30} />, // code window
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
    icon: <Icon icon={Network} size={30} />, // connected nodes
  },
];

export function WhatWeSecure({ headline, id = "what-we-secure" }: { headline: string; id?: string }) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <SectionHeader id={`${id}-title`} title={headline} />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5">
        {TILES.map((t, i) => (
          <Tile key={t.title} index={i} icon={t.icon} title={t.title} body={t.body} />
        ))}
      </div>
      <div data-reveal className="mt-20 lg:mt-28">
        <p className="text-center text-[0.875rem] font-medium text-ink-muted">Works with</p>
        <VendorStrip className="mt-8" />
      </div>
    </Section>
  );
}
