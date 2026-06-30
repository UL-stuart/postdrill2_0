---

# Markers Analysis — 9401

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "Bez has said i can approve restart, please restart server" ... "@bez can you give approval to restart the server? as all payments are down" ... "i dont want to mark as resolved until dash reflects a higher order per min"

**Rationale:**
The participant drives the response throughout — directing team members, making decisions about restarts, and controlling the resolution timeline. They seek approval from Bez for the restart rather than self-authorizing, but they do position themselves as the decision-maker once Bez defers. They don't explicitly say "blowback's on me" or name the cost of the override, which keeps this at tier 3 rather than 4.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "whats the nature of complaints?" ... "How many customers are blocked from checking out? What is the estimated revenue loss per minute right now?" ... "Is this a total checkout outage or are some transactions still going through? I need clarity on scope."

**Rationale:**
The participant's first actions are scope-validating questions to Bob — asking about the nature of complaints, the number of affected customers, and whether it's a total outage. These are targeted, relevant questions asked before any remediation action. This meets the novice expectation of scope-validating before acting.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "can we start to review, i will take a look at the website" ... [After Shay provides the deployment list, participant does not explicitly use it to eliminate candidates or articulate a mechanism]

**Rationale:**
The participant does engage with the change log — Shay provides the full prod deployment list and the participant reviews it. However, the participant never explicitly uses the change log as a candidate-elimination pass. They don't articulate "none of these touch the gateway" or use the absence of PaymentService changes as evidence. The change log is received but not visibly synthesized into the investigation logic.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@hamed can you check the health of the underlying systems and OS" ... "@tanya please come off the vendor call, this is more important right now" ... "tanya can you start with a health check of the systems and OS involved and then take a look at the logs provided" ... "@bob prepare comms" ... "@shay confirm when complete"

**Rationale:**
The participant consistently names specific people for specific tasks — Tanya for platform/cert checks, Daniel for logs, Bob for comms, Shay for the banner. They route tasks to the right people (Tanya for platform-side, Daniel for app-side). The delegation is clear and appropriately targeted, meeting the tier 3 expectation.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "can we start to review, i will take a look at the website" ... [Participant works mostly sequentially — asks Daniel for logs, waits, then asks Tanya to join, then works the cert thread]

**Rationale:**
The participant does have Daniel pulling logs while they check the website, and later has Bob preparing comms while Tanya works on certs. However, the investigation is largely sequential — one thread at a time with waiting between responses. There's no clear moment where multiple distinct investigation threads are fanned out simultaneously to different team members in close temporal sequence.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "@bez sorry to escalate, but Tinus and Hamed both out need someone to check the underlying systems" ... "might need your help @bez tinu and hamed out, tanya on vendor call, i think this is more important and we should focus resource here" ... "@bez can you give approval to restart the server? as all payments are down"

**Rationale:**
The participant escalates to Bez when both Tinus and Hamed are unavailable, and successfully gets Bez to pull Tanya off the vendor call. They also escalate the restart approval to Bez. The escalations include context (who's unavailable, what's needed). However, they don't explicitly name the cost of pulling Tanya off the vendor call (the 2-week slot loss), which keeps this at tier 3.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "does order completion require an email ? or would the order complete but no email would be sent?" ... "@daniel is that network or authentication handshake ?" ... "did we update or change the TLS version in an update?"

**Rationale:**
The participant asks questions that implicitly test hypotheses (email maintenance causing the issue, network vs. authentication), but never explicitly articulates a hypothesis before testing it. They don't say "my hypothesis is X, let's test by doing Y." The investigation proceeds through questions rather than named hypotheses with proposed tests. This is inconsistent/implicit hypothesis formation — tier 2.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 3

**Evidence:**
> "does order completion require an email ? or would the order complete but no email would be sent?" [After learning email is independent:] "@daniel is that network or authentication handshake ?" ... [After Daniel confirms authentication:] "did we update or change the TLS version in an update?"

**Rationale:**
The participant uses evidence to narrow scope — ruling out email as a cause, distinguishing network from authentication failures, and narrowing to the cert issue. They ask targeted questions that progressively narrow the problem space. However, they don't produce explicit synthesis statements naming what's been ruled out, which keeps this at tier 3 rather than 4.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "please restart" ... "can you plese rectify" ... "please restart service"

**Rationale:**
The participant issues restart and fix commands without visible consequence-weighing. There's no "is it safe?" check, no consideration of what could go wrong with the restart, no anticipation that the restart might expose a secondary issue (the bundle ordering problem). They don't name the cost of pulling Tanya off the vendor call either. Actions are fired without visible deliberation about side effects.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "are there any different errors other than the handshake now cert is loaded?" ... [After restart fails:] Engages with the new error about certificate chain verification, asks about the bundle, and pivots to fixing the bundle order.

**Rationale:**
When the first restart doesn't fix the issue, the participant doesn't retry the same action. They ask about different errors, engage with the new certificate chain verification failure, and pivot to investigating the bundle ordering issue. This shows adaptation when the initial path (cert reload/restart) doesn't work. They don't explicitly reframe the problem as structurally different, but they do follow the new evidence forward.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "no Root cause identified, working on resourcing. no ETA available yet, i will update every 5 minutes" ... "we have a certificate issue from a change earlier, we are reloading the cert now" ... "cert is now loaded, but we have an issue with certificate chain have asked tanya to rectify"

**Rationale:**
The participant provides updates but they lack business framing. The first update ("no root cause, no ETA") is vague. Later updates mention technical details (certificate issue, chain problem) without translating to business impact (full checkout outage, revenue loss, customer scope). They commit to a 5-minute cadence but the updates themselves lack the substantive business-frame content expected at tier 3.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "total outage, no orders going through, we can replicate the issue on the site" ... "restarting service now, should only take a minute"

**Rationale:**
The participant provides some scope information to the team ("total outage, no orders going through") but rarely synthesizes the investigation state for the technical team. They don't post messages like "we've ruled out email, ruled out deploys, focus is now on PaymentService outbound." The team gets directed through individual task assignments rather than synthesis statements that orient everyone to the current understanding.

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
| M3 — Uses evidence to narrow the scope | 3 |
| M4 — Considers potential consequences before acting | 2 |
| M5 — Adapts approach when initial path isn't working | 3 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.50** |

---

## Caveats
- **L3 boundary call:** The participant sought Bez's approval for the restart rather than self-authorizing. Bez then said "I can't approve technical restarts, that's for you as incident lead," and the participant then said "Bez has said i can approve restart, please restart server" — which slightly misrepresents what Bez said but does result in taking the decision. This is borderline 2/3; rated 3 because they ultimately drove the response and made the call.
- **M2 boundary call:** The participant's questions implicitly test hypotheses (e.g., "does order completion require an email?" tests the email-maintenance hypothesis), but they never explicitly name a hypothesis. Rated 2 because the rubric emphasizes explicit articulation.
- **K2:** The participant's updates to the business channel are technically present but lack business framing. The "2 minute ETA on next fix" message is useful but isolated. Borderline 2/3; rated 2 because the updates don't quantify business impact or provide working theories in business terms.

---