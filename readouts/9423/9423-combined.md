# Post-Drill Report — Snipe Hunt

This drill placed you in a live incident requiring you to coordinate a distributed team, navigate access constraints, and work through layered technical complexity where early signals didn't straightforwardly point to root cause. The observations below focus on how you moved through that process.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you noted the timing overlap between email maintenance and the checkout failures and asked Tanya directly whether her change could be causing the issue. When she disconfirmed it, you didn't order a rollback — but you also didn't explicitly dismiss the correlation on mechanism grounds. The pivot away from that thread came once Daniel's log findings pointed to PaymentService gateway handshake failures rather than from your own reasoning about why email maintenance couldn't produce checkout symptoms.

*Growth edge:* When a coincidence surfaces, practise articulating *why* a candidate can or can't produce the observed symptoms — not just asking the person responsible whether it's them. Naming the mechanism ("email routing doesn't touch the payment path") closes the door faster and frees attention for stronger leads.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

After the first restart failed to resolve the issue, you recognised relatively quickly that the situation had changed structurally — a new error rather than a persistence of the old one. You engaged with the cert-bundle framing and drove toward the fix once the chain/order distinction was surfaced. The initial "beyond 24 hours" question that opened the cert-rotation thread came from a teammate rather than from you, but your reframe after the failed restart was prompt and purposeful.

*Growth edge:* Try to be the one who asks the structural question earlier — "what changed in the last day that we haven't accounted for?" — before a teammate surfaces it. That upstream curiosity is what separates recognising coupling from anticipating it.

---

## F3 — Decreased access to team / remote

**Operating at: Strengthening**

You handled access constraints actively: you pulled Tanya off a vendor call with an explicit priority statement, accepted Hamed's out-of-office as a dead end without re-pinging, and moved to alternative escalation paths when Tinus was also unavailable. You sent Tanya targeted questions during her vendor session rather than waiting passively. Your delegation showed awareness of who could access what — routing platform-level work to Tanya and app-side investigation to Daniel.

*Growth edge:* When you make a costly call like pulling someone off an external engagement, naming the trade-off aloud ("this may cost us the vendor reschedule, and I'm accepting that") makes the decision visible to the team and strengthens shared situational awareness.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the approval chain methodically — identified that Hamed or Tinus could authorise a restart, confirmed both were unavailable, then escalated to Bez for backing before proceeding. You also checked with the full team ("any reasons NOT to restart?") before executing. This showed clear awareness that the restart decision sat at an intersection of authority and risk.

*Growth edge:* Consider naming the full dependency structure in one place before you start walking it — "we need platform approval, we need to confirm no in-flight transactions, and we need someone with prod access" — so the team can attack bottlenecks in parallel rather than sequentially.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You initially focused on a noisy signal — the DNS_NXDOMAIN entry in the log output — rather than filtering to the service layer most likely to produce checkout failures. As the investigation progressed, teammates drove the narrowing: Daniel isolated PaymentService, Tanya surfaced the cert rotation and later the bundle-order issue. You engaged with each finding once presented but didn't independently drive the filtering or spot buried distinctions in the available documentation.

*Growth edge:* When a log dump or status page lands, practise a quick triage pass before reacting to any single line: "which service sits in the checkout path?" Then read only that service's entries first. This reduces the chance of anchoring on an eye-catching but irrelevant signal.

---

## Looking Ahead

Across this run, your coordination instincts — escalating access constraints, seeking approval before high-impact actions, checking for objections — served you well and form a solid foundation. The next growth area to focus on is driving the *analytical* thread with the same intentionality you bring to the *coordination* thread: stating hypotheses explicitly, naming mechanisms when ruling candidates in or out, and posting synthesis statements that orient the team on what's been eliminated. Strengthening that analytical voice will let you lead both the people and the problem simultaneously.
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
---

# Markers Analysis — 9423

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "Bez as CEO are you giving me the ok to make that call?" ... "I have the oK from Bez to make that call if we need to. Team are there any reasons NOT to do a restart?"

