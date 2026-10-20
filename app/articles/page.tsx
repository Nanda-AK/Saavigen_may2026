import { RedirectPage, redirectMetadata } from "@/components/ui/RedirectPage";

// Old URL from the previous site. Forwards to /insights/ (see components/ui/RedirectPage.tsx).
export const metadata = redirectMetadata("/insights/");

export default function ArticlesRedirect() {
  return <RedirectPage to="/insights/" label="Insights" />;
}
