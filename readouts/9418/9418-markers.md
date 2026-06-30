---

# Markers Analysis — 9418

## L3 — Takes explicit ownership of the response

**Rating:** 2

**Evidence:**
> "we are looking on it. will try to close issue ASAP" / "I working on it. will try to close issue ASAP" / "we can go to bez for approval" / "Or try once asking Bez in business channel"

**Rationale:**
The participant never explicitly takes ownership of the response or positions themselves as the decision-maker. When the restart approval is needed and both Hamed and Tinus are unavailable, the participant suggests asking Bez rather than making the override call themselves. There is no "I authorize" or "this is my call" moment. The participant reacts to events rather than driving the response.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "Hi @bob can you please give more info about complains ? what is impact" / "How many customers are blocked right now? What's the revenue loss per minute? Is this a total checkout outage or just some users?"

**Rationale:**
The participant's first actions after Bob's opening are scope-validating questions about impact, customer count, and whether it's a total outage. They ask about revenue loss per minute and scope before taking action. This meets the novice expectation of gathering information before acting, though the questions are somewhat formulaic rather than pattern-seeking.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "hi @shay want the full deployment list" / "please do roll back all changes from that time the issue start" / "Shipping Service ProductCatalogueService"

**Rationale:**
The participant asks for the deployment list and reviews recent changes, which is good. However, despite Shay explicitly stating "none of these changes look like they'd break checkout end-to-end like this," the participant proceeds to roll back multiple changes (CheckoutService, ShippingService, ProductCatalogueService) without articulating a mechanism connecting any of them to the symptom. They asked the question but ignored the answer, using the change log as a rollback queue rather than an elimination tool.

---

## C4 — Delegates tasks to specific people

**Rating:** 2

**Evidence:**
> "also @hamed and @daniel can you please confirm logs ?" / "Hi @maya i can see handshake failure can you please look into it ?" / "Hi @tanya can you please look"

**Rationale:**
The participant does use @mentions to direct tasks to specific people. However, the asks are often vague ("confirm logs," "can you please look") rather than specific tasks with clear scope. They also task Hamed who is on holiday, and ask Maya about handshake failures when Tanya is the platform/cert expert. The routing doesn't consistently reflect understanding of NPC access boundaries.

---

## C6 — Runs parallel investigation threads

**Rating:** 1

**Evidence:**
> "please pull records" / "hi @shay send me recent changes list" / "please check logs"

**Rationale:**
The participant works almost entirely sequentially — asking one question, waiting for a response, then asking the next. There is no evidence of fanning out multiple distinct investigation threads to different team members simultaneously. Tasks are issued one at a time with no concurrent investigation visible in the transcript.

---

## C7 — Escalates when stuck

**Rating:** 2

**Evidence:**
> "@tanya we want to give more priority on on current P1 can you please join to resolve p1" / "we can go to bez for approval" / "Or try once asking Bez in business channel"

**Rationale:**
The participant does pull Tanya off the vendor call, which is a valid escalation. However, when the restart approval is blocked (both Hamed and Tinus unavailable), the participant suggests asking Bez — who can't approve restarts — and the drill ends without resolution. The escalation lacks concrete context and the participant doesn't work the chain effectively or make an override decision. The Tanya pull is reasonable but the approval escalation is ineffective.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "@tanya roll back CHG90123 it will works ?" / "do you are you sure about there is no dependency about DNS maintenance and issue ? any evidence ?"

**Rationale:**
The participant does not explicitly articulate hypotheses. They pursue the DNS/email maintenance lead by questioning Tanya about it, and later pursue the cert rotation, but never frame these as testable hypotheses. The rollback actions (CheckoutService, ShippingService, ProductCatalogueService) are executed without stating what theory they're testing. The closest to hypothesis-testing is asking Tanya about the DNS dependency, but it's more of a question than a formed-and-tested hypothesis.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "looks like handshake failure on the way to ClearBank." / "can we restart the service ?"

**Rationale:**
The participant eventually arrives at the handshake failure and ClearBank connection as the scope, but this is largely driven by NPC findings (Daniel's logs, Tanya's investigation) rather than the participant synthesizing evidence themselves. They don't produce synthesis statements that combine multiple pieces of evidence to rule things out. The narrowing happens passively through NPC reports rather than active participant-driven elimination.

---

## M4 — Considers potential consequences before acting

**Rating:** 1

**Evidence:**
> "please do roll back all changes from that time the issue start" / "can we restart the service ?"

**Rationale:**
The participant never asks "is it safe?" or considers potential side effects before ordering rollbacks or requesting a restart. Multiple rollbacks are ordered without weighing consequences. The restart request comes without any consideration of whether the on-disk cert is correct or whether a restart might surface a secondary issue. No consequence-weighing language appears anywhere in the transcript.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 2

**Evidence:**
> "please do roll back all changes from that time the issue start" / "Shipping Service ProductCatalogueService" / "Hi @shay still we able to any error logs ?"

**Rationale:**
After the first rollback (CheckoutService) fails, the participant orders more rollbacks (ShippingService, ProductCatalogueService) — staying in the same rollback frame rather than pivoting. Eventually they do shift to log analysis and the cert thread, but this transition is slow and largely prompted by NPCs (Daniel and Shay pointing to PaymentService). The participant doesn't explicitly recognize that rollbacks aren't working and reframe the problem; the pivot happens passively. The drill ends before the secondary failure (post-restart bundle issue) is encountered.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 1

**Evidence:**
> "we are looking into it." / "we have rolled back few changes and testing" / "I will get back you with more details" / "we are working on it to solve"

**Rationale:**
Every update to Bez is vague and non-substantive. There is no quantification of impact in business terms, no working theory shared, no committed next-update time, and no ETA. Bez explicitly asks for specifics multiple times ("That's not specific enough," "Still no ETA?") and the participant continues providing empty reassurances. This is the textbook tier-1 pattern described in the rubric.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "looks like handshake failure on the way to ClearBank." / "can you please check the cert details and location correct ?"

**Rationale:**
The participant makes one brief synthesis statement ("looks like handshake failure on the way to ClearBank") but this is essentially echoing what Daniel and Tanya have already reported rather than synthesizing multiple threads. There are no substantive "here's what we know, here's what we've ruled out" messages to orient the team. The participant mostly asks questions and relays NPC findings back without adding synthesis or direction.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 2 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 2 |
| C4 — Delegates tasks to specific people | 2 |
| C6 — Runs parallel investigation threads | 1 |
| C7 — Escalates when stuck | 2 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 2 |
| M4 — Considers potential consequences before acting | 1 |
| M5 — Adapts approach when initial path isn't working | 2 |
| K2 — Provides substantive updates to business stakeholders | 1 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **1.83** |

---

## Caveats
- The drill ended before the participant could attempt the restart and encounter the secondary failure (misordered bundle), so M5 was evaluated only on the rollback-to-cert pivot, not the post-restart pivot. This limits the ceiling for M5 observation but does not warrant N/A since the rollback-failure pivot opportunity was fully present.
- C7 is a borderline 2/3 call — pulling Tanya off the vendor call is a valid escalation, but the quality of the ask and the failed approval escalation at the end pull it down to 2.
- Some of the participant's messages have grammatical issues that make intent slightly ambiguous, but ratings are based on observable actions and their effects rather than inferred intent.

---