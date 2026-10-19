// "Works with" (plan 2.2). Order as listed in the plan; more will be added later.
//
// Logos: interim brand marks from Simple Icons (https://simpleicons.org, CC0 SVG data;
// the marks themselves belong to their owners). Shown in one monochrome colour.
// TO SWAP IN AN OFFICIAL LOGO: put a single-colour SVG in public/logos/ and point
// `logo` at it. Without a logo the name alone is shown (OpenShell, for now).
export type Vendor = { name: string; logo?: string };

export const vendors: Vendor[] = [
  { name: "Claude", logo: "/logos/claude.svg" },
  { name: "OpenAI Codex", logo: "/logos/openai.svg" },
  { name: "Gemini", logo: "/logos/googlegemini.svg" },
  { name: "n8n", logo: "/logos/n8n.svg" },
  { name: "OpenShell" }, // [TO SUPPLY] official logo file
];
