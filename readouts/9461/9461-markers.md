---

# Markers Analysis — 9461

## L3 — Takes explicit ownership of the response

**Rating:** 2

**Evidence:**
> "In which case I think it's the right call to make, and we've had a pseudo-approval from Bez"

**Rationale:**
The participant never explicitly says "I authorize" or "this is my call, blowback's on me." Instead, they lean on Bez's pseudo-approval and ask the team "Are people happy?" before proceeding. They frame the restart as a collective decision rather than personally owning it. While they do drive the response to some degree, the ownership moment is hedged and deferred rather than explicit.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "How many customers are blocked right now? What's the revenue loss per minute? Is this a total checkout outage or partial?"

**Rationale:**
The participant's first substantive action after Bob's complaint is to ask scope-validating questions about customer count, revenue loss, and whether the outage is total or partial. They also ask Shay and Daniel to check logs. This is a clear information-gathering posture before taking remediation action, meeting the novice expectation.

---

## C3 — Checks for recent changes

**Rating:** 3

**Evidence:**
> "@daniel @shay has anything else changed recently"

**Rationale:**
The participant explicitly asks about recent changes, reviews the change log (Daniel's checkout changes, Shay's AdService change, Hamed's S3 change, Tanya's ShippingService change), and uses the information to eliminate candidates. They ask Daniel to roll back his change as a test but also note "the timing doesn't align." They don't explicitly frame the absence of a mechanism as elimination evidence in a single synthesis statement, but they do work through the changes systematically.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@shay @daniel can you check the logs?" ... "@daniel can you check Hamed's change (slightly weird that his change went in when he's on holiday)"

**Rationale:**
The participant consistently names specific people for specific tasks — Daniel for log checks, Tanya for DNS/platform checks, Bob for revenue numbers. They route platform-level work to Tanya once she's available. However, some early asks are paired (@shay @daniel together) rather than giving each a distinct task, which slightly reduces precision. Overall meets the novice expectation.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "@shay @daniel can you check the logs?" ... "It seems to be a total outage. @bob can you help quantify the revenue loss?"

**Rationale:**
The participant does ask Bob for revenue quantification while Daniel/Shay check logs, showing some parallelism. However, the investigation largely proceeds sequentially — one change checked, then the next, then waiting for Tanya. There's limited evidence of deliberately fanning out multiple distinct investigation threads simultaneously. The approach is mostly serial with occasional parallel asks.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "Tanya - I'm afraid you need to step away from the call. I shall escalate to management if needed"

**Rationale:**
When the investigation is blocked at the platform layer, the participant pulls Tanya off the vendor call, naming the escalation threat ("I shall escalate to management if needed"). They also attempt to reach both Hamed and Tinus for restart approval. However, they don't explicitly name the cost of pulling Tanya (losing the 2-week vendor window), and the restart approval is handled somewhat passively — seeking Bez's sign-off rather than personally owning the override. Meets novice expectation but doesn't reach tier 4.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "Hmm, OK - hold that thought as we might want to elimiate it as a cause" ... "@daniel do you think we could do a rollback to make sure that it's not the cause"

**Rationale:**
The participant tests hypotheses (email maintenance timing, Daniel's checkout changes) through rollbacks, but rarely articulates an explicit hypothesis before testing. They don't state "my hypothesis is X because Y" — instead they react to NPC suggestions (Shay's email timing observation, Daniel's changes) and ask for rollbacks without naming the mechanism. The hypothesis formation is implicit rather than explicit, placing this at tier 2.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 3

**Evidence:**
> "Errors in the payment service - do we know what it's trying to connect to?" ... "The payment gateway?"

**Rationale:**
The participant uses evidence to narrow scope at several points: after Daniel's rollback fails, they move on; they identify PaymentService outbound failures from the logs; they confirm PaymentService doesn't connect to EmailService (ruling out that link). They ask targeted questions that narrow the problem space. However, they don't produce strong synthesis statements combining multiple pieces of evidence. Meets novice expectation.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "@tanya @daniel @shay given that it's not working at present, what's the risk of a restart?"

**Rationale:**
The participant does ask about the risk of the restart before proceeding, which shows some consequence consideration. However, they don't anticipate secondary failure modes (e.g., checking the bundle before restarting), and the "if it's safe" framing is limited to this one moment. They don't consider consequences before pulling Tanya off the vendor call or before the initial rollback. Inconsistent application places this at tier 2.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "What do the logs say now?" ... "OK, do we have a bad certificate?"

**Rationale:**
After the rollback fails, the participant moves on to other avenues rather than repeating rollbacks. After the restart fails with a different error, they ask for new logs and engage with the new failure mode (cert chain/bundle issue) rather than retrying the restart. They adapt their approach at both pivot points, though they rely heavily on NPC guidance (Daniel/Shay identifying the bundle issue) rather than independently reframing. Meets novice expectation.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "This is affecting all regions. Will give a further update in 5 minutes" ... "It's very hard to say. I can give another update in 10 minutes, but we don't know what the cause is at the moment"

**Rationale:**
The participant's business updates are largely vague — "we're investigating," "we don't know the cause," "rollback didn't help." They commit next-update times but don't quantify impact in business terms (Bob provides the numbers but the participant doesn't synthesize them for Bez). They never share a working theory with Bez until very late ("It looks like a certificate has expired"). Updates lack the substance expected at tier 3.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "Shay - Daniel rolled back his changes and it didn't work" ... "Restart hasn't helped, although the error is different"

**Rationale:**
The participant provides some state updates to the technical channel but rarely synthesizes what's been ruled in and out. They don't post clear scope statements like "it's not deploys, focus on PaymentService outbound." Their technical communication is mostly question-and-answer exchanges rather than synthesis statements that orient the team. The "Restart hasn't helped, although the error is different" is a brief synthesis but lacks detail about what this means for next steps.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 2 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 3 |
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
- **L3 boundary call:** The participant does eventually proceed with the restart and says "I think it's the right call to make," but frames it as collective ("we've had a pseudo-approval from Bez," "Are people happy?"). This is borderline 2/3 — rated 2 because they never explicitly say "I authorize" or accept personal accountability.
- **M2 boundary call:** The participant tests hypotheses through action (rollbacks, pulling Tanya) but rarely articulates them explicitly before acting. The rubric emphasizes explicit articulation, so rated 2 despite the participant clearly having mental models.
- **K2:** The participant relays Bob's numbers to Bez when asked but doesn't proactively frame impact in business terms or share working theories until late in the drill.

---