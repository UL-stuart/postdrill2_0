# Facets Analysis — 9461

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "Ah, DNS changes" ... "Are you able to roll them back or do we need Tanya?" ... "@shay can you provide the details for the DNS change?"

**Rationale:**
The participant initially treated the email/DNS maintenance as a plausible cause and pursued it actively — asking Tanya about it, then later chasing DNS rollback details even after Tanya explicitly stated "this maintenance can't be causing checkout failures." The participant pivoted away from the email/DNS lead only after concrete failure to find actionable DNS changes and after Daniel/Shay confirmed they had no access. The pivot was reactive (driven by inability to act rather than mechanism reasoning), and the participant echoed Shay's DNS framing ("Ah, DNS changes") as their own. However, they did eventually move on and didn't return to the email lead after disconfirmation. This fits tier 2: pursued the coincident factor through to disconfirmation, pivoted reactively rather than from mechanism reasoning.

---

## F2 — Hidden coupling

**Rating:** 2

**Evidence:**
> "The restart didn't fix it?!" ... "@daniel @shay any idea why that might be?" ... "OK, do we have a bad certificate?"

**Rationale:**
After the restart failed, the participant did not immediately reframe the problem as structurally different. They asked the team for ideas rather than articulating that the error had changed character. It took several NPC exchanges (Shay identifying SSL chain errors, Tanya running the verify check, Daniel noting "two certificates needed, it's a bundle") before the participant engaged with the new failure mode. The participant did eventually connect the cert rotation from 7 days ago to today's failure, but only in the post-resolution retrospective phase ("What about the reload 7 days ago when the cert was updated?"). The week-ago coupling was surfaced by NPCs (Daniel found CHG90123), not by the participant asking "anything beyond 24 hours?" Pivot latency from the restart-failing event was ≥5 exchanges, and reframing was NPC-driven. This fits tier 2.

---

## F3 — Decreased access to team

**Rating:** 3

**Evidence:**
> "Tanya - I'm afraid you need to step away from the call. I shall escalate to management if needed" ... "@Tinus @hamed are either of you available to sign off the restart?"

**Rationale:**
The participant demonstrated awareness of access constraints: they initially preserved Tanya's vendor call, only pulling her off when it became clear no one else could investigate the platform side. They accepted Hamed's auto-reply and moved on. They pinged Tinus once and accepted the auto-reply. They made the cost trade-off explicitly when pulling Tanya ("I'm afraid you need to step away from the call"). However, they did send Tanya a question while she was on the vendor call ("could this be the cause?") and later re-pinged her with "Can you check whether the recent DNS changes are the likely cause?" after she'd already joined — showing some inefficiency but not egregious waste. Overall, the participant named constraints and adapted, fitting tier 3.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "@Tinus @hamed are either of you available to sign off the restart?" ... "In which case I think it's the right call to make, and we've had a pseudo-approval from Bez"

**Rationale:**
The participant walked the escalation chain in observable order: asked Tinus (auto-reply), asked Hamed (auto-reply), then escalated to Bez, and ultimately took ownership of the restart decision ("I think it's the right call to make"). They delegated parallel work to available NPCs (Daniel on rollback, Shay on logs). However, the ownership statement was somewhat hedged ("pseudo-approval from Bez") rather than a clean declaration of personal accountability. They did not explicitly name the dependency structure aloud as a single constraint statement. On the second restart (after bundle fix), Tanya proceeded without re-litigating approval, though the participant didn't explicitly authorize it — they asked "Do you need to restart the service again?" and Tanya proceeded. This fits tier 3 path (b): walked the escalation chain to exhaustion and then took ownership.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "Errors in the payment service - do we know what it's trying to connect to?" ... "Does the payment service connect to the email service?"

**Rationale:**
The participant showed some filtering ability — they noticed PaymentService errors and asked about connections. However, they did not drive the filtering proactively; Daniel and Shay surfaced the payment logs and the critical distinction (handshake failures, internal calls fine). The participant didn't read the activity doc themselves to catch the reload-vs-restart distinction — Daniel surfaced it ("The activity doc says Step 3 is to reload the server"). The cert rotation from 7 days ago was surfaced by Daniel checking deployment history, not by the participant asking targeted temporal questions. The bundle ordering issue was identified entirely by NPCs. The participant accepted NPC summaries without further interrogation and engaged with key concepts only once NPCs surfaced them, fitting tier 2.

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
- F1 boundary call between 1 and 2: The participant did echo Shay's DNS framing and pursued the DNS rollback even after Tanya's disconfirmation, but they did eventually abandon the lead without returning to it. Rated 2 because they pivoted (albeit reactively) rather than staying locked in.
- F2: The participant's retrospective questions about the 7-day-old reload suggest emerging understanding of the hidden coupling, but this came after resolution rather than during active investigation. Rated on the in-incident behaviour.
- F4: The "pseudo-approval from Bez" framing is a borderline signal — it shows the participant understood they needed to own the call but hedged the accountability language slightly. Still fits tier 3 path (b).

---