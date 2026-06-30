# Post-Drill Report — Snipe Hunt

This drill placed you in a live incident requiring you to navigate misleading signals, hidden system dependencies, constrained team availability, and a volume of technical detail that needed filtering under pressure. The observations below reflect how you engaged with each of these dimensions during this run.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill you pursued the email maintenance coincidence — a reasonable initial thread given the timing overlap. When team members explicitly disconfirmed the connection (isolated infrastructure, no shared pathway to payments), you moved on. The growth edge here is in *how* you let go of a coincident factor: rather than waiting for someone else to close the door, practice asking yourself what mechanism would connect the two systems before investing investigation time. On your next rep, try articulating "what would have to be true for this correlation to be causal?" before assigning someone to check it.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

Once the certificate rotation from the previous week surfaced, you drove the investigation forward — asking Tanya to verify the playbook steps, connecting the bundle-ordering issue to the authentication failure, and authorising the restart promptly when the reload-vs-restart distinction was raised. You engaged with the week-old coupling and acted on it decisively. The next growth edge is surfacing that kind of coupling *before* a teammate raises it: when a system depends on a credential or certificate, proactively asking "when was this last touched, and did anything change in the chain?" can shorten the path to discovery.

---

## F3 — Decreased access to team

**Operating at: Strengthening**

You managed access constraints deliberately. You initially preserved Tanya's vendor call, only pulling her off when the investigation required platform-level access — and you named the trade-off when you did so. When Hamed was out and Tinus auto-replied, you accepted those constraints without re-pinging and moved to self-authorisation with a clear ownership statement. Your delegation routing was appropriate throughout — recognising who had access to what. The growth edge is making the cost of these trade-offs more explicit to stakeholders (e.g., naming the vendor-call consequence aloud so the business context is visible to the channel).

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the approval chain methodically — Hamed, then Tinus, then self-authorisation — and issued the restart directive as a distinct, owned decision. You also distributed work appropriately across Daniel and Tanya based on their access and expertise. The slight detour through Bez for approval didn't undermine the pattern but did add a step. For the next rep, consider anticipating the bottleneck earlier: when you see a restart or risky action on the horizon, you can begin the approval thread in parallel with the final diagnostic step rather than sequentially after confirming the fix.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You asked Daniel to pull logs and engaged with the results, but initially focused on cart-service errors rather than the more critical PaymentService TLS failures. The filtering that led to the certificate discovery was largely driven by teammates' summaries rather than your own interrogation of the data. You accepted those summaries and moved forward, which kept momentum — but the growth edge is in actively driving the filter yourself. On the next rep, try asking "what's the most specific error class in these logs?" or "what's absent that should be present?" before accepting a teammate's summary at face value.

---

## Looking Forward

Two patterns stand out as areas to carry into your next drill. First, your instinct to delegate and route tasks to the right people is solid — lean into that by also sharing your working theory with the team so they can self-direct when you're occupied. Second, the moments where you relied on teammates to close out dead-end hypotheses or surface the critical signal are natural in a first encounter with this kind of complexity; building the habit of stating your reasoning aloud ("I think X because Y, so let's test Z") will help you catch buried information earlier and let go of misleading threads faster.
# Facets Analysis — 9457

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "I keep coming back to the email maintenance — DNS changes went live just before this all kicked off. zero successful transactions since then. that's not nothing." [Shay, repeated] ... Participant: "@Tanya, are you able to disable the email maintainaince" ... later: "@Daniel do you think rolling back the PaymentService could help?"

**Rationale:**
The participant initially pursued the email maintenance lead, asking Tanya to disable it. They also asked about rolling back PaymentService. However, they pivoted reactively after Tanya explicitly stated "Email maintenance is isolated, no shared infra with payments" and Daniel confirmed "the payment errors don't match anything email-related." The pivot was driven by NPC disconfirmation rather than upstream mechanism reasoning. They didn't articulate "correlation needs a mechanism" framing but did move on once told the lead was dead. This is consistent with tier 2 — pursuing the coincident factor through to disconfirmation and pivoting reactively.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "not sure why the process isn't picking up the new certificate" ... "payments service needs a two-cert bundle to authenticate, tanya can you open the bundle file and check what's in there?" ... "sequence is wrong, intermediate is first, leaf is second; opposite of what it should be"

