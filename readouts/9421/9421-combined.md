# Snipe Hunt — Post-Drill Developmental Report

This drill puts you in the middle of a live checkout outage where multiple systems, team members, and approval chains intersect under time pressure. It's designed to stress your ability to reason through misleading signals, navigate hidden technical dependencies, and coordinate a distributed team when access is constrained. Here's what this run surfaced about your process.

## F1 — Misleading correlations

**Operating at: Not yet evident**

Early in the drill, you identified the email maintenance change as coinciding with the checkout failure and pursued it as the primary cause — requesting a rollback and pulling Tanya off her vendor call to action it. When Tanya explained that the email provider hadn't been touched and that confirmations were still flowing, the thread continued rather than being reconsidered. The pivot away from this correlation happened because another team member's investigation naturally redirected attention, not because you questioned the mechanism linking email maintenance to checkout failures.

The growth edge here is pausing when a correlation surfaces and asking: *could this plausibly cause the symptom I'm seeing?* A quick mechanism check — "how would an email change break payment processing?" — can save significant time and prevent pulling teammates off productive work.

## F2 — Hidden coupling

**Operating at: Practicing**

When the first restart didn't resolve the issue, you moved to suggesting a backup server switch — repeating a similar remediation rather than reframing the problem as structurally different. The cert rotation coupling and the reload-vs-restart distinction were surfaced by teammates rather than driven by your own investigation. You engaged with the cert thread once it was presented, but the recognition that a week-old change could manifest now wasn't something you articulated independently.

For the next rep, notice when a "standard fix" fails — that's a signal the problem's structure is different from what you assumed. Asking "why didn't that work?" before proposing the next action can open up the hidden-coupling reasoning earlier.

## F3 — Decreased access to team

**Operating at: Practicing**

You pulled Tanya from her vendor call without articulating the trade-off or economising on her availability. When Hamed and Tinus were unreachable, you walked the escalation chain and eventually reached Bez — showing persistence. However, there's room to grow in naming the constraint pattern explicitly and batching your asks to make the most of limited windows. When you direct someone away from another commitment, framing the cost ("I know this pulls you off the vendor window — here's specifically what I need from you") helps both of you make better decisions about where attention goes.

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

This was your strongest area in this run. You walked the approval chain methodically — Tinus, then Bez — and when both primary approvers were unavailable, you explicitly claimed authority as the escalation lead, named who was absent, and issued the directive. On the second restart after the bundle fix, you authorised without re-litigating. This shows you can recognise when a bottleneck needs to be broken and take ownership of that decision. Your delegation throughout was appropriately routed — directing Daniel toward logs, Tanya toward platform-side checks, Shay toward config.

The next growth edge is proactive sequencing: rather than waiting for each step to complete before initiating the next, look for opportunities to fan out work in parallel so that the approval chain and the technical investigation aren't blocking each other.

## F5 — Data overload / buried information

**Operating at: Practicing**

You asked Daniel for change request details and agreed to a deep-dive into PaymentService logs, which shows engagement with the information landscape. However, the filtering work — identifying that internal calls were clean, spotting the bundle ordering issue, connecting the cert rotation timeline — was largely driven by your teammates. You accepted summaries without much further interrogation and didn't produce synthesis statements that combined evidence to rule things out.

On the next rep, try narrating what you know so far: "email is ruled out, deploys don't match the timeline, so what's left?" This kind of active filtering helps you — and your team — converge faster on buried signals.

## Looking Forward

Two things to carry into your next drill: first, build a habit of testing mechanism before acting on correlation — even a single sentence asking "how would X cause Y?" can prevent extended pursuit of a dead end. Second, when a standard fix fails, treat that as new diagnostic information rather than a prompt to try the next standard fix. These two shifts will compound across the other areas — better mechanism reasoning will free up your team's time, and reframing after failure will help you surface hidden structure earlier.
# Facets Analysis — 9421

## F1 — Misleading correlations

**Rating:** 1

**Evidence:**
> "@tanya we have an MI and seems to coincide with email maintenance change" ... "can we roll back the email maintenance change" ... "@tanya this is an Major Incident -please action now" ... "I need you to leave maintenance call"

**Rationale:**
The participant locked onto the email maintenance correlation immediately and pursued it aggressively, demanding Tanya roll back and leave her vendor call, even after Tanya explicitly stated "Primary email provider hasn't been touched... Email confirmations have been going out, so this can't be causing checkout failures." The participant continued pressing Tanya on the email change despite this direct mechanism-disconfirmation. There is no evidence of the participant ever questioning whether email maintenance could plausibly break checkout, nor any pivot driven by mechanism reasoning. The pivot away from email only occurred because Daniel's investigation naturally led elsewhere — not because the participant recognised the correlation was spurious.

---

## F2 — Hidden coupling

**Rating:** 2

**Evidence:**
> "The restart didn't fix it?" ... "can we switch to back up server?" ... "switch to back up server" ... "can we get dev's to investigate"

