export const CONTACT_EMAIL = "contact@saavigen.ai";

export const services = [
  {
    number: "01",
    title: "SaaviSOC",
    href: "/services/managed-soc",
    description:
      "Enterprise-grade threat monitoring and incident response — without the cost or complexity of building it in-house. 24×7 coverage, zero CAPEX, compliance-ready from day one.",
  },
  {
    number: "02",
    title: "SaaviAIDR",
    href: "/services/aidr",
    description:
      "Purpose-built managed detection and response for AI-powered applications. Because firewalls don't inspect prompts and SIEMs don't understand agent behaviour.",
  },
  {
    number: "03",
    title: "AI Upskilling",
    href: "/services/ai-upskilling",
    description:
      "Practical, hands-on AI training for enterprise teams — from every employee to developers to security professionals. Built by practitioners, not slide decks.",
  },
];

export const navigation = [
  { label: "Managed SOC", href: "/services/managed-soc" },
  { label: "AIDR", href: "/services/aidr" },
  { label: "AI Upskilling", href: "/services/ai-upskilling" },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const basePath =
  rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

function withBasePath(path: string) {
  if (!basePath) return path;
  if (path === "/") return `${basePath}/`;
  return `${basePath}${path}`;
}

export const logoPath = withBasePath("/images/SaaviGenAI_Key_Logo.png");

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://saavigen.ai";
