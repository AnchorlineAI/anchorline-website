---
title: "The Agent Needs an Identity, Not Just a Prompt"
description: "An organization that cannot inventory its agents cannot govern them. Before agents receive more authority, leaders need to know where they are, what they can do, what they did, and how to stop them."
publishDate: 2026-09-23
author: "Kris McFadden"
category: "AI Governance"
featured: false
---

An AI agent can have an excellent prompt and still be an organizational risk.

The prompt may define the task. It does not establish who owns the agent, which systems it may reach, how long its authority lasts, whether its actions can be reconstructed, or what happens when it needs to be stopped.

That distinction moved closer to the center of the enterprise AI conversation today. In a [September 22 announcement](https://www.okta.com/newsroom/press-releases/ai-innovations-oktane-2026/), Okta introduced and expanded a set of identity and governance capabilities for AI agents. Three are generally available now: Agent SSO, Agent-to-Agent Connections, and Resource Access Certifications. Agent Gateway and Shadow AI Agent Discovery for Endpoints are planned for general availability in Q3. Configuration Designer and an expanded runtime kill switch are planned for Q4.

Those dates matter. The currently available products should not be confused with the roadmap. Okta’s claims about reduced risk, stronger control, and easier deployment are vendor claims, not independent proof of outcomes. Still, the architecture points toward a practical leadership problem that exists regardless of which platform an organization uses.

## Agents are becoming actors inside the operating system

Most teams still evaluate an agent by asking whether it can complete a task. That is necessary, but it is no longer enough once the agent can call tools, read company information, update records, communicate with other agents, or act on someone’s behalf.

At that point, the agent is participating in the organization’s operating system. It has relationships, permissions, dependencies, and consequences. A useful prompt may guide its behavior, but governance requires a durable identity connected to a named owner, a defined purpose, and an explicit lifecycle.

Without that inventory, leaders cannot answer basic questions. How many agents are operating? Which are sanctioned? Who is accountable for each one? What information and tools can they reach? Which agent belongs to an employee who changed roles or left the company? Which permissions are still necessary?

This resembles familiar identity and access work, but agents introduce a different operating condition. They can move through a sequence of tools and delegated tasks at machine speed. A permission that looks narrow in isolation may become much more consequential when combined with other permissions across a workflow.

The inventory therefore cannot be a list of names alone. It needs to connect each agent to its owner, purpose, authority, resources, dependencies, status, and retirement process.

## Authority should be bounded before execution begins

Once an agent is known, the next question is not simply whether it has access. Leaders need to define the boundary of its authority.

That means deciding which actions it may take, which resources it may use, whose authority it is carrying, how long that authority should persist, and when a person must approve the next step. An agent gathering context for a decision presents a different risk from one that can send a message, change a financial record, publish content, alter code, or trigger another workflow.

The discipline here is least privilege: give the agent enough authority to perform the approved task without granting standing access to everything its creator can reach. This is more than a security setting. It is operating design.

If a team cannot describe the agent’s job precisely enough to define its boundary, the workflow may not be ready for autonomous execution. The problem may be unclear ownership, an unstable process, or a decision that has never been made explicit.

Centralized control can slow experimentation when it becomes indiscriminate bureaucracy. That is the strongest fair objection, and leaders should take it seriously. The answer is not to govern every low-risk prototype like a production system. It is to match control to consequence and prevent experiments from quietly becoming permanent infrastructure.

## Action must be observable, not merely permitted

Permission tells you what an agent may do. Observation tells you what it actually did.

As agents hand work to tools or other agents, organizations need enough context to reconstruct the chain: who initiated the work, which identity acted, what resource was accessed, what policy allowed it, what changed, and where the task went next. Logs that show activity without attribution will not provide meaningful accountability.

This matters because a successful outcome does not prove the process was sound. An agent can reach the right answer through an access path it should never have used. It can also follow its instructions faithfully while acting on incomplete context. Observable action makes review, diagnosis, and correction possible before an unusual path becomes a hidden norm.

For leaders, the practical standard is straightforward: consequential agent actions should be attributable, reviewable, and connected to the authority under which they occurred.

## Containment and shutdown belong in the original design

Every serious agent deployment needs a credible answer to one uncomfortable question: how do we stop it?

Okta says administrators can already deactivate an agent through its console to block new sessions. Its broader gateway-level capability—described as revoking active tokens and shutting down sessions in flight—is planned for Q4, not available today.

The broader principle should not wait for one vendor’s roadmap. Before deployment, the organization should know how to suspend an agent, revoke its credentials, interrupt active work, limit the effect on unrelated systems, investigate what happened, and restore access deliberately if appropriate.

A shutdown mechanism added after an incident is not a control plan. It is a reaction. Containment should be tested while the agent’s scope is still narrow and the consequences are still manageable.

## The executive review is five questions

Before an agent moves from experiment to operational authority, require clear answers to these questions:

1. Where is the agent, and who owns it?
2. What exact authority has it been given?
3. Can we reconstruct its consequential actions and delegation chain?
4. How do we contain it without disabling unrelated work?
5. How do we revoke access and end active sessions when trust changes?

The answers do not require every organization to buy the same identity platform. They require the organization to treat an agent as more than a clever prompt attached to a workflow.

The quality of the model matters. So does the quality of the prompt. But once software can act inside the organization, leadership has to govern the actor as well as the output.

Give the agent a purpose. Give it a boundary. Make its actions visible. Know how to stop it.

If you cannot do those things, it is not ready for more authority.

## Sources

- [Okta: New Okta for AI Agents innovations increase visibility into agent behavior, secure connections at runtime, and enforce continuous agent governance](https://www.okta.com/newsroom/press-releases/ai-innovations-oktane-2026/), September 22, 2026.
- [SiliconANGLE: Okta adds AI agent runtime gateway, forms Blueprint Alliance with AWS and CrowdStrike](https://siliconangle.com/2026/09/22/okta-adds-ai-agent-runtime-gateway-forms-blueprint-alliance-with-aws-and-crowdstrike/), September 22, 2026.
- [Okta and founding members: Industry leaders form the Blueprint Alliance to advance a shared architecture for securing AI agents](https://www.okta.com/en-gb/newsroom/press-releases/industry-leaders-form-the-blueprint-alliance/), September 22, 2026.
