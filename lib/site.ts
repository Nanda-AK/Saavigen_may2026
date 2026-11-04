// Build-time settings shared by metadata and redirects.
// (Site copy such as navigation and contact details lives in content/site.ts.)

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

function withBasePath(path: string) {
  if (!basePath) return path;
  if (path === "/") return `${basePath}/`;
  return `${basePath}${path}`;
}

// Used as the social share image until a proper 1200x630 image is made (Phase 7).
export const logoPath = withBasePath("/images/SaaviGenAI_Key_Logo.png");

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saavigen.ai";
