import { RedirectPage, redirectMetadata } from "@/components/ui/RedirectPage";

// Old URL from the previous site. Forwards to /saaviaidr/ (see components/ui/RedirectPage.tsx).
export const metadata = redirectMetadata("/saaviaidr/");

export default function AidrRedirect() {
  return <RedirectPage to="/saaviaidr/" label="the SaaviAIDR platform page" />;
}
