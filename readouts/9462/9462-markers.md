---

# Markers Analysis — 9462

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "Yes, let's go ahead - I authorise the restart"

**Rationale:**
The participant takes ownership of the response by declaring the incident, directing team members, making the restart authorization call when both Hamed and Tinus were unavailable, and driving the investigation forward. However, they initially attempted to defer the restart decision to Bez ("I'll get confirmation from Bez") before being told it was their call. They then owned it, but the initial deferral prevents a tier 4 rating.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "Can you be more specific Bob" ... "How many customers are blocked from checkout right now? What's the revenue loss per minute? Is this a total outage or are some transactions still going through?"

**Rationale:**
The participant's first response to Bob's vague complaint is a clarifying question, followed by detailed scope-validation questions about customer count, revenue impact, and whether it's total or partial. They gather information before declaring the incident or ordering actions. This meets the novice expectation of scope-validating before acting.

---

## C3 — Checks for recent changes

**Rating:** 3

**Evidence:**
> "Daniel, what else has been released?" ... "So that corrosponds with ProductCatalogueService release"

**Rationale:**
The participant explicitly asks Daniel for recent releases and receives the full change log. They attempt to correlate timing with the ProductCatalogueService release. Later, they also consider the email maintenance timing. However, they don't explicitly use the change log as an elimination tool (e.g., "none of these touch the gateway"). They do eventually move past the deploys hypothesis when evidence points to certs, but the initial use of the change log was more correlational than eliminative, placing this at tier 3 rather than 4.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "Tanya, can you comment on your change" ... "Yes please Daniel" ... "Bob - please get some customer comms up about the issue" ... "Daniel, monitor the logs to see if this takes effect" ... "Shay, get ready to remove the maintenance banner"

**Rationale:**
The participant consistently delegates to specific named individuals throughout the drill. They route platform/cert tasks to Tanya, log analysis to Daniel, customer comms to Bob, and banner management to Shay. The routing generally matches NPC capabilities. This meets tier 3 expectations of naming specific people for specific tasks.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "Problem worth workign several angles in parallel as this is SEV-1" ... "Anything else we want to check folks in parallel?"

**Rationale:**
The participant explicitly states the desire to work parallel threads and asks about parallel checks near the end. However, the actual investigation is largely sequential — they pursue the email maintenance/DNS hypothesis, then move to logs, then to certs. The statement about parallel work is aspirational rather than enacted through concurrent delegations. The investigation mostly proceeds one thread at a time with occasional overlap.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "Tanya, we're going to have to miss the window - I need to pull you in now if there is no one else who can do these changes instead of you"

**Rationale:**
The participant escalates by pulling Tanya off the vendor call when the investigation is blocked at the platform layer, acknowledging the cost ("miss the window"). They also attempt to escalate the restart approval through Bez when Hamed and Tinus are unavailable. The escalations are concrete and timely. However, they don't explicitly name the full cost (2-week reschedule) with the same directness as a tier 4 response would.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "Certainly looks like DNS errors - can you comment Tanya?" ... "Daniel, Shay, do we think the DNS is the most likely problem and needs fixed. Any other hypotheses?"

**Rationale:**
The participant forms a DNS/email-maintenance hypothesis and asks the team to comment on it, which constitutes a test. However, the hypothesis formation is somewhat passive — they ask the team "Has anyone got any hypotheses?" rather than articulating their own clearly. They also ask "Any other hypotheses?" which shows openness but not strong hypothesis-driven investigation. The pivot to certs happens through team guidance rather than the participant's own mechanism-testing. This is inconsistent engagement with hypothesis formation.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "So that corrosponds with ProductCatalogueService release" ... "Is the one in process expired?"

**Rationale:**
The participant makes some narrowing observations (correlating timing with ProductCatalogueService, identifying the expired cert in process). However, they don't produce synthesis statements that combine multiple pieces of evidence to rule things out. Much of the narrowing is done by the NPCs (Daniel identifying PaymentService as the failing service, Tanya ruling out DNS). The participant follows the evidence trail but doesn't actively synthesize or name what's been eliminated.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "Daniel, should we also roll back the services around the time of the errors started. Any implications?"

**Rationale:**
The participant asks Daniel about implications of rolling back services, which shows some consequence-awareness. They also ask Tanya "if there is no one else who can do these changes instead of you" before pulling her off the vendor call. However, they don't check whether the cert bundle on disk is correct before ordering the restart, and they don't anticipate the secondary failure. The consequence-checking is present but inconsistent.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "Let's calm down focus and analyse where we're at" ... "Shay, what errors are we seeing - why has the service not come up" ... "Tanya, can you confirm the certs again"

**Rationale:**
After the first restart fails, the participant doesn't repeat the same action. They redirect investigation by asking Shay for current errors and Tanya to re-confirm certs. They adapt to the new information about the certificate bundle needing two certs and proceed to fix the bundle order. They don't get stuck in the original frame. This meets tier 3 expectations of redirecting after a failed action, though they don't independently recognize the structural difference in the new error (the team surfaces the bundle issue).

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "Still assessing Bez - I'll give you an update in 5 minutes" ... "We're focusing on getting the site up - top priority and all focused on that. We can review post mortem the cost. We're anlysing now and I'll come back with an update in 5 minutes" ... "We're working a likely theory - hopefully resolved within 10 minutes"

**Rationale:**
The participant provides multiple updates to Bez but they are largely vague reassurances without substantive content. They don't quantify impact in business terms, don't share the working theory, and don't name what's affected. "We're focusing on getting the site up" and "We're working a likely theory" lack the specificity expected at tier 3. The committed time frames are good, but the content is thin.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "Priority is to get the site stable" ... "Let's calm down focus and analyse where we're at" ... "Anything else we want to check folks in parallel?"

**Rationale:**
The participant provides general direction to the technical team but rarely synthesizes the current state of knowledge. They don't post messages like "OK, we've ruled out DNS, ruled out recent deploys, the issue is at the PaymentService outbound TLS handshake." Most of their technical channel messages are questions or brief directives rather than synthesis statements that orient the team. The NPCs do most of the synthesis work (Daniel and Tanya narrate findings), and the participant acknowledges rather than reframes for the team.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 3 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 3 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 2 |
| C7 — Escalates when stuck | 3 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 2 |
| M4 — Considers potential consequences before acting | 2 |
| M5 — Adapts approach when initial path isn't working | 3 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.50** |

---

## Caveats
- L3: The participant's initial attempt to defer the restart decision to Bez is a borderline call between 2 and 3. Rated 3 because they ultimately owned the decision promptly once Bez clarified it was their call, and they drove the response throughout.
- M5: Borderline between 2 and 3. The participant adapts after the first restart fails, but the adaptation is largely guided by NPC information rather than independent reframing. Rated 3 because they don't repeat the failed action and do redirect investigation.
- K2: The participant commits next-update times (good) but the content of updates is consistently thin. This is a clear tier 2 — engaged but not meeting the novice expectation of substantive business-framed updates.

---