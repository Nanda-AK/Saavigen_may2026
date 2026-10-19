import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { THEME_INIT_SCRIPT } from "@/components/layout/ThemeSwitch";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { siteUrl } from "@/lib/site";
import "@/styles/globals.css";

// next/font downloads these at build time and serves them from saavigen.ai.
// It also generates size-matched fallback fonts, so text doesn't jump when
// the real font loads (no layout shift).
// Geist: one variable font for headings and body (Apple / OpenAI-style look).
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false, // only used for small labels; not worth a preload
});

// Defaults = Home page values from the content plan. Each page overrides them via lib/metadata.ts.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SaaviAIDR | AI Detection and Response | SaaviGenAI",
  description:
    "SaaviAIDR gives security teams visibility, detection and response across the AI agents and chatbots in their organisation. Self-hosted, with managed service options.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the theme script may add data-theme before React loads.
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
