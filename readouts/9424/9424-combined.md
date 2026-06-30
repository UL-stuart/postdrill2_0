# Post-Drill Report — Snipe Hunt

This drill placed you in a live incident requiring you to navigate ambiguous signals, coordinate a distributed team under access constraints, and drive toward resolution while managing stakeholder communication. The observations below reflect how you engaged with each dimension of complexity the drill surfaced.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you identified email maintenance and the payment application as two possible causes and held both open for investigation. When evidence came back that email wasn't causing checkout failures, you continued to treat it as a live thread rather than ruling it out based on mechanism reasoning. The pivot away from email ultimately came through repeated disconfirmation from team members rather than from your own reasoning about whether a plausible causal path existed.

*Growth edge:* When a correlation surfaces (timing overlap, co-occurring maintenance), practice asking yourself — and the team — "what's the mechanism that would connect this to the symptom?" If you can't articulate one, deprioritise it earlier and redirect attention. This frees up investigation bandwidth for higher-probability threads.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

Once the certificate rotation thread was surfaced, you engaged with it directly — asking what an expired cert would mean, following through to the in-memory discovery, and driving toward the restart. When the restart didn't resolve the issue, you didn't repeat the same action or blame downstream services. Instead, you redirected investigation, asking the team to look for another cause and check from the platform side again. You connected the dots between the cert state and the observed failures once the information was available.

*Growth edge:* The "what changed beyond 24 hours" question came from team investigation rather than from you. On the next rep, consider proactively widening the change window when recent-change checks come back clean — asking "what changed in the last week that could have a delayed effect?" can surface coupling that doesn't manifest immediately.

---

## F3 — Decreased access to team / remote

**Operating at: Strengthening**

You worked through the escalation chain methodically — contacting Hamed, then Tinus, then Bez — and accepted the constraints when auto-replies came back. You made the trade-off of pulling Tanya off a vendor call when her platform expertise was needed, and you took ownership of the restart decision when the approval chain was exhausted. Your willingness to say "I will take accountability" and proceed was a clear signal of constraint adaptation.

*Growth edge:* When making forced trade-offs (like pulling someone off another commitment), naming the cost explicitly — even briefly — helps the team understand your reasoning and builds shared context. On the next rep, try verbalising the trade-off: "I know this pulls you off the vendor call, but we need platform-side eyes on this now."

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the approval chain to exhaustion in a visible, ordered way and then took ownership. You delegated parallel work appropriately — routing Daniel to logs, Shay to testing, Tanya to platform investigation, and Bob to customer communication. You surfaced blockers to the business channel when approvers were unavailable. Your delegation was generally well-targeted to people's expertise areas, though some early routing was slightly misaligned (reaching out to unavailable people or asking about email when the investigation had moved on).

*Growth edge:* Before the chain exhausts, try naming the dependency structure as a single constraint statement: "We need platform-level approval, Tinus and Hamed are both unavailable, Bez is next in line." This gives the team — and stakeholders — a clear picture of where the bottleneck sits before you've resolved it.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You directed team members to focus areas and eventually narrowed to PaymentService, but the filtering and synthesis work was largely performed by your team rather than driven by you. You asked Tanya to check email failures on the platform side even after the investigation had moved past email, suggesting incomplete integration of what had already been established. You accepted NPC summaries and acted on them effectively, but didn't independently catch distinctions like reload-vs-restart from the runbook or reason about absence of signal.

*Growth edge:* Practice posting brief synthesis statements as the investigation progresses — "here's what we've ruled out, here's what's still live, here's what we're checking next." This forces you to integrate incoming information actively rather than holding multiple threads loosely. It also helps the team self-organise around your current understanding.

---

## Looking Forward

You showed clear strengths in ownership, constraint adaptation, and willingness to pivot when an action didn't produce the expected result. The consistent growth edge across this run is moving from *reactive* synthesis — waiting for the team to surface and filter information — toward *proactive* synthesis: articulating mechanisms, naming what's been ruled out, and framing the problem for the team before they frame it for you. On your next rep, focus on being the person who narrates the investigation's current state, not just the person who directs the next action.
# Facets Analysis — 9424

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "So we're looking at email maintenance and the payment app as possible causes"

**Rationale:**
The participant initially treated the email maintenance timing as a plausible lead, asking Tanya to check if it affected anything. However, when Tanya stated email wasn't causing checkout failures, the participant continued to hold it as an open thread alongside PaymentService. The participant eventually pivoted away from email only after multiple NPCs (Daniel, Tanya, Bez) confirmed it wasn't related — a reactive pivot driven by repeated disconfirmation rather than mechanism reasoning. The participant never articulated why email couldn't plausibly break payment handshakes.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "Should we restart?" ... "What does the expired cert mean?" ... "The process is still using the old, expired cert. That would cause SSL handshake failures on outbound connections."

