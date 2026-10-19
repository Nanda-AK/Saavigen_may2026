"use client";

import { FormEvent, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mailtoHref, setMailtoHref] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMailtoHref("");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Enter a valid email address.");
      return;
    }

    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Insights interest")}&body=${encodeURIComponent(`Please add ${email} to the SaaviGenAI Insights list.`)}`;
    setMailtoHref(href);
    setMessage("Thank you — your request is ready to send.");
    window.location.assign(href);
  }

  return (
    <form
      className="mt-8 flex flex-col gap-3 rounded-2xl border border-default bg-base p-4 md:flex-row"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="sr-only" htmlFor="waitlist-email">
        Email address
      </label>
      <input
        id="waitlist-email"
        className="min-h-12 flex-1 rounded-xl border border-default bg-base px-4 py-3 text-sm text-primary placeholder:text-muted transition focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@company.com"
      />
      <button
        className="rounded bg-gold px-6 py-3 text-sm font-semibold text-navy transition-opacity duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        type="submit"
      >
        Contact Me
      </button>
      {message ? (
        <p className="text-xs text-secondary md:self-center">
          {message}{" "}
          {mailtoHref ? (
            <a className="font-semibold text-teal underline" href={mailtoHref}>
              Open email
            </a>
          ) : null}
        </p>
      ) : null}
    </form>
  );
}
