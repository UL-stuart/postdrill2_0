---

# Markers Analysis — 9458

## L3 — Takes explicit ownership of the response

**Rating:** 2

**Evidence:**
> "i'll get approval to reboot intra day" / "@bez we're confident in a potential fix, we are stuck without approval and we need Tinus sign off. Without we are stuck in the water"

**Rationale:**
The participant attempts to drive the response forward but never explicitly takes ownership of the decision or accepts personal accountability. They repeatedly seek approval from others (Bez, Tinus, Hamed) without ever making the override call themselves. They never say "I authorize" or "blowback's on me." They remain stuck at the approval gate until the drill ends, showing reactive rather than proactive ownership.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "@bob where are the complaints from, hwo frequent?" / "How many customers are blocked from checking out? What's the revenue loss per minute right now?" / "Is this a total checkout outage or are some transactions still going through? Need clarity on scope."

**Rationale:**
The participant's first actions after Bob's report are scope-validating questions about region, frequency, and whether it's a total outage. They ask about revenue impact and scope before declaring the incident or taking remediation action. This aligns with tier 3 — first substantive moves include scope-validating questions before acting.

---

## C3 — Checks for recent changes

**Rating:** 3

**Evidence:**
> "Shay provide all the other recent changes please" / "Can you detail both those CHeckout Services please" / "right now the changes arent suggesting the root cause"

**Rationale:**
The participant explicitly requests the change log from Shay, drills into specific changes (both CheckoutService deploys), and then synthesizes that the changes aren't suggesting the root cause. They use the change log as a candidate-elimination pass rather than immediately rolling back. They don't articulate a mechanism-based elimination as explicitly as a tier-4 participant would, but they clearly use the information to rule out deploys.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "please pull logs Daniel" / "@tanya, systeatically work through Payment Service, Email Service, and SHipping service erros" / "Shay provide all the other recent changes please"

**Rationale:**
The participant names specific people for specific tasks throughout the drill — Daniel for logs, Shay for change details, Tanya for platform investigation. The routing is generally appropriate (Tanya for platform/cert work, Daniel for app-side logs). However, some asks are slightly vague ("systematically work through... errors") rather than precisely scoped, keeping this at tier 3 rather than 4.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "please pull logs Daniel" / "Shay can you summarise those DNS changes so we can understand them better?"

**Rationale:**
The participant mostly works sequentially — asking Shay for changes, then drilling into them, then asking Daniel for logs, then waiting for results. While there are moments where multiple people are engaged, the participant doesn't explicitly fan out multiple distinct investigation threads simultaneously. The investigation proceeds largely one thread at a time.

---

## C7 — Escalates when stuck

**Rating:** 2

**Evidence:**
> "@bez please see above, we need your approval" / "@tinus if you can see this can you or Bez give us approval to reboot payment service intra day" / "What's the procedure to escalate if Tinus can;t be contacted team?"

**Rationale:**
The participant attempts escalation repeatedly but without quality context in most pings — many are just repeated requests for approval without naming what's blocked or the business cost clearly. They never commit to an override or find a Plan B when both Tinus and Hamed are unavailable. They ask "what's the procedure?" rather than taking decisive action. The escalation lacks the concrete framing and follow-through expected at tier 3.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "root cause unclear yet, potential DNS issues" / "right now the changes arent suggesting the root cause" / "are we sure this payment service is actually going to fix here?"

**Rationale:**
The participant mentions "potential DNS issues" early but doesn't articulate this as a formal hypothesis with a proposed test. They acknowledge changes aren't the cause but don't explicitly name alternative hypotheses. The investigation proceeds more reactively — following NPC suggestions (Daniel's logs, Tanya's cert findings) rather than forming and testing their own hypotheses. The cert bundle fix is identified largely through NPC-driven investigation rather than participant-articulated hypothesis testing.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 3

**Evidence:**
> "right now the changes arent suggesting the root cause" / "it's the biggest cuplrit there" (referring to PaymentService in logs) / "she's tied up and we risk future problems if we pull her"

**Rationale:**
The participant uses the change log to rule out recent deploys, uses Daniel's log output to identify PaymentService as the failing component, and narrows from multiple services to the PaymentService outbound handshake. They synthesize evidence to focus the investigation, though much of the narrowing is driven by NPC findings rather than participant-initiated synthesis statements. Still meets tier 3 for using concrete evidence to rule things out.

---

## M4 — Considers potential consequences before acting

**Rating:** 3

**Evidence:**
> "she's tied up and we risk future problems if we pull her" / "@bez Tanya is reallly the missing piece here... She can pause, but we'd lose the rollout slot and have to wait about 2 weeks to reschedule. I will await your approval"

**Rationale:**
The participant explicitly names the cost of pulling Tanya off the vendor call (losing the 2-week rollout slot) and seeks approval before proceeding. They also note the risk of restarting without approval ("Last time we did a payments restart mid-day, it caused a brief outage"). They weigh consequences before high-impact actions, meeting tier 3. However, they don't anticipate secondary failure modes (like the bundle order issue) before the restart.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 2

**Evidence:**
> "can we roll out another fix instead that doesnt require such locked down approval" / "or intorduce the fix we have in a different way" / "Hypothetically If i ask to reboot without approval, would you do it"

**Rationale:**
The participant does pivot away from the DNS/email maintenance hypothesis toward the cert issue (though this is largely NPC-driven). However, when stuck at the approval gate, they attempt creative workarounds but never actually adapt their approach — they keep asking for approval in different ways without taking decisive action. The drill ends with them still stuck. They don't override or find an alternative path, showing inability to adapt when the approval approach repeatedly fails.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "Potential DNS failure, TTR ETA is 10mins from now" / "root cause unclear yet, potential DNS issues" / "5 more mins" / "Thosuands a minute here"

**Rationale:**
The participant provides some updates to Bez but they are largely vague or incomplete. "Potential DNS failure, TTR ETA is 10mins from now" gives an ETA but the root cause framing is incorrect. "5 more mins" is a bare time estimate without context. They never provide a structured update with scope, impact in business terms, current working theory, and next-update commitment in a single coherent message. Updates are reactive to Bez's prompting rather than proactive.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "right now the changes arent suggesting the root cause" / "we need to idnetify the breakpoint in the chain" / "Tanya, systeatically work through Payment Service, Email Service, and SHipping service erros"

**Rationale:**
The participant makes some scope statements ("changes aren't suggesting the root cause," "need to identify the breakpoint") but rarely posts full synthesis messages that name what's been ruled in and out. They don't clearly communicate to the team what the current working picture is at decision points. Most of their technical channel messages are questions or delegations rather than state-of-the-world summaries that orient the team.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 2 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 3 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 2 |
| C7 — Escalates when stuck | 2 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 3 |
| M4 — Considers potential consequences before acting | 3 |
| M5 — Adapts approach when initial path isn't working | 2 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.42** |

---

## Caveats
- The participant identified the cert bundle order issue and requested the fix, but the drill ended before the restart could be executed due to the approval deadlock. This is not held against them for outcome-bias reasons, but the inability to resolve the approval impasse does reflect on L3, C7, and M5 process markers.
- The participant's verification of the bundle order ("@tanya cna you run this... openssl verify") and identification that "sequence is wrong" shows technical engagement that partially compensates for the NPC-driven nature of earlier investigation steps. However, it's unclear whether this was participant-initiated insight or prompted by NPC suggestions, which creates some uncertainty in M2 scoring.
- K2 scoring is a boundary call between 1 and 2; the participant does provide some information to Bez but it's consistently thin and reactive. Rated 2 because there is engagement, just inconsistent and lacking substance.

---