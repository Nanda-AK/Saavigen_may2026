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

// Plan 1.2. Sits on ink in both themes; the focus ring is lightened locally
// so it keeps 3:1 contrast on the dark background.
export function Footer() {
  return (
    <footer className="bg-footer text-footer-ink [--focus:#3dd6a3]">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Link href="/" aria-label="SaaviGenAI home" className="inline-block rounded-box">
              <Logo />
            </Link>
            <p className="mt-6 max-w-xs font-display text-[1.75rem] leading-tight tracking-[-0.02em]">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-footer-muted transition-colors hover:text-footer-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="space-y-3 md:col-start-2 lg:col-span-4 lg:col-start-auto">
            {channels.map((c) => {
              const external = c.href.startsWith("http");
              return (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-3 text-footer-muted transition-colors hover:text-footer-ink"
                  >
                    <Icon icon={c.icon} size={18} className="text-footer-muted group-hover:text-footer-ink" />
                    <span className="sr-only">{c.label}: </span>
                    <span className="break-all">{c.value}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-footer-line pt-6 text-sm text-footer-muted md:flex-row md:items-center md:justify-between">
          <p>{site.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <nav aria-label="Legal">
              <ul className="flex gap-6">
                {legalNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-footer-ink">
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
