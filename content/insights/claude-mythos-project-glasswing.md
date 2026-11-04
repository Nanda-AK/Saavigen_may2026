---
title: "Claude Mythos & Project Glasswing: The Moment AI Crossed Into Cyber Offense Reality"
date: 2026-04-08
author: nanda-kumar
category: AI Agent Security
summary: "Claude Mythos can find serious vulnerabilities and write working exploits for them. It has already surfaced thousands of flaws nobody had spotted, which shifts the balance between attackers and defenders."
cover: /images/insights/claude-mythos-project-glasswing.webp
source:
  name: LinkedIn
  url: https://www.linkedin.com/pulse/claude-mythos-project-glasswing-moment-ai-crossed-kirubakaran-akwdc/
featured: 2
---

<!-- Written for the new site from Nanda's LinkedIn article (source above).
     Facts checked against Anthropic's announcement: https://www.anthropic.com/glasswing
     Only facts public on the article date (April 8, 2026) are used. -->

On April 7, 2026 Anthropic announced a model it does not plan to sell. Claude Mythos Preview is a general purpose frontier model that Anthropic says is better at finding and exploiting software vulnerabilities than all but the most skilled human researchers. Instead of a public launch, the company placed it inside a restricted programme called Project Glasswing and gave access only to organisations that look after critical software.

That decision says more than any benchmark. An AI lab has built something it considers too capable for general release. The capability in question is cyber offense.

## What Mythos can do

According to Anthropic, Mythos Preview has already found thousands of high-severity vulnerabilities. Some of them are in every major operating system and every major web browser. The examples in the announcement show how deep the problem goes.

- A bug in OpenBSD that went unnoticed for 27 years. It let an attacker crash any machine running the system simply by connecting to it.
- A 16-year-old flaw in FFmpeg, in a line of code that automated testing tools had run five million times without catching the problem.
- A set of Linux kernel weaknesses that could be chained together to go from an ordinary user account to full control of the machine.

Anthropic says nearly all of these were found without human steering. Many of the working exploits were written the same way. OpenBSD is known for its focus on security. FFmpeg sits inside a huge share of the world's video software. These are well-tested projects that people have studied for decades.

## Why it stays behind closed doors

Project Glasswing starts with a short list of launch partners: Amazon Web Services, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, the Linux Foundation, Microsoft, NVIDIA and Palo Alto Networks. More than 40 other organisations that build or maintain critical software also have access. Anthropic has committed up to $100 million in usage credits for the work, plus $4 million in donations to open source security groups.

The thinking is straightforward. If a model can find and weaponise flaws at this pace, the people who maintain the software should see those flaws first. Glasswing gives defenders a head start so they can patch before similar capability reaches attackers. Anthropic has also said it will not make Mythos Preview generally available until it has safeguards that can detect and block the model's most dangerous outputs.

## Offense just got cheaper

Security has always been lopsided. An attacker needs one way in while a defender has to close every door. What held attackers back was skill. Finding a 27-year-old bug in a mature codebase took rare expertise and a lot of patience. Turning it into a reliable exploit took more.

Models like Mythos change the cost of that work. Research that took a skilled person weeks can now run in parallel across thousands of targets. Weaknesses that look minor on their own can be chained into a serious compromise without anyone working out the steps by hand. The skill barrier that kept most would-be attackers out is getting lower.

Glasswing is a careful way to handle a dangerous capability. It is also a preview of what comes next. Other labs will build models with similar skills. Some will be released with fewer controls and some will be open weight. Capability is moving faster than the controls around it. We should plan on that basis.

## What this means for teams building software

A few practical points follow.

**Assume your attacker has AI.** Threat models that picture a person working through a target by hand are already out of date. Plan for automated discovery of flaws and for exploits that appear soon after a weakness becomes public.

**Find your own bugs first.** Security checks belong early in development, in code review and in the build pipeline. If a model can find the flaw in your code, you want your own team to find it before release.

**Use AI on defence too.** The same skills that find vulnerabilities can help triage alerts, review code and investigate incidents. Defenders who avoid these tools will fall behind attackers who use them.

**Treat access control as part of the product.** Glasswing works because access is limited and watched. The same idea applies inside your own organisation. You should know which AI models and agents are running, what they can reach and what they actually do.

## Where SaaviAIDR fits

That last point is the problem we work on at SaaviGenAI. SaaviAIDR gives security teams visibility into the AI agents and chatbots running across their organisation. It flags risky behaviour as it happens and helps the team respond. As models become more capable, that visibility moves from a nice extra to a basic security control.
