import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PlaceholderBlock } from "@/components/ui/Placeholder";

// Shared layout for Privacy Policy and Terms of Use (plan 9). The legal text is
// still to be supplied (and reviewed by a legal adviser), so the body shows the
// plan's [PLACEHOLDER] note. When the text arrives, replace the PlaceholderBlock
// with the content inside the .prose-article wrapper.
export function LegalPage({ title, placeholder }: { title: string; placeholder: string }) {
  return (
    <>
      <PageHero video="page-utility" size="sm" title={title} />
      <section className="bg-canvas py-20 md:py-28">
        <Container className="max-w-[42rem]">
          <div className="prose-article">
            <PlaceholderBlock kind="PLACEHOLDER" note={placeholder} />
          </div>
        </Container>
      </section>
    </>
  );
}
