import { LegalPage } from "@/components/ui/LegalPage";
import { getLegalDoc } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

// Plan 9.2 (titled "Terms of Service" in the text SaaviGenAI supplied): content/legal/terms.md.
export const metadata = pageMetadata(
  "Terms of Service | SaaviGenAI",
  "The terms that apply when you use www.saavigen.ai, the SaaviAIDR platform or any SaaviGenAI service.",
  "/terms/",
);

export default function TermsPage() {
  return <LegalPage doc={getLegalDoc("terms")} />;
}
