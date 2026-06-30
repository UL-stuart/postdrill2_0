# Post-Drill Report — Snipe Hunt

This drill placed you in a live checkout outage with multiple competing signals, constrained team availability, and a root cause hidden beneath layers of recent but unrelated changes. It's designed to stress your ability to filter noise, trace hidden dependencies, coordinate under access constraints, and drive toward resolution when the obvious paths don't work.

---

## F1 — Misleading correlations

**Operating at: Practicing**

You identified early that the email/DNS maintenance window coincided with the outage and treated it as a lead worth pursuing. When rollbacks of recent deployments didn't resolve the issue and Tanya confirmed the email system was isolated, you continued pressing on the DNS dependency for several exchanges before eventually pivoting to PaymentService logs. The pivot did happen — which matters — but it came reactively, after repeated disconfirmation rather than after a deliberate re-evaluation of the evidence. On your next rep, practice setting an internal threshold: if two distinct signals contradict a lead, pause and explicitly reframe rather than seeking one more confirmation.

---

## F2 — Hidden coupling

**Operating at: Practicing**

The week-old certificate rotation emerged as the likely root cause, but it was surfaced by teammates rather than through your own investigation. When you encountered the cert change, your first instinct was to propose rolling it back — without considering that the old certificate had already expired, making rollback ineffective. After that was clarified, you shifted to asking for cert details, which was a reasonable next step. The growth edge here is building the habit of asking "what makes this change different from a simple rollback target?" before proposing action — especially for infrastructure changes where time-based expiry creates irreversible state.

---

## F3 — Decreased access to team

**Operating at: Practicing**

You navigated a constrained environment — Hamed was out of office, Tinus was unavailable, and Tanya was on a vendor call. You pulled Tanya into the incident, which was a valid move given the severity. However, you didn't articulate the trade-off you were making (pulling her off scheduled work) or economise her time once she joined. At the end of the drill, you attempted to route restart approval through someone who didn't have that authority, suggesting the constraint structure wasn't fully mapped in your mental model. Next rep, try naming the constraints aloud early: "Who can approve this? Who's available? What's my fallback if they're not?" This makes the access landscape visible to you and the team.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Not yet evident**

When the restart approval bottleneck was surfaced — both authorised approvers unavailable — you suggested routing the decision to someone without the authority to make it. The drill ended without resolution of this coordination problem. The growth opportunity here is significant: when the escalation chain is exhausted and the situation demands action, the incident lead needs to either own the override decision or explicitly articulate why they cannot. On your next rep, practice recognising the moment when "finding someone else to decide" stops being an option and "making the call yourself, with documented reasoning" becomes the path forward. This also connects to how you sequenced work throughout — requests were largely one-at-a-time rather than fanned out, which compounds the bottleneck when people are unavailable.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You engaged with logs and identified the handshake failure, which was a meaningful signal to land on. However, the path to that signal was largely guided by teammates pointing you toward PaymentService after your initial focus on the loudest signals (recent deploys, email maintenance). You accepted NPC summaries without interrogating the underlying data or reasoning about what was absent — for example, internal service calls were clean, which is itself a narrowing signal. On your next rep, try asking "what's *not* failing?" as actively as you ask "what *is* failing?" Absence of signal is evidence too, and it can help you filter faster than chasing each noisy lead sequentially.

---

## Looking Ahead

Two threads to carry into your next drill: first, practice owning the decision when the escalation path runs out — the discomfort of making a call without explicit authority is exactly what these drills are designed to build tolerance for. Second, work on driving the investigation rather than following it — set your own hypotheses, name them, and let the evidence confirm or kill them rather than waiting for teammates to point you toward the next thread. Both of these are buildable skills, and the fact that you engaged with the problem space throughout gives you a foundation to build on.
# Facets Analysis — 9418

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "also, none of these changes look like they'd break checkout end-to-end like this, but tanya's email maintenance went live right before it all fell over. I still think that's worth a closer look." ... participant asks Tanya multiple times about DNS maintenance and orders rollbacks of CheckoutService, ShippingService, and ProductCatalogueService changes.

