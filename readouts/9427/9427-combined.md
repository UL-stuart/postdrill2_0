# Post-Drill Developmental Report

This drill placed you in the middle of a live payment-processing incident with layered complexity: misleading timing correlations, hidden infrastructure coupling, reduced team availability, and a volume of incoming information that required active filtering. The facets below capture how you engaged with each of these pressures and where your next growth edges sit.

---

## F1 — Misleading correlations

**Operating at: Practicing**

You did eventually recognise that customer complaints predated the email maintenance window, which allowed you to move past that initial hypothesis. The challenge was that this pivot came reactively — after repeated disconfirmations from team members rather than from your own causal-mechanism reasoning. You continued probing the maintenance angle well after early signals pointed elsewhere. On your next rep, try articulating *why* a correlation should or shouldn't hold (e.g., "email maintenance can't affect payment handshakes because they share no infrastructure path") rather than waiting for others to confirm or deny the link. That kind of upstream reasoning will let you release a dead lead faster.

---

## F2 — Hidden coupling

**Operating at: Practicing**

When the first restart didn't resolve the issue, your instinct was to ask what else could be restarted — a reasonable operational reflex, but one that didn't engage with the structurally different error that had surfaced. The discovery that a certificate rotation from days earlier was the true coupling came from your teammates rather than from your own investigation. For your next rep, pay attention to moments where a remediation fails in a *new way* — that's a signal to pause and re-examine the failure mode rather than repeating the same class of action. Asking "what's different about this error?" is a powerful pivot question.

---

## F3 — Decreased access to team

**Operating at: Practicing**

You eventually took ownership of the restart decision and explicitly accepted the consequences — a meaningful step. However, you spent considerable time pinging unavailable approvers multiple times and requesting sign-off from someone who had already stated it wasn't in their remit. You also pulled a teammate off a vendor call without naming the trade-off. The growth edge here is recognising the access constraint as a *pattern* earlier: once two approvers are confirmed unavailable, name that constraint aloud and move to your decision framework rather than cycling through the same channels again.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Practicing**

You walked the escalation chain — Tinus, then Hamed, then Bez — and ultimately made the override call yourself. That chain-walking showed awareness that approval was needed. What was missing was a proactive framing of the bottleneck: you discovered it reactively by being denied at each step rather than mapping the dependency structure and communicating it to the team. Your delegation was generally well-targeted — you routed platform questions to the right people and assigned specific tasks with @mentions — but the escalation path would have been smoother if you'd named the constraint ("both approvers are out; I'm making the call because X") earlier rather than after extended pressure.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You asked for the change log and reviewed it, which shows filtering intent. However, when a teammate noted that none of the recent changes looked relevant to the checkout failure, you still asked another teammate to roll back their changes without articulating a mechanism. Key discoveries — the payment-service handshake failure, the certificate chain issue — came from teammates who dug into specific logs rather than from your own directed filtering. On your next rep, try using NPC summaries as elimination passes: when someone says "these don't connect," treat that as a narrowing signal and redirect your attention rather than re-checking the same ground.

---

## Looking Forward

Across this drill, your instincts around clarifying scope early and delegating to named individuals served you well — those are foundations to build on. The consistent growth edge is moving from *reactive* discovery (waiting for disconfirmation or NPC findings) to *proactive* reasoning: naming what you're testing, articulating why a lead should be dropped, and framing constraints for the team before you've exhausted every channel. On your next rep, experiment with posting a brief synthesis to the team at key pivot points — even a sentence like "maintenance is ruled out, we're now focused on the payment path" — to sharpen both your own thinking and the team's shared orientation.
# Facets Analysis — 9427

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "was confirmed issues started before maintance started"

**Rationale:**
The participant initially pursued the email maintenance/DNS correlation heavily, asking Tanya multiple times if her work was related and requesting reviews of recent changes. They did eventually note that complaints started before maintenance began, which represents a pivot. However, this pivot was reactive — driven by Bob's timeline confirmation rather than upstream mechanism reasoning. They continued asking Tanya "are you certain the maintenance is not related" even after multiple disconfirmations, showing slow pivot latency (well beyond 5 exchanges after the first disconfirming signals). The participant eventually moved on but only after exhausting the lead through repeated NPC denials rather than through causal-mechanism reasoning.

---

## F2 — Hidden coupling

**Rating:** 2

**Evidence:**
> "@tanya is there anything else we can restart"

**Rationale:**
After the first restart failed, the participant's immediate response was to ask about restarting other things rather than recognizing the new error as structurally different. They did not independently surface the "what changed beyond 24 hours" question — it was NPCs (Daniel/Shay) who identified the cert rotation from 7 days ago. After the restart failed, the participant took several exchanges before engaging with the new error type, relying on Daniel's discovery that "the certificate chain is broken" and Tanya's identification of the bundle order issue. The participant engaged with the coupling only after NPC framing, consistent with tier 2.

