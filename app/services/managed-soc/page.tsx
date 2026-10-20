import { RedirectPage, redirectMetadata } from "@/components/ui/RedirectPage";

// Old URL from the previous site. Forwards to /managed-services/ (see components/ui/RedirectPage.tsx).
export const metadata = redirectMetadata("/managed-services/");

export default function ManagedSocRedirect() {
  return <RedirectPage to="/managed-services/" label="Managed Services" />;
}
