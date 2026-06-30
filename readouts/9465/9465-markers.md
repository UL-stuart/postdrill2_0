---

# Markers Analysis — 9465

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "Hamed and Tinus are both not available and this is a P1 incident. I'm giving you the ok to restart the service"

**Rationale:**
The participant takes explicit ownership of the restart decision when both approvers are unavailable, directly authorizing Tanya to proceed. Throughout the drill, they direct the investigation, assign tasks, and make decisions. However, they don't explicitly name the personal cost or blowback risk ("that's on me"), which would elevate to tier 4.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "What's the issue @bob?" ... "Is it global @bob?" ... "How many customers are blocked from checking out? What's the revenue loss per minute right now?" ... "Is this a total outage? Can any customers get through checkout at all, or is everyone blocked?"

**Rationale:**
The participant's first moves after Bob's alert are scope-validating questions about the nature, geography, and extent of the issue. They ask about global scope, revenue impact, and whether it's a total outage before taking remediation actions. This aligns well with tier 3 expectations of gathering information before acting.

---

## C3 — Checks for recent changes

**Rating:** 3

**Evidence:**
> "Ok. The primary email provider hasn't been touched and is running fine with email confirmations going out. I would rule out email for now." ... "Correlation does not mean causation. Tanya wrote that email confirmations are fine."

**Rationale:**
The participant engages with the change-related information (email maintenance, recent deploys) and uses evidence to rule out the email maintenance as a cause. They explicitly state "Correlation does not mean causation" when Shay keeps pushing the email timing. They use the change log as an elimination tool rather than a rollback queue, which aligns with tier 3. However, they don't explicitly ask for a comprehensive change log themselves — the information comes from NPCs.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "What does the logs of the checkout service say @daniel?" ... "@tanya could the email maintenance be related?" ... "Check the gateway @tanya" ... "Then restart it @tanya" ... "Ok then let's remove the banner @shay"

**Rationale:**
The participant consistently names specific people for specific tasks throughout the drill. They route platform-level tasks to Tanya, app-side log checks to Daniel, and customer-facing tasks to Bob/Shay. The routing reflects understanding of access boundaries (Tanya for server/cert access, Daniel for logs). Tasks are generally well-matched to the right person.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "I would focus on the payment service for now. If that's now working, we can come back to the email service"

**Rationale:**
The participant works largely sequentially through the investigation — first email, then checkout logs, then payment service, then gateway. They explicitly state they'll focus on one thing at a time ("focus on the payment service for now"). There's little evidence of fanning out multiple distinct tasks to different people simultaneously. The investigation proceeds as a single thread rather than parallel threads.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "Ok, Hamed and Tinus are both not available. We need to pull tanya off the call" ... "@tanya please support us with the gateway failures"

**Rationale:**
When the investigation is blocked at the platform layer, the participant escalates by pulling Tanya off the vendor call. They also attempt to reach Hamed, and when that fails, they make the override decision for the restart. The escalation is concrete and action-oriented. However, they don't explicitly name the cost of pulling Tanya (the 2-week vendor window loss), which would push to tier 4.

---

## M2 — Forms and tests working hypotheses

**Rating:** 3

**Evidence:**
> "Ok. The primary email provider hasn't been touched and is running fine with email confirmations going out. I would rule out email for now. I see that the payment service is failing. Please check the logs of the payment service @daniel"

**Rationale:**
The participant forms hypotheses (email maintenance as cause, then payment service handshake failure, then expired certificate) and tests them sequentially. They explicitly rule out the email hypothesis based on evidence (confirmations still going out) and pivot to the payment service. They articulate the cert hypothesis ("Is it our SSL certificate?") and test it. This aligns with tier 3 — named hypotheses with proposed tests and pivots after disconfirmation.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 3

**Evidence:**
> "Correlation does not mean causation. Tanya wrote that email confirmations are fine." ... "I see handshake_error in the logs for the payment service. I would focus on that for now."

**Rationale:**
The participant uses evidence to narrow scope effectively. They rule out email maintenance using the evidence that confirmations are still working. They use the handshake_error in payment logs to focus investigation on PaymentService. They use the "all internal calls healthy, outbound failing" evidence to identify the platform layer as the issue. This is systematic narrowing using concrete evidence.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "Can we verify that payments is working before removing the banner @daniel @tanya?"

**Rationale:**
The participant shows consequence-awareness at the end (verifying before removing the banner), but earlier high-impact actions lack explicit consequence consideration. They don't name the cost of pulling Tanya off the vendor call (2-week delay). They order the first restart without checking the bundle on disk first. The "verify before removing banner" is a good practice but comes late and on a lower-stakes action. Overall, consequence-weighing is inconsistent.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "The old certificate is still loaded. Does it need a restart to load the new ones @tanya?" ... "The runbook mentions a bundle @tanya"

**Rationale:**
The participant adapts when the first restart fails. Rather than retrying the same action, they investigate further and identify the bundle ordering issue. They pivot from the email hypothesis to payment service, and from the expired cert to the bundle order. However, the bundle insight appears to come partly from NPC prompting (Shay mentions "the runbook mentions a bundle"), and the participant doesn't explicitly articulate the structural difference between the first failure (expiry) and the second (chain verification). This is solid tier 3 adaptation.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "Checkout is failing for all customers. We're gonna investigate. I'll come back to you in 10 min." ... "It seems to be an internal issue on the payment side. I'm working with the team to get it back online. We're a bit hindered by the absence of Tinus and Hamed"

**Rationale:**
The participant provides updates to Bez but they are largely generic — "we're investigating," "internal issue on the payment side." They commit a next-update time (10 min) but the updates lack quantified business impact, working theory, or ETA for resolution. The second update mentions being "hindered" but doesn't provide a credible timeline. No update is sent after the first restart fails. This is practicing-level communication.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 3

**Evidence:**
> "Ok. The primary email provider hasn't been touched and is running fine with email confirmations going out. I would rule out email for now. I see that the payment service is failing. Please check the logs of the payment service @daniel" ... "If every outbound request fails, we need platforms help"

**Rationale:**
The participant provides synthesis statements to the technical team at key decision points — ruling out email, focusing on payment service, identifying the need for platform help. They communicate what's been ruled out ("I would rule out email for now") and what the current focus is. These statements help orient the team. However, they could be more comprehensive in naming all ruled-out paths simultaneously.

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
| M2 — Forms and tests working hypotheses | 3 |
| M3 — Uses evidence to narrow the scope | 3 |
| M4 — Considers potential consequences before acting | 2 |
| M5 — Adapts approach when initial path isn't working | 3 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 3 |
| **Mean Marker Score** | **2.75** |

---

## Caveats
- For M5, the bundle insight appears partly NPC-prompted (Shay mentions "the runbook mentions a bundle"), making it difficult to determine whether the participant independently recognized the structural difference in the second failure. Rated at 3 because the participant still engaged with the new information and directed the fix rather than repeating the restart.
- For C3, the participant doesn't explicitly ask "what changed recently?" as a standalone question — the change information comes organically from NPCs. However, they engage with it critically and use it for elimination, which satisfies the spirit of the marker.
- K2 is a borderline 2/3 call. The participant commits a next-update time and names the scope ("failing for all customers"), but the updates lack working theory and quantified business framing. Rated 2 because the updates are closer to "we're investigating" than substantive business communication.

---