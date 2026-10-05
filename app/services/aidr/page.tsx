import {
  AlertCircle,
  AlertTriangle,
  Bot,
  Cpu,
  Database,
  Lock,
  Terminal,
} from "lucide-react";
import { FooterCTABand } from "@/components/sections/FooterCTABand";
import { HeroSection } from "@/components/sections/HeroSection";
import { DifferentiatorCard } from "@/components/ui/DifferentiatorCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/metadata";
import { basePath } from "@/lib/site";

export const metadata = pageMetadata(
  "SaaviAIDR | SaaviGenAI",
  "Purpose-built threat detection and response for AI-powered applications — because traditional security tools weren't designed for this.",
  "/services/aidr",
);

const threats = [
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Prompt injection attacks",
    description:
      "Malicious instructions embedded in user inputs, documents, or external data sources designed to override your AI system's original behaviour and make it act against your interests.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Jailbreak attempts",
    description:
      "Structured attempts to bypass your AI's safety guardrails and policy controls — forcing it to produce outputs or take actions it was explicitly designed to refuse.",
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "Agent misuse",
    description:
      "Unauthorised or out-of-scope actions taken by AI agents — including unexpected tool calls, privilege escalation, and operations that fall outside the agent's intended mandate.",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Data leakage through AI",
    description:
      "Detection of sensitive data — PII, credentials, internal documents, confidential context — being exposed through AI outputs, whether by manipulation or misconfiguration.",
  },
  {
    icon: <AlertCircle className="h-6 w-6" />,
    title: "Rogue agent behaviour",
    description:
      "Identification of agents operating outside expected parameters, pursuing unintended goals, or behaving in ways inconsistent with their design and deployment context.",
  },
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "Unsafe tool execution",
    description:
      "Monitoring of every tool your AI agents call — flagging dangerous, unexpected, or policy-violating executions before they cause downstream damage.",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Model manipulation",
    description:
      "Detection of attempts to influence model behaviour through adversarial inputs, context poisoning, or indirect prompt injection through data the model is asked to process.",
  },
];

const auditTrail = [
  { question: "Who used AI?", answer: "Full user and session attribution" },
  {
    question: "Which model was called?",
    answer: "Model identity, version, and endpoint",
  },
  {
    question: "What prompts went in?",
    answer: "Full prompt capture and classification",
  },
  {
    question: "What came back out?",
    answer: "Response logging and content analysis",
  },
  {
    question: "What tools were called?",
    answer: "Agent tool invocation audit trail",
  },
  {
    question: "What actions were taken?",
    answer: "Downstream action tracking",
  },
  {
    question: "What data was exposed?",
    answer: "Sensitive data detection and flagging",
  },
];

const audiences = [
  "Product and engineering teams who have deployed AI features or agents in production.",
  "Security teams responsible for governing AI usage across the organisation.",
  "Compliance and risk functions that need AI audit trails for regulatory requirements.",
  "AI platform teams building internal GenAI infrastructure.",
  "Any organisation that has deployed LLM-powered applications and cannot answer: 'What is my AI doing right now?'",
];

export default function AidrPage() {
  return (
    <>
      <HeroSection
        label="SaaviAIDR"
        heading="Your AI Is Running. Do You Know What It's Doing?"
        subheading="Purpose-built threat detection and response for AI-powered applications — because traditional security tools weren't designed for this."
        image={`${basePath}/images/newSaaviAIdr.png`}
      />

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Detection Coverage"
            heading="What SaaviAIDR detects."
            subheading="Where traditional tools see a network packet, SaaviAIDR sees a prompt. Where traditional tools see an API call, SaaviAIDR sees a tool invocation by an agent and asks: was that expected? Was it authorised? What data did it touch?"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {threats.map((threat) => (
              <DifferentiatorCard
                key={threat.title}
                icon={threat.icon}
                title={threat.title}
                description={threat.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionLabel
              label="The AIDR Audit Trail"
              heading="Security without visibility is just hope."
              subheading="SaaviAIDR gives you a complete, queryable audit trail of every AI interaction in your environment — the foundation of AI governance and demonstrating to auditors, boards, and regulators that your AI systems are operating within defined boundaries."
            />
            <div className="rounded-2xl border border-default bg-base p-6 md:p-8">
              {auditTrail.map((item, index) => (
                <div
                  key={item.question}
                  className={`rounded-xl p-4 ${index % 2 === 0 ? "bg-surface" : "bg-base"}`}
                >
                  <p className="mb-1 font-mono text-xs uppercase tracking-widest text-gold">
                    {item.question}
                  </p>
                  <p className="text-sm leading-relaxed text-secondary">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Why Traditional Tools Fall Short"
            heading="Your existing security stack was built for a pre-AI world."
            subheading="Firewalls don't inspect prompts. SIEMs don't understand agent behaviour. DLP tools can't detect when a model has been manipulated into leaking data it was never supposed to touch. AI attacks are different in kind — not just degree. SaaviAIDR fills that gap and integrates with your existing SOC and SIEM where relevant."
          />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-default">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface">
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-gold">
                    Capability
                  </th>
                  <th className="px-6 py-4 text-center font-mono text-xs uppercase tracking-widest text-secondary">
                    SIEM / SOC
                  </th>
                  <th className="px-6 py-4 text-center font-mono text-xs uppercase tracking-widest text-secondary">
                    DLP
                  </th>
                  <th className="px-6 py-4 text-center font-mono text-xs uppercase tracking-widest text-gold">
                    SaaviAIDR
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Prompt-level visibility", "No", "No", "Yes"],
                  ["Agent behaviour monitoring", "No", "No", "Yes"],
                  ["Jailbreak detection", "No", "No", "Yes"],
                  ["Tool execution auditing", "No", "No", "Yes"],
                  ["AI-specific threat intelligence", "No", "No", "Yes"],
                  ["Model manipulation detection", "No", "Partial", "Yes"],
                ].map(([cap, siem, dlp, aidr], index) => (
                  <tr
                    key={cap}
                    className={index % 2 === 0 ? "bg-base" : "bg-surface"}
                  >
                    <td className="px-6 py-3 text-secondary">{cap}</td>
                    <td className="px-6 py-3 text-center text-muted">{siem}</td>
                    <td className="px-6 py-3 text-center text-muted">{dlp}</td>
                    <td className="px-6 py-3 text-center font-semibold text-teal">
                      {aidr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionLabel
              label="Who It's For"
              heading="Built for the teams responsible for AI in production."
            />
            <div className="rounded-2xl border border-default bg-base p-6 md:p-8">
              {audiences.map((item, index) => (
                <div
                  key={item}
                  className={`rounded-xl p-4 text-sm leading-relaxed text-secondary ${
                    index % 2 === 0 ? "bg-surface" : "bg-base"
                  }`}
                >
                  <span className="mr-3 font-mono text-xs text-gold">
                    0{index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <blockquote className="rounded-2xl border border-default bg-surface p-6 md:p-10">
            <div className="mb-4 h-0.5 w-8 bg-gold" />
            <p className="mb-6 font-display text-xl italic leading-relaxed text-primary">
              &ldquo;Most enterprises deploying AI today are doing so without
              any visibility into what those systems are actually doing at
              runtime. AIDR doesn&apos;t slow your AI adoption — it makes it
              defensible.&rdquo;
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              Nanda Kumar — Founder &amp; CEO, SaaviGenAI
            </p>
          </blockquote>
        </div>
      </section>

      <FooterCTABand />
    </>
  );
}
