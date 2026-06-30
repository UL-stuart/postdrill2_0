# Post-Drill Developmental Report

This drill placed you in a live incident requiring you to navigate misleading signals, coordinate a distributed team under access constraints, and drive an investigation through ambiguous technical evidence. The observations below reflect where your process landed on this run and where the next-rep growth edges sit.

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you locked onto the DNS/email maintenance as the likely cause of checkout failures and moved to revert those changes. When a teammate explicitly disconfirmed the connection between email maintenance and checkout, you pivoted to investigating payment service logs — but the pivot was reactive rather than self-initiated. You didn't articulate a mechanism question ("how would email DNS changes break payment handshakes?") before committing to the revert.

*Growth edge:* Before ordering a rollback on a correlated change, pause to name the causal mechanism you're assuming. If you can't articulate one in a sentence, that's a signal to investigate rather than act. This habit will help you release false leads faster without waiting for someone else to disconfirm them.

## F2 — Hidden coupling

**Operating at: Practicing**

After the initial restart failed, your instinct was to broaden the rotation to other services rather than recognising that the post-restart error was structurally different from the pre-restart error. The cert-bundle ordering issue — the actual hidden coupling — was surfaced by teammates, not by your own reframing. You asked about S3 bucket policies and gateway certificates in a scattershot pattern rather than stepping back to ask what had changed in the system's dependency chain.

*Growth edge:* When a fix produces a *different* failure, treat that as a new signal requiring fresh investigation rather than a prompt to try more of the same action. Asking "what's different about this error?" is the reframing move that unlocks hidden-coupling reasoning.

## F3 — Decreased access to team

**Operating at: Practicing**

You pinged unavailable teammates multiple times after receiving auto-replies, and you routed an approval request to someone who didn't have that authority — twice. You eventually took ownership of the restart decision yourself, which was the right call, but it came only after a teammate explicitly stated that the person leading the response would need to own it. You showed you can adapt to access constraints, but you didn't economise on constrained channels or articulate the constraint pattern aloud.

*Growth edge:* After the first auto-reply, note the constraint and move on. Naming the access picture for yourself ("Hamed and Tinus are both out; I'm the decision-maker here") earlier in the process saves cycles and signals leadership to the team. Your delegation instincts are solid — you consistently directed specific people to specific tasks with appropriate routing — and pairing that with faster constraint recognition will strengthen your coordination.

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Practicing**

The approval bottleneck slowed the response, and you worked through it by attempting multiple escalation targets before taking the override yourself. However, you didn't name the dependency structure aloud or sequence work around the bottleneck proactively. On the second restart (after the bundle fix), you handled the decision cleanly without re-litigating approval — evidence of in-drill learning.

*Growth edge:* When you hit a coordination gate, narrate it to the channel: "We're blocked on restart approval; Hamed and Tinus are unavailable; I'm taking this." That single statement collapses the bottleneck and orients the team simultaneously. You showed you can make the call — the next step is making it earlier and framing it for others.

## F5 — Data overload / buried information

**Operating at: Practicing**

You made a targeted ask for payment service logs, which was a productive filtering move. But attention then scattered across S3 policies, frontend restarts, and gateway rotations — none of which were relevant. The critical distinction (reload vs. restart, bundle ordering) was surfaced by teammates rather than by your own interrogation of the available evidence. You accepted NPC findings without further probing.

*Growth edge:* When you receive a log output or diagnostic result, spend a beat asking "what does this rule out?" before issuing the next action. Building a running elimination list — even informally in the channel — helps you filter noise and keeps the team aligned on what's still in scope. Your stakeholder updates showed you can quantify impact clearly; applying that same precision to technical synthesis will sharpen your filtering.

## Looking Ahead

You showed consistent willingness to direct the team, take ownership under pressure, and adapt when paths closed. The pattern across this run is that your instincts move you toward action quickly — the developmental edge is inserting a brief reasoning step before each action: name the mechanism, name what's been ruled out, name the constraint. That single habit will shift your investigation from reactive pivoting to proactive narrowing, and it compounds across every facet of incident work.
# Facets Analysis — 9428

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "@daniel please get the DNS changes reverted" ... "@daniel just revert DSN changes" ... After Tanya explicitly states "Primary email provider hasn't been touched. Email confirmations are fine, so this maintenance can't be causing checkout failures," the participant pivots to checking payment service logs: "@shay meanwhile please check payment service logs as well seems like checkout service and payment service are not able to communicate"

