// Site-wide details and navigation. Copy comes from SaaviGenAI_Website_Content_Plan.md.
// Change contact details here and every page (header, footer, contact band, contact page) updates.

export const site = {
  name: "SaaviGenAI",
  tagline: "The Key to Secure AI",
  email: "contact@saavigen.ai",
  // Number confirmed by SaaviGenAI (same as the old site). wa.me needs digits only.
  whatsapp: {
    display: "+91 97422 66597",
    href: "https://wa.me/919742266597",
  },
  linkedin: {
    display: "linkedin.com/company/saavigenai",
    href: "https://www.linkedin.com/company/saavigenai",
  },
  copyright: "© 2026 SaaviGenAI. All rights reserved.",
} as const;

export type NavItem = { label: string; href: string };

// Plan 1.1 header navigation. Hrefs end in "/" because next.config uses trailingSlash.
export const primaryNav: NavItem[] = [
  { label: "Platform", href: "/saaviaidr/" },
  { label: "Managed Services", href: "/managed-services/" },
  { label: "Insights", href: "/insights/" },
  { label: "Company", href: "/company/" },
];

export const contactLink: NavItem = { label: "Contact Us", href: "/contact/" };

// Plan 1.2 footer links
export const footerNav: NavItem[] = [...primaryNav, { label: "Contact", href: "/contact/" }];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy/" },
  { label: "Terms of Use", href: "/terms/" },
];
