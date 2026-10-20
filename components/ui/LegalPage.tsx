import { Container } from "@/components/ui/Container";
import type { LegalDoc } from "@/lib/legal";

// Privacy Policy and Terms of Service: a plain document page, as SaaviGenAI asked.
// No video header, no bands: just the title, the "Last updated" date and the text.
// The text lives in content/legal/*.md (edit there).
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="bg-canvas">
      <Container className="max-w-[46rem] pt-16 pb-24 md:pt-24 md:pb-32">
        <h1 className="text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.04em] text-ink md:text-[3.25rem]">{doc.title}</h1>
        <p className="mt-4 text-ink-muted">Last updated: {doc.updated}</p>
        <div className="prose-article prose-legal mt-12 border-t border-line pt-10" dangerouslySetInnerHTML={{ __html: doc.html }} />
      </Container>
    </article>
  );
}
