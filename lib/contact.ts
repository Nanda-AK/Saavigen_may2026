// THE ONE PLACE WHERE CONTACT FORM SUBMISSIONS ARE SENT.
//
// Provider: Web3Forms (https://web3forms.com), free tier, works on a static site
// (GitHub Pages) because the browser posts straight to their API, which emails the
// message to contact@saavigen.ai.
//
// Setup (one time):
//   1. Go to https://web3forms.com, enter contact@saavigen.ai, and they email you an access key.
//   2. Locally: add  NEXT_PUBLIC_WEB3FORMS_KEY=<key>  to .env.local
//   3. For the live site: add the same as a GitHub Actions variable and pass it in
//      .github/workflows/nextjs.yml under "Build static site" -> env.
// The key is public by design (it can only send email to the address it was created for).
//
// FAIL-SAFE: with no key configured this returns { ok: false } so the form shows the
// plan's error message ("...or email us at contact@saavigen.ai"). It never pretends
// to succeed, so no enquiry is silently lost.

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  interest: string;
  message: string;
  botcheck: string; // hidden honeypot field; real people leave it empty
};

export async function submitContactForm(data: ContactPayload): Promise<{ ok: boolean }> {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Contact form: NEXT_PUBLIC_WEB3FORMS_KEY is not set, so nothing was sent (see lib/contact.ts).");
    }
    return { ok: false };
  }
  if (data.botcheck) return { ok: true }; // a bot filled the hidden field: pretend success, send nothing

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `Website enquiry: ${data.interest} (${data.company})`,
        from_name: `${data.firstName} ${data.lastName}`,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        company: data.company,
        job_title: data.jobTitle || "(not given)",
        interest: data.interest,
        message: data.message || "(no message)",
        consent: "Agreed to be contacted about this enquiry",
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean };
    return { ok: res.ok && json.success === true };
  } catch {
    return { ok: false };
  }
}
