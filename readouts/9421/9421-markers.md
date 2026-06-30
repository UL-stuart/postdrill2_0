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