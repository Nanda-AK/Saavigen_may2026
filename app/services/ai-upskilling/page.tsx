import { BookOpen, CheckCircle, Shield, User } from "lucide-react";
import { FooterCTABand } from "@/components/legacy/sections/FooterCTABand";
import { HeroSection } from "@/components/legacy/sections/HeroSection";
import { Button } from "@/components/legacy/ui/Button";
import { DifferentiatorCard } from "@/components/legacy/ui/DifferentiatorCard";
import { SectionLabel } from "@/components/legacy/ui/SectionLabel";
import { pageMetadata } from "@/lib/metadata";
import { basePath } from "@/lib/site";

export const metadata = pageMetadata(
  "AI Upskilling | SaaviGenAI",
  "Practical, hands-on AI training built for enterprise teams — from leadership to developers to security professionals.",
  "/services/ai-upskilling",
);

const whyStats = [
  {
    stat: "72%",
    point: "of organisations consider AI essential for competitive advantage",
    detail:
      "Yet most don't have a structured programme to capture it safely and effectively.",
  },
  {
    stat: "68%",
    point: "of employees feel underprepared to use AI tools safely",
    detail:
      "That gap isn't a technology problem. It's a people problem — and it's costing organisations in productivity, risk, and competitive ground.",
  },
  {
    stat: "3×",
    point: "ahead is where AI-leading companies outpace peers",
    detail:
      "Every month without a structured upskilling programme is ground you're not gaining.",
  },
];

