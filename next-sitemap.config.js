/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://saavigen.ai",
  generateRobotsTxt: true,
  outDir: "out",
  trailingSlash: true,
  // Old URLs that now only forward to their new pages (components/ui/RedirectPage.tsx),
  // plus Next's internal not-found route. None of these should be indexed.
  exclude: [
    "/about",
    "/articles",
    "/articles/*",
    "/services/*",
    "/testimonials",
    "/_not-found",
    "/404",
    "/icon.png",
    "/apple-icon.png",
  ],
};
