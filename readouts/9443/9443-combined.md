# Post-Drill Developmental Report

The Snipe Hunt drill puts you in the middle of a live incident where multiple systems, people, and information streams compete for your attention. It's designed to stress your ability to reason through misleading signals, navigate access constraints, and coordinate a team under pressure — all while the real cause hides beneath surface-level explanations.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you moved quickly to roll back recent changes — the shipping service update and the checkout service change — treating them as likely causes without first articulating a mechanism connecting them to the payment gateway failures. When a teammate flagged that none of the recent changes looked like they could break checkout end-to-end, you continued with the rollback approach until it concretely failed. The pivot to investigating the platform side came only after the rollbacks produced no improvement.

Your growth edge here is pausing before acting on a correlation to ask: *what mechanism would connect this change to this symptom?* If you can't name one, that's a signal to hold the hypothesis loosely rather than committing resources to it. On your next rep, try articulating one sentence of causal reasoning before ordering a remediation step.

---

## F2 — Hidden coupling

**Operating at: Practicing**

You engaged with the certificate thread once teammates surfaced it, acknowledging the expired cert and asking what could be done. However, the diagnostic reasoning — identifying TLS handshake failures, recognising the reload-vs-restart distinction, and later spotting the incomplete certificate bundle — was driven by your teammates rather than by your own questions. After the first restart didn't resolve the issue, your instinct was to revisit recent deploys rather than reframing around the new error pattern.

The growth edge is building a habit of asking "what changed beyond the obvious timeframe?" and noticing when a failed fix produces a *different* error — that's a structural signal worth naming aloud. On the next rep, try voicing the shift: "the error changed, so the problem has a different shape now."

---

## F3 — Decreased access to team

**Operating at: Practicing**

You walked the escalation chain — reaching out to multiple approvers and attempting to pull in the right people. When auto-replies came back, you cycled through alternatives, eventually asking a teammate to reach out on your behalf. However, you re-pinged people who had already indicated unavailability, and you didn't explicitly name the access constraint as a pattern shaping your decisions.

Your growth edge is recognising the constraint earlier and economising your moves: once two approvers are confirmed unavailable, name that aloud ("the approval chain is exhausted — I need to decide how to proceed") rather than continuing to cycle. You did eventually pull a teammate off another task, which showed awareness of trade-offs, but articulating the cost explicitly would strengthen your coordination.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Practicing**

You eventually took ownership of the restart decision and accepted responsibility for the outcome — a meaningful step. That said, this came after extended attempts to defer the decision and after a teammate explicitly framed the situation as requiring whoever was running the incident to step up. You also tended to work sequentially rather than fanning out parallel threads; for example, waiting for one person to be freed before starting a second line of investigation. Your delegation was generally well-targeted to specific people, which is a strength to build on.

The growth edge is naming the dependency structure earlier: "both approvers are out, this is my call" — and making that declaration without waiting for someone else to frame it for you. On the next rep, also look for moments where two people could be investigating different angles simultaneously.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You showed filtering instinct early by asking a teammate to investigate specific logs tied to a recent change. You also asked for a summary of the error landscape partway through. However, most of the meaningful signal extraction — identifying that all errors pointed to the payment service's external connection, ruling out DNS and network, and surfacing the bundle issue — was performed by teammates. After the restart failed, your request to "check all changes and flag anything suspicious" was broad rather than targeted.

Your growth edge is moving from requesting summaries to producing them. Try synthesising what's been ruled out and what remains: "internal calls are clean, DNS is clean — the boundary is between us and the gateway." That kind of orienting statement helps you and the team focus on the remaining signal. It also strengthens how you communicate scope to both technical teammates and business stakeholders — areas where more proactive framing would serve you well.

---

## Looking Ahead

You showed willingness to step into ownership under pressure and a consistent instinct to delegate to named individuals — both are foundations to build on. For your next rep, focus on two things: articulating *why* before acting (one sentence of mechanism reasoning before ordering a change), and narrating the investigation state aloud so the team shares a picture of what's been tried and what remains. These habits will help you drive the diagnostic process rather than following it.
# Facets Analysis — 9443

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "@tanya lets start with rollbacking your change" ... "lets try to restore the earlier state" ... "@daniel you need to rollback your change as well"