const courses = [
  {
    number: "01",
    title: "Beyond ChatGPT",
    tagline: "For Every Employee",
    summary:
      "Upgrade every employee from basic chatbot usage to real, safe, and scalable AI capability — covering prompt engineering, workplace applications, and a personal AI productivity blueprint.",
    audience:
      "Employees across all functions — operations, marketing, HR, finance, sales — who want to work smarter, faster, and safely with AI tools.",
    format: "2 days · 12 hours · Hands-on, case-driven workshop",
    learn: [
      "AI and GenAI Fundamentals — a practical understanding of how AI, ML, deep learning, and LLMs work, without the jargon.",
      "Advanced Prompt Engineering — structured prompts, role prompts, and context frameworks across ChatGPT, Claude, and Perplexity.",
      "Real Workplace Applications — AI-driven presentations, writing, research, and data work built around your actual job.",
      "Safe and Ethical AI Usage — bias, hallucination, data privacy, compliance, and responsible use in a professional context.",
      "Personal AI Productivity Blueprint — each participant leaves with 2–3 AI-powered workflows designed for immediate daily use.",
    ],
    outcomes: [
      "Teams work 25–40% faster on writing, analysis, and reporting.",
      "Employees adopt safe, compliant AI practices — reducing shadow AI risk.",
      "Participants automate 2+ workflows that directly improve productivity.",
      "Improved prompt accuracy from pre to post assessment.",
      "A consistent, organisation-wide AI-first productivity mindset.",
    ],
  },
  {
    number: "02",
    title: "Applied LLM for Developers",
    tagline: "Build Production-Grade AI",
    summary:
      "Enable developers to architect, implement, and ship real, safe, and reliable GenAI applications — covering LLM internals, RAG pipelines, agent orchestration, and responsible AI practices.",
    audience:
      "Developers, architects, and technical teams who want to build production-grade LLM-powered applications — not just prototypes.",
    format: "5 days · 30 hours · Live sessions, guided labs, and a capstone project",
    learn: [
      "LLM Foundations and Internals — tokens, embeddings, transformers, context windows, temperature, and model reasoning patterns.",
      "LLM Limitations and Mitigation — hallucinations, statelessness, logical gaps, and the design patterns to work around them in production.",
      "Prompt and Context Engineering — structured prompts, system frameworks, guardrails, memory design, and context optimisation at scale.",
      "RAG, Tools, and Agent Development — vector databases, LangChain, CrewAI, and multi-step agent orchestration.",
      "Application Development — end-to-end LLM application: ingestion, retrieval, generation, and UI/API integration.",
      "Safe and Responsible AI Practices — data security, prompt injection risks, leakage prevention, and safe LLM workflows from first principles.",
    ],
    outcomes: [
      "Ability to explain how LLMs learn, think, and generate responses with technical precision.",
      "A functional LLM-powered application built and shipped during the programme.",
      "A working RAG pipeline connected to private data.",
      "Strong practical understanding of LLM limitations and mitigation strategies.",
      "Proficiency in tools, agents, and vector stores using responsible AI development practices.",
    ],
  },
  {
    number: "03",
    title: "Enterprise LLM Security",
    tagline: "Defend the AI Attack Surface",
    summary:
      "Defend the new AI attack surface with actionable enterprise-grade controls — covering OWASP LLM Top 10, prompt injection defence, RAG hardening, governance frameworks, and a live red-vs-blue simulation.",
    audience:
      "Security teams, architects, platform engineers, and developers responsible for integrating, defending, and governing AI systems at enterprise scale.",
    format: "2 days · 12 hours · Live sessions, guided labs, and attack-defence simulation",
    learn: [
      "AI and LLM Threat Surface — how GenAI introduces fundamentally new risks across prompts, pipelines, model interactions, and agentic systems.",
      "OWASP LLM Top 10 — practical interpretation and application of the global LLM security standard for enterprise environments.",
      "Prompt Injection and Context Leakage Defence — hands-on labs simulating real-world exploits and building countermeasures that work in production.",
      "RAG and API Hardening — securing retrieval chains, enforcing data isolation, implementing access control, and establishing safe integration patterns.",
      "Governance and Compliance — building AI policies, auditability frameworks, monitoring infrastructure, and responsible AI adoption programmes.",
      "Enterprise Red vs Blue Simulation — a live attack-defence exercise defending a real enterprise GenAI application against structured adversarial scenarios.",
    ],
    outcomes: [
      "Apply OWASP LLM Top 10 to real enterprise environments with actionable mitigation strategies.",
      "Implement defence-in-depth controls across prompts, APIs, data flows, and private LLM deployments.",
      "Build and secure RAG, API, and pipeline architectures using enterprise-grade security patterns.",
      "Conduct attack-defence simulations with confidence and operational readiness.",
    ],
  },
  {
    number: "04",
    title: "Applied LLM for Product Managers",
    tagline: "Build Better AI Products",
    summary:
      "Build better AI products by understanding what happens under the hood — without writing code. Covers LLM decision-making, AI product specifications, failure modes, governance, and communicating AI strategy to leadership.",
    audience:
      "Product managers, product owners, and business analysts responsible for defining, scoping, and delivering AI-powered products.",
    format: "2 days · 12 hours · Workshop with live product exercises",
    learn: [
      "How LLMs work at a level that enables better product decisions — without needing to write code.",
      "How to write effective AI product specifications that developers can actually build from.",
      "How to identify and scope AI use cases with genuine business value versus hype.",
      "How to evaluate AI outputs, understand failure modes, and set realistic user expectations.",
      "How to build product governance for AI features — safety, privacy, bias, and responsible rollout.",
      "How to communicate AI product strategy to leadership, engineering, and end users.",
    ],
    outcomes: [
      "Sharper AI product requirements that reduce back-and-forth with engineering.",
      "Ability to evaluate AI feature proposals critically and independently.",
      "Confidence in AI product strategy conversations at board and leadership level.",
      "A practical AI product playbook for the next 12 months.",
    ],
  },
];

const whyUs = [
  {
    icon: <User className="h-6 w-6" />,
    title: "Built by a practitioner, not a slide deck",
    description:
      "Every course is designed by Nanda Kumar — 23 years across Cisco, HPE, and Aruba, spanning engineering, security, enterprise AI adoption, and LLM security. This isn't vendor training repackaged.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Enterprise context throughout",
    description:
      "Every example, case study, and lab scenario is drawn from real enterprise environments — not toy examples designed to make the technology look simpler than it is.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Security embedded, not bolted on",
    description:
      "Safe and responsible AI usage is a thread woven through every course — not a footnote at the end. Participants leave knowing not just what AI can do, but what it can do wrong, and how to prevent it.",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Measurable impact",
    description:
      "Pre and post assessments. Workflow automation tracking. 30-day reinforcement app keeps participants engaged with daily micro-tasks and guided challenges. You'll demonstrate the investment delivered a result.",
  },
];

