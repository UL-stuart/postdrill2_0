---

# Markers Analysis — 9430

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "Hamed and tinus are not available. I'm signing off for them"

**Rationale:**
The participant takes the override decision when both approvers are unavailable, explicitly stating they are signing off on their behalf. Throughout the drill they direct actions ("@tanya look at the gateway," "@shay put up a maintenance banner," "Fix the bundle @tanya"), positioning themselves as the decision-maker. However, they don't explicitly name the cost or consequences of the override ("blowback's on me"), which would elevate to tier 4.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "What's wrong @bob?" ... "Is it global @bob?" ... "How many customers are blocked from checking out? What's the revenue loss per minute right now?"

**Rationale:**
The participant's first moves after Bob's alert are scope-validating questions: asking what's wrong, whether it's global, and quantifying impact. They gather information before declaring the incident or taking remediation actions. This meets the novice expectation of asking clarifying questions before acting, though they don't probe deeply into error patterns or payment method specifics, which would push toward tier 4.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "How's checkout related to email maintenance @tanya?" ... "When's the maintenance window ending @tanya?"

**Rationale:**
The participant engages with the email maintenance timing as a potential cause but doesn't explicitly ask for a comprehensive change log or review recent deployments systematically. They follow the email maintenance thread raised by NPCs rather than proactively requesting change history. They don't use the change information as a candidate-elimination pass — they continue pursuing the email maintenance angle even after Tanya states it's unrelated. The systematic elimination work is done by Daniel and Shay without the participant explicitly requesting it.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@daniel What does the monitoring say about our checkout?" ... "@shay put up a maintenance banner" ... "@tanya please take a look at the gateway issues This is more important right now"

**Rationale:**
The participant consistently names specific people for specific tasks throughout the drill. They route platform/cert work to Tanya, log investigation to Daniel, and banner deployment to Shay. The routing generally reflects correct access boundaries (Tanya for platform/cert, Daniel for app-side). However, some asks are slightly vague (e.g., "@daniel please take a look at the downstream payment provider" when Daniel can't do platform-level work), preventing a tier 4 rating.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "@daniel What does the monitoring say about our checkout?" ... "How's email related to checkout @daniel?"

**Rationale:**
The participant largely works sequentially through the investigation — asking one question, waiting for a response, then asking the next. There's limited evidence of fanning out multiple distinct tasks to different people simultaneously. Most investigation threads are pursued one at a time (email maintenance → then downstream service → then gateway). The participant doesn't kick off multiple concurrent investigation threads in close temporal sequence.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "@tanya please take a look at the gateway issues This is more important right now" ... "Hamed and tinus are not available. I'm signing off for them"

**Rationale:**
The participant pulls Tanya off the vendor call when investigation is blocked at the platform layer, and when both Hamed and Tinus auto-reply as unavailable, they make the override decision themselves rather than waiting passively. However, they don't explicitly name the cost of pulling Tanya ("we lose the vendor window") or frame the override with explicit risk acceptance language, which would push to tier 4.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "How's checkout related to email maintenance @tanya?" ... "The certificate is expired. Renew the certificate @tanya"

**Rationale:**
The participant doesn't explicitly articulate hypotheses in a "my hypothesis is X, let's test it by doing Y" format. They follow leads raised by NPCs (email maintenance timing, then downstream service, then gateway) rather than forming and naming their own hypotheses. When the cert expiry is discovered, they jump to action ("Renew the certificate") without framing it as a hypothesis to test. The investigation is more reactive than hypothesis-driven.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "Is it global @bob?" ... "Is this a total checkout outage or are any transactions getting through at all?"

**Rationale:**
The participant asks some scoping questions early on (global? total outage?) which help narrow the problem. However, they don't produce synthesis statements that combine multiple pieces of evidence to rule things out. They don't explicitly state what's been eliminated or use absence of evidence as narrowing information. Much of the narrowing work is done by NPCs (Daniel's "PaymentService fails all outbound gateway handshakes. Checkout is healthy") rather than being synthesized by the participant.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "Does a restart help @tanya?" ... "Can we ignore the certificate validation? @tanya"

**Rationale:**
The participant asks whether a restart would help (showing some consideration), but they also suggest ignoring certificate validation without weighing the security consequences — Tanya has to flag the risk. They don't use "is it safe?" qualifiers or anticipate secondary failure modes. When ordering the first restart, they don't consider what might happen if the cert on disk has issues. The suggestion to skip cert validation shows a lack of consequence consideration.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "How's the payment service logs looking @daniel?" [after first restart fails] ... "we need to fix the order" [after learning about bundle issue]

**Rationale:**
After the first restart fails, the participant doesn't retry the same action — they ask Daniel to check logs and engage with the new information about the cert chain being broken. When the bundle order issue is identified, they pivot to fixing it. They adapt when the initial path (simple restart) doesn't work, though the pivot is largely guided by NPC information rather than the participant independently recognizing the structural difference in the new error.

---

## M2 — Forms and tests working hypotheses

*(Already scored above)*

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "I'll come back to you in 10 min. Looks like a total outage" ... "It looks like a certificate error on our payment side. I don't have an ETA yet. But will get back to you in 10 min"

**Rationale:**
The participant provides two updates to Bez, both relatively thin. The first ("total outage, back in 10 min") lacks detail on impact or what's being done. The second names the cause (certificate error) but still lacks business-framed impact quantification or a committed recovery timeline. They don't proactively update Bez after the first restart fails or when the bundle fix is underway. The updates are sparse and lack the substantive business framing expected at tier 3.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "@tanya look at the gateway. The payment service is failing" ... "we need to fix the order"

**Rationale:**
The participant gives brief directives to the technical team but rarely synthesizes the current state of knowledge for the group. They don't post messages like "ok, we've ruled out email maintenance, the issue is PaymentService outbound TLS handshake failures." Their technical communications are mostly short action requests rather than synthesis statements that orient the team. The NPCs (Daniel, Tanya) do most of the synthesis work themselves.

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
| M4 — Considers potential consequences before acting | 2 |
| M5 — Adapts approach when initial path isn't working | 3 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.42** |

---

## Caveats
- **C3 boundary call:** The participant engages with the email maintenance change (raised by NPCs) but doesn't proactively ask for a change log. Rated 2 because the engagement is reactive and doesn't use change information for elimination. Could arguably be 2.5 since they do ask "How's checkout related to email maintenance?" which shows some critical thinking about the change.
- **M5 boundary call:** The adaptation after the first restart is largely NPC-guided (Daniel and Tanya surface the bundle issue). The participant follows the new information appropriately but doesn't independently recognize the structural difference in the error. Rated 3 because they don't repeat the failed action and do engage with the new direction.
- **K2:** The participant's second update to Bez ("certificate error on our payment side") is more substantive than the first but still lacks business-framed impact. The 10-minute commitment is honored. Borderline 2/3 but rated 2 because neither update quantifies business impact or provides a working theory with enough detail for board communication.

---