**Rationale:**
The participant initially locked onto the DNS/email maintenance correlation and ordered a revert. However, after Tanya's explicit disconfirmation ("this maintenance can't be causing checkout failures") and Daniel's inability to execute DNS changes, the participant pivoted within a few exchanges to investigating PaymentService logs. This is reactive pivoting based on disconfirmation rather than proactive mechanism reasoning — the participant never articulated "does email maintenance plausibly break payment handshakes?" They treated the coincidence as the leading hypothesis and only moved on after it was explicitly denied. Pivot latency was moderate (~4-5 exchanges after Tanya's disconfirmation).

---

## F2 — Hidden coupling

**Rating:** 2

**Evidence:**
> After the restart fails: "@daniel rotate all other service where certs where changed" ... "Are you sure restarting the other services will help? The failures are still only happening on the payments side." ... "@tanya some s3 bucket policy were also updated could that create an issue?" ... "@tanya whats the error now we are geeting"

**Rationale:**
The participant did not surface the "what changed beyond the last 24 hours?" question themselves — Daniel surfaced the cert rotation. After the first restart failed, the participant's immediate reflex was "rotate all other services" rather than recognizing a structurally different failure. They then asked about S3 bucket policies — scattershot rather than reframing. Only after Tanya provided the openssl verify output and Shay identified the bundle ordering issue did the participant engage with the actual problem. The participant never articulated that the post-restart error was different from the pre-restart error. They pivoted only after NPCs drove the investigation forward, consistent with tier 2.

---

## F3 — Decreased access to team

**Rating:** 2

**Evidence:**
> "@hamed please look into this" [receives auto-reply] ... "@hamed @tinus approve please" [receives auto-replies] ... "@tinus can you give approval" ... "@bez can you give approval on this" ... "@bez will need your approval on roatting service containers"

**Rationale:**
The participant pinged Hamed after already receiving an auto-reply earlier, and then pinged both Hamed and Tinus together for approval after already knowing Hamed was unavailable. They also asked Bez twice for production restart approval despite being told "Bez doesn't sign off on production restarts." The participant did not articulate the access constraints in their own words and did not economize on constrained channels. They eventually took ownership ("I am taking responsibility please rotate the containers") but only after Daniel explicitly stated "Whoever's leading this would need to take responsibility." This is consistent with tier 2 — walking the escalation chain without articulating the constraint pattern.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 2

**Evidence:**
> "@bez can you give approval on this" ... "Bez doesn't sign off on production restarts, that's a platform lead or CTO call. We're still blocked here." ... "@bez will need your approval on roatting service containers" ... "I am taking responsibility please rotate the containers @tanya"

**Rationale:**
The participant took the override call only after explicit NPC prompting (Daniel: "Whoever's leading this would need to take responsibility"). They did not name the coordination bottleneck themselves — they attempted to route the decision to Bez (twice) even after being told Bez doesn't authorize restarts. The ownership statement ("I am taking responsibility") was outcome-pressure-driven rather than articulating the escalation chain as exhausted. On the second restart (after bundle fix), the participant simply said "@tanya post correcting it rotate the containers as well" without re-litigating, which shows some learning. However, the participant never named the dependency structure aloud or sequenced work proactively. This fits tier 2.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "@tanya can we rotate gateway certificates" ... "@tanya some s3 bucket policy were also updated could that create an issue?" ... "@daniel rotate front end service" ... The participant asks multiple tangential questions rather than filtering to the relevant signal. They do not independently identify the reload-vs-restart distinction or the bundle ordering issue.

**Rationale:**
The participant asked for PaymentService logs (a targeted query), which is positive. However, they then scattered attention across S3 policies, frontend restarts, and gateway rotations — none of which were relevant. They never caught the reload-vs-restart distinction from the runbook (Tanya's activity doc was linked but the participant didn't reference it meaningfully). The bundle ordering issue was entirely surfaced by Shay ("payments service needs a two-cert bundle to authenticate") and Tanya. The participant accepted NPC findings without further interrogation and didn't drive filtering proactively. This is consistent with tier 2 — some targeted asks but no follow-through into raw evidence or independent distinction-spotting.

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
- F1 pivot latency is a borderline 2/3 call. The participant did pivot after Tanya's disconfirmation within ~4-5 exchanges, but the pivot was reactive (Tanya denied the mechanism) rather than driven by the participant's own mechanism reasoning. Rated 2 because the participant never articulated a mechanism question themselves.
- F4 second restart (after bundle fix) was handled cleanly without re-litigating approval, which could be read as tier-3 evidence. However, the overall pattern of the first restart approval (routing to Bez twice, taking ownership only after explicit NPC prompting) anchors this at tier 2.
- The participant did reach resolution, but per anti-outcome-bias, this does not elevate process ratings. The investigation was largely NPC-driven throughout.