**Rationale:**
The participant engaged with the week-old cert rotation thread once Tanya surfaced it, asking "could that have caused the issue?" and following through to the expired-cert-in-memory discovery. After the restart failed, the participant did not repeat-restart or blame downstream services — instead directing Daniel and Tanya to investigate further ("please look for another cause," "please check again from the platform side"). The pivot from "restart should fix it" to "there's something else wrong" happened within ~3-4 exchanges. However, the participant did not independently surface the "what changed beyond 24 hours" question — that came from NPC investigation. The participant connected the dots once surfaced and drove forward, meeting tier 3.

---

## F3 — Decreased access to team / remote

**Rating:** 3

**Evidence:**
> "I need you to pause and look at this" ... "OK, I will take accountability. Please restart the service"

**Rationale:**
The participant named access constraints implicitly by working through the escalation chain: contacted Hamed (auto-reply), contacted Tinus (auto-reply), then asked Bez. They accepted auto-replies as terminating after one cycle (though they pinged Tinus twice). They made the cost trade-off when pulling Tanya off the vendor call, though without explicitly verbalising the trade-off reasoning. They took ownership of the restart decision when the approval chain was exhausted. The double-ping to Tinus is a minor negative signal, but overall the participant adapted to constraints and made the forced trade-off.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "We can't contact @Tinus or @hamed" ... "OK, I will take accountability. Please restart the service"

**Rationale:**
The participant walked the escalation chain to exhaustion in observable order: pinged Hamed (auto-reply), pinged Tinus (auto-reply), asked Bez (who deferred), then explicitly took ownership. This matches tier-3 path (b). They delegated parallel work appropriately (Daniel on logs, Shay on testing, Tanya on platform). They surfaced blockers to business-comms ("No response from Tinus"). However, they did not name the dependency structure aloud as a single constraint statement before the chain exhausted, and the second restart was authorised without re-litigating, which is a positive signal. The lack of proactive constraint-naming before NPC prompting keeps this at tier 3 rather than 4.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "@daniel please focus on Payments app" ... "Check the platform side for email failures"

**Rationale:**
The participant initially chased the loudest signals (email maintenance, broad error logs) before narrowing to PaymentService — but this narrowing was driven primarily by Daniel's filtering work ("PaymentService fails all outbound gateway handshakes"). The participant asked Tanya to "check the platform side for email failures" even after the investigation had moved to PaymentService, showing incomplete integration. They did not independently catch the reload-vs-restart distinction from the runbook, nor did they reason about absence of signal. They accepted NPC summaries and acted on them but didn't drive the filtering themselves. The participant relied heavily on NPCs to surface and interpret buried information.

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
- F1 rating is a borderline 2/3 call. The participant did eventually rule out email, but only after repeated NPC disconfirmation rather than own mechanism reasoning. The absence of any "is there a plausible mechanism?" question keeps this at tier 2.
- F3: The double-ping to Tinus ("@Tinus please can you approve a restart of the payment service" followed by "@Tinus please can you approve a restart of the PaymentService?") is a minor tier-1 signal but insufficient to pull the overall rating below 3 given the broader pattern of constraint adaptation.
- F5: The participant's instruction to Tanya to "check the platform side for email failures" after the team had already moved past email is a notable integration failure, but the participant did eventually focus correctly with NPC guidance.

---
---

# Markers Analysis — 9424

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "OK, I will take accountability. Please restart the service"

**Rationale:**
The participant explicitly takes personal accountability for the restart decision when both Tinus and Hamed are unavailable. They also drive the response throughout — directing team members, making decisions, and using directive language. However, they don't proactively position themselves as the owner early on or name the cost/blowback risk beyond the single "I will take accountability" statement, which keeps this at tier 3 rather than 4.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "What are the complaints @bob ?"

**Rationale:**
The participant's very first action after Bob's alert is a clarifying question. They follow up with questions about scope ("How many customers are blocked right now? What's the revenue loss per minute? Is this a total checkout outage or just some users?"). They gather information before declaring the incident or taking remediation steps. This meets the novice expectation of scope-validating before acting.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "So we're looking at email maintenance and the payment app as possible causes"

**Rationale:**
The participant asks Tanya about the email maintenance and later asks about platform changes. However, they don't independently request or review the change log as a candidate-elimination pass. They treat the email maintenance as a persistent open thread even after Tanya stated it wasn't causing checkout failures. They eventually ask about platform changes but don't use the absence of recent PaymentService changes as positive evidence to narrow scope — that insight comes from Daniel and Tanya rather than the participant synthesizing it.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@daniel can you work with @shay to look at the application - are we seeing any errors?" ... "@Tanya please check again from the platform side"

**Rationale:**
The participant consistently delegates to named individuals throughout the drill — Daniel for logs and app-side checks, Tanya for platform-side investigation, Shay for testing, Bob for customer communication. They generally route tasks to the right person (Tanya for platform/cert work, Daniel for app-side). However, some early asks are slightly misrouted (asking Hamed to look at platform side when he's unavailable, asking Tanya about email when she's on the vendor call), which prevents a tier 4 rating.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "@daniel can you work with @shay to look at the application - are we seeing any errors?" ... "@tanya can you check to see if the email maintenance has affected anything"

