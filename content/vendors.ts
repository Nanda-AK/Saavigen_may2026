// "Works with" (plan 2.2). Order as listed in the plan; more will be added later.
//
// Logos: interim brand marks from Simple Icons (https://simpleicons.org, CC0 SVG data;
// the marks themselves belong to their owners).
// `color` paints the logo in the vendor's own brand colour (any CSS colour or gradient).
// `tint` is a solid version used for the soft hover background of the card.
//
// TO SWAP IN AN OFFICIAL LOGO: put a single-colour SVG in public/logos/ and point
// `logo` at it (it is painted with `color`). Without a logo the name alone is shown.
export type Vendor = { name: string; logo?: string; color: string; tint: string };

export const vendors: Vendor[] = [
  { name: "Claude", logo: "/logos/claude.svg", color: "#d97757", tint: "#d97757" }, // Claude terracotta
  { name: "OpenAI Codex", logo: "/logos/openai.svg", color: "#10a37f", tint: "#10a37f" }, // ChatGPT green
  {
    name: "Gemini",
    logo: "/logos/googlegemini.svg",
    color: "linear-gradient(135deg, #4285f4 0%, #9b72cb 55%, #d96570 100%)", // Gemini gradient
    tint: "#4285f4",
  },
  { name: "n8n", logo: "/logos/n8n.svg", color: "#ea4b71", tint: "#ea4b71" }, // n8n pink-red
  // [TO SUPPLY] official OpenShell logo and brand colour; neutral until then.
  { name: "OpenShell", color: "var(--ink)", tint: "#86868b" },
];