---

## F3 — Decreased access to team

**Rating:** 2

**Evidence:**
> "@tanya we have no way of getting tinus or hamed please restart the platform" ... "i will face conequence should there be any issues"

**Rationale:**
The participant did eventually take ownership of the restart decision and accepted consequences. However, they pinged Tinus twice after receiving auto-replies, pinged Hamed after receiving an auto-reply, and repeatedly asked Bez for technical sign-off that wasn't in Bez's remit. They pulled Tanya off her vendor call without articulating the cost trade-off explicitly. The ownership statement came late and only after exhausting all other options through repeated pinging rather than through a reasoned assessment of the access constraints. They never named the constraint pattern in their own words.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 2

**Evidence:**
> "@bez we need approval for him or hamed" ... "@tanya we have no way of getting tinus or hamed please restart the platform"

**Rationale:**
The participant did eventually walk the escalation chain (Tinus → auto-reply, Hamed → auto-reply, Bez → "not my remit") and then took ownership. However, they did not name the coordination bottleneck proactively — they discovered it reactively by pinging each person and being denied. They asked Bez multiple times for technical sign-off despite Bez explicitly stating it wasn't in their remit. The ownership statement ("i will face consequence should there be any issues") came only after extended team pressure and NPC prompting, with reasoning condensed to outcome-pressure rather than naming the escalation as exhausted. This aligns with tier 2's description of taking the override call after team pressure without first articulating the dependency structure.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "@shay can we get list of all recent changes" ... "we need to check all to be safe"

**Rationale:**
The participant asked for recent changes and methodically reviewed them, which shows some filtering intent. However, they did not independently filter to PaymentService logs — it was Daniel who pulled the payment logs and identified the handshake failure. The participant accepted NPC summaries without further interrogation (e.g., when Daniel surfaced the SSL errors and cert chain issue). They did not catch the reload-vs-restart distinction from the runbook, nor did they reason about absence of signal. The participant engaged with key concepts (cert bundle, chain verification) only once NPCs surfaced them, consistent with tier 2 behavior.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 2 |
| F2 — Hidden coupling | 2 |
| F3 — Decreased access to team | 2 |
| F4 — Interdependencies / coordination bottlenecks | 2 |
| F5 — Data overload / buried information | 2 |
| **Mean Facet Score** | **2.00** |

---