const engagementOptions = [
  "On-site delivery at your location, customised to your tools and industry.",
  "Virtual delivery for distributed or remote teams.",
  "Custom programmes combining multiple courses for end-to-end enterprise AI enablement.",
  "Train the Trainer — equip your internal L&D team to deliver AI literacy at scale.",
];

export default function AiUpskillingPage() {
  return (
    <>
      <HeroSection
        label="AI Upskilling"
        heading="Your Team Is Using AI. Are They Using It Right?"
        subheading="Practical, hands-on AI training built for enterprise teams — from leadership to developers to security professionals."
        image={`${basePath}/images/newupskill.png`}
      />

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Why It Can't Wait"
            heading="The gap is costing you more than you think."
            subheading="SaaviGenAI's corporate workshops are designed to close that gap — with training built by practitioners who have operated at the intersection of AI, security, and enterprise for over two decades."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {whyStats.map((item) => (
              <article
                key={item.stat}
                className="rounded-2xl border border-default bg-surface p-6 md:p-8"
              >
                <p className="mb-3 font-display text-5xl font-bold text-gold">
                  {item.stat}
                </p>
                <p className="mb-2 text-sm font-semibold text-primary">
                  {item.point}
                </p>
                <p className="text-sm leading-relaxed text-secondary">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <SectionLabel
              label="Training Philosophy"
              heading="Discover → Apply → Create → Secure"
              subheading="Every SaaviGenAI workshop follows a structured progression that takes participants from foundational understanding to practical daily application — with security embedded throughout, not treated as an afterthought. We don't teach tools. We build capability."
            />
            <div className="space-y-4 rounded-2xl border border-default bg-base p-6 md:p-8">
              <div className="rounded-xl bg-surface p-4">
                <p className="mb-1 font-mono text-xs uppercase tracking-widest text-gold">
                  Measurable outcomes
                </p>
                <p className="text-sm leading-relaxed text-secondary">
                  Pre and post assessments track real capability growth — prompt
                  accuracy, workflow automation, safety awareness. You&apos;ll see the
                  improvement, not just feel it.
                </p>
              </div>
              <div className="rounded-xl bg-base p-4">
                <p className="mb-1 font-mono text-xs uppercase tracking-widest text-gold">
                  30-day reinforcement
                </p>
                <p className="text-sm leading-relaxed text-secondary">
                  Learning fades without application. Our post-workshop reinforcement
                  keeps participants engaged with daily micro-tasks and guided
                  challenges for 30 days after training — turning a workshop into a
                  lasting behaviour change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Our Courses"
            heading="Four programmes. Every level of your organisation."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {courses.map((course) => (
              <article
                key={course.number}
                className="flex flex-col rounded-2xl border border-default bg-surface p-6 md:p-8"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 font-mono text-xs uppercase tracking-widest text-gold">
                      {course.tagline}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-primary">
                      {course.title}
                    </h3>
                  </div>
                  <span className="shrink-0 font-mono text-3xl font-bold text-gold/30">
                    {course.number}
                  </span>
                </div>
                <p className="mb-4 font-mono text-xs text-muted">{course.format}</p>
                <p className="mb-5 text-sm leading-relaxed text-secondary">
                  {course.summary}
                </p>

                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">
                  Key outcomes
                </p>
                <ul className="mb-6 flex-1 space-y-2">
                  {course.outcomes.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button href="/contact" variant="outline">
                  Explore more →
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <SectionLabel
            label="Why SaaviGenAI Training"
            heading="Built by a practitioner, not a slide deck."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {whyUs.map((item) => (
              <DifferentiatorCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-base py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionLabel
              label="Corporate Engagement"
              heading="Flexible delivery for every organisation."
              subheading="Get in touch to discuss a programme tailored to your organisation's size, industry, and AI maturity."
            />
            <div className="rounded-2xl border border-default bg-surface p-6 md:p-8">
              {engagementOptions.map((item, index) => (
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

      <FooterCTABand />
    </>
  );
}
