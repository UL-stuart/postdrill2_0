# Post-Drill Report — Snipe Hunt

This drill placed you in a live incident with cascading service failures, limited team availability, and multiple competing signals about root cause. It's designed to stress your ability to reason through misleading data, navigate coordination constraints, and drive investigation under pressure. Here's where your process landed and where the next growth edges are.

---

## F1 — Misleading correlations

**Operating at: Practicing**

You engaged with the email maintenance timing overlap as a leading hypothesis and invested time exploring it with Tanya. When disconfirmation came back — Tanya confirmed email was unrelated and Daniel's logs pointed elsewhere — you did pivot. The pivot, though, was reactive: it came from NPCs telling you the correlation didn't hold rather than from you reasoning about whether the mechanism was plausible ("could email maintenance plausibly break payment handshakes?"). On your next rep, try articulating *why* a correlation might or might not be causal before investing investigation time in it. That mechanism-first filter can save cycles and keep you from chasing coincidences.

---

## F2 — Hidden coupling

**Operating at: Practicing**

You questioned the 7-day-old cert rotation — noting that things had been working fine since — which shows healthy skepticism about temporal gaps. But the coupling insight (reload-vs-restart, bundle ordering) was surfaced by your team rather than by you probing for it. After the first restart failed, you redirected investigation, which is good, but you didn't articulate *why* the failure was structurally different from what you expected. Growth edge: when a remediation doesn't work, pause and ask "what does this failure tell me about the system's structure?" rather than opening the floor broadly. That reframing question is what separates reactive pivots from diagnostic ones.

---

## F3 — Decreased access to team

**Operating at: Strengthening**

You named the access constraints clearly — Hamed's auto-reply, Tinus at the summit, Tanya on the vendor call — and adapted your approach accordingly. Your decision to pull Tanya off the vendor call was preceded by multiple clarifying questions about the cost of losing the migration slot, which showed deliberate trade-off reasoning. You also accepted auto-replies as terminal rather than re-pinging, which kept you from wasting cycles. One area to tighten: while Tanya was still on the vendor call, you asked her several questions that could have waited, which split her attention. On the next rep, consider batching your asks or explicitly releasing someone until you're ready to fully redirect them.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the escalation chain in a visible, logical order — Tinus, Hamed, then Bez — and named the bottleneck explicitly when seeking executive backing. You delegated parallel work appropriately: Daniel on logs, Shay on root cause, Bob on revenue data. The coordination was sound. Where it stretched was in the time it took to commit: you spent several exchanges trying to get approval through other channels before escalating to Bez. On the next rep, once you've identified that the normal approval path is exhausted, move to escalation faster. You demonstrated you know *how* to escalate — the growth edge is *when*.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

The filtering work in this run was largely NPC-driven. Daniel surfaced PaymentService as the focal point; you followed that lead effectively once pointed there, but you didn't independently filter toward it from the noise. Early on, you shared CartService log data that turned out to be irrelevant, and you accepted NPC summaries without much further interrogation. Your one synthesis attempt — "go back to the first failure we see in the logs" — was directionally useful but vague. Growth edge: before delegating broadly, try stating what you've ruled out and what remains. Even a rough elimination list ("it's not email, it's not recent deploys, so what's left?") gives your team a shared filter and keeps you from re-treading ground.

---

## Looking Ahead

You're showing solid instincts around coordination — naming constraints, delegating to specific people, running parallel threads, and escalating when the path is blocked. Those are real strengths to carry forward. The consistent growth edge across this run is in *diagnostic ownership*: forming your own hypotheses before testing, articulating mechanism reasoning rather than following NPC leads, and synthesizing what's been ruled out so the team shares a narrowing picture. On your next rep, try verbalizing one explicit hypothesis and one elimination statement before each major action. That small habit can shift you from reactive to directive in the investigation layer.
# Facets Analysis — 9455

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "then if we can pause the vendor migration and it won't have any major impact and it might help restore services, lets pause"

