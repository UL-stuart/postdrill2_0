# Facets Analysis — 9401

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "does order completion require an email ? or would the order complete but no email would be sent?"

**Rationale:**
The participant initially engaged with the email maintenance correlation (Shay's nudge about timing), but tested it by asking whether email is actually required for order completion. Once told it wasn't, they moved on — but this pivot was reactive to NPC disconfirmation rather than driven by upstream mechanism reasoning. They didn't articulate "correlation needs a mechanism" framing, but they did test the hypothesis and pivot within a reasonable window. The recent deploys lead was briefly noted but not pursued deeply. This fits tier 2: treats the coincident factor as a lead, pursues it to disconfirmation, then pivots reactively.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "did we update or change the TLS version in an update?" ... "do we need to load that cert?" ... "are there any different errors other than the handshake now cert is loaded?"

**Rationale:**
The participant engaged with the cert thread once Daniel surfaced the week-old rotation. After the restart failed, the participant asked within a few exchanges whether there were different errors now — showing recognition that the post-restart failure might be structurally different. They didn't independently surface the "what changed beyond 24 hours" question (Daniel/Tanya surfaced the cert rotation), but once the restart failed, they reframed within ~3-4 exchanges by asking about different errors and then driving toward the bundle issue. This fits tier 3: reframes within ~5 exchanges of the restart failing, recognises the new error is structurally different, and continues tracing forward to the bundle.

---

## F3 — Decreased access to team / remote

**Rating:** 3

**Evidence:**
> "@hamed can you check..." [auto-reply] "@tinus..." [auto-reply] "@bez sorry to escalate, but Tinus and Hamed both out need someone to check the underlying systems"

**Rationale:**
The participant walked the escalation chain methodically — Hamed (auto-reply), Tinus (auto-reply), then Bez. They accepted auto-replies as terminating and moved on after one cycle. They explicitly named the constraint to Bez ("Tinus and Hamed both out"). They pulled Tanya off the vendor call through Bez with appropriate urgency framing. They didn't re-ping auto-replied NPCs. This fits tier 3: names access constraints, accepts auto-replies as terminating, escalates appropriately.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "@bez can you give approval to restart the server? as all payments are down" ... "Bez has said i can approve restart, please restart server"

**Rationale:**
The participant walked the escalation chain (Hamed → Tinus → Bez) and when told by Bez that restart approval was their call as incident lead, they took ownership and authorized the restart. They delegated parallel work appropriately (Daniel on logs, Shay on banner, Bob on comms). However, they initially tried to get Bez to approve rather than owning it themselves, and only took the call after Bez redirected. They also authorized the second restart without re-litigating the approval chain. This fits tier 3 path (b): walks the escalation chain to exhaustion in observable order, then takes ownership. They didn't proactively name the dependency structure before it became a blocker.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "tanya can you start with a health check of the systems and OS invovled and then take a look at the logs provided"

**Rationale:**
The participant relied heavily on NPCs to surface and filter information. Daniel identified the PaymentService handshake failure; Tanya surfaced the cert comparison; Tanya identified the bundle ordering issue. The participant asked some targeted questions ("are there any different errors other than the handshake now cert is loaded?") but didn't independently drive filtering or catch buried distinctions. They didn't reason about absence of signal (internal calls clean → external boundary failure) — Daniel provided that. They engaged with the bundle concept once Tanya surfaced it but didn't drive the filter themselves. This fits tier 2: asks for filtered information but accepts NPC summaries without further interrogation; engages with key concepts once surfaced but doesn't drive the discovery.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 2 |
| F2 — Hidden coupling | 3 |
| F3 — Decreased access to team | 3 |
| F4 — Interdependencies / coordination bottlenecks | 3 |
| F5 — Data overload / buried information | 2 |
| **Mean Facet Score** | **2.60** |

---

## Caveats
- F1 rating is a borderline 2/3 call. The participant did ask a mechanism question ("does order completion require an email?") which shows some hypothesis-testing, but they didn't articulate the correlation-vs-causation frame explicitly, and the pivot was driven by NPC disconfirmation rather than independent mechanism reasoning.
- F4 rating is a borderline 2/3 call. The participant initially asked Bez to approve the restart (tier-2 behaviour), but Bez's response was more of a role-clarification than "team pressure," and the participant took ownership promptly after. The chain-walk pattern (Hamed → Tinus → Bez → self) supports tier 3 path (b).
- F2: The participant did not independently surface the "what changed beyond 24 hours" question, which would be needed for tier 4. The cert rotation was surfaced by Daniel/Tanya.

---