import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

// Plan 10. With static export this becomes out/404.html, which GitHub Pages
// serves automatically for any unknown URL.
export const metadata: Metadata = {
  title: { absolute: "Page not found | SaaviGenAI" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageHero video="page-utility" size="lg" title="This page isn't here" sub="The page may have moved, or the link may be out of date.">
      <Button href="/" variant="light" size="lg">
        Go to the home page
      </Button>
      <Button href="/saaviaidr/" variant="link-light" size="lg">
        Explore SaaviAIDR
      </Button>
    </PageHero>
  );
}