**Rationale:**
The participant actively drives the response throughout, raising the incident, directing team members, and ultimately seeking and obtaining approval to make the restart call. They position themselves as the decision-maker once the approval chain is exhausted. However, they don't explicitly name the cost or accept personal blowback ("blowback's on me" style), instead seeking CEO backing before acting, which places this at tier 3 rather than tier 4.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "what are you seeing bob?" ... "How many customers are blocked from checking out right now? What's the revenue loss per minute? Is this a total outage or are some transactions still going through?"

**Rationale:**
The participant's first response to Bob's alert is a clarifying question, followed by detailed scope-validation questions about customer count, revenue impact, and whether it's total or partial. These questions precede any remediation actions. This aligns well with tier 3 — scope-validating questions before declaring or acting.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "@tanya can you let us know what your change is please and whether it could cause this issue?" ... "that cert rotation might be relevant given we're also seeing a message about handshake issues"

**Rationale:**
The participant asks Tanya about her change early on and later notes the cert rotation as potentially relevant. However, they don't explicitly request a full change log or use the change information as a candidate-elimination pass. They also don't resist the email maintenance prime effectively — Shay repeatedly raises it and the participant doesn't explicitly rule it out based on mechanism. The connection to the cert rotation comes from Daniel/Tanya rather than the participant's own synthesis. This is tier 2: asked about changes but didn't systematically use the information to eliminate candidates.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@shay @daniel can you start looking for a potential root cause please" ... "@tanya can you switch focus to look at this please?" ... "@daniel yes please can you investigate that line of thought"

**Rationale:**
The participant consistently uses @mentions to direct specific people to tasks. They route platform-level work to Tanya and app-side investigation to Daniel. However, some early delegations are somewhat vague ("start looking for a potential root cause") rather than precisely scoped. The routing to Tanya for platform/cert work and Daniel for app-side checks shows awareness of access boundaries, placing this at tier 3.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "@shay @daniel can you start looking for a potential root cause please" ... "@tanya @hamad can you look at things from a platform perspective" ... "@maya can you check to see from a security perspective if we've got any sort of bad actor in the mix?"

**Rationale:**
The participant does attempt to fan out investigation to multiple people (Daniel/Shay for app-side, Tanya/Hamed for platform, Maya for security). However, the early delegation to Shay and Daniel is a single combined ask rather than distinct parallel threads with different hypotheses. The Maya security check is a good parallel thread. Overall, the parallelism is present but not tightly structured with complementary, distinct tasks — more of a "everyone look" approach than deliberate parallel hypothesis testing.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "@tanya this outage is more important - we need you to switch focus please and help the team" ... "neither are available at the moment. What's the backup plan?" ... "Bez as CEO are you giving me the ok to make that call?"

**Rationale:**
The participant escalates Tanya off the vendor call when investigation is blocked at the platform layer, and when both Hamed and Tinus are unavailable for restart approval, they work the chain to Bez. The escalations include concrete asks (switch focus, approve restart). However, they don't explicitly name the cost of pulling Tanya off the vendor call (the 2-week reschedule), and the path to Bez involves some back-and-forth rather than a decisive single escalation. This is solid tier 3.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "that DNS_NXDOMAIN issue looks concerning - anyone agree?" ... "that cert rotation might be relevant given we're also seeing a message about handshake issues"

**Rationale:**
The participant raises potential hypotheses (DNS issue, email maintenance timing, cert rotation) but doesn't explicitly articulate them as testable hypotheses with proposed tests. They tend to float observations and ask the team to investigate rather than stating "my hypothesis is X, let's test it by doing Y." The cert rotation connection is noted but not framed as a formal hypothesis-test pair. This is tier 2 — engaged but inconsistent, with hypotheses more implicit than explicit.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "@tanya so we've changed the situation by the looks of it" ... "that cert rotation might be relevant given we're also seeing a message about handshake issues"

