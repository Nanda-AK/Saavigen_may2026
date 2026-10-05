import type { Metadata } from "next";
import { basePath, logoPath, siteUrl } from "@/lib/site";

function withBasePath(path: string) {
  if (path === "/") return `${basePath}/`;
  return `${basePath}${path}`;
}

export function pageMetadata(
  title: string,
  description: string,
  path = "/",
): Metadata {
  const url = new URL(withBasePath(path), siteUrl).toString();

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "SaaviNotGenAI",
      type: "website",
      images: [
        {
          url: logoPath,
          width: 1024,
          height: 1024,
          alt: "SaaviGenAI key logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [logoPath],
    },
  };
}
