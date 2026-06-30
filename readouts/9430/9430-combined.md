# Post-Drill Developmental Report

This drill placed you in a live checkout outage with multiple potential causes, constrained team availability, and layered technical dependencies. It's designed to stress your ability to reason through systemic complexity — separating correlation from causation, navigating hidden couplings, and coordinating a response when key people aren't reachable.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you explored the email maintenance window as a potential cause of the checkout failures, asking multiple questions about how the two might be related. You moved away from that thread after receiving explicit disconfirmation from a teammate — a reasonable pivot, and one that kept the investigation from stalling. The growth edge here is making that pivot *before* someone tells you the correlation doesn't hold. On your next rep, try articulating the mechanism: "How would email maintenance *cause* checkout to fail?" If you can't name a plausible path, that's your signal to deprioritize the lead without waiting for someone else to rule it out.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

When the initial restart didn't resolve the issue, you didn't repeat it or blame downstream services. Instead, you moved quickly to ask about payment service logs, and once the certificate chain issue surfaced, you engaged with the structural distinction — recognizing that the bundle ordering needed to be fixed rather than simply renewing the cert. The reframe happened within a short window of the restart failing, which is solid. The next growth edge is surfacing the "what changed beyond the obvious timeframe" question yourself. In this drill, the relevant deployment was days old — the kind of hidden coupling that requires you to ask about changes outside the immediate window rather than waiting for a teammate to surface them.

---

## F3 — Decreased access to team

**Operating at: Strengthening**

You handled the access constraints well. After receiving auto-replies from both unavailable approvers, you didn't re-ping or wait — you took ownership of the restart decision explicitly. You also made a clear cost trade-off by pulling a teammate off a vendor call to focus on the more urgent gateway investigation. On the next rep, consider batching your requests more tightly when you do have someone's attention. You sent several sequential messages where a single consolidated ask might have been more efficient given the constrained availability.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the approval chain to exhaustion in a visible, traceable way — tagging each approver, registering their unavailability, then taking the decision yourself. You also routed work to available teammates based on their access and expertise. For the next rep, try verbalizing the dependency structure as you encounter it: "I need platform access for this fix, Tanya has it, but she's on a call — pulling her is the fastest path." Naming the constraint aloud helps the team understand your reasoning and positions you to coordinate more complex multi-step dependencies.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You asked teammates to investigate specific services and accepted their summaries to move forward. However, much of the filtering and synthesis work — distinguishing reload from restart, identifying the bundle ordering issue, recognizing which side the cert problem was on — was done by teammates rather than driven by you. At one point you asked whether the certification was on the payment provider's side after a teammate had already indicated it was on yours, suggesting incomplete integration of information already in the channel. On your next rep, try pausing periodically to synthesize what's been established so far: what's ruled out, what's still open, and what the current leading explanation is. That synthesis step helps you catch buried details before they become missed signals.

---

## Looking Forward

You showed clear strengths in taking ownership under pressure and adapting when your initial remediation path didn't work — you didn't get stuck repeating failed actions. Carry that adaptability into your next drill, and layer in more proactive reasoning: name mechanisms before dismissing leads, ask about changes beyond the obvious timeframe, and periodically synthesize the state of the investigation aloud. These habits will help you drive the diagnostic process rather than following it.
# Facets Analysis — 9430

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "How's email related to checkout @daniel?" ... "How's checkout related to email maintenance @tanya?" ... After Tanya states "Email confirmations have been sending fine, so this maintenance isn't causing checkout failures," the participant later says "Tanya wrote 'Email confirmations have been sending fine, so this maintenance isn't causing checkout failures.'"

**Rationale:**
The participant initially entertained the email maintenance correlation, asking multiple questions about it. However, they did pivot away from the email lead after receiving disconfirming evidence — Tanya's explicit statement that email isn't causing checkout failures. The participant quoted Tanya's disconfirmation back to the channel, showing they registered it, and moved on to investigating the payment gateway. However, the pivot was reactive (driven by Tanya's explicit denial) rather than by upstream mechanism reasoning. They never articulated "correlation needs a mechanism" framing. This fits tier 2: pursued the coincident factor, pivoted reactively on disconfirmation.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "Does a restart help @tanya?" ... After restart fails: "How's the payment service logs looking @daniel?" ... After Daniel reports SSL/chain errors and Tanya notes "payments service needs a two-cert bundle," participant engages: "we need to fix the order" / "Fix the bundle @tanya"

