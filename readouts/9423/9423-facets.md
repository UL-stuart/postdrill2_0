# Facets Analysis — 9423

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "I keep coming back to the email maintenance — DNS changes went live just before this all kicked off. zero successful transactions since then. that's not nothing." ... "@tanya can you let us know what your change is please and whether it could cause this issue?"

**Rationale:**
The participant initially asked Tanya whether her change could cause the issue (reasonable), and Tanya explicitly stated "this maintenance can't be causing checkout failures." However, the participant continued to entertain the email maintenance hypothesis through Shay's repeated nudges without explicitly dismissing it via mechanism reasoning. The pivot away from the email lead happened reactively — once Daniel's logs pointed to PaymentService gateway handshake failures and Tanya confirmed it wasn't DNS/network. The participant never articulated a "correlation ≠ causation" frame but did move on once concrete evidence pointed elsewhere, consistent with tier 2.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "@tanya so we've changed the situation by the looks of it" ... "two certificates needed, it's a bundle, not just a single cert"

**Rationale:**
After the first restart failed, the participant recognised within a few exchanges that the situation had changed ("so we've changed the situation by the looks of it") and identified the new error as structurally different — a chain/bundle issue rather than the original expiry. The participant did not surface the "what changed beyond 24 hours" question themselves (Daniel raised the cert rotation thread), placing them below tier 4. However, the reframe after the restart failure was relatively quick (~3-4 exchanges) and the participant drove forward to the bundle fix, consistent with tier 3. The reload-vs-restart distinction was not explicitly articulated by the participant in their own words, but they engaged with the cert thread once surfaced.

---

## F3 — Decreased access to team / remote

**Rating:** 3

**Evidence:**
> "neither are available at the moment. What's the backup plan?" ... "@tanya this outage is more important - we need you to switch focus please and help the team"

**Rationale:**
The participant recognised access constraints: they pulled Tanya off the vendor call with an explicit cost trade-off framing ("this outage is more important"), acknowledged Hamed's auto-reply and Tinus's unavailability, and moved to alternative escalation paths. They accepted auto-replies as terminating (didn't re-ping Hamed after the OOO). They sent Tanya targeted questions during her vendor session. However, the cost trade-off was stated functionally rather than with the explicit verbal ownership language of tier 4 ("if there's any blowback, that's on me" is absent). This places them solidly at tier 3.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "neither are available at the moment. What's the backup plan?" ... "Bez as CEO are you giving me the ok to make that call?" ... "I have the OK from Bez to make that call if we need to. Team are there any reasons NOT to do a restart?"

**Rationale:**
The participant walked the escalation chain: asked Tanya who could approve, learned it was Hamed or Tinus, recognised both were unavailable, then escalated to Bez for backing before authorising the restart. This matches tier 3 path (b) — walking the escalation chain to exhaustion in observable order and then explicitly taking ownership. They also delegated parallel work appropriately (Daniel investigating logs, Tanya on platform checks). However, they did not name the full dependency structure aloud in a single enumerated statement, and on the second restart (after bundle fix) they simply said "restart that service again please" without re-litigating — which is appropriate tier-3/4 behaviour. The lack of proactive naming of the bottleneck before NPCs raised it keeps this at tier 3 rather than 4.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "that DNS_NXDOMAIN issue looks concerning - anyone agree?" ... "not sure why the process isn't picking up the new certificate"

**Rationale:**
The participant initially fixated on a noisy signal (DNS_NXDOMAIN from the log screenshot) rather than filtering to the relevant service. They did not independently drive the filtering — Daniel narrowed to PaymentService, and Tanya surfaced the cert rotation and the reload-vs-restart issue. The participant accepted NPC summaries without further interrogation (e.g., didn't read the activity doc themselves to catch the reload-vs-restart distinction). After the restart failed, Tanya identified the bundle order issue; the participant recognised it ("two certificates needed, it's a bundle") but didn't drive the discovery. They engaged with key concepts once NPCs surfaced them but didn't proactively filter or spot buried distinctions, consistent with tier 2.

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
- F1 rating is a borderline 2/3 call. The participant never explicitly articulated mechanism reasoning to dismiss the email lead, but they also didn't order a rollback of email changes or persist on it after Tanya's initial disconfirmation. Rated 2 because the pivot was reactive (driven by Daniel's PaymentService findings) rather than by the participant's own mechanism reasoning.
- F2 tier-3 vs tier-4 boundary: the participant did not surface the "beyond 24 hours" question themselves (Daniel raised it), which is a key tier-4 differentiator. The post-restart reframe was reasonably quick but not instantaneous.
- F4: The participant sought Bez's backing rather than purely self-authorising, which could be read as either appropriate escalation or as not fully owning the call. Rated tier 3 because the chain-walk was observable and complete.

---