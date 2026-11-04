import { RedirectPage, redirectMetadata } from "@/components/ui/RedirectPage";

// Old URL from the previous site. Forwards to /insights/cccl-ai-security-event-bengaluru/ (see components/ui/RedirectPage.tsx).
export const metadata = redirectMetadata("/insights/cccl-ai-security-event-bengaluru/");

export default function CcclRedirect() {
  return <RedirectPage to="/insights/cccl-ai-security-event-bengaluru/" label="the article" />;
}
