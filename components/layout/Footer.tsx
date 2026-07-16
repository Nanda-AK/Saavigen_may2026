import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, logoPath, services } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-on-dark">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-14 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              className="mb-5 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              href="/"
            >
              <Image
                src={logoPath}
                alt="SaaviGenAI key logo"
                width={44}
                height={44}
                className="rounded-full"
              />
              <span className="font-display text-xl font-bold text-white">
                SaaviGenAI<sup className="text-xs font-semibold">&trade;</sup>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Practitioner-led managed security and AI governance for teams
              adopting intelligent systems.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">Services</h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    className="text-sm text-on-dark transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                    href={service.href}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">Company</h2>
            <ul className="space-y-3">
              {[
                { label: "About", href: "/about" },
                { label: "Insights", href: "/insights" },
                { label: "Contact", href: "/contact" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/saavigenai",
                },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-sm text-on-dark transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-white">
              Let’s talk
            </h2>
            <a
              className="text-sm font-semibold text-gold transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-4 text-sm leading-relaxed">
              Share your goals and we will respond with practical next steps.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>© {year} SaaviGenAI. All rights reserved.</p>
          <p className="font-mono tracking-wider">
            SECURITY · AI GOVERNANCE · PRACTITIONER-LED
          </p>
        </div>
      </div>
    </footer>
  );
}
