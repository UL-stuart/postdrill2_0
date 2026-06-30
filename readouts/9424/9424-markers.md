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