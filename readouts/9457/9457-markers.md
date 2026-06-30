---

# Markers Analysis — 9457

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "Okay, no one else is available so I'm providing approval and will take the fall out if it goes wrong. @Tanya please do the restart"

**Rationale:**
The participant explicitly takes ownership of the restart decision when both approvers are unavailable, naming the consequence ("will take the fall out if it goes wrong"). They also drive the response throughout — declaring the incident, directing team members, and providing stakeholder updates. However, they initially tried to push the approval to Bez before taking it on themselves, which slightly delays the ownership moment compared to a tier-4 performance.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "@bob what is the nature of the complaints?"

**Rationale:**
The participant's first action after Bob's alert is a clarifying question about the nature of the complaints. They also ask about revenue loss per minute and scope before taking action. They don't jump to remediation immediately. However, the questions are somewhat basic (nature of complaints) rather than deeply targeted (specific error codes, payment methods, etc.), placing this at tier 3 rather than 4.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "@Tanya can you check if there have been any recent changes to those services."

**Rationale:**
The participant asks about recent changes and eventually learns there hasn't been a PaymentService deployment in ages. However, they don't use the change log as a candidate-elimination tool. They repeatedly circle back to the email maintenance as a possible cause even after evidence suggests otherwise, and they ask about rolling back PaymentService despite being told there's nothing to roll back. They asked the question but didn't effectively use the answers to narrow scope.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@Daniel can you confirm Tanya's theory that the email maintainance shouldn't be causing this please" ... "@Tanya, can you double check the playbook to ensure that every step was followed?"

**Rationale:**
The participant consistently uses @mentions to assign specific tasks to specific people — Daniel for logs and app-side checks, Tanya for infrastructure and cert checks, Bob for customer confirmation. They generally route tasks to the right person (e.g., recognizing Daniel doesn't have server access and directing platform tasks to Tanya). The delegation is clear and appropriately targeted throughout.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "@Daniel are you able to list the errors? I wonder if some integration with third party providers is causing an issue"

**Rationale:**
The participant largely works sequentially through the investigation — asking one question, waiting for a response, then asking the next. There are few instances of multiple distinct tasks being delegated simultaneously to different team members. Most of the investigation proceeds as a single thread moving from email maintenance → logs → payment service → certs, rather than fanning out multiple concurrent threads.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "@Tanya, let's pause it this incident takes priority" ... "Hamed is OOO, @Tinus can you provide approval here please?"

**Rationale:**
The participant escalates Tanya off the vendor call when the investigation is blocked at the platform layer, and works through the approval chain (Hamed → Tinus → self-authorization) when both are unavailable. They don't leave the chain hanging. However, they don't explicitly name the cost of pulling Tanya off the vendor call (the 2-week window loss), and they initially try to push the restart approval to Bez before taking it themselves, showing slight hesitation.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "Is that consistent with what we'd see if the 3rd party payment providers are having issues? Would that explain the errors in the other services?"

**Rationale:**
The participant asks some hypothesis-testing questions (e.g., whether third-party provider issues would explain the errors), but rarely articulates explicit hypotheses before testing them. They don't clearly state "my hypothesis is X, let's test it by doing Y." The email maintenance thread persists as a vague concern without being formally tested and disposed of. The investigation proceeds more reactively than hypothesis-driven.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "Thanks Daniel, I'm seeing errors around connections to the cart service in the log" ... "@Daniel do you think rolling back the PaymentService could help?"

**Rationale:**
The participant occasionally uses evidence to narrow scope (e.g., recognizing payment errors don't match email-related issues), but misses key narrowing opportunities. They ask about rolling back PaymentService after being told there's nothing to roll back. They don't produce clear synthesis statements that combine multiple pieces of evidence into a tighter scope. The narrowing happens more through NPC guidance than participant-driven synthesis.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "Okay, no one else is available so I'm providing approval and will take the fall out if it goes wrong."

**Rationale:**
The participant acknowledges potential consequences of the restart ("will take the fall out if it goes wrong"), which shows some consequence awareness. However, they don't ask "is it safe?" before other actions, don't consider whether the cert bundle might cause a secondary failure after restart, and don't add qualifiers like "gradually" or "carefully" to the restart instruction. The consequence consideration is limited to the approval moment rather than being a consistent pattern.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "@Daniel do you think rolling back the PaymentService could help?" → "There hasn't been a PaymentService deployment in ages, so there's nothing to roll back." → "@Tanya can you check if there has been any infrastructure changes that would affect the payment service?"

**Rationale:**
The participant does pivot when paths are exhausted. After learning email maintenance isn't the cause, they move to logs. After learning there's nothing to roll back on PaymentService, they redirect to infrastructure checks. They don't get stuck in a rollback loop. However, the pivots are somewhat slow and often prompted by NPC responses rather than proactive reframing. The investigation eventually reaches the cert issue through progressive elimination.

---

## M5 — Adapts approach when initial path isn't working

*Already scored above.*

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "Revenue loss is £1,000 to £1,500 per minutes, all customers are prevented from checking out" ... "We believe there are errors in the checkout service, investigating now"

**Rationale:**
The participant provides some updates to Bez, including revenue impact numbers. However, the updates are often vague ("We're seeing errors across multiple services, still trying to determine a link"), lack a working theory, and don't consistently commit to next-update times. When Bez asks for an ETA, the participant says "Can't say but hopefully within the next 15 minutes" — somewhat vague. The updates improve slightly later but remain below tier-3 expectations for substantive business framing.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "We believe the errors are calls by failing requests out to third party services, investigating with the team now"

**Rationale:**
The participant rarely posts synthesis statements to the technical channel that summarize what's been ruled in and out. Most communication with the team is question-and-answer rather than state-sharing. They don't clearly articulate "we've ruled out X, focusing on Y now" for the team's benefit. The team members (Daniel, Shay) often provide more synthesis than the participant does, and the participant's messages are mostly reactive rather than orienting.

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
- For C3, the participant asked about changes but repeatedly returned to the email maintenance hypothesis despite evidence against it, and asked about rolling back a service with no recent deployments. This is a borderline 2/3 call; rated 2 because the change-log information was not effectively used for elimination.
- For M5, the participant does eventually pivot but often only after NPC responses force the pivot rather than proactively recognizing the path is exhausted. Rated 3 because they don't get stuck in repetitive loops (unlike tier-1 examples in the rubric).
- K2 is a borderline 2/3 call. The participant provides revenue numbers (which is good) but the updates lack working theories, committed next-update times, and business framing. Rated 2 because the updates are more reactive to Bez's prompting than proactive.

---