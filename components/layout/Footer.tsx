import Link from "next/link";
import { Linkedin, Mail, MessageCircle } from "lucide-react";
import { ThemeSwitch } from "@/components/layout/ThemeSwitch";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { footerNav, legalNav, site } from "@/content/site";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "WhatsApp", value: site.whatsapp.display, href: site.whatsapp.href, icon: MessageCircle },
  { label: "LinkedIn", value: site.linkedin.display, href: site.linkedin.href, icon: Linkedin },
];

// Plan 1.2. Apple-style footer: quiet, small type, hairline dividers.
export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas text-ink">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Link href="/" aria-label="SaaviGenAI home" className="inline-block rounded-full">
              <Logo size="xl" />
            </Link>
            <p className="mt-5 text-[1.5rem] font-semibold tracking-[-0.03em] text-ink lg:mt-6 lg:text-[1.875rem]">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <ul className="space-y-3 text-[0.875rem]">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink-muted transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="space-y-3 text-[0.875rem] md:col-start-2 lg:col-span-4 lg:col-start-auto">
            {channels.map((c) => {
              const external = c.href.startsWith("http");
              return (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-3 text-ink-muted transition-colors hover:text-ink"
                  >
                    <Icon icon={c.icon} size={17} />
                    <span className="sr-only">{c.label}: </span>
                    <span className="break-all">{c.value}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-6 text-[0.8125rem] text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>{site.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <nav aria-label="Legal">
              <ul className="flex gap-6">
                {legalNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* TEMPORARY: theme switch for comparing light and dark during review */}
            <ThemeSwitch />
          </div>
        </div>
      </Container>
    </footer>
  );
}
