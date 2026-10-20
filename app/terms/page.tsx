import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/metadata";

// Plan 9.2. No meta description is given in the plan ([PLACEHOLDER] until the terms exist).
export const metadata = pageMetadata("Terms of Use | SaaviGenAI", undefined, "/terms/");

export default function TermsPage() {
  return <LegalPage title="Terms of Use" placeholder="Full terms of use text, to be provided or reviewed by a legal adviser." />;
}