---
---

# Markers Analysis — 9428

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "I am taking responsibility please rotate the containers @tanya"

**Rationale:**
The participant explicitly takes ownership of the restart decision when both Hamed and Tinus are unavailable, stating "I am taking responsibility." This is a clear ownership statement at the critical approval-override moment. However, it comes only after attempting to push the decision to Bez twice and after Daniel explicitly prompted that "Whoever's leading this would need to take responsibility." The ownership is real but somewhat reactive rather than proactive.

---

## C1 — Asks clarifying questions before acting

**Rating:** 2

**Evidence:**
> "@bob whats going on ?" followed by "How many customers are blocked from checking out? What's the estimated revenue loss per minute right now?"

**Rationale:**
The participant does ask Bob what's going on and later asks about customer count and revenue loss. However, the initial question is very generic ("whats going on?"), and the participant quickly moves to action — declaring SEV-1 and ordering DNS changes reverted — without fully scoping the problem first. The revenue/impact questions come after the incident declaration rather than before, and the participant doesn't ask about error types, specific payment methods, or attempt reproduction before acting.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "@daniel am also seeing checkout service config changes deployment can we verify that"

**Rationale:**
The participant does reference recent changes (DNS changes, checkout service config changes) but primarily uses them as rollback targets rather than as an elimination pass. They immediately order DNS reversion without establishing a mechanism connecting DNS to the checkout failure. When Tanya explicitly states email maintenance can't be causing checkout failures, the participant doesn't synthesize this to rule out the change thread. The change-log review is present but not used analytically.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@shay can you check whether incident is across region or only few regions re impacted" ... "@shay please check checkout service logs" ... "@tanya please drop the vendor discussion and get on incident first and revert DNS changes"