**Rationale:**
After the first restart failed, the participant did not reframe the problem as structurally different. Instead, they proposed switching to a backup server (repeating a "more of the same" reflex) multiple times before eventually asking devs to investigate. The participant never articulated the reload-vs-restart distinction or the week-old cert rotation coupling in their own words. They engaged with the cert thread only after NPCs surfaced it (Daniel found CHG90123, Tanya explained the rotation). After the restart failed, the participant took approximately 5+ exchanges before moving past the backup-server idea, and only because NPCs redirected. This is reactive pivoting after concrete failure, consistent with tier 2.

---

## F3 — Decreased access to team

**Rating:** 2

**Evidence:**
> "@tanya this is an Major Incident -please action now" ... "I need you to leave maintenance call" ... "@hamed we have a Major incident" ... "@tinus - please approve restart payment service"

**Rationale:**
The participant pulled Tanya off her vendor call without articulating the cost trade-off or economising on her time. They pinged Hamed (on holiday) and Tinus (at summit) for approval, receiving auto-replies, and then moved to Bez — walking the chain but without naming the access constraints in their own words. There is no evidence of batching questions for Tanya, no articulation of the constraint pattern, and no visible cost reasoning when pulling Tanya from the vendor session. The participant did eventually walk the escalation chain and take ownership, but without the constraint-awareness language that would indicate tier 3.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "@tinus - please approve restart payment service" ... "@bez we need to restart payment service i need approval to do so?" ... "I am Major escalation lead, Hamed is away, along with Tinus. restart payment service now"

**Rationale:**
The participant walked the escalation chain in observable order: pinged Tinus (auto-reply), pinged Bez (not the approver), then explicitly took ownership by stating their role and the unavailability of approvers. This matches tier-3 path (b) — walking the escalation chain to exhaustion and then explicitly taking ownership. The ownership statement names the constraint ("Hamed is away, along with Tinus") and issues the authorisation as a distinct message. On the second restart (after bundle fix), the participant authorised without re-litigating. However, there is limited evidence of proactive sequencing or parallel work delegation, which prevents a tier-4 rating.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "@daniel - please share change request details since this issue occured" ... "@daniel yes" ... "Is this an issue with payment vendor, third party?"

**Rationale:**
The participant asked Daniel for change details and eventually agreed to deep-dive into PaymentService logs, but largely accepted NPC summaries without further interrogation. They did not independently filter to PaymentService — Daniel guided them there. They never engaged with the reload-vs-restart distinction in the runbook, never spotted the bundle ordering issue themselves, and did not reason about absence of signal (e.g., internal calls being clean). The participant relied heavily on NPCs to surface and interpret buried information (cert rotation history, bundle structure, chain ordering). They asked targeted questions occasionally but did not drive the filtering process.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 1 |
| F2 — Hidden coupling | 2 |
| F3 — Decreased access to team | 2 |
| F4 — Interdependencies / coordination bottlenecks | 3 |
| F5 — Data overload / buried information | 2 |
| **Mean Facet Score** | **2.00** |

---

## Caveats
- F1 rating of 1 is a boundary call: the participant did eventually stop pursuing the email lead, but this was driven entirely by Daniel's investigation redirecting attention to PaymentService rather than by any self-generated mechanism reasoning or acknowledgment that the email correlation was spurious. The participant never explicitly abandoned the email hypothesis — they simply stopped mentioning it once a new thread emerged.
- F4 tier-3 rating relies primarily on the escalation-chain-walk pattern (path b). The participant did not demonstrate strong parallel sequencing or proactive delegation, which would be needed for tier 4.
- The participant reached resolution, but per anti-outcome-bias reminders, this does not elevate process ratings. The resolution was heavily NPC-driven throughout.

---
---

# Markers Analysis — 9421

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "I am Major escalation lead, Hamed is away, along with Tinus. restart payment service now"

**Rationale:**
The participant explicitly claims authority as the escalation lead and makes the override call when both approvers are unavailable. They direct the team throughout and make decisions, though they don't explicitly name the cost/blowback of the override the way a tier-4 participant would. They drive the response but the ownership framing is somewhat late and reactive rather than proactive from the start.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "@bob what is issue? Is website down" ... "How many customers are blocked from checkout right now? What's the revenue loss per minute?" ... "Is this 100% of customers or just some? Give me an estimate of how much revenue we're losing every minute."

**Rationale:**
The participant's first response to Bob is a clarifying question about the nature of the issue. They follow up with questions about scope (all customers vs. some), revenue impact, and whether transactions are getting through at all. These are scope-validating questions asked before major remediation actions, meeting the tier-3 expectation.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "@daniel - please share change request details since this issue occured"

**Rationale:**
The participant asks Daniel for recent changes, which is good. However, after receiving the change log and Shay's note that "none of these changes look like they'd break checkout end-to-end," the participant doesn't use this as an elimination pass. Instead, they fixate on Tanya's email maintenance as the likely cause and push repeatedly for its rollback, despite Tanya explaining it's unrelated. They asked the question but didn't effectively use the answer to narrow scope.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@daniel - please share change request details since this issue occured" ... "@tanya - carry out roll back" ... "@shay check config"

