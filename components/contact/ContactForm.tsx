"use client";

import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/site";
import { submitContactForm } from "@/lib/contact";
import { cn } from "@/lib/utils";

/*
  Plan 8.3 contact form. Field labels, options, consent text, button, success and
  error messages are the plan's wording.

  DRAFT (not in the plan, to be confirmed with SaaviGenAI): the per-field error
  messages in ERRORS below and the error-summary heading "There is a problem".

  Behaviour
  - Each field is checked when you leave it, and all are checked on submit.
  - A failed submit moves focus to an error summary that links to each field.
  - ?interest=platform-demo | managed-services | partnership | general-enquiry
    (or the option's own text) preselects "I'm interested in".
  - Success replaces the form and receives focus. Error keeps what was typed.
  - Sending happens in lib/contact.ts (Web3Forms).
*/

const INTERESTS = [
  { value: "platform-demo", label: "Platform demo" },
  { value: "managed-services", label: "Managed services" },
  { value: "partnership", label: "Partnership" },
  { value: "general-enquiry", label: "General enquiry" },
];

type Field = "firstName" | "lastName" | "email" | "company" | "jobTitle" | "interest" | "message" | "consent";
type Values = Record<Exclude<Field, "consent">, string> & { consent: boolean };

const ERRORS: Partial<Record<Field, (v: Values) => string | null>> = {
  firstName: (v) => (v.firstName.trim() ? null : "Enter your first name."),
  lastName: (v) => (v.lastName.trim() ? null : "Enter your last name."),
  email: (v) =>
    !v.email.trim() ? "Enter your work email." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()) ? null : "Enter a valid email address, like name@company.com.",
  company: (v) => (v.company.trim() ? null : "Enter your company name."),
  interest: (v) => (v.interest ? null : "Choose what you're interested in."),
  consent: (v) => (v.consent ? null : "Please agree so we can contact you about your enquiry."),
};

const ORDER: Field[] = ["firstName", "lastName", "email", "company", "interest", "consent"];

