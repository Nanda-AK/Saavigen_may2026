// Reads a legal document (content/legal/<name>.md) at build time.
// Frontmatter: title, updated. Body: Markdown (raw HTML allowed for placeholder markers).
import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/insights";

export type LegalDoc = { title: string; updated: string; html: string };

export function getLegalDoc(name: "privacy" | "terms"): LegalDoc {
  const file = path.join(process.cwd(), "content", "legal", `${name}.md`);
  const { data, content } = matter(readFileSync(file, "utf8"));
  if (!data.title || !data.updated) throw new Error(`content/legal/${name}.md needs "title" and "updated" in its frontmatter`);
  return {
    title: String(data.title),
    updated: String(data.updated),
    html: renderMarkdown(content.replace(/<!--[\s\S]*?-->/g, "").trim()),
  };
}