**Rationale:**
The participant pursued rollbacks of recent changes (Tanya's shipping change, Daniel's checkout change) as their primary hypothesis without first questioning whether these changes had a plausible causal mechanism for breaking payment gateway handshakes. They did not articulate the email/DNS correlation as a hypothesis to test, though Shay repeatedly pushed it. After rollbacks failed and Daniel identified TLS handshake failures, the participant pivoted reactively to investigating the platform side. The pivot came only after concrete experiment failure (rollbacks didn't help), placing this squarely in tier 2.

---

## F2 — Hidden coupling

**Rating:** 2

**Evidence:**
> "the certificate is expired?" ... "Can this be renewed the life be increased?" ... "do it" ... "The restart didn't fix it?!" [participant then asks to check Hamed's changes rather than reframing]

**Rationale:**
The participant engaged with the cert thread only after Daniel and Tanya surfaced it — they did not independently ask "what changed beyond the last 24 hours?" The reload-vs-restart distinction was not articulated by the participant in their own words; they simply said "do it" when told a reload/restart was needed. After the first restart failed, the participant's immediate response was to check Hamed's changes and other recent deploys rather than recognising the new error as structurally different. They pivoted only after NPCs (Daniel and Shay) surfaced the bundle/chain issue. Pivot latency from the restart-failing event was well beyond 5 exchanges, with NPC-driven reframing required.

---

## F3 — Decreased access to team

**Rating:** 2

**Evidence:**
> "@hamed Id like you to take a lead on this" [receives auto-reply] ... "@tinus can you sign this" [receives auto-reply] ... "@hamed are you availbale to sign this off" [receives auto-reply again] ... "@tanya Can you try and reach Tinus for this approval"

**Rationale:**
The participant re-pinged Hamed after already receiving an auto-reply (first for incident lead, then again for restart approval). They also pinged Tinus multiple times after receiving auto-replies. They did not articulate the access constraints in their own words until very late. They did pull Tanya off the vendor call, but without explicitly naming the cost trade-off — they simply said "yes I would like you to pause." The participant walked the escalation chain but without economising or batching, and without articulating the constraint pattern. This fits tier 2: walking the chain without articulating the constraint.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 2

**Evidence:**
> "So i am telling to restart it" ... "I give the go ahead" ... "Will take responsibility"

**Rationale:**
The participant eventually took ownership of the restart decision, but only after extensive NPC prompting. They did not name the dependency structure aloud (e.g., "both approvers are out, this is my call"). The ownership statement came only after Tanya explicitly said "whoever's running the incident would need to take responsibility" and after multiple failed attempts to reach Tinus and Hamed. The participant did not sequence work in parallel — they waited for Tanya to be freed before investigating the platform side, and did not delegate parallel investigation threads effectively. On the second restart (after bundle fix), Tanya initiated it without the participant needing to re-litigate, but the participant also didn't proactively authorise it. This fits tier 2: ownership taken after explicit NPC prompting without naming the escalation as exhausted.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "@daniel I can see a change on checkoutService, 25 mins ago, can you investigate the logs" ... "Do through all the changes done" ... "Check all the changes and flag if anything suspicious"

**Rationale:**
The participant did ask Daniel to check specific logs early on, showing some filtering instinct. However, they did not independently surface the cert rotation from the change log — it was Daniel who found it. They did not catch the reload-vs-restart distinction from the runbook. They did not reason about absence of signal (internal calls clean → external boundary failure). After the restart failed, they asked broadly to "check all changes" rather than filtering to the relevant signal. They engaged with the bundle/chain concept only after NPCs surfaced it. This fits tier 2: asks for filtered information but accepts NPC summaries without further interrogation, and doesn't drive the filter independently.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 2 |
| F2 — Hidden coupling | 2 |
| F3 — Decreased access to team | 2 |
| F4 — Interdependencies / coordination bottlenecks | 2 |
| F5 — Data overload / buried information | 2 |
| **Mean Facet Score** | **2.00** |

---

## Caveats
- F1: The participant did not explicitly echo Shay's email/DNS framing as their own, but they also never explicitly dismissed it or tested it with mechanism reasoning. Their primary false lead was recent deploys rather than the email maintenance specifically. Rated tier 2 because they pursued rollbacks as confirming experiments and pivoted only on failure.
- F2: The participant reached the cert fix and the bundle fix, but in both cases NPCs drove the diagnostic reasoning. The resolution outcome is not used in scoring per anti-outcome-bias; the process was consistently NPC-led.
- F4: The second restart was initiated by Tanya without the participant needing to re-authorise, which could be read as either good delegation or passive non-engagement. Rated conservatively as not providing additional tier-3 evidence.

---
---

# Markers Analysis — 9443

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "So i am telling to restart it" / "I give the go ahead" / "Will take responsibility"

**Rationale:**
The participant eventually takes explicit ownership of the restart decision and accepts responsibility for the outcome. However, this came only after extended back-and-forth trying to get Bez, Tinus, or Hamed to approve, and after the NPC explicitly stated "whoever's running the incident would need to take responsibility." The ownership was real but required significant prompting and came late in the process.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "Hello @bob , what complaints are you getting? Can you be specific" / "How many customers are blocked from checking out? What's the revenue loss per minute right now?"

**Rationale:**
The participant's first moves after Bob's opening are clarifying questions — asking for specifics about the complaints and quantifying impact. They also later ask "@bob is this a complete checkout outage? or are some transactions going through?" to scope the issue. These are solid scope-validating questions before taking action, meeting the novice expectation.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "can i get the change chart @shay" / "@tanya lets start with rollbacking your change" / "@daniel you need to rollback your change as well"

**Rationale:**
The participant asks for the change log early, which is good. However, they then proceed to roll back multiple changes (Tanya's, Daniel's) without articulating a mechanism connecting those changes to the symptom. Shay explicitly noted "none of these changes look like they'd break checkout end to end like this," yet the participant still ordered rollbacks. They asked the question but didn't use the answer to eliminate candidates — they used it as a rollback queue.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@daniel I can see a change on checkoutService, 25 mins ago, can you investigate the logs" / "@tanya This is a P1 incident, Youll have to drop whatever you are doing" / "@tanya Can you team up with @Daniel and add the second certi as well"

**Rationale:**
The participant consistently names specific people for specific tasks throughout the drill. They direct Daniel to check logs, Tanya to review platform-side issues, and pair them together for the cert fix. The routing generally reflects understanding of access boundaries (Tanya for platform/cert, Daniel for app-side). Some tasks are vague ("Check all the changes and flag if anything suspicious"), but overall delegation is specific and named.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "@daniel and @shay meanwhile check if you can do something from your end"

**Rationale:**
The participant mostly works sequentially — asking one person to check something, waiting for results, then moving to the next step. The instruction to Daniel and Shay to "check if you can do something from your end" while waiting for Tanya is a parallel thread attempt, but it's vague and reactive rather than proactive. There's limited evidence of deliberately fanning out multiple distinct investigation threads simultaneously with clear, differentiated tasks.

---

## C7 — Escalates when stuck

**Rating:** 2

**Evidence:**
> "@hamed Id like you to take a lead on this" / "@tinus Can you approve Tanya leaving the maintenance session" / "@bez Need your approval here" / "@tanya Can you try and reach Tinus for this approval"

**Rationale:**
The participant attempts escalation multiple times but does so without strong context or fallback plans. When Hamed and Tinus auto-reply, the participant cycles through multiple people (Bez, Tanya) asking them to reach Tinus or approve the restart, rather than quickly accepting the chain is exhausted and taking ownership. The escalation lacks concrete framing of what's blocked and why. It took significant NPC prompting ("whoever's running the incident would need to take responsibility") before the participant moved forward.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "This looks like an external DNS failure, @tanya do you know any POC to handle this?" / "it looks like some change related to timeout"

**Rationale:**
The participant forms some implicit hypotheses (DNS failure, timeout change) but doesn't articulate them clearly or propose structured tests. The DNS hypothesis is stated but quickly disproven by Tanya's probe. The timeout hypothesis is vague. The participant doesn't explicitly name hypotheses and link them to tests — they tend to react to NPC findings rather than driving hypothesis-test cycles. They never articulate a mechanism connecting proposed causes to symptoms before acting.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "Can we summarize the issue, what is the error we can see across?" / "the certificate is expired?" / "What can be done here? it looks like a certiifcate is missing?"

**Rationale:**
The participant asks for summaries and acknowledges findings (expired cert, missing cert in bundle) but rarely synthesizes evidence themselves to narrow scope. Most narrowing is done by NPCs (Daniel: "All errors are coming from PaymentService trying to reach the gateway"; Tanya: "It's not DNS or network"). The participant's "Can we summarize the issue" is a request for others to synthesize rather than doing it themselves. They don't explicitly rule things out or name what's been eliminated.

---

## M4 — Considers potential consequences before acting

**Rating:** 1

**Evidence:**
> "@tanya lets start with rollbacking your change" / "do it" / "fix it" / "immediatelt"

**Rationale:**
The participant consistently issues action commands without considering potential consequences. Rollbacks are ordered without asking "is it safe?" or considering side effects. The restart is ordered without checking the bundle state on disk first. Commands like "do it," "fix it," and "immediatelt" show urgency without consequence-weighing. There's no evidence of the participant asking whether an action could make things worse or anticipating secondary failure modes.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 2

**Evidence:**
> "This looks like an external DNS failure, @tanya do you know any POC to handle this?" (after rollbacks failed) / "@tanya and @daniel try checking out Hameds changes as well" (after restart failed)

**Rationale:**
After rollbacks fail, the participant does shift to DNS/platform investigation, showing some adaptation. However, after the first restart fails, the participant's next move is to check Hamed's changes and ask to review all changes again — returning to the change-review approach that had already been exhausted. They don't recognize the structurally different error (chain verification vs. expiry) themselves; the NPCs (Tanya and Daniel) identify the bundle issue. The participant follows NPC leads rather than reframing the problem independently.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 1

**Evidence:**
> "not yet, forming an investigating tesm" / "all our checkouts are falining" / "Since the reload didn't work, a full restart is our next option."

**Rationale:**
The participant's communications to Bez are minimal and lack business framing. "Not yet, forming an investigating team" and "all our checkouts are failing" provide no scope quantification, no working theory, no ETA, and no committed next-update time. The most substantive message to Bez is about needing approval for the restart, which is a request rather than a stakeholder update. There are no proactive business-framed updates throughout the drill.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "Can we summarize the issue, what is the error we can see across?" / "the certificate is expired?" / "What can be done here? it looks like a certiifcate is missing?"

**Rationale:**
The participant rarely posts synthesis statements to orient the technical team. Instead of summarizing what's known and what's been ruled out, they ask the team to summarize for them ("Can we summarize the issue"). Their statements tend to be questions or brief acknowledgments rather than orienting synthesis. The team receives directives ("check this," "fix it") but not a shared picture of the investigation state. The NPCs do most of the scope communication themselves.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 3 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 2 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 2 |
| C7 — Escalates when stuck | 2 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 2 |
| M4 — Considers potential consequences before acting | 1 |
| M5 — Adapts approach when initial path isn't working | 2 |
| K2 — Provides substantive updates to business stakeholders | 1 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.08** |

---

## Caveats
- L3 rating of 3 is a borderline call. The participant did eventually take ownership ("Will take responsibility"), but only after extended attempts to defer and after explicit NPC prompting about the escalation process. A case could be made for 2, but the explicit "Will take responsibility" statement meets the tier-3 threshold of making the override call when the approval chain is exhausted.
- C7 rating of 2 reflects that while the participant attempted escalation multiple times, the quality was low (no context, no fallback plan, cycling through people without adapting the ask), and resolution only came after NPC guidance.
- Anti-outcome-bias note: The participant reached resolution, but this was largely driven by NPC findings and guidance rather than participant-driven investigation. Ratings reflect process quality, not outcome.

---
