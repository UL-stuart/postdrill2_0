# Post-Drill Developmental Report

This drill placed you in a live incident with layered complexity: misleading surface signals, a root cause hidden behind a time-delayed change, constrained access to key people, and a coordination bottleneck around remediation approval. The design pressures your ability to reason through noise, manage dependencies, and drive toward resolution when the path forward isn't straightforward.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you pursued the email/DNS correlation as a likely cause, directing investigation toward DNS changes and telling the business stakeholder it was a potential DNS failure. You did eventually move away from this thread — but the pivot came reactively, after an NPC explicitly disconfirmed the email-maintenance link and after logs surfaced TLS handshake failures in the payment service. The inconsistency showed up in moments where you acknowledged changes weren't suggesting the root cause, yet still directed the team to start with the email service as "the biggest culprit."

**Growth edge:** Practice articulating *why* a correlation might or might not represent causation before committing investigation effort. When you notice a surface-level match (email maintenance + checkout failures), pause to ask: "What mechanism would connect these?" If you can't name one, deprioritise it earlier.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

Once the week-old certificate rotation surfaced as a candidate, you engaged with it systematically. You directed Tanya to open the bundle file, and you independently identified the ordering problem — recognising that the intermediate and leaf certificates were sequenced incorrectly. You connected the cert rotation from seven days prior to the current failure. The coupling wasn't something you surfaced on your own (the NPC investigation brought the change into view), but once it was visible, you drove the technical reasoning forward.

**Growth edge:** Work on independently asking "what changed beyond the obvious window?" Earlier in the drill, your change-log review focused on recent deploys. Expanding your temporal aperture — asking what changed in the past week or two, not just the past day — could help you surface hidden couplings before an NPC does.

---

## F3 — Decreased access to team

**Operating at: Strengthening**

You recognised the access constraints clearly: Hamed out of office, Tinus at the summit, Tanya on a vendor call with a two-week rescheduling cost. You named these constraints explicitly and made a reasonable trade-off decision by escalating to Bez to pull Tanya off the call, framing the cost clearly. Where this became less efficient was in the repeated pings to Bez and Tinus for restart approval — five or more messages without restructuring your approach when responses were non-committal or absent.

**Growth edge:** When you've named a constraint and your first escalation attempt doesn't land, shift to a different strategy rather than repeating the same request. Ask yourself: "If this person doesn't respond in the next two minutes, what's my Plan B?" That reframe can move you from waiting to adapting. Your delegation to specific people with appropriate routing (Daniel for logs, Tanya for platform work, Shay for change details) was a strength here — carry that forward.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Practicing**

You recognised the coordination bottleneck — the restart required approval from people who were unavailable — and you walked the escalation chain methodically. You explored creative workarounds, asking whether a different fix could bypass the approval requirement or whether the team would hypothetically restart without sign-off. But you never arrived at taking ownership of the override decision yourself. The drill ended with you asking "what's the procedure to escalate?" — still looking for external authorisation rather than making the call.

**Growth edge:** In situations where the approval chain is exhausted and the business impact is clear, practice framing the decision as yours to own: "Given X impact and Y unavailability, I'm making this call and accepting the consequences." You demonstrated awareness of the business cost (revenue loss per minute) — the next step is connecting that awareness to a decision you personally authorise. You weighed consequences well when deciding to pull Tanya off the vendor call; apply that same decisiveness to the restart decision.

---

## F5 — Data overload / buried information

**Operating at: Strengthening**

You filtered effectively once the investigation was underway — requesting PaymentService-specific logs from Daniel, moving past the noisy email errors once payment TLS failures appeared, and driving toward the bundle file as the specific artifact to inspect. You integrated information across multiple channels (logs, cert investigation, the activity document) and independently read the bundle output to identify the ordering issue.

**Growth edge:** Push yourself to synthesise the current state of the investigation aloud for the team at key decision points. You narrowed scope well internally, but your technical channel messages were mostly questions and delegations rather than "here's what we know, here's what's ruled out, here's what we're testing next." That synthesis step helps the team stay oriented and can surface gaps in your own reasoning.

---

## Looking Ahead

Carry forward your willingness to engage with technical artifacts directly — reading the bundle file and identifying the ordering problem showed real diagnostic ownership. On your next rep, focus on two things: expanding your temporal window when reviewing changes (ask about the past week, not just the past day), and practising the moment where you shift from seeking approval to owning the decision. Both are edges where small shifts in habit will change how the drill unfolds.
# Facets Analysis — 9458

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "right now the changes arent suggesting the root cause" ... "Lets start with Email serice" ... "it's the biggest cuplrit there"