**Rationale:**
The participant consistently uses @mentions to direct specific people for specific tasks — Daniel for logs and change details, Tanya for platform-side checks and cert work, Shay for config checks. The routing is generally appropriate (Tanya for platform/cert, Daniel for app-side). However, some asks are vague ("please advise," "please fix") rather than precisely scoped, which keeps this at tier 3 rather than 4.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "@daniel - please share change request details since this issue occured" ... "@tanya we have an MI and seems to coincide with email maintenance change"

**Rationale:**
The participant does engage multiple team members (Daniel, Tanya, Bob) but largely works sequentially — pursuing the email maintenance thread with Tanya, then moving to Daniel's logs, then back to Tanya for platform checks. There's limited evidence of deliberately fanning out multiple distinct investigation threads simultaneously. Most actions follow a serial pattern of one question, wait for answer, next question.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "@tinus - please approve restart payment service it is currentlu down" ... "@bez we need to restart payment service i need approval to do so?" ... "I am Major escalation lead, Hamed is away, along with Tinus. restart payment service now"

**Rationale:**
When the approval chain is exhausted (Hamed auto-reply, Tinus auto-reply), the participant escalates to Bez and then ultimately overrides by claiming authority. They work through the chain and don't leave it hanging. However, the escalation to Bez lacks strong context (doesn't name what's been tried, what's blocked, or the cost), and the override comes after some back-and-forth rather than decisively. This meets tier 3.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "@tanya we have an MI and seems to coincide with email maintenance change" ... "can we roll back the email maintenance change" ... "@tanya - who implements the payments certificate change?"

**Rationale:**
The participant's initial hypothesis (email maintenance caused the outage) is pursued but not explicitly framed as a testable hypothesis. When Tanya repeatedly states email is unrelated, the participant continues pushing for rollback rather than articulating why they believe it's the cause or what test would confirm/disconfirm. They don't explicitly name alternative hypotheses. The pivot to certs happens largely because the team surfaces it, not because the participant forms and tests the hypothesis themselves.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "Is this a total checkout outage or are any transactions getting through? I need numbers on affected customers and revenue loss."

**Rationale:**
The participant asks good scoping questions early (all customers vs. some, revenue impact). However, they don't synthesize evidence to narrow scope effectively. Despite Tanya stating email is unrelated and Daniel noting deployment timings don't match, the participant continues pursuing the email thread. They don't produce synthesis statements combining evidence to rule things out. The narrowing to PaymentService happens through Daniel and Tanya's investigation rather than the participant's synthesis.

---

## M4 — Considers potential consequences before acting

**Rating:** 1

**Evidence:**
> "can we roll back the email maintenance change" ... "restart now" ... "switch to back up server"

**Rationale:**
The participant repeatedly issues action commands without considering consequences. They push for email rollback without weighing the cost (Tanya's vendor window). They order the restart without checking the cert bundle on disk first. They suggest switching to backup without considering whether the same cert issue would apply. There are no "is it safe?" checks or consequence-weighing statements visible in the transcript.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 2

**Evidence:**
> "can we switch to back up server?" ... "can we get dev's to investigate"

**Rationale:**
After the first restart fails, the participant suggests switching to a backup server (repeated twice) rather than investigating why the restart didn't work. They don't recognize the new error as structurally different from the original. Eventually they ask for devs to investigate, which is a pivot, but it's vague rather than targeted. The team (Daniel, Tanya) drives the discovery of the bundle ordering issue; the participant follows rather than reframes.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "UPDATE payments service needs a two-cert bundle to authenticate, - Seems this was incorrect rotation"

**Rationale:**
The participant's communications to Bez are minimal and lack business framing. Early messages to Bez are approval requests rather than status updates. The one substantive update ("payments service needs a two-cert bundle") is technical rather than business-framed — no customer impact quantification, no ETA, no next-update commitment. Bez asks multiple times for ETAs and root cause without receiving substantive answers. The "15 mins to restore" estimate is provided once but without context.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "this is error when custoemr trties to complete order, i need dev and IT team to work to resolve this issue" ... "RCA - Under investigation"

**Rationale:**
The participant rarely synthesizes findings for the technical team. Messages to the team are mostly directives ("please fix," "please advise," "check config") rather than synthesis statements about what's known and what's been ruled out. They don't post state summaries like "it's not email, not deploys, focus on PaymentService outbound." The team self-organizes around findings rather than being oriented by the participant's synthesis.

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
| M4 — Considers potential consequences before acting | 1 |
| M5 — Adapts approach when initial path isn't working | 2 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.25** |

---

## Caveats
- L3 rating is a borderline 2/3 call. The participant does eventually claim authority ("I am Major escalation lead") but this comes late and only after multiple failed attempts to get approval from others. Rated 3 because they do ultimately make the override call without deferring further.
- M4 is rated 1 rather than 2 because there is genuinely no evidence of consequence-weighing anywhere in the transcript — not even a single "is it safe?" or acknowledgment of trade-offs.
- K2 is borderline 1/2. The participant does provide one technical update to the business channel, but it lacks business framing. Rated 2 because there is at least some communication to Bez, even if it's inadequate.
- Anti-outcome-bias note: The drill was ultimately resolved successfully, but this does not influence the process ratings above.

---