**Rationale:**
The participant engaged with the email maintenance correlation as a leading hypothesis. They asked Tanya about the email maintenance impact and eventually pulled her off the vendor call to investigate, treating the timing overlap as potentially causal. However, they did pivot — once Tanya confirmed email was unrelated and Daniel's logs pointed to PaymentService, they moved on. The pivot was reactive (driven by Tanya's explicit disconfirmation and Daniel's findings) rather than from mechanism reasoning. They never articulated "does email plausibly break payment handshakes?" but did eventually accept the negative result and redirect.

---

## F2 — Hidden coupling

**Rating:** 2

**Evidence:**
> "although that was 7 days ago, we've been working fine post that change?"

**Rationale:**
The participant questioned the 7-day-old cert rotation but only after Daniel surfaced it — they did not independently ask "what changed beyond 24 hours?" The participant expressed skepticism about the temporal gap ("we've been working fine post that change?") but didn't reason through the reload-vs-restart mechanism themselves. After the first restart failed, they said "lets keep investigating" but didn't articulate that this was a structurally different failure. They relied on Tanya and Daniel to surface the bundle issue. Pivot latency after the restart failure was moderate (~3-4 exchanges before new direction emerged), but the reframing was NPC-driven rather than participant-driven.

---

## F3 — Decreased access to team

**Rating:** 3

**Evidence:**
> "We need to perform a reboot of the payment service and need Tinus or Hamed approval, both are off"

**Rationale:**
The participant named the access constraints — Hamed's auto-reply was acknowledged, Tinus was at the summit, and Tanya was on the vendor call. They accepted auto-replies as terminating after one cycle (didn't re-ping Hamed). They made a reasoned cost trade-off with Tanya's vendor call, asking multiple clarifying questions about impact before pulling her off. They escalated to Bez only when the approval chain was exhausted. However, they could have been more economical with Tanya during the vendor call (asked several questions while she was still on it). Overall, they demonstrated awareness of constraints and adapted accordingly.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "We need to perform a reboot of the payments service and Hamed and Tinus are unavailable. Its the teams general consensus that this is the next logical step and we are proceeding"

**Rationale:**
The participant walked the escalation chain in observable order: pinged Tinus (auto-reply), noted Hamed was out, then sought consensus from the team and escalated to Bez for executive backing. They named the coordination bottleneck ("need Tinus or Hamed approval, both are off") and delegated parallel work appropriately (Shay on banner, Daniel/Tanya on investigation). This matches tier-3 path (b) — walking the escalation chain to exhaustion then taking ownership. However, the ownership moment was somewhat protracted (multiple messages trying to get Tanya or others to approve before finally escalating to Bez), and on the second restart they didn't re-litigate, which is a positive signal.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "Can we check the TLS cert on the payment service?"

