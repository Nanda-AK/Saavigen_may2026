import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

// Plan 10. A plain page, as SaaviGenAI asked: no hero, no video, just the message
// and one way back. With static export this becomes out/404.html, which GitHub
// Pages serves automatically for any unknown URL.
export const metadata: Metadata = {
  title: { absolute: "Page not found | SaaviGenAI" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-canvas">
      <Container className="flex min-h-[60vh] max-w-[46rem] flex-col justify-center py-24">
        <h1 className="text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.04em] text-ink md:text-[3.25rem]">This page isn&apos;t here</h1>
        <p className="mt-4 text-lead text-ink-muted">The page may have moved, or the link may be out of date.</p>
        <div className="mt-8">
          <Button href="/" variant="link" size="lg">
            Go to the home page
          </Button>
        </div>
      </Container>
    </section>
  );
}
