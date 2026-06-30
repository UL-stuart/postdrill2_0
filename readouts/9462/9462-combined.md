# Snipe Hunt — Post-Drill Developmental Report

This drill puts you in the middle of a live incident where multiple signals compete for attention, key people are unavailable, and the root cause hides behind a plausible-looking coincidence. The work it's designed to stress — separating correlation from causation, navigating access constraints, and synthesising information under pressure — showed up clearly in your run.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you locked onto the email/DNS maintenance as the likely cause and pressed repeatedly to roll back those changes. You did eventually pivot to the certificate investigation, but that pivot came after teammates explicitly disconfirmed the DNS hypothesis rather than from your own mechanism reasoning. The growth edge here is noticing *when* you're treating a time-coincidence as a causal link and asking yourself "what mechanism would connect these?" before committing investigation cycles. On the next rep, try articulating *why* a candidate cause would produce the specific symptoms you're seeing — that reasoning often reveals the gap before a teammate has to surface it for you.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

Once the cert rotation thread surfaced, you drove the investigation forward — asking about reload requirements and checking cert validity. Importantly, when the restart failed, you didn't repeat the same action. You redirected by asking for fresh error output and re-confirming the cert state, which kept the investigation moving toward the bundle-ordering issue. The growth edge is surfacing the hidden-coupling question yourself: asking "what changed outside the obvious 24-hour window?" before a teammate brings it to you. You responded well to the unexpected failure; the next step is anticipating that kind of layered dependency earlier.

---

## F3 — Decreased access to team / remote

**Operating at: Strengthening**

You showed solid awareness of who was available and what constraints they were under. You sent Tanya targeted questions during her vendor call rather than low-value pings, accepted Hamed's auto-reply without re-pinging, and only pulled Tanya fully into the incident when the severity justified the cost. You also attempted to escalate through the proper chain before self-authorising. The growth edge is making the cost trade-off more explicit when you do pull someone in — naming the specific consequence ("this means we lose the vendor window for two weeks, but the outage justifies it") helps the team understand your reasoning and builds shared context.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the escalation chain in observable order — Hamed, then Bez, then self-authorisation — and delegated parallel work appropriately across the team, routing platform tasks to Tanya, log analysis to Daniel, comms to Bob, and banner management to Shay. On the second restart after the bundle fix, you authorised without re-litigating. The initial uncertainty about whether you could authorise the restart is natural, but the growth edge is mapping the dependency structure earlier: knowing *before* you need the decision who holds the authority and what the fallback path is. That pre-mapping saves time when the clock is running.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You asked for filtered information — requesting specific log output and service checks — which is a good instinct. However, the key buried signals in this drill (the cert rotation timing, the reload-vs-restart distinction in the runbook, the bundle ordering issue) were surfaced by teammates rather than by your own reading of the artifacts. You followed the evidence trail well once it was laid out, but didn't independently extract the critical distinctions. The growth edge is treating documents and logs as active investigation tools: when someone shares a runbook or a change log, scanning for the thing that *doesn't* match your current hypothesis rather than confirming what you already suspect.

---

## Looking Forward

Two patterns stand out as growth edges for your next rep. First, your investigation instincts are sound but often reactive — you respond well to disconfirming evidence once it arrives, and the next step is generating that disconfirmation yourself through mechanism reasoning and active artifact reading. Second, your coordination and delegation are solid; layering in more explicit synthesis for both your technical team and business stakeholders — naming what's been ruled out, what the current theory is, and what you're checking next — will help the people around you track your reasoning without having to ask.
# Facets Analysis — 9462

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "Certainly looks like DNS errors - can you comment Tanya?" ... "Can we roll back back the DNS config changes?" ... "Tanya, what are the next steps in undoing the email maintenance changes"