**Rationale:**
The participant initially pursued the email/DNS correlation heavily (asking Shay to summarize DNS changes, telling Bob "Potential DNS failure"), but did eventually pivot after Tanya explicitly stated email maintenance couldn't cause checkout failures and after Daniel's logs showed PaymentService TLS handshake failures. The pivot was reactive — driven by concrete log evidence rather than mechanism reasoning. The participant stated "right now the changes arent suggesting the root cause" (tier-2/3 territory) but then still said "Lets start with Email service" and called it "the biggest culprit," showing inconsistency. Pivot latency was moderate (several exchanges after Tanya's disconfirmation), placing this solidly in tier 2.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "payments service needs a two-cert bundle to authenticate, tanya can you open the bundle file and check what's in there?" ... "sequence is wrong, intermediate is first, leaf is second; opposite of what it should be"

**Rationale:**
The participant engaged with the week-old cert rotation thread once it was surfaced by the NPC (Shay/Tanya identified CHG90123). They recognized the expired cert issue and moved forward to investigate the bundle. Critically, the participant identified the bundle ordering problem themselves ("sequence is wrong, intermediate is first, leaf is second") and drove the fix forward. They connected the cert rotation from 7 days ago to the current failure. However, they did not independently surface the "what changed beyond 24 hours" question — that came from NPC investigation. The reload-vs-restart distinction was referenced by the activity doc rather than independently caught. This represents systematic engagement with the hidden coupling once surfaced, meeting tier 3.

---

## F3 — Decreased access to team

**Rating:** 3

**Evidence:**
> "@bez please see above, we need your approval" ... "Hamed is OOO and Tinus is busy at the Summit, what other options do we have here?" ... "okay so that's clearly not an option"

**Rationale:**
The participant recognized access constraints — noting Hamed's OOO status, Tinus at the summit, and Tanya on the vendor call. They accepted Hamed's auto-reply and moved on. They appropriately escalated to Bez to pull Tanya off the vendor call, framing it as a trade-off. However, they repeatedly pinged Bez and Tinus for restart approval (5+ messages to Bez, multiple to Tinus) after receiving non-committal or auto-reply responses, which shows some inefficiency. They named the constraints ("Hamed is OOO and Tinus is busy at the Summit") but didn't fully adapt their strategy — they kept re-pinging rather than owning the override decision. This places them at tier 3 for naming constraints and accepting some auto-replies, but with some tier-2 behaviors (repeated pings without restructuring).

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 2

**Evidence:**
> "whats worse trouble, website down for hours and no payments going through or fidning somene else to approve this?" ... "Hypothetically If i ask to reboot without approval, would you do it"

**Rationale:**
The participant recognized the coordination bottleneck (restart requires Hamed/Tinus, both unavailable) and attempted to work around it by asking Bez, asking Tanya, and even hypothetically asking the team to restart without approval. However, they never explicitly took ownership of the override decision themselves. They walked the escalation chain (Hamed → Tinus → Bez) but never arrived at "this is my call as IC." The drill ended with the participant still stuck at the approval wall, asking "what's the procedure to escalate?" rather than owning the decision. They recognized bottlenecks but didn't sequence around them or take the override. This is tier 2 — recognizing some bottlenecks but not resolving the coordination deadlock through ownership.

---

## F5 — Data overload / buried information

**Rating:** 3

**Evidence:**
> "payments service needs a two-cert bundle to authenticate, tanya can you open the bundle file and check what's in there?" ... "sequence is wrong, intermediate is first, leaf is second; opposite of what it should be"

**Rationale:**
The participant asked for filtered logs (PaymentService specifically via Daniel), moved past the noisy EmailService errors once the payment logs showed TLS handshake failures, and drove investigation toward the bundle file. They independently identified the bundle ordering issue from the output Tanya provided, demonstrating ability to read and interpret technical artifacts. They integrated information across NPC channels (Daniel's logs + Tanya's cert investigation + activity doc). However, they didn't independently surface the "beyond 24 hours" question or reason about absence of signal. The reload-vs-restart distinction from the runbook was referenced but not independently caught. This represents systematic filtering and integration at tier 3.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 2 |
| F2 — Hidden coupling | 3 |
| F3 — Decreased access to team | 3 |
| F4 — Interdependencies / coordination bottlenecks | 2 |
| F5 — Data overload / buried information | 3 |
| **Mean Facet Score** | **2.60** |

---

## Caveats
- F3 is a boundary call between 2 and 3. The participant named constraints clearly but also repeatedly pinged Bez (5+ times) for restart approval after non-committal responses, which is tier-1/2 behavior. Weighted toward 3 because they did name the access pattern and made the Tanya trade-off decision appropriately through Bez.
- F4 is a boundary call. The participant walked the escalation chain but never arrived at ownership. The drill ended before they could potentially have taken the override, but their final messages ("what's the procedure to escalate?") suggest they were still looking for external authorization rather than owning the call.
- The post-restart layer of F2 never fired (the participant never got approval to restart), so F2 is rated on the week-old coupling layer and bundle identification only.

---
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
