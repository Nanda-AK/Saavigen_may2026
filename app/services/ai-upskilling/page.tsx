import { RedirectPage, redirectMetadata } from "@/components/ui/RedirectPage";

// Old URL from the previous site. Forwards to / (see components/ui/RedirectPage.tsx).
export const metadata = redirectMetadata("/");

export default function UpskillingRedirect() {
  return <RedirectPage to="/" label="the home page" />;
}
