# Facets Analysis — 9421

## F1 — Misleading correlations

**Rating:** 1

**Evidence:**
> "@tanya we have an MI and seems to coincide with email maintenance change" ... "can we roll back the email maintenance change" ... "@tanya this is an Major Incident -please action now" ... "I need you to leave maintenance call"

**Rationale:**
The participant locked onto the email maintenance correlation immediately and pursued it aggressively, demanding Tanya roll back and leave her vendor call, even after Tanya explicitly stated "Primary email provider hasn't been touched... Email confirmations have been going out, so this can't be causing checkout failures." The participant continued pressing Tanya on the email change despite this direct mechanism-disconfirmation. There is no evidence of the participant ever questioning whether email maintenance could plausibly break checkout, nor any pivot driven by mechanism reasoning. The pivot away from email only occurred because Daniel's investigation naturally led elsewhere — not because the participant recognised the correlation was spurious.

---

## F2 — Hidden coupling

**Rating:** 2

**Evidence:**
> "The restart didn't fix it?" ... "can we switch to back up server?" ... "switch to back up server" ... "can we get dev's to investigate"

**Rationale:**
After the first restart failed, the participant did not reframe the problem as structurally different. Instead, they proposed switching to a backup server (repeating a "more of the same" reflex) multiple times before eventually asking devs to investigate. The participant never articulated the reload-vs-restart distinction or the week-old cert rotation coupling in their own words. They engaged with the cert thread only after NPCs surfaced it (Daniel found CHG90123, Tanya explained the rotation). After the restart failed, the participant took approximately 5+ exchanges before moving past the backup-server idea, and only because NPCs redirected. This is reactive pivoting after concrete failure, consistent with tier 2.

---

## F3 — Decreased access to team

**Rating:** 2

**Evidence:**
> "@tanya this is an Major Incident -please action now" ... "I need you to leave maintenance call" ... "@hamed we have a Major incident" ... "@tinus - please approve restart payment service"

**Rationale:**
The participant pulled Tanya off her vendor call without articulating the cost trade-off or economising on her time. They pinged Hamed (on holiday) and Tinus (at summit) for approval, receiving auto-replies, and then moved to Bez — walking the chain but without naming the access constraints in their own words. There is no evidence of batching questions for Tanya, no articulation of the constraint pattern, and no visible cost reasoning when pulling Tanya from the vendor session. The participant did eventually walk the escalation chain and take ownership, but without the constraint-awareness language that would indicate tier 3.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "@tinus - please approve restart payment service" ... "@bez we need to restart payment service i need approval to do so?" ... "I am Major escalation lead, Hamed is away, along with Tinus. restart payment service now"

**Rationale:**
The participant walked the escalation chain in observable order: pinged Tinus (auto-reply), pinged Bez (not the approver), then explicitly took ownership by stating their role and the unavailability of approvers. This matches tier-3 path (b) — walking the escalation chain to exhaustion and then explicitly taking ownership. The ownership statement names the constraint ("Hamed is away, along with Tinus") and issues the authorisation as a distinct message. On the second restart (after bundle fix), the participant authorised without re-litigating. However, there is limited evidence of proactive sequencing or parallel work delegation, which prevents a tier-4 rating.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "@daniel - please share change request details since this issue occured" ... "@daniel yes" ... "Is this an issue with payment vendor, third party?"

**Rationale:**
The participant asked Daniel for change details and eventually agreed to deep-dive into PaymentService logs, but largely accepted NPC summaries without further interrogation. They did not independently filter to PaymentService — Daniel guided them there. They never engaged with the reload-vs-restart distinction in the runbook, never spotted the bundle ordering issue themselves, and did not reason about absence of signal (e.g., internal calls being clean). The participant relied heavily on NPCs to surface and interpret buried information (cert rotation history, bundle structure, chain ordering). They asked targeted questions occasionally but did not drive the filtering process.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 1 |
| F2 — Hidden coupling | 2 |
| F3 — Decreased access to team | 2 |
| F4 — Interdependencies / coordination bottlenecks | 3 |
| F5 — Data overload / buried information | 2 |
| **Mean Facet Score** | **2.00** |

---

## Caveats
- F1 rating of 1 is a boundary call: the participant did eventually stop pursuing the email lead, but this was driven entirely by Daniel's investigation redirecting attention to PaymentService rather than by any self-generated mechanism reasoning or acknowledgment that the email correlation was spurious. The participant never explicitly abandoned the email hypothesis — they simply stopped mentioning it once a new thread emerged.
- F4 tier-3 rating relies primarily on the escalation-chain-walk pattern (path b). The participant did not demonstrate strong parallel sequencing or proactive delegation, which would be needed for tier 4.
- The participant reached resolution, but per anti-outcome-bias reminders, this does not elevate process ratings. The resolution was heavily NPC-driven throughout.

---