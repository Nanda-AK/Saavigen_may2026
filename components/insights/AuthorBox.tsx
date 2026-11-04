import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { authors } from "@/content/team";

// Plan 6 author box: photo, name, role, one-line bio and LinkedIn link.
// Authors are defined once in content/team.ts (`authors`), keyed by the article's `author`.
export function AuthorBox({ authorKey }: { authorKey: string }) {
  const a = authors[authorKey];
  if (!a) return null;
  return (
    <aside aria-label="About the author" className="flex flex-col gap-6 rounded-[1.5rem] bg-sunken p-7 sm:flex-row sm:items-center md:p-9">
      {a.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={a.photo} alt={`Portrait of ${a.name}`} width={96} height={96} loading="lazy" className="size-24 shrink-0 rounded-full object-cover" />
      ) : (
        <span aria-hidden="true" className="inline-flex size-24 shrink-0 items-center justify-center rounded-full bg-inverse text-on-inverse">
          <span className="key-mark h-9" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
          {a.companyAnchor ? (
            <Link href={a.companyAnchor} className="hover:underline hover:underline-offset-4">
              {a.name}
            </Link>
          ) : (
            a.name
          )}
        </p>
        {a.role ? <p className="mt-0.5 text-ink-muted">{a.role}</p> : null}
        {a.bio ? <p className="mt-3 max-w-[60ch] text-ink-soft">{a.bio}</p> : null}
      </div>
      <a
        href={a.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${a.name} on LinkedIn`}
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-inverse hover:text-on-inverse"
      >
        <Icon icon={Linkedin} size={18} />
      </a>
    </aside>
  );
}
