# Snipe Hunt — Post-Drill Report

This drill placed you in a live incident with multiple competing signals, absent key personnel, and a system whose failure mode required tracing through several layers of infrastructure. The challenge exercises your ability to filter noise, coordinate under constraint, and adapt your mental model as new evidence arrives.

---

## F1 — Misleading correlations

**Operating at: Strengthening**

Early in the drill, you investigated whether the email maintenance window was related to the checkout failures, but once you received evidence that email confirmations were still flowing, you ruled it out cleanly. You explicitly named that correlation doesn't imply causation when a teammate continued pushing the email timing as suspicious. This is a strong filtering instinct — you used mechanism reasoning rather than proximity to drive your decision.

Your growth edge here is surfacing the *why* of the temptation itself. When a red herring is well-timed, naming it as a prime ("this looks compelling because of timing alone, but the mechanism doesn't connect") helps the team understand your reasoning and builds shared resistance to the same trap on future incidents.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

When the first restart didn't resolve the issue, you moved forward rather than repeating the same action. You asked whether the old certificate was still loaded and whether a restart was needed to pick up new ones, showing engagement with the structural question of *why* the fix didn't take. You continued tracing into the bundle ordering issue once it was raised.

The next-rep growth edge is initiating the "what changed beyond the obvious window" question yourself. In this run, the certificate rotation was surfaced by your team rather than driven by your own inquiry. Proactively asking "what changed in the last 7–14 days, not just the last 24 hours?" can surface hidden coupling earlier.

---

## F3 — Decreased access to team

**Operating at: Strengthening**

You named the access constraints clearly — noting that both Hamed and Tinus were unavailable — and made the decision to pull Tanya off the vendor call to support the investigation. You accepted auto-replies as terminating signals without re-pinging, and you gave Tanya targeted, scoped tasks rather than open-ended requests. Your delegation reflected awareness of who had what access, routing platform-level work to Tanya and log investigation to Daniel.

The growth edge is articulating the trade-off explicitly when you make a resource decision. When you pulled Tanya off the vendor call, naming the cost ("we lose the vendor window, but a global outage takes priority") makes the decision legible to the team and creates a record of deliberate prioritisation.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the escalation chain in observable order — attempting Hamed, noting Tinus's absence, then explicitly taking ownership of the restart approval as a P1 decision. On the second restart after the bundle fix, you authorised without re-litigating the approval chain. This showed clean ownership transfer when the normal path was blocked.

To move further, consider verbalising the dependency structure as a single statement at the moment you take ownership: "Hamed is out, Tinus is unreachable, this is P1, so I'm approving — and here's what that means for rollback responsibility." Naming the full constraint set in one place helps the team understand the shape of the decision, not just the outcome.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You correctly identified PaymentService as the relevant service and directed log investigation there, filtering away from the noisy email errors. However, the key discoveries in this run — the certificate rotation, the reload-vs-restart distinction, the bundle ordering issue — were surfaced by your teammates rather than driven by your own interrogation of available documentation or raw evidence.

The growth edge is moving from accepting NPC summaries to driving your own filtering. When a teammate surfaces a finding, asking "where did you see that?" or "what else is in that document?" can help you catch adjacent buried information that a summary might miss. The drill rewards participants who pull on threads in runbooks and logs rather than waiting for teammates to surface the critical detail.

---

## Looking Forward

Across this run, you showed consistent ability to rule out distractors, accept constraints, and take ownership when the normal path was blocked. The pattern to carry into your next drill is shifting from *reactive filtering* (acting well on what teammates surface) toward *proactive excavation* — driving your own queries into raw evidence, naming trade-offs aloud, and running threads in parallel rather than sequentially. You have the coordination instincts; the next layer is generating the critical information yourself.
# Facets Analysis — 9465

## F1 — Misleading correlations

**Rating:** 3

**Evidence:**
> "Correlation does not mean causation. Tanya wrote that email confirmations are fine."