## Caveats
- F1 borderline 1/2: The participant did eventually pivot away from the email maintenance hypothesis, but it took many exchanges and repeated NPC disconfirmations. The pivot was reactive (Bob's timeline data) rather than mechanism-driven, but it was a genuine pivot — they stopped pursuing the lead and moved to other investigations. Rated 2 rather than 1 because they did recognize the negative result and move on.
- F4 borderline 2/3: The participant did walk the escalation chain, but the walking was not clean or deliberate — it involved repeated pings to the same unavailable people and asking Bez for something outside their remit. The ownership statement existed but lacked the articulated reasoning of tier 3.

---
---

# Markers Analysis — 9427

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "i will face conequence should there be any issues"

**Rationale:**
The participant eventually takes explicit ownership of the restart decision when both approvers are unavailable, stating they will face consequences. However, this came late in the drill after extended attempts to get someone else to approve. Earlier in the drill, the participant was more reactive than directive, but they did ultimately make the override call themselves.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "hello what are the complaints we are seeing?"

**Rationale:**
The participant's first action after Bob's alert is a clarifying question about the nature of the complaints. They also later ask "@bob are any transactions going through?" and "@bob when did the complaints start coming in does this line up with @tanya's work?" These are scope-validating questions before taking remediation action. They gather information before declaring the incident or ordering changes.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "@shay can we get list of all recent changes"

**Rationale:**
The participant asks for the change log, which is good. However, after receiving it — with Shay explicitly noting "none of these look like they'd break checkout end-to-end" — the participant proceeds to ask Daniel to review and roll back his checkout changes anyway, without articulating a mechanism connecting them to the symptom. They asked the question but didn't effectively use the answer as a candidate-elimination pass.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@shay can we get list of all recent changes" / "@daniel please review your checkout changes to be sage" / "@tanya please come back to the chat" / "@shay please help daniel deep dive on app with highest error rate"

**Rationale:**
The participant consistently uses @mentions to assign specific tasks to specific people. They route platform questions to Tanya, app-side checks to Daniel, and change-log review to Shay. While not always perfectly matched to access boundaries (e.g., asking Shay to restart when only Tanya can), the delegation is generally targeted and named.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "@tanya the work @shay is referring to can we get an update on this?" followed later by "@daniel please review your checkout changes"

**Rationale:**
The participant mostly works sequentially — asking one question, waiting for a response, then moving to the next thread. While there are occasional moments of multiple asks in proximity, the overall pattern is serial investigation rather than deliberate parallel threads. They don't fan out multiple distinct tasks simultaneously in the way a tier 3+ participant would.

---

## C7 — Escalates when stuck

**Rating:** 2

**Evidence:**
> "@tinus URGENT - can we get approval for restarting payment service" / "@bez as @tinus is with you at the fireside can you please ask him to sign off on this as it is urgent"

**Rationale:**
The participant attempts escalation through multiple channels (Tinus, Hamed, Bez), which shows awareness of the need to escalate. However, the escalation is prolonged and somewhat passive — they repeatedly ask Bez for approval despite Bez stating it's not in their remit, and they spend significant time cycling through unavailable approvers before finally making the override call themselves. The escalation lacks the decisive quality of a tier 3 response.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "was confirmed issues started before maintance started" / "@tanya are you certain the maintenance is not related"

**Rationale:**
The participant partially engages with hypothesis testing. They note the timing mismatch between email maintenance and complaints, which should eliminate the email hypothesis. However, they repeatedly return to asking Tanya about the maintenance even after it's been disconfirmed multiple times. They don't explicitly articulate hypotheses or propose clear tests — they mostly ask others to check things without framing what they're testing or why.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "was confirmed issues started before maintance started" / "@bob are complaints still global?"

**Rationale:**
The participant occasionally uses evidence to narrow scope — noting the timing mismatch with email maintenance and confirming global impact. However, they don't produce synthesis statements that combine multiple pieces of evidence into a tighter scope. They continue pursuing the email maintenance thread long after evidence should have eliminated it, and they don't articulate what's been ruled out to focus the team.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "i will face conequence should there be any issues"

**Rationale:**
The participant acknowledges potential consequences of the restart override, which shows some awareness. However, this comes only at the final override moment. Earlier actions (rollbacks of Daniel's changes, pulling Tanya off the vendor call) are executed without any "is it safe?" checks or consideration of side effects. The consequence consideration is limited to one moment rather than a consistent pattern.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 2

**Evidence:**
> "@tanya is there anything else we can restart" / "any config issue @tanya"

**Rationale:**
After the first restart fails, the participant doesn't clearly reframe the problem or recognize the structurally different error. They ask generic questions ("anything else we can restart?", "any config issue?") rather than engaging with the new failure mode (chain verification vs. expiry). The pivot to the bundle fix comes from Tanya and Daniel's investigation rather than from the participant recognizing the new error pattern. They do eventually follow the team's lead, but don't drive the adaptation themselves.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "Most likely the cert rotation last week. If the cert wasn't loaded right, handshake will fail before ClearBank. Going to try try reloading the payments service. The process is still running with the expired cert, so a restart would load the new one from disk."

**Rationale:**
The participant provides one substantive update to Bez with a working theory and proposed action. However, most communications to Bez are vague ("looking into this urgently", "we are still investigating", "once we have information i will let you know"). They don't quantify business impact in their updates, don't commit to next-update times consistently, and repeatedly deflect Bez's requests for specifics. The one good update is the exception rather than the pattern.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 1

**Evidence:**
> "do we have any more leads here" / "we need to find the root cause" / "@daniel @tanya please check all possible platforms"

**Rationale:**
The participant rarely synthesizes the current state of knowledge for the technical team. They don't post messages that summarize what's been ruled out or what the current working theory is. Instead, they ask generic questions ("any more leads?", "check all possible platforms") without orienting the team on what's known. The technical team drives its own investigation while the participant mostly asks for updates rather than providing synthesis.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 3 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 2 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 2 |
| C7 — Escalates when stuck | 2 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 2 |
| M4 — Considers potential consequences before acting | 2 |
| M5 — Adapts approach when initial path isn't working | 2 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 1 |
| **Mean Marker Score** | **2.17** |

---

## Caveats
- L3 rating is a borderline 2/3 call. The participant did eventually make the override call and accept consequences ("i will face conequence should there be any issues"), which meets the tier 3 threshold, but the extended delay and repeated attempts to get others to approve weakens the ownership signal. Rated 3 because the explicit acceptance of consequences is present.
- K2 has one substantive update that could push toward a 3, but the overall pattern of vague responses to Bez ("we are still investigating" repeated multiple times) keeps it at 2.
- The participant's typos and brief messages make it harder to infer intent; ratings are based on what was actually communicated rather than what may have been intended.

---
