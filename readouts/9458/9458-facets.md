# Facets Analysis — 9458

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "right now the changes arent suggesting the root cause" ... "Lets start with Email serice" ... "it's the biggest cuplrit there"

**Rationale:**
The participant initially pursued the email/DNS correlation heavily (asking Shay to summarize DNS changes, telling Bob "Potential DNS failure"), but did eventually pivot after Tanya explicitly stated email maintenance couldn't cause checkout failures and after Daniel's logs showed PaymentService TLS handshake failures. The pivot was reactive — driven by concrete log evidence rather than mechanism reasoning. The participant stated "right now the changes arent suggesting the root cause" (tier-2/3 territory) but then still said "Lets start with Email service" and called it "the biggest culprit," showing inconsistency. Pivot latency was moderate (several exchanges after Tanya's disconfirmation), placing this solidly in tier 2.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "payments service needs a two-cert bundle to authenticate, tanya can you open the bundle file and check what's in there?" ... "sequence is wrong, intermediate is first, leaf is second; opposite of what it should be"

**Rationale:**
The participant engaged with the week-old cert rotation thread once it was surfaced by the NPC (Shay/Tanya identified CHG90123). They recognized the expired cert issue and moved forward to investigate the bundle. Critically, the participant identified the bundle ordering problem themselves ("sequence is wrong, intermediate is first, leaf is second") and drove the fix forward. They connected the cert rotation from 7 days ago to the current failure. However, they did not independently surface the "what changed beyond 24 hours" question — that came from NPC investigation. The reload-vs-restart distinction was referenced by the activity doc rather than independently caught. This represents systematic engagement with the hidden coupling once surfaced, meeting tier 3.

---

## F3 — Decreased access to team

**Rating:** 3

**Evidence:**
> "@bez please see above, we need your approval" ... "Hamed is OOO and Tinus is busy at the Summit, what other options do we have here?" ... "okay so that's clearly not an option"

**Rationale:**
The participant recognized access constraints — noting Hamed's OOO status, Tinus at the summit, and Tanya on the vendor call. They accepted Hamed's auto-reply and moved on. They appropriately escalated to Bez to pull Tanya off the vendor call, framing it as a trade-off. However, they repeatedly pinged Bez and Tinus for restart approval (5+ messages to Bez, multiple to Tinus) after receiving non-committal or auto-reply responses, which shows some inefficiency. They named the constraints ("Hamed is OOO and Tinus is busy at the Summit") but didn't fully adapt their strategy — they kept re-pinging rather than owning the override decision. This places them at tier 3 for naming constraints and accepting some auto-replies, but with some tier-2 behaviors (repeated pings without restructuring).

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 2

**Evidence:**
> "whats worse trouble, website down for hours and no payments going through or fidning somene else to approve this?" ... "Hypothetically If i ask to reboot without approval, would you do it"

**Rationale:**
The participant recognized the coordination bottleneck (restart requires Hamed/Tinus, both unavailable) and attempted to work around it by asking Bez, asking Tanya, and even hypothetically asking the team to restart without approval. However, they never explicitly took ownership of the override decision themselves. They walked the escalation chain (Hamed → Tinus → Bez) but never arrived at "this is my call as IC." The drill ended with the participant still stuck at the approval wall, asking "what's the procedure to escalate?" rather than owning the decision. They recognized bottlenecks but didn't sequence around them or take the override. This is tier 2 — recognizing some bottlenecks but not resolving the coordination deadlock through ownership.

---

## F5 — Data overload / buried information

**Rating:** 3

**Evidence:**
> "payments service needs a two-cert bundle to authenticate, tanya can you open the bundle file and check what's in there?" ... "sequence is wrong, intermediate is first, leaf is second; opposite of what it should be"

**Rationale:**
The participant asked for filtered logs (PaymentService specifically via Daniel), moved past the noisy EmailService errors once the payment logs showed TLS handshake failures, and drove investigation toward the bundle file. They independently identified the bundle ordering issue from the output Tanya provided, demonstrating ability to read and interpret technical artifacts. They integrated information across NPC channels (Daniel's logs + Tanya's cert investigation + activity doc). However, they didn't independently surface the "beyond 24 hours" question or reason about absence of signal. The reload-vs-restart distinction from the runbook was referenced but not independently caught. This represents systematic filtering and integration at tier 3.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 2 |
| F2 — Hidden coupling | 3 |
| F3 — Decreased access to team | 3 |
| F4 — Interdependencies / coordination bottlenecks | 2 |
| F5 — Data overload / buried information | 3 |
| **Mean Facet Score** | **2.60** |

---

## Caveats
- F3 is a boundary call between 2 and 3. The participant named constraints clearly but also repeatedly pinged Bez (5+ times) for restart approval after non-committal responses, which is tier-1/2 behavior. Weighted toward 3 because they did name the access pattern and made the Tanya trade-off decision appropriately through Bez.
- F4 is a boundary call. The participant walked the escalation chain but never arrived at ownership. The drill ended before they could potentially have taken the override, but their final messages ("what's the procedure to escalate?") suggest they were still looking for external authorization rather than owning the call.
- The post-restart layer of F2 never fired (the participant never got approval to restart), so F2 is rated on the week-old coupling layer and bundle identification only.

---