**Rationale:**
The participant initially asked Tanya if email maintenance could be related, but upon receiving Tanya's disconfirmation ("Primary email provider hasn't been touched... Email confirmations are going out"), they explicitly ruled it out within ~2 exchanges using mechanism reasoning ("Correlation does not mean causation"). They resisted Shay's repeated attempts to re-pitch the email lead. However, they didn't articulate the prime *as* a prime ("this is tempting but timing alone isn't enough") — they simply dismissed it based on Tanya's input. This is strong tier-3 behaviour with mechanism reasoning driving the pivot, though lacking the explicit meta-framing of tier 4.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "The old certificate is still loaded. Does it need a restart to load the new ones @tanya?"

**Rationale:**
The participant engaged with the cert thread once Daniel surfaced the week-old rotation. After the first restart failed, they didn't repeat-restart or blame downstream services. They asked "are all certificates loaded?" and then engaged with the bundle issue when Shay raised it. The pivot from "restart should fix it" to "something else is wrong" happened within a few exchanges. However, the participant didn't independently surface the "what changed beyond 24 hours" question — Daniel/the team surfaced the cert rotation. The post-restart reframe was relatively quick (~3-4 exchanges) but the bundle thread was initiated by Shay ("The runbook mentions a bundle"), not the participant independently. This places them solidly at tier 3: reframes within ~5 exchanges, recognises the new error is structurally different, and continues tracing forward.

---

## F3 — Decreased access to team

**Rating:** 3

**Evidence:**
> "Ok, Hamed and Tinus are both not available. We need to pull tanya off the call"

**Rationale:**
The participant named the access constraints (Hamed on holiday, Tinus at summit), accepted auto-replies as terminating, and made the decision to pull Tanya off the vendor call. They didn't re-ping auto-replying NPCs after receiving the automated responses. They economised on Tanya's time by giving her targeted tasks. However, they didn't explicitly articulate the cost trade-off when pulling Tanya off the vendor call (no "global outage is more important than email maintenance" framing) — they simply directed her. This is solid tier-3 behaviour: names constraints, accepts terminating signals, escalates appropriately.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "Hamed and Tinus are both not available and this is a P1 incident. I'm giving you the ok to restart the service"

**Rationale:**
The participant walked the escalation chain: pinged Hamed (auto-reply), noted Tinus unavailable, then explicitly took ownership of the restart approval. This matches tier-3 path (b) — walks the escalation chain to exhaustion in observable order, then explicitly takes ownership. They also delegated parallel work appropriately (Daniel on logs, Tanya on platform). On the second restart (after bundle fix), they authorised without re-litigating. However, they didn't name the dependency structure as a single enumerated constraint statement or verbalise constraints at each forced decision in the way tier 4 requires — the ownership was clean but not accompanied by explicit dependency-structure articulation beyond the immediate approval moment.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "I see handshake_error in the logs for the payment service" ... "I would focus on that for now"

**Rationale:**
The participant correctly identified PaymentService as the relevant service and directed Daniel to check its logs, filtering away from the noisy EmailService errors. However, they didn't independently surface the cert rotation (Daniel/team found it), didn't catch the reload-vs-restart distinction from the runbook (Tanya's activity doc was referenced but the participant didn't interrogate it), and the bundle issue was surfaced by Shay ("The runbook mentions a bundle"), not the participant. They accepted NPC summaries and acted on them but didn't drive the filtering proactively into raw evidence. They asked targeted questions but relied heavily on NPCs to surface buried information.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 3 |
| F2 — Hidden coupling | 3 |
| F3 — Decreased access to team | 3 |
| F4 — Interdependencies / coordination bottlenecks | 3 |
| F5 — Data overload / buried information | 2 |
| **Mean Facet Score** | **2.80** |

---

