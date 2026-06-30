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