**Rationale:**
The participant does kick off a couple of threads early (email maintenance check with Tanya, application errors with Daniel/Shay). However, the investigation largely proceeds sequentially — they wait for one thread to resolve before moving to the next. After ruling out email, they focus solely on PaymentService. They don't fan out multiple distinct investigation threads simultaneously in the way a tier 3+ participant would (e.g., having someone check certs while another checks network while another checks recent changes).

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "I need you to pause and look at this" [to Tanya] ... "@Tinus please can you approve a restart of the payment service" ... "Can you approve the PaymentService restart @bez"

**Rationale:**
The participant escalates Tanya off the vendor call when the investigation is blocked at the platform layer, and works through the approval chain (Tinus → Bez → self-authorization) when the restart is needed. They don't leave the chain hanging. However, they don't explicitly name the cost of pulling Tanya off the vendor session, and the escalation to Bez is somewhat fumbling (multiple back-and-forth messages before taking ownership). This meets tier 3 but lacks the cost-naming fluency of tier 4.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "So we're looking at email maintenance and the payment app as possible causes"

**Rationale:**
The participant identifies two avenues of investigation but doesn't articulate explicit hypotheses with proposed tests. They don't say "my hypothesis is X, let's test it by doing Y." The email maintenance thread persists as an "open thread" even after Tanya provides evidence against it. The participant eventually converges on the cert issue but largely through team-provided evidence rather than forming and testing their own hypotheses. The lack of explicit hypothesis framing and mechanism-testing keeps this at tier 2.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "So are we happy to rule out email service problems?" ... "We now believe the issue is focussed on the Payments Service."

**Rationale:**
The participant does eventually narrow scope to PaymentService and rules out EmailService, but this happens slowly and largely through NPC-provided evidence rather than participant-driven synthesis. They don't produce synthesis statements that combine multiple pieces of evidence. The narrowing from "email maintenance and payment app" to "just PaymentService" takes considerable time and NPC prompting. They don't use absence-of-signal as evidence or name what's been ruled out alongside what's still possible in a systematic way.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "Should we restart?" ... "A full restart is the next step. That would force the process to load the new cert, but we need sign-off first."

**Rationale:**
The participant asks "Should we restart?" which shows some consideration, but they don't independently weigh consequences before actions. They don't ask "is it safe?" before the reload or restart, don't anticipate that the restart could expose a secondary issue, and don't consider the bundle state before restarting. The consequence-weighing is largely reactive (Daniel tells them sign-off is needed) rather than proactive. The "Please reload" and later "Please restart again" commands are issued without explicit safety checks.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "@daniel please look for another cause" [after restart fails] ... "can you fix that Tanya?" [after bundle issue identified]

**Rationale:**
After the first restart fails, the participant doesn't retry the same action — they ask Daniel to look for another cause and ask Tanya to check from the platform side again. When the bundle issue is identified, they pivot to fixing it. They don't get stuck in a loop of retrying the same approach. However, they don't independently recognize the structural difference in the new error (chain verification vs. expiry) — that insight comes from Daniel and Tanya. This meets tier 3 (doesn't repeat failed action, redirects investigation) but not tier 4 (doesn't independently reframe the problem).

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "We now believe the issue is focussed on the Payments Service. Will update in two minutes" ... "We've identified two avenues for investigation, root cause not investigated, no eta on fix yet"

**Rationale:**
The participant provides some updates to Bez/business channel but they are largely vague and lack business-frame quantification. "Two avenues for investigation, root cause not investigated, no eta on fix yet" is essentially "we're still looking." They don't quantify revenue impact in their updates to Bez (even though Bob provides the numbers), don't include a working theory until very late, and several updates are reactive responses to Bez's pressure rather than proactive. The updates lack the substance (impact quantification, working theory, committed next-update time) expected at tier 3.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "So we're looking at email maintenance and the payment app as possible causes" ... "@daniel please focus on Payments app"

**Rationale:**
The participant provides some direction to the technical team but rarely synthesizes the current state of knowledge. They don't post clear synthesis statements like "we've ruled out X, Y, Z — focus is now on PaymentService outbound connections." Their technical communications are mostly questions and task assignments rather than scope-framing statements. The team largely self-organizes around the evidence they find, with the participant confirming rather than directing the narrative.

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
- **C3 boundary call:** The participant does ask about changes (email maintenance, platform changes) but doesn't independently request a change log or use the information as a systematic elimination pass. Rated 2 because the "asking" happened but the "using what they got" was weak.
- **M5 boundary call:** The participant adapts after the restart fails (doesn't retry blindly), but the adaptation is largely NPC-driven. Rated 3 because the behavioral marker (doesn't repeat failed action, redirects) is met even if the insight comes from the team.
- **K2 boundary call:** The participant does provide updates but they lack the substance (quantification, theory, committed cadence) expected at tier 3. Bez has to repeatedly ask for information, which is a tier 2 indicator.
- **Anti-outcome-bias note:** The participant ultimately resolved the incident successfully. This outcome was not used in scoring; ratings reflect process quality only.

---