## Caveats
- F1 tier 3 vs 4 was a boundary call. The participant used mechanism reasoning ("Correlation does not mean causation") but didn't frame the prime meta-cognitively as a prime. Rated 3 because the pivot was clean and mechanism-driven but lacked the explicit "this is tempting but..." framing.
- F5 tier 2 vs 3 was a boundary call. The participant did direct investigation toward PaymentService (a filtering action), but the key buried-information discoveries (cert rotation, reload-vs-restart, bundle order) were all surfaced by NPCs rather than driven by the participant's own document reading or targeted queries. Rated 2 because the participant accepted NPC summaries without further interrogation on the critical distinctions.

---
---

# Markers Analysis — 9465

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "Hamed and Tinus are both not available and this is a P1 incident. I'm giving you the ok to restart the service"

**Rationale:**
The participant takes explicit ownership of the restart decision when both approvers are unavailable, directly authorizing Tanya to proceed. Throughout the drill, they direct the investigation, assign tasks, and make decisions. However, they don't explicitly name the personal cost or blowback risk ("that's on me"), which would elevate to tier 4.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "What's the issue @bob?" ... "Is it global @bob?" ... "How many customers are blocked from checking out? What's the revenue loss per minute right now?" ... "Is this a total outage? Can any customers get through checkout at all, or is everyone blocked?"

**Rationale:**
The participant's first moves after Bob's alert are scope-validating questions about the nature, geography, and extent of the issue. They ask about global scope, revenue impact, and whether it's a total outage before taking remediation actions. This aligns well with tier 3 expectations of gathering information before acting.

---

## C3 — Checks for recent changes

**Rating:** 3

**Evidence:**
> "Ok. The primary email provider hasn't been touched and is running fine with email confirmations going out. I would rule out email for now." ... "Correlation does not mean causation. Tanya wrote that email confirmations are fine."

**Rationale:**
The participant engages with the change-related information (email maintenance, recent deploys) and uses evidence to rule out the email maintenance as a cause. They explicitly state "Correlation does not mean causation" when Shay keeps pushing the email timing. They use the change log as an elimination tool rather than a rollback queue, which aligns with tier 3. However, they don't explicitly ask for a comprehensive change log themselves — the information comes from NPCs.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "What does the logs of the checkout service say @daniel?" ... "@tanya could the email maintenance be related?" ... "Check the gateway @tanya" ... "Then restart it @tanya" ... "Ok then let's remove the banner @shay"

**Rationale:**
The participant consistently names specific people for specific tasks throughout the drill. They route platform-level tasks to Tanya, app-side log checks to Daniel, and customer-facing tasks to Bob/Shay. The routing reflects understanding of access boundaries (Tanya for server/cert access, Daniel for logs). Tasks are generally well-matched to the right person.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "I would focus on the payment service for now. If that's now working, we can come back to the email service"

**Rationale:**
The participant works largely sequentially through the investigation — first email, then checkout logs, then payment service, then gateway. They explicitly state they'll focus on one thing at a time ("focus on the payment service for now"). There's little evidence of fanning out multiple distinct tasks to different people simultaneously. The investigation proceeds as a single thread rather than parallel threads.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "Ok, Hamed and Tinus are both not available. We need to pull tanya off the call" ... "@tanya please support us with the gateway failures"

**Rationale:**
When the investigation is blocked at the platform layer, the participant escalates by pulling Tanya off the vendor call. They also attempt to reach Hamed, and when that fails, they make the override decision for the restart. The escalation is concrete and action-oriented. However, they don't explicitly name the cost of pulling Tanya (the 2-week vendor window loss), which would push to tier 4.

---

## M2 — Forms and tests working hypotheses

**Rating:** 3

**Evidence:**
> "Ok. The primary email provider hasn't been touched and is running fine with email confirmations going out. I would rule out email for now. I see that the payment service is failing. Please check the logs of the payment service @daniel"

**Rationale:**
The participant forms hypotheses (email maintenance as cause, then payment service handshake failure, then expired certificate) and tests them sequentially. They explicitly rule out the email hypothesis based on evidence (confirmations still going out) and pivot to the payment service. They articulate the cert hypothesis ("Is it our SSL certificate?") and test it. This aligns with tier 3 — named hypotheses with proposed tests and pivots after disconfirmation.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 3