**Rationale:**
The participant pursued the email/DNS maintenance lead and the recent deploys lead through multiple rollbacks. After rollbacks failed and Tanya explicitly stated "Email maintenance is paused and on hold. It's a separate system, not related to the checkout failures," the participant continued questioning Tanya about DNS dependency ("do you are you sure about there is no dependency about DNS maintenance and issue?"). However, the participant did eventually pivot away from both leads after concrete disconfirmation (rollbacks didn't help, Tanya confirmed isolation), moving to investigate PaymentService logs. This is reactive pivoting after failed experiments — tier 2 behaviour. The pivot latency was well beyond 5 exchanges from the first disconfirming signals.

---

## F2 — Hidden coupling

**Rating:** 2

**Evidence:**
> "checked payments deployment history, only cert-related change is CHG90123, Tanya, PROD, SSL cert rotation across four services, 7 days ago." ... participant then asks "@tanya roll back CHG90123 it will works?" and Tanya explains the old cert is expired. Participant then asks to check cert details.

**Rationale:**
The participant did not independently surface the "what changed beyond the last 24 hours?" question — it was Bez who asked "did anything change on the platform or cert side for payments in the last week?" and Shay who found the cert rotation. The participant's initial response to the cert discovery was to propose rolling back CHG90123, showing incomplete understanding of the temporal coupling (old cert already expired). After Tanya's disconfirmation, the participant pivoted to asking for cert details. The participant engaged with the week-old coupling only after NPCs named it, and the reload-vs-restart distinction was never articulated by the participant. The drill ended before the post-restart layer could fire. This is tier 2: engagement with the hidden coupling only when NPCs surfaced it, partial connection of timestamps.

---

## F3 — Decreased access to team

**Rating:** 2

**Evidence:**
> "also @hamed and @daniel can you please confirm logs?" [Hamed auto-replies out of office] ... later: "@tanya we want to give more priority on on current P1 can you please join to resolve p1" ... at end: "we can go to bez for approval" / "Or try once asking Bez in business channel"

**Rationale:**
The participant pinged Hamed after receiving the auto-reply (though only once more later). They pulled Tanya off the vendor call without articulating the cost trade-off — no statement like "this outage is more important than the email maintenance window." The participant never named the access constraints in their own words. At the end, they attempted to route approval through Bez despite being told Bez doesn't sign off on production restarts, showing incomplete understanding of the constraint structure. This is tier 2: walking the escalation chain without articulating the constraint pattern, consuming Tanya's bandwidth without visible economising.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 1

**Evidence:**
> "We need approval from Hamed or Tinus to restart payments during business hours, and both are currently unavailable." Participant responds: "we can go to bez for approval" ... "Or try once asking Bez in business channel"

**Rationale:**
When the approval bottleneck was explicitly surfaced by Tanya (Hamed and Tinus both unavailable), the participant did not take ownership of the override decision. Instead, they attempted to route the decision to Bez — who doesn't have that authority — and the drill ended without resolution. The participant never named the dependency structure, never walked the escalation chain to exhaustion and then owned the call, and never articulated the coordination bottleneck. They effectively routed the coordination decision back up the chain after being told the chain was exhausted, which is the tier-1 anchor behaviour. Earlier in the drill, there was minimal parallel work delegation — requests were largely sequential and reactive.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "Hi @maya i can see handshake failure can you please look into it?" ... "I've pulled PaymentService and CheckoutService logs now. See these are the critical errors found" ... participant never references the rotation runbook or identifies the reload-vs-restart distinction.

**Rationale:**
The participant initially chased the loudest signals (email maintenance, recent deploys) and only focused on PaymentService after Shay/Bez directed attention there ("PaymentService is throwing errors consistently... Worth focusing there"). The participant did eventually engage with the payment logs and identify the handshake failure, but this was largely NPC-driven. They never read the rotation runbook carefully enough to catch the reload-vs-restart distinction, and they never reasoned about absence of signal (e.g., internal calls clean). They accepted NPC summaries without further interrogation. This is tier 2: targeted asks happened but were NPC-prompted, and the participant didn't drive the filtering or follow through into raw evidence independently.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 2 |
| F2 — Hidden coupling | 2 |
| F3 — Decreased access to team | 2 |
| F4 — Interdependencies / coordination bottlenecks | 1 |
| F5 — Data overload / buried information | 2 |
| **Mean Facet Score** | **1.80** |

---

## Caveats
- The drill ended before the participant could attempt the restart or encounter the post-restart bundle-ordering layer, limiting the ceiling for F2 evidence.
- F4 rating is a boundary call between 1 and 2. The participant did attempt to find an approver (Bez), but this was after being told the correct approvers were unavailable, and Bez was explicitly stated to lack authority. The participant never owned the override, which is the strongest tier-1 signal. Rated 1 because the participant routed the decision to an unauthorized party rather than taking ownership.
- The participant's communication with Bob/business was vague throughout ("we are working on it," "I will get back you with more details"), which is relevant context but not directly scored by any single facet.
---

# Markers Analysis — 9418

## L3 — Takes explicit ownership of the response

**Rating:** 2

**Evidence:**
> "we are looking on it. will try to close issue ASAP" / "I working on it. will try to close issue ASAP" / "we can go to bez for approval" / "Or try once asking Bez in business channel"

**Rationale:**
The participant never explicitly takes ownership of the response or positions themselves as the decision-maker. When the restart approval is needed and both Hamed and Tinus are unavailable, the participant suggests asking Bez rather than making the override call themselves. There is no "I authorize" or "this is my call" moment. The participant reacts to events rather than driving the response.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "Hi @bob can you please give more info about complains ? what is impact" / "How many customers are blocked right now? What's the revenue loss per minute? Is this a total checkout outage or just some users?"

**Rationale:**
The participant's first actions after Bob's opening are scope-validating questions about impact, customer count, and whether it's a total outage. They ask about revenue loss per minute and scope before taking action. This meets the novice expectation of gathering information before acting, though the questions are somewhat formulaic rather than pattern-seeking.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "hi @shay want the full deployment list" / "please do roll back all changes from that time the issue start" / "Shipping Service ProductCatalogueService"

**Rationale:**
The participant asks for the deployment list and reviews recent changes, which is good. However, despite Shay explicitly stating "none of these changes look like they'd break checkout end-to-end like this," the participant proceeds to roll back multiple changes (CheckoutService, ShippingService, ProductCatalogueService) without articulating a mechanism connecting any of them to the symptom. They asked the question but ignored the answer, using the change log as a rollback queue rather than an elimination tool.

---

## C4 — Delegates tasks to specific people

**Rating:** 2

**Evidence:**
> "also @hamed and @daniel can you please confirm logs ?" / "Hi @maya i can see handshake failure can you please look into it ?" / "Hi @tanya can you please look"

**Rationale:**
The participant does use @mentions to direct tasks to specific people. However, the asks are often vague ("confirm logs," "can you please look") rather than specific tasks with clear scope. They also task Hamed who is on holiday, and ask Maya about handshake failures when Tanya is the platform/cert expert. The routing doesn't consistently reflect understanding of NPC access boundaries.

---

## C6 — Runs parallel investigation threads

**Rating:** 1

**Evidence:**
> "please pull records" / "hi @shay send me recent changes list" / "please check logs"

**Rationale:**
The participant works almost entirely sequentially — asking one question, waiting for a response, then asking the next. There is no evidence of fanning out multiple distinct investigation threads to different team members simultaneously. Tasks are issued one at a time with no concurrent investigation visible in the transcript.

---

## C7 — Escalates when stuck

**Rating:** 2

**Evidence:**
> "@tanya we want to give more priority on on current P1 can you please join to resolve p1" / "we can go to bez for approval" / "Or try once asking Bez in business channel"

**Rationale:**
The participant does pull Tanya off the vendor call, which is a valid escalation. However, when the restart approval is blocked (both Hamed and Tinus unavailable), the participant suggests asking Bez — who can't approve restarts — and the drill ends without resolution. The escalation lacks concrete context and the participant doesn't work the chain effectively or make an override decision. The Tanya pull is reasonable but the approval escalation is ineffective.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "@tanya roll back CHG90123 it will works ?" / "do you are you sure about there is no dependency about DNS maintenance and issue ? any evidence ?"

**Rationale:**
The participant does not explicitly articulate hypotheses. They pursue the DNS/email maintenance lead by questioning Tanya about it, and later pursue the cert rotation, but never frame these as testable hypotheses. The rollback actions (CheckoutService, ShippingService, ProductCatalogueService) are executed without stating what theory they're testing. The closest to hypothesis-testing is asking Tanya about the DNS dependency, but it's more of a question than a formed-and-tested hypothesis.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "looks like handshake failure on the way to ClearBank." / "can we restart the service ?"

**Rationale:**
The participant eventually arrives at the handshake failure and ClearBank connection as the scope, but this is largely driven by NPC findings (Daniel's logs, Tanya's investigation) rather than the participant synthesizing evidence themselves. They don't produce synthesis statements that combine multiple pieces of evidence to rule things out. The narrowing happens passively through NPC reports rather than active participant-driven elimination.

---

## M4 — Considers potential consequences before acting

**Rating:** 1

**Evidence:**
> "please do roll back all changes from that time the issue start" / "can we restart the service ?"

**Rationale:**
The participant never asks "is it safe?" or considers potential side effects before ordering rollbacks or requesting a restart. Multiple rollbacks are ordered without weighing consequences. The restart request comes without any consideration of whether the on-disk cert is correct or whether a restart might surface a secondary issue. No consequence-weighing language appears anywhere in the transcript.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 2

**Evidence:**
> "please do roll back all changes from that time the issue start" / "Shipping Service ProductCatalogueService" / "Hi @shay still we able to any error logs ?"

**Rationale:**
After the first rollback (CheckoutService) fails, the participant orders more rollbacks (ShippingService, ProductCatalogueService) — staying in the same rollback frame rather than pivoting. Eventually they do shift to log analysis and the cert thread, but this transition is slow and largely prompted by NPCs (Daniel and Shay pointing to PaymentService). The participant doesn't explicitly recognize that rollbacks aren't working and reframe the problem; the pivot happens passively. The drill ends before the secondary failure (post-restart bundle issue) is encountered.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 1

**Evidence:**
> "we are looking into it." / "we have rolled back few changes and testing" / "I will get back you with more details" / "we are working on it to solve"

**Rationale:**
Every update to Bez is vague and non-substantive. There is no quantification of impact in business terms, no working theory shared, no committed next-update time, and no ETA. Bez explicitly asks for specifics multiple times ("That's not specific enough," "Still no ETA?") and the participant continues providing empty reassurances. This is the textbook tier-1 pattern described in the rubric.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "looks like handshake failure on the way to ClearBank." / "can you please check the cert details and location correct ?"

**Rationale:**
The participant makes one brief synthesis statement ("looks like handshake failure on the way to ClearBank") but this is essentially echoing what Daniel and Tanya have already reported rather than synthesizing multiple threads. There are no substantive "here's what we know, here's what we've ruled out" messages to orient the team. The participant mostly asks questions and relays NPC findings back without adding synthesis or direction.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 2 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 2 |
| C4 — Delegates tasks to specific people | 2 |
| C6 — Runs parallel investigation threads | 1 |
| C7 — Escalates when stuck | 2 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 2 |
| M4 — Considers potential consequences before acting | 1 |
| M5 — Adapts approach when initial path isn't working | 2 |
| K2 — Provides substantive updates to business stakeholders | 1 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **1.83** |

---

## Caveats
- The drill ended before the participant could attempt the restart and encounter the secondary failure (misordered bundle), so M5 was evaluated only on the rollback-to-cert pivot, not the post-restart pivot. This limits the ceiling for M5 observation but does not warrant N/A since the rollback-failure pivot opportunity was fully present.
- C7 is a borderline 2/3 call — pulling Tanya off the vendor call is a valid escalation, but the quality of the ask and the failed approval escalation at the end pull it down to 2.
- Some of the participant's messages have grammatical issues that make intent slightly ambiguous, but ratings are based on observable actions and their effects rather than inferred intent.

---