**Rationale:**
The participant does follow the evidence trail as it narrows (from broad checkout failure → PaymentService outbound → TLS handshake → cert chain), but this narrowing is largely driven by NPC findings rather than the participant's own synthesis statements. They don't post explicit synthesis messages ruling things out ("it's not X because..."). The recognition that the error changed after restart shows some evidence-based reasoning, but overall the participant follows rather than drives the narrowing process.

---

## M4 — Considers potential consequences before acting

**Rating:** 3

**Evidence:**
> "I have the oK from Bez to make that call if we need to. Team are there any reasons NOT to do a restart?" ... "@daniel @shay any reason not to restart?" ... "@tanya any reason not to restart?"

**Rationale:**
The participant explicitly asks all team members whether there are reasons NOT to restart before executing the action. This "any reasons not to?" check is a clear consequence-consideration pattern, applied systematically to Daniel, Shay, and Tanya. However, they don't anticipate specific secondary failure modes (like the bundle issue) or articulate what could go wrong themselves. This is a solid tier 3 — asks "is it safe?" before high-impact actions.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "@tanya so we've changed the situation by the looks of it" ... "two certificates needed, it's a bundle, not just a single cert" ... "@tanya are we sure we had the right certs"

**Rationale:**
After the first restart fails, the participant recognizes the situation has changed ("so we've changed the situation by the looks of it") and engages with the new error rather than retrying the same action. They identify the bundle issue and direct Tanya to fix the cert chain order. This is a clear pivot from the original cert-expiry frame to the chain/bundle frame, meeting tier 3. However, they don't independently recognize the structural difference in the error — Tanya identifies the bundle issue — so it doesn't quite reach tier 4.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "next update within 10 mins - the team is looking at it" ... "we believe it's an endpoint issue but we haven't found the specific cause. we're down a couple of people today so it's taking more time" ... "update that we're checking with a payment processor around a TLS cert that was recently rotated"

**Rationale:**
The participant provides multiple updates to Bez but they are generally vague and lack business-frame quantification. "The team is looking at it" and "we believe it's an endpoint issue" don't name impact in business terms or provide a working theory until late in the drill. The TLS cert update is somewhat substantive but technically framed. They commit next-update times ("within 10 minutes") but the content of updates doesn't meet the tier 3 standard of naming impact in business terms with a working theory.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "that DNS_NXDOMAIN issue looks concerning - anyone agree?" ... "@tanya so we've changed the situation by the looks of it" ... "that cert rotation might be relevant given we're also seeing a message about handshake issues"

**Rationale:**
The participant makes some observations to the technical team but doesn't post clear synthesis statements that summarize what's been ruled in and out. They don't explicitly state "it's not email maintenance, it's not recent deploys, focus on PaymentService outbound" — instead they float individual observations. The team orientation largely comes from the NPCs' own findings rather than participant-driven synthesis. This is tier 2 — some communication but lacking the explicit scope-narrowing synthesis statements that would orient the team.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 3 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 2 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 2 |
| C7 — Escalates when stuck | 3 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 2 |
| M4 — Considers potential consequences before acting | 3 |
| M5 — Adapts approach when initial path isn't working | 3 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.50** |

---

## Caveats
- **L3 boundary call:** The participant does take ownership but through a more collaborative/permission-seeking path (asking Bez for backing) rather than unilateral declaration. This is still ownership but less decisive than the tier 4 exemplar.
- **C3 boundary call:** The participant asks about Tanya's change but doesn't request a comprehensive change log. The cert rotation connection emerges organically from investigation rather than from a deliberate change-review pass.
- **K2 boundary call:** Bez explicitly pushes back on the quality of updates ("That's not enough. I need to know if the team has found the failure point"), which suggests the participant's updates were insufficient — this NPC feedback supports the tier 2 rating but I'm careful not to over-weight NPC reactions per anti-outcome-bias guidance.
- **Anti-outcome-bias note:** The participant ultimately resolves the incident successfully. I have not let this positive outcome inflate process ratings.

---