**Rationale:**
The participant engaged with the cert thread once it surfaced (via Daniel's deployment history showing CHG90123 from 7 days ago). After the first restart failed, the participant didn't repeat-restart or blame downstream services — instead they asked Daniel about logs within ~2-3 exchanges, showing they recognized the restart didn't resolve the issue. They engaged with the structural difference (chain verification vs. expiry) once NPCs surfaced it, driving the fix forward. However, they didn't independently surface the "what changed beyond 24 hours" question — that came from Daniel/Shay. They also didn't articulate "this is a different failure" themselves; they relied on NPC framing. This fits tier 3: reframes within a short window of the restart failing, recognizes the new error is structurally different, and drives forward to the bundle fix once prompted.

---

## F3 — Decreased access to team

**Rating:** 3

**Evidence:**
> "Hamed and tinus are not available. I'm signing off for them" ... "@tanya please take a look at the gateway issues This is more important right now" ... After receiving auto-replies from both Hamed and Tinus, the participant took ownership of the restart approval.

**Rationale:**
The participant demonstrated awareness of access constraints. They received auto-replies from Hamed and Tinus and didn't re-ping them. They made the cost trade-off decision to pull Tanya off the vendor call ("This is more important right now"). They took ownership of the restart approval explicitly ("I'm signing off for them"). They didn't batch questions to Tanya optimally (sent multiple sequential messages), but overall they named constraints and adapted. On the second restart (after bundle fix), they authorized without re-litigating. This fits tier 3: names access constraints, accepts auto-replies as terminating, escalates appropriately.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "Hamed and tinus are not available. I'm signing off for them" ... The participant pinged Hamed (auto-reply), pinged Tinus (auto-reply), then took ownership of the restart decision.

**Rationale:**
The participant walked the escalation chain to exhaustion in observable order: they tagged Hamed (received auto-reply), tagged Tinus (received auto-reply), then explicitly took ownership ("I'm signing off for them"). This matches tier 3 path (b). They also delegated work to available NPCs (Daniel on logs, Tanya on platform, Shay on banner). On the second restart after the bundle fix, they authorized without re-walking the chain ("Ok, then restart again @tanya"). They didn't enumerate the full dependency structure aloud in a single statement or verbalize constraints at each decision point in the way tier 4 requires, and the sequencing wasn't notably parallel — they worked mostly serially through the investigation.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "Yes look at that service @daniel?" ... After Daniel surfaces payment logs, participant asks "@daniel please take a look at the downstream payment provider" ... "Is the certification on the payment provider side @daniel?" ... The participant didn't independently surface the reload-vs-restart distinction or the bundle ordering issue.

**Rationale:**
The participant accepted NPC summaries and acted on them but didn't drive filtering proactively. They asked for investigation of specific services (PaymentService) once Daniel pointed them there, but didn't independently filter logs or reason about absence of signal. The reload-vs-restart distinction was surfaced by Tanya; the bundle issue was surfaced by Daniel/Shay. The participant engaged with key concepts once NPCs surfaced them (e.g., "we need to fix the order") but didn't catch distinctions from docs independently. They also asked "Is the certification on the payment provider side?" after Daniel had already indicated it was on their side — showing incomplete integration of already-surfaced information. This fits tier 2: asks for filtered information but accepts NPC summaries without further interrogation.

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
- F1 rating is a borderline 2/3 call. The participant did pivot away from the email lead relatively quickly after Tanya's disconfirmation, but the pivot was reactive rather than mechanism-driven. The participant never articulated why email couldn't cause checkout failures — they simply accepted Tanya's statement. Rated 2 because the pivot was driven by NPC denial rather than the participant's own mechanism reasoning.
- F2 rating is a borderline 2/3 call. The participant didn't independently surface the "what changed beyond 24 hours" question (which would support tier 4), but they did reframe quickly after the restart failed without repeating the restart or blaming downstream services. Rated 3 because the post-restart reframe was clean and within a short exchange window.
- F4: The participant's ownership statement ("I'm signing off for them") is terse but explicit. It meets tier 3 path (b) but lacks the verbalized dependency-structure reasoning that would push to tier 4.

---
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