**Rationale:**
The participant consistently uses @mentions to assign specific tasks to specific people throughout the drill. They direct Shay to check regions and logs, Daniel to check certificates and revert changes, and Tanya to handle platform-side work. The routing is mostly appropriate (recognizing Tanya handles DNS/platform, Daniel handles app-side). However, they initially ask Daniel to revert DNS changes (which Daniel correctly flags as Tanya's domain), showing some imprecision in access-boundary understanding.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "@shay meanwhile please check payment service logs as well seems like checkout service and payment service are not able to communicate"

**Rationale:**
The participant shows some awareness of parallel investigation by asking Shay to check payment service logs "meanwhile." However, the overall investigation is largely sequential — they pursue the DNS/email maintenance thread, wait for responses, then move to the next thing. There's limited evidence of multiple distinct threads running simultaneously with different team members working different hypotheses concurrently.

---

## C7 — Escalates when stuck

**Rating:** 2

**Evidence:**
> "@hamed @tinus approve please" ... "@tinus can you give approval" ... "@bez can you give approval on this" ... "@bez will need your approval on roatting service containers"

**Rationale:**
The participant does attempt to escalate when blocked on the restart approval, pinging Hamed, then Tinus, then Bez (twice). However, the escalation quality is low — the pings lack context about what's needed and why, and the participant asks Bez for approval even after Daniel explicitly states "Bez doesn't sign off on production restarts." The participant doesn't efficiently work the chain and eventually takes ownership only after being told directly that they need to. For pulling Tanya off the vendor call, they rely on Bez to do it rather than making the call themselves with context.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "@daniel please get the DNS changes reverted" ... "@tanya can we rotate gateway certificates"

**Rationale:**
The participant acts on hypotheses (DNS changes caused it, gateway certs need rotation) but rarely articulates them explicitly before testing. They jump to "revert DNS changes" without stating "hypothesis: DNS changes from email maintenance caused the outage." When the DNS reversion is ruled out, they don't explicitly name the next hypothesis. The investigation proceeds through a series of actions rather than through named hypothesis-test cycles. The cert thread emerges from evidence rather than from explicit hypothesis formation.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "@shay meanwhile please check payment service logs as well seems like checkout service and payment service are not able to communicate"

**Rationale:**
The participant shows some evidence-based narrowing — recognizing from logs that checkout and payment service communication is the issue. However, they don't produce synthesis statements that combine multiple pieces of evidence to rule things out. When Tanya explicitly states email maintenance can't cause checkout failures, the participant doesn't use this to formally eliminate that thread. They don't articulate what's been ruled out or use absence of signal as evidence. Much of the narrowing happens through NPC guidance rather than participant synthesis.

---

## M4 — Considers potential consequences before acting

**Rating:** 1

**Evidence:**
> "@daniel please get the DNS changes reverted" ... "@daniel rotate all other service where certs where changed" ... "@daniel rotate front end service"

**Rationale:**
The participant consistently issues action commands without considering potential consequences. They order DNS reversion without checking if it's safe, order rotation of all services where certs were changed without considering whether this could cause additional disruption, and order frontend rotation even when Daniel flags it won't help. There are no "is it safe?" checks, no consideration of side effects, and no weighing of costs before high-impact actions throughout the drill.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 2

**Evidence:**
> "@tanya can we rotate gateways too" ... "@daniel rotate front end service"

**Rationale:**
After the first restart fails, the participant does not clearly recognize the structurally different error (chain verification vs. expiry). Instead, they suggest rotating gateways and rotating the frontend service — essentially trying more of the same approach (restart/rotate things) rather than investigating why the restart produced a different failure. It's Shay who identifies the bundle ordering issue ("payments service needs a two-cert bundle to authenticate, tanya can you open the bundle file and check what's in there?"). The participant eventually follows the correct path but doesn't drive the pivot themselves.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 2

**Evidence:**
> "@tanya can we rotate gateways too" ... "@daniel rotate front end service"

**Rationale:**
After the first restart fails, the participant does not clearly recognize the structurally different error (chain verification vs. expiry). Instead, they suggest rotating gateways and rotating the frontend service — essentially trying more of the same approach (restart/rotate things) rather than investigating why the restart produced a different failure. It's Shay who identifies the bundle ordering issue. The participant eventually follows the correct path but doesn't drive the pivot themselves.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "@bez outage is global and no successful transactions since this started. We're losing about £1,000 to £1,500 a minute at peak" ... "@bez seems like there is issue on server side where our cerificates are expired we are looking into it customers are still impacted"

**Rationale:**
The participant does provide multiple updates to Bez, and the first one includes quantified impact (global, £1,000-1,500/min). However, updates are inconsistent in quality — some are vague ("checkout service is complexity down"), some contain typos that obscure meaning, and the participant doesn't commit to next-update times. After the first restart fails, the update to Bez ("certificates are expired we are looking into it") is late and lacks a revised ETA. The cadence is reactive rather than proactive.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "@shay meanwhile please check payment service logs as well seems like checkout service and payment service are not able to communicate"

**Rationale:**
The participant occasionally shares working understanding with the team (e.g., noting checkout and payment service communication issues). However, they never post clear synthesis statements that summarize what's been ruled out and what the current focus should be. The team receives individual task assignments but not a coherent picture of the investigation state. When the problem shifts after the first restart, the participant doesn't synthesize the new error for the team — they ask "whats the error now" rather than framing it.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 3 |
| C1 — Asks clarifying questions before acting | 2 |
| C3 — Checks for recent changes | 2 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 2 |
| C7 — Escalates when stuck | 2 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 2 |
| M4 — Considers potential consequences before acting | 1 |
| M5 — Adapts approach when initial path isn't working | 2 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.08** |

---

## Caveats
- M4 rated 1 rather than 2 because there is genuinely no instance of consequence-weighing language anywhere in the transcript — no "is it safe," no "carefully," no cost acknowledgment before any action.
- L3 is a borderline 2/3 call. The participant does eventually say "I am taking responsibility," which is an explicit ownership statement meeting tier 3 criteria, but it comes only after being prompted by Daniel's statement and after two failed attempts to push the decision to Bez. Rated 3 because the rubric focuses on whether the statement is made, not solely on whether it was proactive.
- The participant's spelling/typing errors (e.g., "roatting," "pelease," "conatiners") don't affect ratings but do make some messages harder to parse for intent.

---
