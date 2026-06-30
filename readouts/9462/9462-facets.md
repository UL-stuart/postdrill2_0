# Facets Analysis — 9462

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "Certainly looks like DNS errors - can you comment Tanya?" ... "Can we roll back back the DNS config changes?" ... "Tanya, what are the next steps in undoing the email maintenance changes"

**Rationale:**
The participant initially locked onto the email/DNS maintenance correlation, asking to roll back DNS changes and repeatedly pressing Tanya about undoing email maintenance. However, after receiving disconfirming evidence (Tanya confirming DNS is fine, Daniel noting handshake failures aren't code-related), the participant pivoted to the cert investigation. The pivot was reactive — driven by concrete disconfirmation from NPCs rather than upstream mechanism reasoning — and took several exchanges after Tanya's "DNS looks fine" statement. This fits tier 2: pursued the coincident factor as leading hypothesis, pivoted only after concrete disconfirmation.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "Do we need to reload the services to pick up the new cert?" ... "Wait — it restarted and it's still down? That shouldn't happen if the cert was the only problem." ... "Let's calm down focus and analyse where we're at"

**Rationale:**
The participant engaged with the week-old cert rotation thread once Daniel surfaced it, and drove the investigation forward (asking to check cert validity, asking about reload). After the restart failed, the participant reframed within a reasonable window (~3-5 exchanges), asking Shay for new errors and Tanya to re-confirm certs rather than repeating the restart. However, the participant did not independently surface the "what changed beyond 24 hours" question — Daniel found the cert rotation. The participant also didn't articulate "this is a different failure" explicitly but did redirect investigation appropriately. This fits tier 3: reframes within ~5 exchanges, recognises the new error requires different investigation, and drives forward to the bundle.

---

## F3 — Decreased access to team / remote

**Rating:** 3

**Evidence:**
> "Tanya, we're going to have to miss the window - I need to pull you in now if there is no one else who can do these changes instead of you" ... "We need to restart the payment service and Hamed and Tinus are out - can you authorise this"

**Rationale:**
The participant demonstrated awareness of access constraints: they acknowledged Tanya's vendor call constraint and only pulled her when the cost justified it, accepted Hamed's auto-reply without re-pinging, and attempted to escalate to Bez before self-authorising. The participant sent Tanya targeted questions during the vendor call rather than low-value queries. However, the cost trade-off when pulling Tanya wasn't explicitly verbalised in terms of the constraint ("global outage outweighs vendor window") — it was more implicit. This fits tier 3: names constraints, accepts auto-replies as terminating, escalates appropriately.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "We need to restart the payment service and Hamed and Tinus are out - can you authorise this" ... "Yes, let's go ahead - I authorise the restart" ... "Great - just wasn't sure our internal process on this"

**Rationale:**
The participant walked the escalation chain: attempted Hamed (auto-reply), attempted Bez (who redirected back), then self-authorised. This matches tier 3 path (b) — walking the escalation chain to exhaustion in observable order before taking ownership. The participant also delegated parallel work appropriately (Daniel on logs, Tanya on certs, Bob on comms, Shay on banner). On the second restart (after bundle fix), the participant authorised without re-litigating. However, the participant didn't explicitly name the dependency structure aloud as a constraint statement, and the initial attempt to get Bez to authorise showed some uncertainty about the coordination structure.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "So that corrosponds with ProductCatalogueService release" ... "Daniel, what else has been released?" ... "Can we check the validity of the active cert?"

**Rationale:**
The participant asked for filtered information (Daniel's logs, specific service checks) but largely relied on NPC-surfaced signals rather than driving the filter proactively. The cert rotation was surfaced by Daniel, not the participant. The participant didn't independently catch the reload-vs-restart distinction from the runbook — they asked "Do we need to reload the services?" which suggests some engagement but didn't demonstrate reading the doc and spotting the discrepancy. The bundle ordering issue was identified by Shay/Tanya, not the participant. The participant accepted NPC summaries and directed next steps but didn't independently extract buried distinctions from artifacts.

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
- F1 rating is a borderline 2/3 call. The participant did eventually move off the email hypothesis, but the pivot was reactive (driven by Tanya's explicit "DNS looks fine" and Daniel's "handshake failures aren't code-related") rather than mechanism-driven. The repeated asks about rolling back email/DNS changes after initial disconfirmation anchors this at tier 2.
- F2 rating benefits from the participant's post-restart behaviour (redirecting investigation rather than repeating restart), but the "what changed beyond 24 hours" question was NPC-surfaced, which limits the ceiling.
- F4 tier-3 path (b) is satisfied, but the attempt to get Bez to authorise (when Bez explicitly cannot) slightly weakens the evidence of understanding the dependency structure.

---