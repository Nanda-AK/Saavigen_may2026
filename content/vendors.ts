// "Works with" strip (plan 2.2). Order as listed in the plan; more will be added later.
//
// TO SWAP IN AN OFFICIAL LOGO: put a single-colour SVG in public/logos/ and set
// `logo` below, e.g. logo: "/logos/claude.svg". Without a logo the name is shown
// as a grey text wordmark. Logos are rendered in the same grey via CSS, so any
// colour SVG works.
export type Vendor = { name: string; logo?: string };

export const vendors: Vendor[] = [
  { name: "Claude" },
  { name: "OpenAI Codex" },
  { name: "Gemini" },
  { name: "n8n" },
  { name: "OpenShell" },
];