**Rationale:**
The participant did not independently filter toward PaymentService — Daniel surfaced it. They accepted NPC summaries without much further interrogation (e.g., Daniel's log analysis was taken at face value). They didn't catch the reload-vs-restart distinction from the runbook themselves. The cert rotation was surfaced by Daniel, not by the participant asking about changes beyond 24 hours. They did ask targeted questions once pointed in the right direction, but the filtering and buried-information discovery was largely NPC-driven. The CartService log they shared was irrelevant noise they didn't filter out effectively.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 2 |
| F2 — Hidden coupling | 2 |
| F3 — Decreased access to team | 3 |
| F4 — Interdependencies / coordination bottlenecks | 3 |
| F5 — Data overload / buried information | 2 |
| **Mean Facet Score** | **2.40** |

---

## Caveats
- F4 rating is a boundary call between 2 and 3. The participant did walk the escalation chain and name the bottleneck, but the ownership moment was drawn out over many messages before finally getting Bez's backing. Rated 3 because path (b) was completed — chain walked to exhaustion, then ownership taken.
- F2 rating considered that the participant did engage with the cert thread (so not N/A) but relied heavily on NPCs for the temporal coupling reasoning and the post-restart reframing. The "although that was 7 days ago" comment shows partial engagement but skepticism rather than mechanism reasoning.
- The participant's resolution of the incident (reaching the bundle fix) is not used as evidence per anti-outcome-bias — the ratings focus on process quality at each facet.

---
---

# Markers Analysis — 9455

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "We need to perform a reboot of the payments service and Hamed and Tinus are unavailable. Its the teams general consensus that this is the next logical step and we are proceeding"

**Rationale:**
The participant drives the response throughout, directing team members, making decisions, and ultimately pushing through the restart override by seeking Bez's executive backing. They use "we are proceeding" framing and inform the business of the decision. However, they don't explicitly say "I authorize" or "blowback's on me" — they frame it as team consensus and seek Bez's approval rather than taking personal ownership of the override decision outright.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "How many customers are blocked from checking out? What's the estimated revenue loss per minute right now?" and "Is this a total checkout outage or are any transactions getting through at all? I need clarity on scope."

**Rationale:**
The participant's early moves include scope-validating questions about the extent of the outage, whether any transactions are getting through, and revenue impact. They ask "What are they saying bob" immediately after the alert. These are clarifying questions before taking remediation action, fitting the tier 3 expectation of scope-validation before declaring or acting.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "What would the email maintenance do" and "Can we check the TLS cert on the payment service?"

**Rationale:**
The participant asks about the email maintenance and its potential impact, and later asks about the cert rotation. However, they don't explicitly request a change log or systematically review recent deployments. When Daniel mentions the cert rotation from 7 days ago, the participant notes "although that was 7 days ago, we've been working fine post that change?" — showing some reasoning. But they also say "Okay, lets start rolling back the change anyways and see if it improves" without articulating a clear mechanism connecting the cert rotation to the current failure. They engaged with changes but didn't use the information as a rigorous elimination pass.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@daniel can we look into what might be causing the issues on the app side of things please" and "Shay, can you continue to look for any clues as to the root cause" and "Bob, would you mind helping gather some revenue information for Bez"

**Rationale:**
The participant consistently names specific people for specific tasks — Daniel for app-side investigation, Tanya for platform/cert work, Shay for root cause analysis, Bob for revenue/customer comms. The routing is generally appropriate (Tanya for platform, Daniel for logs). However, some asks are somewhat vague ("look for any clues") rather than tightly scoped, which keeps this at tier 3 rather than 4.

---

## C6 — Runs parallel investigation threads

**Rating:** 3

**Evidence:**
> "Whilst Tanya is working on the emails, Shay and Daniel, can you both keep looking into the errors to try and figure out the root cause?"

**Rationale:**
The participant runs multiple threads concurrently — Tanya on email maintenance, Daniel on app-side logs, Shay on root cause, Bob on customer/revenue data. They explicitly acknowledge parallel work ("Whilst Tanya is working on the emails..."). Multiple distinct tasks are delegated to different people in close temporal proximity, meeting the tier 3 expectation of simultaneous investigation threads.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "Hi Bez, please can you provide executive approval to perform measures to hopefully fix the issue" and the earlier decision to pull Tanya off the vendor call: "then if we can pause the vendor migration and it won't have any major impact and it might help restore services, lets pause"

**Rationale:**
The participant escalates twice: pulling Tanya off the vendor call (after weighing the cost) and seeking Bez's executive backing when Hamed and Tinus are unavailable. The escalation to Bez includes context about what's needed. However, the participant took several messages and back-and-forth before committing to pull Tanya, and the Bez escalation came after multiple failed attempts to get Tanya to proceed without sign-off. The escalations are concrete but somewhat delayed.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "Okay, lets start rolling back the change anyways and see if it improves" and "is that expected, for it to say expired?"

**Rationale:**
The participant doesn't explicitly articulate hypotheses before testing them. They follow leads (email maintenance, cert rotation) but don't frame them as named hypotheses with proposed tests. The rollback of the cert change is an implicit test, but the participant doesn't articulate "my hypothesis is X, let's test by doing Y." They react to evidence as it arrives rather than proactively forming and testing theories. This is inconsistent engagement — tier 2.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "To summarise: We seeing cascading failures across different services. Lets go back to the first failure we see in the logs and check what was changed there or what could be causing other services to fail"

**Rationale:**
The participant makes one synthesis attempt ("go back to the first failure") but it's vague and doesn't explicitly name what's been ruled out. They don't produce clear elimination statements like "it's not email maintenance because X, it's not recent deploys because Y." When Daniel narrows to PaymentService outbound failures, the participant follows the lead but doesn't synthesize the evidence themselves. Most narrowing is done by NPCs rather than the participant articulating scope reduction.

---

## M4 — Considers potential consequences before acting

**Rating:** 3

**Evidence:**
> "Whats the impact of losing the canary rollout?" and "Do we need to migrate or can we postpone these 2 weeks" and "I understand, but if we pause and lose our slot, what functionality with we lose?"

**Rationale:**
The participant asks multiple consequence-weighing questions before pulling Tanya off the vendor call — asking about the impact of losing the rollout window, whether it can be postponed, and what functionality would be lost. This shows deliberate consideration of side effects before acting. However, they don't show similar caution before the restart (no "is it safe?" check) or consider that the restart might expose a secondary issue. Tier 3 for the Tanya decision; less evident elsewhere.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "Tanya and Daniel, lets keep investigating, what do we think could be causing the issue" (after first restart failed) and later engaging with the bundle discovery: "Tanya and Daniel, lets fix and push and test again as soon as we can"

**Rationale:**
After the first restart fails, the participant doesn't retry the same action — they redirect investigation ("lets keep investigating, what do we think could be causing the issue"). When the bundle order issue is identified, they pivot to fixing it. They don't get stuck in a loop. However, the pivot is somewhat passive — they ask the team what could be causing it rather than proposing a new direction themselves. They adapt but don't reframe the problem independently.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "From what we know so far, it appears to be a total outage. No trasactions going through team are still investigating" and "We do not have this information at present and therefore, cannot give an ETA. We are still trying to identify the root cause"

**Rationale:**
The participant's business updates are mostly reactive (responding to Bez's demands) and lack substance. They state "total outage" and "still investigating" but don't provide working theories, committed next-update times, or quantified impact in their own updates (Bob provides the revenue numbers separately). Later updates ("We are continuing to investigate and are currently looking into potential certificate issues") are slightly better but still thin. No proactive cadence is established.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "To summarise: We seeing cascading failures across different services. Lets go back to the first failure we see in the logs and check what was changed there or what could be causing other services to fail"

**Rationale:**
The participant makes one synthesis attempt for the technical team, but it's vague ("cascading failures across different services") and doesn't name what's been ruled out or ruled in. They don't post clear scope statements like "it's not email, it's not deploys, focus is PaymentService outbound." Most of their technical channel messages are questions or delegation rather than synthesis. The team gets direction but not a shared mental model from the IC.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 3 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 2 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 3 |
| C7 — Escalates when stuck | 3 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 2 |
| M4 — Considers potential consequences before acting | 3 |
| M5 — Adapts approach when initial path isn't working | 3 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.58** |

---

## Caveats
- L3 is a borderline 3/2 call. The participant drives the response but routes the override decision through Bez rather than taking it personally. Rated 3 because they still push the decision forward and inform the business, even if they don't use explicit "I authorize" language.
- M4 is strong on the Tanya decision but absent on the restart decision — rated 3 based on the Tanya evidence being a clear tier-3 manifestation.
- K2 could be argued as borderline 1/2; rated 2 because the participant does provide some scope information ("total outage, no transactions") even if it lacks business framing, theory, or committed cadence.

---