const inputBase =
  "mt-2 block w-full rounded-[12px] border bg-canvas px-4 py-3 text-[1rem] text-ink placeholder:text-ink-muted transition-[border-color,box-shadow] duration-200 focus:border-ink focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--ink)_12%,transparent)] focus:outline-none";

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-[0.9375rem] font-medium text-ink">
      {children}
      {required ? (
        <>
          <span aria-hidden="true" className="text-ink-muted">
            {" "}
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      ) : null}
    </label>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<Values>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    interest: "",
    message: "",
    consent: false,
  });
  const [botcheck, setBotcheck] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Preselect "I'm interested in" from ?interest=...
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("interest");
    if (!raw) return;
    const wanted = raw.trim().toLowerCase();
    const match = INTERESTS.find((o) => o.value === wanted || o.label.toLowerCase() === wanted);
    if (match) setValues((v) => ({ ...v, interest: match.value }));
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const validate = (field: Field, v: Values) => ERRORS[field]?.(v) ?? null;

  const set = <K extends keyof Values>(field: K, value: Values[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Once a field has shown an error, re-check it as the visitor types.
    if (errors[field as Field]) setErrors((e) => ({ ...e, [field]: validate(field as Field, next) ?? undefined }));
  };

  const onBlur = (field: Field) => setErrors((e) => ({ ...e, [field]: validate(field, values) ?? undefined }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found: Partial<Record<Field, string>> = {};
    for (const f of ORDER) {
      const msg = validate(f, values);
      if (msg) found[f] = msg;
    }
    setErrors(found);
    if (Object.keys(found).length) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    setStatus("sending");
    const interestLabel = INTERESTS.find((o) => o.value === values.interest)?.label ?? values.interest;
    const { ok } = await submitContactForm({ ...values, interest: interestLabel, botcheck });
    setStatus(ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="flex min-h-[28rem] flex-col items-start justify-center rounded-[1.5rem] bg-sunken p-8 outline-none md:p-12">
        <span className="text-ink">
          <Icon icon={CircleCheck} size={40} />
        </span>
        <p className="mt-6 max-w-[30ch] text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-ink">
          Thank you. We&apos;ve received your message and will be in touch soon.
        </p>
      </div>
    );
  }

  const errorIds = ORDER.filter((f) => errors[f]);
  const fieldProps = (field: Exclude<Field, "consent">) => ({
    id: field,
    name: field,
    value: values[field],
    onBlur: () => onBlur(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    className: cn(inputBase, errors[field] ? "border-danger" : "border-field"),
  });
  const FieldError = ({ field }: { field: Field }) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-[0.875rem] text-danger">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[1.5rem] bg-sunken p-6 sm:p-8 md:p-10" aria-labelledby="form-title">
      <h2 id="form-title" className="text-[2rem] font-semibold tracking-[-0.035em] text-ink">
        Send us a message
      </h2>

      {showSummary && errorIds.length ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby="error-summary-title" className="mt-6 rounded-[12px] border border-danger bg-canvas p-5 outline-none">
          <p id="error-summary-title" className="font-semibold text-danger">
            There is a problem
          </p>
          <ul className="mt-2 space-y-1">
            {errorIds.map((f) => (
              <li key={f}>
                <a href={`#${f}`} className="text-[0.9375rem] text-danger underline underline-offset-2">
                  {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName" required>
            First name
          </Label>
          <input type="text" autoComplete="given-name" aria-required="true" {...fieldProps("firstName")} onChange={(e) => set("firstName", e.target.value)} />
          <FieldError field="firstName" />
        </div>
        <div>
          <Label htmlFor="lastName" required>
            Last name
          </Label>
          <input type="text" autoComplete="family-name" aria-required="true" {...fieldProps("lastName")} onChange={(e) => set("lastName", e.target.value)} />
          <FieldError field="lastName" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email" required>
            Work email
          </Label>
          <input type="email" autoComplete="email" inputMode="email" aria-required="true" {...fieldProps("email")} onChange={(e) => set("email", e.target.value)} />
          <FieldError field="email" />
        </div>
        <div>
          <Label htmlFor="company" required>
            Company
          </Label>
          <input type="text" autoComplete="organization" aria-required="true" {...fieldProps("company")} onChange={(e) => set("company", e.target.value)} />
          <FieldError field="company" />
        </div>
        <div>
          <Label htmlFor="jobTitle">Job title</Label>
          <input type="text" autoComplete="organization-title" {...fieldProps("jobTitle")} onChange={(e) => set("jobTitle", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="interest" required>
            I&apos;m interested in
          </Label>
          <select aria-required="true" {...fieldProps("interest")} onChange={(e) => set("interest", e.target.value)}>
            <option value="" disabled>
              Choose an option
            </option>
            {INTERESTS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <FieldError field="interest" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <textarea rows={5} {...fieldProps("message")} onChange={(e) => set("message", e.target.value)} />
        </div>

        {/* Honeypot: hidden from people and screen readers; bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="botcheck">Leave this field empty</label>
          <input id="botcheck" name="botcheck" type="text" tabIndex={-1} autoComplete="off" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              onBlur={() => onBlur("consent")}
              aria-required="true"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-1 size-5 shrink-0 cursor-pointer rounded-[5px] border-field accent-[var(--ink)]"
            />
            <label htmlFor="consent" className="text-[0.9375rem] text-ink-soft">
              I agree to SaaviGenAI contacting me about my enquiry. See our{" "}
              <Link href="/privacy/" className="text-ink underline underline-offset-2">
                Privacy Policy
              </Link>
              .<span className="sr-only"> (required)</span>
            </label>
          </div>
          <FieldError field="consent" />
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-8 rounded-[12px] border border-danger bg-canvas p-4 text-[0.9375rem] text-danger">
          Something went wrong. Please try again, or email us at{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-2">
            {site.email}
          </a>
          .
        </p>
      ) : null}

      <div className="mt-8">
        <Button type="submit" size="lg" disabled={status === "sending"} aria-busy={status === "sending"} className="disabled:opacity-60">
          Send message
        </Button>
      </div>
    </form>
  );
}
