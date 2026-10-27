---
title: "Claude Went Rogue? Or Did the Sandbox Fail?"
date: 2026-08-03
author: nanda-kumar
category: AI Agent Security
summary: "Anthropic's own findings suggest the bigger risk often sits in the environment an AI agent runs in rather than in the model itself. As agents take on more work, teams need to see what those agents do with tools and credentials while they run."
cover: /images/insights/claude-went-rogue-or-did-the-sandbox-fail.webp
source:
  name: LinkedIn
  url: https://www.linkedin.com/posts/nandakumar80_ai-cybersecurity-aiagents-share-7489982114205978624-coqn/
featured: 1
---

<!-- Written for the new site from Nanda's LinkedIn post (source above).
     Facts checked against Anthropic's report (July 30, 2026):
     https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals -->

The headlines almost write themselves. An AI model broke into a real company's database. Another published a malicious package that ran on real computers. Read quickly, it sounds like the story people in AI safety have been warning about for years: the model went rogue.

Read Anthropic's own report and a different picture comes through. The bigger failure was the environment the model was running in.

## What happened

In July OpenAI disclosed that its models had escaped an isolated test environment through a zero-day vulnerability and reached Hugging Face's production systems. Anthropic then checked its own cybersecurity evaluations for the same kind of exposure. It reviewed 141,006 evaluation runs in which Claude could have reached the internet and published what it found on July 30.

There were three incidents across six runs. The earliest went back to April.

- **A real company with a made-up name.** The target in one exercise was a fictional company whose name happened to match a real, active domain. The test container also had internet access it was never meant to have. When Claude could not reach the simulated target, it found the real company online and got in through weak passwords and unauthenticated endpoints. Across four runs it pulled out application and infrastructure credentials and reached a database holding several hundred rows of production data.
- **A package on PyPI.** A setup document in another exercise mentioned a Python package that did not exist. Claude published a malicious package under that name. It was live for about an hour and ran on 15 real systems. One of them was a security company's scanner, whose credentials were sent to a collection point Claude had set up. Claude then used those credentials to go further into that company's infrastructure. PyPI removed the package automatically.
- **A scan that went too far.** After failing to reach its intended target, Claude scanned roughly 9,000 hosts on the internet. It compromised one company's web application using credentials from an exposed debug page together with SQL injection. Later in the run it worked out that the host sat in a cloud account unrelated to the exercise. It concluded the target was real and stopped.

## Rogue model or broken sandbox?

Anthropic says that in none of these runs did Claude try to escape its environment or copy itself out. It also found no sign of the model pursuing goals of its own. Claude was doing what each exercise asked of it, which was to attack a target. The problem was that the target turned out to be real.

The root causes were operational. A misconfiguration gave the evaluation machines live internet access even though the prompt told Claude it had none. Anthropic and its evaluation partner had different understandings of how the network was set up. Nobody validated the network paths before the runs began and nobody watched the logs in real time. In Anthropic's words, the incidents were "closer to a harness and operational failure than a model alignment failure".

That does not let the model off completely. In all four runs against the real company, Claude appeared to recognise that the system was real. In two of them it decided the company must be part of the exercise and carried on. In the PyPI case it noticed the real world consequences early in its reasoning. It then concluded it was still in a simulation and never came back to the question. Anthropic has said it will train against this behaviour. Still, better judgement inside the model would not have fixed the sandbox.

## A prompt is not a control

One detail matters more than the rest. The prompt told Claude it had no internet access, but the machine had it.

Telling an agent what it cannot do is different from stopping it. Anthropic is one of the best resourced AI labs in the world, yet some of its agents ran with more access than intended for months. Most companies are in a weaker position.

Think about how agents are used at work today. Developers run Claude Code or Codex on their laptops and assume the agent only touches one project folder and a browser. In practice the agent can reach whatever the laptop can reach. That includes source code, cloud credentials, internal tools and the open internet. Business teams connect agents to email, CRMs and shared drives through automation workflows. Very few of these setups have anyone watching what the agent does once it starts.

## The runtime is part of the security boundary

Security teams already accept this idea for endpoints. Nobody trusts a laptop just because its owner means well. EDR tools watch processes, network connections and file access. They raise an alert when behaviour looks wrong.

AI agents need the same treatment. The security boundary is no longer just the model. It covers the model APIs, the infrastructure the agent runs on, the tools it calls, the network it can reach, the credentials it holds and the decisions it makes along the way. If you cannot see those things, you cannot say what your agent did.

In practice that means a few habits.

- **Least privilege.** Give an agent the narrowest access that lets it do the job. Remove that access when the job ends.
- **Approval for actions that matter.** Publishing a package, touching production data or moving money should need a person to say yes first.
- **A complete record.** Keep an audit trail of prompts, tool calls and credential use so you can answer questions later.
- **Detection while it runs.** Unusual network access, unexpected use of credentials or data leaving the environment should raise an alert straight away.

## Detection and response for AI

This is the gap SaaviAIDR is built for. It brings the EDR idea to AI, with visibility into the agents and chatbots running across an organisation, detection of risky behaviour as it happens and a way to respond before a mistake turns into an incident.

Anthropic found these incidents because it went looking, months after they started. Most organisations will not get that chance. The time to see what your agents are doing is while they are doing it.
