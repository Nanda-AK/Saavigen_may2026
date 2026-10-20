import { RedirectPage, redirectMetadata } from "@/components/ui/RedirectPage";

// Old URL from the previous site. Forwards to /company/ (see components/ui/RedirectPage.tsx).
export const metadata = redirectMetadata("/company/");

export default function AboutRedirect() {
  return <RedirectPage to="/company/" label="the Company page" />;
}
