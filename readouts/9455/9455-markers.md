---

# Markers Analysis — 9455

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "We need to perform a reboot of the payments service and Hamed and Tinus are unavailable. Its the teams general consensus that this is the next logical step and we are proceeding"

**Rationale:**
The participant drives the response throughout, directing team members, making decisions, and ultimately pushing through the restart override by seeking Bez's executive backing. They use "we are proceeding" framing and inform the business of the decision. However, they don't explicitly say "I authorize" or "blowback's on me" — they frame it as team consensus and seek Bez's approval rather than taking personal ownership of the override decision outright.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "How many customers are blocked from checking out? What's the estimated revenue loss per minute right now?" and "Is this a total checkout outage or are any transactions getting through at all? I need clarity on scope."

**Rationale:**
The participant's early moves include scope-validating questions about the extent of the outage, whether any transactions are getting through, and revenue impact. They ask "What are they saying bob" immediately after the alert. These are clarifying questions before taking remediation action, fitting the tier 3 expectation of scope-validation before declaring or acting.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "What would the email maintenance do" and "Can we check the TLS cert on the payment service?"

**Rationale:**
The participant asks about the email maintenance and its potential impact, and later asks about the cert rotation. However, they don't explicitly request a change log or systematically review recent deployments. When Daniel mentions the cert rotation from 7 days ago, the participant notes "although that was 7 days ago, we've been working fine post that change?" — showing some reasoning. But they also say "Okay, lets start rolling back the change anyways and see if it improves" without articulating a clear mechanism connecting the cert rotation to the current failure. They engaged with changes but didn't use the information as a rigorous elimination pass.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@daniel can we look into what might be causing the issues on the app side of things please" and "Shay, can you continue to look for any clues as to the root cause" and "Bob, would you mind helping gather some revenue information for Bez"

**Rationale:**
The participant consistently names specific people for specific tasks — Daniel for app-side investigation, Tanya for platform/cert work, Shay for root cause analysis, Bob for revenue/customer comms. The routing is generally appropriate (Tanya for platform, Daniel for logs). However, some asks are somewhat vague ("look for any clues") rather than tightly scoped, which keeps this at tier 3 rather than 4.

---

## C6 — Runs parallel investigation threads

**Rating:** 3

**Evidence:**
> "Whilst Tanya is working on the emails, Shay and Daniel, can you both keep looking into the errors to try and figure out the root cause?"

**Rationale:**
The participant runs multiple threads concurrently — Tanya on email maintenance, Daniel on app-side logs, Shay on root cause, Bob on customer/revenue data. They explicitly acknowledge parallel work ("Whilst Tanya is working on the emails..."). Multiple distinct tasks are delegated to different people in close temporal proximity, meeting the tier 3 expectation of simultaneous investigation threads.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "Hi Bez, please can you provide executive approval to perform measures to hopefully fix the issue" and the earlier decision to pull Tanya off the vendor call: "then if we can pause the vendor migration and it won't have any major impact and it might help restore services, lets pause"

**Rationale:**
The participant escalates twice: pulling Tanya off the vendor call (after weighing the cost) and seeking Bez's executive backing when Hamed and Tinus are unavailable. The escalation to Bez includes context about what's needed. However, the participant took several messages and back-and-forth before committing to pull Tanya, and the Bez escalation came after multiple failed attempts to get Tanya to proceed without sign-off. The escalations are concrete but somewhat delayed.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "Okay, lets start rolling back the change anyways and see if it improves" and "is that expected, for it to say expired?"

**Rationale:**
The participant doesn't explicitly articulate hypotheses before testing them. They follow leads (email maintenance, cert rotation) but don't frame them as named hypotheses with proposed tests. The rollback of the cert change is an implicit test, but the participant doesn't articulate "my hypothesis is X, let's test by doing Y." They react to evidence as it arrives rather than proactively forming and testing theories. This is inconsistent engagement — tier 2.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "To summarise: We seeing cascading failures across different services. Lets go back to the first failure we see in the logs and check what was changed there or what could be causing other services to fail"

**Rationale:**
The participant makes one synthesis attempt ("go back to the first failure") but it's vague and doesn't explicitly name what's been ruled out. They don't produce clear elimination statements like "it's not email maintenance because X, it's not recent deploys because Y." When Daniel narrows to PaymentService outbound failures, the participant follows the lead but doesn't synthesize the evidence themselves. Most narrowing is done by NPCs rather than the participant articulating scope reduction.

---

## M4 — Considers potential consequences before acting

**Rating:** 3

**Evidence:**
> "Whats the impact of losing the canary rollout?" and "Do we need to migrate or can we postpone these 2 weeks" and "I understand, but if we pause and lose our slot, what functionality with we lose?"

**Rationale:**
The participant asks multiple consequence-weighing questions before pulling Tanya off the vendor call — asking about the impact of losing the rollout window, whether it can be postponed, and what functionality would be lost. This shows deliberate consideration of side effects before acting. However, they don't show similar caution before the restart (no "is it safe?" check) or consider that the restart might expose a secondary issue. Tier 3 for the Tanya decision; less evident elsewhere.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "Tanya and Daniel, lets keep investigating, what do we think could be causing the issue" (after first restart failed) and later engaging with the bundle discovery: "Tanya and Daniel, lets fix and push and test again as soon as we can"

**Rationale:**
After the first restart fails, the participant doesn't retry the same action — they redirect investigation ("lets keep investigating, what do we think could be causing the issue"). When the bundle order issue is identified, they pivot to fixing it. They don't get stuck in a loop. However, the pivot is somewhat passive — they ask the team what could be causing it rather than proposing a new direction themselves. They adapt but don't reframe the problem independently.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "From what we know so far, it appears to be a total outage. No trasactions going through team are still investigating" and "We do not have this information at present and therefore, cannot give an ETA. We are still trying to identify the root cause"

**Rationale:**
The participant's business updates are mostly reactive (responding to Bez's demands) and lack substance. They state "total outage" and "still investigating" but don't provide working theories, committed next-update times, or quantified impact in their own updates (Bob provides the revenue numbers separately). Later updates ("We are continuing to investigate and are currently looking into potential certificate issues") are slightly better but still thin. No proactive cadence is established.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "To summarise: We seeing cascading failures across different services. Lets go back to the first failure we see in the logs and check what was changed there or what could be causing other services to fail"

**Rationale:**
The participant makes one synthesis attempt for the technical team, but it's vague ("cascading failures across different services") and doesn't name what's been ruled out or ruled in. They don't post clear scope statements like "it's not email, it's not deploys, focus is PaymentService outbound." Most of their technical channel messages are questions or delegation rather than synthesis. The team gets direction but not a shared mental model from the IC.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 3 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 2 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 3 |
| C7 — Escalates when stuck | 3 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 2 |
| M4 — Considers potential consequences before acting | 3 |
| M5 — Adapts approach when initial path isn't working | 3 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.58** |

---

## Caveats
- L3 is a borderline 3/2 call. The participant drives the response but routes the override decision through Bez rather than taking it personally. Rated 3 because they still push the decision forward and inform the business, even if they don't use explicit "I authorize" language.
- M4 is strong on the Tanya decision but absent on the restart decision — rated 3 based on the Tanya evidence being a clear tier-3 manifestation.
- K2 could be argued as borderline 1/2; rated 2 because the participant does provide some scope information ("total outage, no transactions") even if it lacks business framing, theory, or committed cadence.

---