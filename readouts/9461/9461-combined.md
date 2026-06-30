# Post-Drill Report — Snipe Hunt

This drill placed you in a live incident with layered complexity: misleading timing coincidences, hidden system dependencies, constrained team availability, and a volume of information that required active filtering. The observations below reflect how you navigated that complexity across five dimensions of incident-response reasoning.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you picked up on the email/DNS maintenance as a plausible cause and pursued it actively — asking about rollback options and requesting details on the DNS change. When the platform engineer explicitly stated the maintenance couldn't be causing checkout failures, you continued chasing the DNS thread for several more exchanges before eventually moving on. The pivot away came because you ran out of actionable paths rather than because you reasoned through why the mechanism didn't fit.

*Growth edge:* When a coincident event is disconfirmed, practice pausing to ask "what mechanism would connect these?" before continuing to pursue it. The faster you can distinguish timing coincidence from causal linkage, the less time you'll spend on dead ends.

---

## F2 — Hidden coupling

**Operating at: Practicing**

After the restart failed to resolve the issue, you asked the team for ideas rather than independently reframing the problem. The shift in error character — from connection failures to certificate chain errors — was identified and interpreted by your team members rather than by you driving the reframe. You did connect the earlier certificate rotation to the current failure, but only in the retrospective phase after resolution, not during active investigation.

*Growth edge:* When a remediation attempt fails and the error changes shape, treat that as a strong signal that the problem's structure is different from what you assumed. Articulate the new shape yourself — even tentatively — before asking the team to brainstorm. This also connects to how you form hypotheses: naming "the error changed, so the problem might be structural rather than transient" gives the team a sharper frame to work within.

---

## F3 — Decreased access to team

**Operating at: Strengthening**

You demonstrated awareness of team constraints throughout. You initially preserved the vendor call, attempted to reach both Tinus and Hamed for restart approval, accepted their unavailability without repeated pinging, and made an explicit cost trade-off when you pulled the platform engineer off the vendor call. Your escalation language was direct and named the stakes.

*Growth edge:* Once you pull someone into the incident, maximise the value of their attention by having a focused ask ready. A couple of your early questions to the platform engineer were broad enough that they could have been answered by others or deferred — tightening the ask-per-person ratio will help when access is scarce.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the approval chain methodically — Tinus, Hamed, then Bez — and delegated parallel work to available team members. You ultimately took ownership of the restart decision, framing it as the right call given the information available. You also routed platform-level investigation to the right person once she was available, showing awareness of who could act on what.

*Growth edge:* When you take ownership of a decision under uncertainty, own it cleanly. Framing a decision as collectively endorsed ("are people happy?") can diffuse accountability in ways that slow future decisions. A clear "I'm authorising this; here's why" statement sets the tone for the team and removes ambiguity about who's accountable.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You noticed payment-service errors and asked about connection targets, which showed filtering instinct. However, the critical distinctions — handshake failures versus internal call failures, the reload-versus-restart difference in the activity doc, the certificate rotation from seven days prior — were all surfaced by team members rather than by you driving targeted questions into the data. You accepted summaries without further interrogation.

*Growth edge:* Practice asking temporal and structural questions yourself: "What changed in the last 7 days, not just 24 hours?" or "What does the runbook actually say about this step?" Driving the filtering — rather than waiting for someone else to surface the key detail — is the difference between reacting to information and actively hunting for it.

---

## Looking Forward

Across this drill, your coordination instincts — escalation awareness, delegation to named people, willingness to make hard trade-offs on team availability — are solid foundations. The growth opportunity for your next rep sits in the diagnostic layer: driving your own reframes when evidence shifts, articulating hypotheses before testing them, and actively filtering data rather than waiting for the team to surface what matters. Carry the coordination confidence forward; layer investigative assertiveness on top of it.
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