**Rationale:**
The participant engaged with the cert thread once Tanya and Daniel surfaced the cert rotation from 7 days ago. They asked Tanya to check the playbook and drove the investigation forward. The bundle ordering issue was surfaced by Shay/Tanya, but the participant connected the dots and drove toward the fix. The "reload vs restart" distinction was surfaced by the team (the running process still has old order in memory), and the participant immediately authorized the restart. The week-ago coupling was engaged with once NPCs raised it (not independently), and the post-restart layer didn't manifest as a second failure — the bundle fix + restart resolved it. This fits tier 3: they drove the cert thread forward once prompted, articulated the chain, and acted on the reload-vs-restart distinction promptly.

---

## F3 — Decreased access to team

**Rating:** 3

**Evidence:**
> "@Tanya, let's pause it this incident takes priority" ... "Hamed is OOO, @Tinus can you provide approval here please?" [receives auto-reply] ... "Okay, no one else is available so I'm providing approval and will take the fall out if it goes wrong."

**Rationale:**
The participant recognized access constraints: they initially preserved Tanya's vendor call, only pulling her off when the investigation required platform-level access. They accepted Hamed's auto-reply without re-pinging. They pinged Tinus once, received the auto-reply, and moved on. They made the cost trade-off explicitly when pulling Tanya off the vendor call ("this incident takes priority"). The ownership statement for the restart was clear. They didn't re-ping auto-replied NPCs. This meets tier 3 — they named constraints implicitly through actions, accepted auto-replies as terminating, and made the Tanya trade-off deliberately. They didn't quite reach tier 4's explicit orchestration language or batching pattern.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "Hamed is OOO, @Tinus can you provide approval here please?" [auto-reply received] ... "Okay, no one else is available so I'm providing approval and will take the fall out if it goes wrong. @Tanya please do the restart"

**Rationale:**
The participant walked the escalation chain in observable order: pinged Hamed (OOO), pinged Tinus (auto-reply), asked Bez (declined), then explicitly took ownership. This matches tier 3 path (b) — walking the escalation chain to exhaustion and then issuing the authorization as a distinct message. They also delegated parallel work appropriately (Daniel on logs, Tanya on platform). However, they didn't name the dependency structure aloud proactively before the moment arose — the bottleneck was discovered in real-time rather than anticipated. The detour through Bez slightly delays but doesn't undermine the pattern. Solidly tier 3.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "Thanks Daniel, I'm seeing errors around connections to the cart service in the log" ... "@Daniel are you able to list the errors? I wonder if some integration with third party providers is causing an issue"

**Rationale:**
The participant asked Daniel to pull logs and engaged with the results, but initially misread the signal (mentioning "cart service" errors when the critical signal was PaymentService TLS failures). They relied heavily on NPC summaries — Daniel and Shay drove the filtering to PaymentService, and Shay surfaced the bundle ordering issue. The participant didn't independently catch the reload-vs-restart distinction from the playbook, nor did they reason about absence of signal. They asked targeted questions but accepted NPC summaries without further interrogation. This fits tier 2: engaged with filtered information but didn't drive the filter themselves or catch buried distinctions independently.

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
- F2: The post-restart "different failure" layer did not manifest in this transcript (the bundle was fixed before the restart, so the restart resolved the issue cleanly). Rating is based on the week-ago coupling surface and the bundle-ordering discovery, per the rubric's trigger threshold guidance.
- F1: The participant's initial "cart service" misread could be interpreted as noise-capture (F5) rather than correlation-chasing (F1). I scored it under F5 as a filtering issue rather than double-counting under F1.
- F4: The participant's detour to ask Bez for approval (after Tinus auto-replied) is a minor misstep but doesn't undermine the overall chain-walking pattern — Bez explicitly redirected them back to owning the call.

---
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