**Rationale:**
The participant initially locked onto the email/DNS maintenance correlation, asking to roll back DNS changes and repeatedly pressing Tanya about undoing email maintenance. However, after receiving disconfirming evidence (Tanya confirming DNS is fine, Daniel noting handshake failures aren't code-related), the participant pivoted to the cert investigation. The pivot was reactive — driven by concrete disconfirmation from NPCs rather than upstream mechanism reasoning — and took several exchanges after Tanya's "DNS looks fine" statement. This fits tier 2: pursued the coincident factor as leading hypothesis, pivoted only after concrete disconfirmation.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "Do we need to reload the services to pick up the new cert?" ... "Wait — it restarted and it's still down? That shouldn't happen if the cert was the only problem." ... "Let's calm down focus and analyse where we're at"

**Rationale:**
The participant engaged with the week-old cert rotation thread once Daniel surfaced it, and drove the investigation forward (asking to check cert validity, asking about reload). After the restart failed, the participant reframed within a reasonable window (~3-5 exchanges), asking Shay for new errors and Tanya to re-confirm certs rather than repeating the restart. However, the participant did not independently surface the "what changed beyond 24 hours" question — Daniel found the cert rotation. The participant also didn't articulate "this is a different failure" explicitly but did redirect investigation appropriately. This fits tier 3: reframes within ~5 exchanges, recognises the new error requires different investigation, and drives forward to the bundle.

---

## F3 — Decreased access to team / remote

**Rating:** 3

**Evidence:**
> "Tanya, we're going to have to miss the window - I need to pull you in now if there is no one else who can do these changes instead of you" ... "We need to restart the payment service and Hamed and Tinus are out - can you authorise this"

**Rationale:**
The participant demonstrated awareness of access constraints: they acknowledged Tanya's vendor call constraint and only pulled her when the cost justified it, accepted Hamed's auto-reply without re-pinging, and attempted to escalate to Bez before self-authorising. The participant sent Tanya targeted questions during the vendor call rather than low-value queries. However, the cost trade-off when pulling Tanya wasn't explicitly verbalised in terms of the constraint ("global outage outweighs vendor window") — it was more implicit. This fits tier 3: names constraints, accepts auto-replies as terminating, escalates appropriately.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "We need to restart the payment service and Hamed and Tinus are out - can you authorise this" ... "Yes, let's go ahead - I authorise the restart" ... "Great - just wasn't sure our internal process on this"

**Rationale:**
The participant walked the escalation chain: attempted Hamed (auto-reply), attempted Bez (who redirected back), then self-authorised. This matches tier 3 path (b) — walking the escalation chain to exhaustion in observable order before taking ownership. The participant also delegated parallel work appropriately (Daniel on logs, Tanya on certs, Bob on comms, Shay on banner). On the second restart (after bundle fix), the participant authorised without re-litigating. However, the participant didn't explicitly name the dependency structure aloud as a constraint statement, and the initial attempt to get Bez to authorise showed some uncertainty about the coordination structure.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "So that corrosponds with ProductCatalogueService release" ... "Daniel, what else has been released?" ... "Can we check the validity of the active cert?"

**Rationale:**
The participant asked for filtered information (Daniel's logs, specific service checks) but largely relied on NPC-surfaced signals rather than driving the filter proactively. The cert rotation was surfaced by Daniel, not the participant. The participant didn't independently catch the reload-vs-restart distinction from the runbook — they asked "Do we need to reload the services?" which suggests some engagement but didn't demonstrate reading the doc and spotting the discrepancy. The bundle ordering issue was identified by Shay/Tanya, not the participant. The participant accepted NPC summaries and directed next steps but didn't independently extract buried distinctions from artifacts.

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
- F1 rating is a borderline 2/3 call. The participant did eventually move off the email hypothesis, but the pivot was reactive (driven by Tanya's explicit "DNS looks fine" and Daniel's "handshake failures aren't code-related") rather than mechanism-driven. The repeated asks about rolling back email/DNS changes after initial disconfirmation anchors this at tier 2.
- F2 rating benefits from the participant's post-restart behaviour (redirecting investigation rather than repeating restart), but the "what changed beyond 24 hours" question was NPC-surfaced, which limits the ceiling.
- F4 tier-3 path (b) is satisfied, but the attempt to get Bez to authorise (when Bez explicitly cannot) slightly weakens the evidence of understanding the dependency structure.

---
---

# Markers Analysis — 9462

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "Yes, let's go ahead - I authorise the restart"

**Rationale:**
The participant takes ownership of the response by declaring the incident, directing team members, making the restart authorization call when both Hamed and Tinus were unavailable, and driving the investigation forward. However, they initially attempted to defer the restart decision to Bez ("I'll get confirmation from Bez") before being told it was their call. They then owned it, but the initial deferral prevents a tier 4 rating.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "Can you be more specific Bob" ... "How many customers are blocked from checkout right now? What's the revenue loss per minute? Is this a total outage or are some transactions still going through?"

**Rationale:**
The participant's first response to Bob's vague complaint is a clarifying question, followed by detailed scope-validation questions about customer count, revenue impact, and whether it's total or partial. They gather information before declaring the incident or ordering actions. This meets the novice expectation of scope-validating before acting.

---

## C3 — Checks for recent changes

**Rating:** 3

**Evidence:**
> "Daniel, what else has been released?" ... "So that corrosponds with ProductCatalogueService release"

**Rationale:**
The participant explicitly asks Daniel for recent releases and receives the full change log. They attempt to correlate timing with the ProductCatalogueService release. Later, they also consider the email maintenance timing. However, they don't explicitly use the change log as an elimination tool (e.g., "none of these touch the gateway"). They do eventually move past the deploys hypothesis when evidence points to certs, but the initial use of the change log was more correlational than eliminative, placing this at tier 3 rather than 4.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "Tanya, can you comment on your change" ... "Yes please Daniel" ... "Bob - please get some customer comms up about the issue" ... "Daniel, monitor the logs to see if this takes effect" ... "Shay, get ready to remove the maintenance banner"

**Rationale:**
The participant consistently delegates to specific named individuals throughout the drill. They route platform/cert tasks to Tanya, log analysis to Daniel, customer comms to Bob, and banner management to Shay. The routing generally matches NPC capabilities. This meets tier 3 expectations of naming specific people for specific tasks.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "Problem worth workign several angles in parallel as this is SEV-1" ... "Anything else we want to check folks in parallel?"

**Rationale:**
The participant explicitly states the desire to work parallel threads and asks about parallel checks near the end. However, the actual investigation is largely sequential — they pursue the email maintenance/DNS hypothesis, then move to logs, then to certs. The statement about parallel work is aspirational rather than enacted through concurrent delegations. The investigation mostly proceeds one thread at a time with occasional overlap.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "Tanya, we're going to have to miss the window - I need to pull you in now if there is no one else who can do these changes instead of you"

**Rationale:**
The participant escalates by pulling Tanya off the vendor call when the investigation is blocked at the platform layer, acknowledging the cost ("miss the window"). They also attempt to escalate the restart approval through Bez when Hamed and Tinus are unavailable. The escalations are concrete and timely. However, they don't explicitly name the full cost (2-week reschedule) with the same directness as a tier 4 response would.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "Certainly looks like DNS errors - can you comment Tanya?" ... "Daniel, Shay, do we think the DNS is the most likely problem and needs fixed. Any other hypotheses?"

**Rationale:**
The participant forms a DNS/email-maintenance hypothesis and asks the team to comment on it, which constitutes a test. However, the hypothesis formation is somewhat passive — they ask the team "Has anyone got any hypotheses?" rather than articulating their own clearly. They also ask "Any other hypotheses?" which shows openness but not strong hypothesis-driven investigation. The pivot to certs happens through team guidance rather than the participant's own mechanism-testing. This is inconsistent engagement with hypothesis formation.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "So that corrosponds with ProductCatalogueService release" ... "Is the one in process expired?"

**Rationale:**
The participant makes some narrowing observations (correlating timing with ProductCatalogueService, identifying the expired cert in process). However, they don't produce synthesis statements that combine multiple pieces of evidence to rule things out. Much of the narrowing is done by the NPCs (Daniel identifying PaymentService as the failing service, Tanya ruling out DNS). The participant follows the evidence trail but doesn't actively synthesize or name what's been eliminated.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "Daniel, should we also roll back the services around the time of the errors started. Any implications?"

**Rationale:**
The participant asks Daniel about implications of rolling back services, which shows some consequence-awareness. They also ask Tanya "if there is no one else who can do these changes instead of you" before pulling her off the vendor call. However, they don't check whether the cert bundle on disk is correct before ordering the restart, and they don't anticipate the secondary failure. The consequence-checking is present but inconsistent.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "Let's calm down focus and analyse where we're at" ... "Shay, what errors are we seeing - why has the service not come up" ... "Tanya, can you confirm the certs again"

**Rationale:**
After the first restart fails, the participant doesn't repeat the same action. They redirect investigation by asking Shay for current errors and Tanya to re-confirm certs. They adapt to the new information about the certificate bundle needing two certs and proceed to fix the bundle order. They don't get stuck in the original frame. This meets tier 3 expectations of redirecting after a failed action, though they don't independently recognize the structural difference in the new error (the team surfaces the bundle issue).

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "Still assessing Bez - I'll give you an update in 5 minutes" ... "We're focusing on getting the site up - top priority and all focused on that. We can review post mortem the cost. We're anlysing now and I'll come back with an update in 5 minutes" ... "We're working a likely theory - hopefully resolved within 10 minutes"

**Rationale:**
The participant provides multiple updates to Bez but they are largely vague reassurances without substantive content. They don't quantify impact in business terms, don't share the working theory, and don't name what's affected. "We're focusing on getting the site up" and "We're working a likely theory" lack the specificity expected at tier 3. The committed time frames are good, but the content is thin.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "Priority is to get the site stable" ... "Let's calm down focus and analyse where we're at" ... "Anything else we want to check folks in parallel?"

**Rationale:**
The participant provides general direction to the technical team but rarely synthesizes the current state of knowledge. They don't post messages like "OK, we've ruled out DNS, ruled out recent deploys, the issue is at the PaymentService outbound TLS handshake." Most of their technical channel messages are questions or brief directives rather than synthesis statements that orient the team. The NPCs do most of the synthesis work (Daniel and Tanya narrate findings), and the participant acknowledges rather than reframes for the team.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 3 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 3 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 2 |
| C7 — Escalates when stuck | 3 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 2 |
| M4 — Considers potential consequences before acting | 2 |
| M5 — Adapts approach when initial path isn't working | 3 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.50** |

---

## Caveats
- L3: The participant's initial attempt to defer the restart decision to Bez is a borderline call between 2 and 3. Rated 3 because they ultimately owned the decision promptly once Bez clarified it was their call, and they drove the response throughout.
- M5: Borderline between 2 and 3. The participant adapts after the first restart fails, but the adaptation is largely guided by NPC information rather than independent reframing. Rated 3 because they don't repeat the failed action and do redirect investigation.
- K2: The participant commits next-update times (good) but the content of updates is consistently thin. This is a clear tier 2 — engaged but not meeting the novice expectation of substantive business-framed updates.

---
