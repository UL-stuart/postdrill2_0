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