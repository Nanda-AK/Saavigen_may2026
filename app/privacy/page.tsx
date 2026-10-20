import { LegalPage } from "@/components/ui/LegalPage";
import { getLegalDoc } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

// Plan 9.1. Text supplied by SaaviGenAI: content/legal/privacy.md.
// Description = a sentence from the policy itself.
export const metadata = pageMetadata(
  "Privacy Policy | SaaviGenAI",
  "This policy explains what personal data we collect when you visit www.saavigen.ai, contact us, attend our events or sign in to SaaviAIDR.",
  "/privacy/",
);

export default function PrivacyPage() {
  return <LegalPage doc={getLegalDoc("privacy")} />;
}
