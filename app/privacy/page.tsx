import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/metadata";

// Plan 9.1. No meta description is given in the plan ([PLACEHOLDER] until the policy exists).
export const metadata = pageMetadata("Privacy Policy | SaaviGenAI", undefined, "/privacy/");

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      placeholder="Full privacy policy text, to be provided or reviewed by a legal adviser. It should cover the contact form, cookies and analytics."
    />
  );
}