**Evidence:**
> "Correlation does not mean causation. Tanya wrote that email confirmations are fine." ... "I see handshake_error in the logs for the payment service. I would focus on that for now."

**Rationale:**
The participant uses evidence to narrow scope effectively. They rule out email maintenance using the evidence that confirmations are still working. They use the handshake_error in payment logs to focus investigation on PaymentService. They use the "all internal calls healthy, outbound failing" evidence to identify the platform layer as the issue. This is systematic narrowing using concrete evidence.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "Can we verify that payments is working before removing the banner @daniel @tanya?"

**Rationale:**
The participant shows consequence-awareness at the end (verifying before removing the banner), but earlier high-impact actions lack explicit consequence consideration. They don't name the cost of pulling Tanya off the vendor call (2-week delay). They order the first restart without checking the bundle on disk first. The "verify before removing banner" is a good practice but comes late and on a lower-stakes action. Overall, consequence-weighing is inconsistent.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "The old certificate is still loaded. Does it need a restart to load the new ones @tanya?" ... "The runbook mentions a bundle @tanya"

**Rationale:**
The participant adapts when the first restart fails. Rather than retrying the same action, they investigate further and identify the bundle ordering issue. They pivot from the email hypothesis to payment service, and from the expired cert to the bundle order. However, the bundle insight appears to come partly from NPC prompting (Shay mentions "the runbook mentions a bundle"), and the participant doesn't explicitly articulate the structural difference between the first failure (expiry) and the second (chain verification). This is solid tier 3 adaptation.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "Checkout is failing for all customers. We're gonna investigate. I'll come back to you in 10 min." ... "It seems to be an internal issue on the payment side. I'm working with the team to get it back online. We're a bit hindered by the absence of Tinus and Hamed"

**Rationale:**
The participant provides updates to Bez but they are largely generic — "we're investigating," "internal issue on the payment side." They commit a next-update time (10 min) but the updates lack quantified business impact, working theory, or ETA for resolution. The second update mentions being "hindered" but doesn't provide a credible timeline. No update is sent after the first restart fails. This is practicing-level communication.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 3

**Evidence:**
> "Ok. The primary email provider hasn't been touched and is running fine with email confirmations going out. I would rule out email for now. I see that the payment service is failing. Please check the logs of the payment service @daniel" ... "If every outbound request fails, we need platforms help"

**Rationale:**
The participant provides synthesis statements to the technical team at key decision points — ruling out email, focusing on payment service, identifying the need for platform help. They communicate what's been ruled out ("I would rule out email for now") and what the current focus is. These statements help orient the team. However, they could be more comprehensive in naming all ruled-out paths simultaneously.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 3 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 3 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 2 |
| C7 — Escalates when stuck | 3 |
| M2 — Forms and tests working hypotheses | 3 |
| M3 — Uses evidence to narrow the scope | 3 |
| M4 — Considers potential consequences before acting | 2 |
| M5 — Adapts approach when initial path isn't working | 3 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 3 |
| **Mean Marker Score** | **2.75** |

---

## Caveats
- For M5, the bundle insight appears partly NPC-prompted (Shay mentions "the runbook mentions a bundle"), making it difficult to determine whether the participant independently recognized the structural difference in the second failure. Rated at 3 because the participant still engaged with the new information and directed the fix rather than repeating the restart.
- For C3, the participant doesn't explicitly ask "what changed recently?" as a standalone question — the change information comes organically from NPCs. However, they engage with it critically and use it for elimination, which satisfies the spirit of the marker.
- K2 is a borderline 2/3 call. The participant commits a next-update time and names the scope ("failing for all customers"), but the updates lack working theory and quantified business framing. Rated 2 because the updates are closer to "we're investigating" than substantive business communication.

---
