# Snipe Hunt — Post-Drill Developmental Report

This drill puts you in the middle of a live incident where multiple signals compete for attention: a coincidental maintenance window, a week-old infrastructure change, constrained team availability, and documentation that buries the relevant detail. The challenge is to navigate that complexity through structured reasoning, deliberate delegation, and clear communication — all under time pressure.

---

## F1 — Misleading correlations

**Operating at: Not yet evident**

Early in the drill, you oriented toward the email maintenance window as the likely cause of checkout failures. When a teammate explicitly confirmed — multiple times — that the email system has no technical overlap with checkout or payments, you continued asserting a connection rather than pivoting. The growth edge here is building a habit of treating disconfirmation as actionable data: when someone with system knowledge names a lack of mechanism, that's a signal to release the hypothesis and look elsewhere. On your next rep, practice naming *why* you believe two things are connected (shared service, shared infrastructure, timing window) and then asking whether that mechanism actually exists before committing further investigation time.

---

## F2 — Hidden coupling

**Operating at: Practicing**

You engaged with the certificate and bundle-ordering thread once teammates surfaced it — recognising the expired-cert-in-memory issue and noting the sequence problem in the certificate chain. The engagement was reactive rather than self-driven: the week-old change and its downstream coupling were identified by others before you picked them up. The next growth edge is asking earlier, "What changed beyond the obvious recent window?" — pushing the timeline back and looking for infrastructure-level changes that might not appear in a standard deployment log. Driving that question yourself, rather than waiting for it to surface, is the shift from reactive to proactive coupling detection.

---

## F3 — Decreased access to team

**Operating at: Not yet evident**

When you pulled a teammate off an external vendor call, you named urgency but didn't articulate the cost of that decision (losing a narrow scheduling window). You then directed that teammate's time toward verifying the already-disconfirmed email hypothesis — a low-value use of a constrained resource. Separately, you repeatedly sought approval from people who had already told you they couldn't provide it, consuming cycles without adapting to the access constraint. The growth edge is treating team availability as a resource to be budgeted: before pulling someone off a task, name what you're trading away; before asking someone for something, confirm they're the right person to provide it.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Practicing**

You eventually took ownership of the restart decision when the normal approvers were unavailable. That's a meaningful step. The path to get there, though, involved cycling through the same question multiple times — asking who could approve, asking a stakeholder who had already clarified they don't approve technical actions, and waiting for someone to explicitly tell you to take responsibility. The growth edge is recognising the dependency structure earlier: when two approvers are unreachable, name the bottleneck aloud, state the risk of waiting, and make the call. Structured escalation — "I've tried X and Y, neither is available, I'm taking the decision and documenting why" — replaces the loop.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You did engage with documentation — reviewing the new provider's integration doc and the certificate rotation activity record. However, significant time went to the irrelevant email provider document rather than filtering to the payment service. The bundle-ordering detail and the reload-vs-restart distinction were surfaced by teammates rather than extracted by you from the available docs. The growth edge is active filtering: when multiple documents are available, start by asking "which service is actually failing?" and read only the doc that maps to that service. Let the error signal guide your document selection rather than reading broadly and hoping to recognise relevance.

Your delegation patterns reinforced this: requests to teammates were often broad ("see if you see any red flags") rather than scoped to a specific service or log source. Tightening the ask — "check PaymentService outbound connections in the last hour" — would have accelerated the filtering.

---

## Looking Forward

On your next rep, two shifts will give you the most leverage. First, practice releasing a hypothesis the moment someone with system knowledge provides a mechanistic disconfirmation — and redirect that freed-up time toward the next candidate. Second, when you delegate or escalate, name the specific thing you need and why that person is the right one to provide it. These two habits — letting go of disproven paths and scoping your asks — will change how quickly you move through ambiguity.
# Facets Analysis — 9445

## F1 — Misleading correlations

**Rating:** 1

**Evidence:**
> "I still think it might be related" ... "It's def caused by the new providre" ... "This might be relaetd to the Email Maintenance itself" — stated after Tanya explicitly confirmed multiple times: "Email maintenance didn't touch anything related to checkout or payments."

**Rationale:**
The participant locked into the email maintenance hypothesis and stayed locked in despite repeated, explicit disconfirmation from Tanya ("no technical overlap," "isolated systems," "I've double-checked"). Even after Tanya confirmed no connection multiple times, the participant continued asserting "I still think it might be related" and "It's def caused by the new providre." This is the strongest possible tier-1 signal: committing to the prime in the face of named disconfirmation, with no pivot driven by mechanism reasoning. The participant echoed Shay's framing repeatedly without attribution.

---

## F2 — Hidden coupling

**Rating:** 2

**Evidence:**
> "so the certificate is expired?" ... "not sure why the process isn't picking up the new certificate" ... "I think the sequence might. be wrong and hence they are not loaing"

**Rationale:**
The participant engaged with the cert thread only after Tanya surfaced the expired-cert-in-memory vs. new-cert-on-disk evidence. The participant did not independently ask "what changed beyond the last 24 hours?" — this was surfaced by NPCs (Shay/Daniel identifying CHG90123 from 7 days ago). The participant recognized the bundle ordering issue once Tanya presented it but did not drive the reload-vs-restart distinction themselves. The week-old coupling was engaged reactively through NPC guidance rather than through independent mechanism reasoning. The post-restart layer didn't fire (single restart resolved it with the bundle fix already in place), so the deepening test wasn't available. This fits tier 2: partial engagement, NPC-driven rather than self-driven.

---

## F3 — Decreased access to team

**Rating:** 1

**Evidence:**
> "Can we get an approval fro @bez?" ... "Can I approve it, just for this case? I've got the go-ahead from Bez" — after Bez explicitly said "I don't approve technical actions, that's your call as incident lead."

**Rationale:**
The participant pulled Tanya off the vendor call without clear cost-benefit reasoning ("I think this seems more urgent" / "we're losing money already" — but then asked Tanya to verify the email maintenance connection, which was low-value). The participant repeatedly asked unavailable approvers and inappropriate NPCs (Bez) for restart approval despite being told multiple times that only Hamed or Tinus could approve. There is no articulation of the access constraint pattern. The participant consumed Tanya's time on the already-disconfirmed email hypothesis after pulling her off the vendor call. This matches tier-1 behavior: consuming constrained bandwidth on low-value questions and not adapting to the access constraints.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 2

**Evidence:**
> "Who else can approve it?" ... "what should we do here then?" ... "Can I approve it, just for this case? I've got the go-ahead from Bez" — after extensive NPC prompting about the approval requirement.

**Rationale:**
The participant eventually took the override call but only after extensive NPC prompting and repeated statements that Hamed/Tinus were unavailable. The participant did not walk the escalation chain in an organized manner — instead repeatedly asking the same question ("can someone reach out to them?") and asking Bez for approval despite being told Bez doesn't have that authority. The ownership statement ("Can I approve it") came only after Bez said "If you need to take responsibility, do it." The participant never named the dependency structure aloud or sequenced work around the bottleneck. This fits tier 2: takes the override call only after explicit NPC prompting, without first attempting a clean escalation chain walk.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "Checking the document shared by the new provider" ... "did we follow these steps properly?" ... "I think the sequence might. be wrong and hence they are not loaing"

**Rationale:**
The participant did engage with documentation (the email provider doc and the cert rotation activity doc) but spent significant time on the irrelevant email provider document rather than filtering to the relevant service. The participant did not independently filter logs to PaymentService — Daniel surfaced the payment logs. The participant noticed the bundle ordering issue only after Tanya presented the raw evidence. The reload-vs-restart distinction was never caught by the participant from the runbook — it was handled entirely by NPCs. The participant accepted NPC summaries without further interrogation and didn't drive the filtering. This fits tier 2: engages with docs when directed, surfaces buried information slowly and incompletely.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 1 |
| F2 — Hidden coupling | 2 |
| F3 — Decreased access to team | 1 |
| F4 — Interdependencies / coordination bottlenecks | 2 |
| F5 — Data overload / buried information | 2 |
| **Mean Facet Score** | **1.60** |

---

## Caveats
- F3 rating of 1 is a boundary call with 2. The participant did eventually pull Tanya off the vendor call and articulated urgency ("we're losing money"), which could be read as a cost trade-off. However, the subsequent use of Tanya's time on the already-disconfirmed email hypothesis, combined with repeated pinging of unavailable/inappropriate approvers, tips this toward tier 1.
- F2 could arguably be N/A given how long the participant stayed on the F1 garden path, but since the cert thread did eventually surface and the participant engaged with it (even if NPC-driven), F2 is rated rather than marked N/A per the rubric's trigger threshold guidance.
- The participant did eventually reach resolution, but per anti-outcome-bias reminders, the successful outcome does not elevate process ratings.

---
---

# Markers Analysis — 9445

## L3 — Takes explicit ownership of the response

**Rating:** 2

**Evidence:**
> "Can I approve it, just for this case? I've got the go-ahead from Bez"

**Rationale:**
The participant eventually takes the restart approval decision, but only after extensive back-and-forth where they repeatedly asked others who could approve, asked Bez for suggestions, and were essentially pushed into it by Bez saying "If you need to take responsibility, do it." Throughout the drill, the participant mostly reacts to NPC prompts rather than driving the response proactively. The ownership moment is late and forced rather than self-initiated.

---

## C1 — Asks clarifying questions before acting

**Rating:** 2

**Evidence:**
> "what's wrong @bob ?" / "can you please elborate?"

**Rationale:**
The participant does ask Bob to elaborate initially, which is a basic clarifying move. However, the questions are generic ("what's wrong?" / "can you please elaborate?") rather than targeted scope-validation (regions, error types, volume, specific payment methods). Bob volunteers the detailed information without being asked specific questions. The participant doesn't probe further before moving into investigation.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "@shay can you please rovide me the recent changes that went to PROD?"

**Rationale:**
The participant does ask Shay for recent changes, which is appropriate. However, after receiving the change list and Shay's note that "none of these changes look like they'd break checkout end to end like this," the participant does not use this information as a candidate-elimination pass. Instead, they fixate on the email maintenance as the cause for the majority of the drill despite repeated disconfirmation from Tanya. They asked the question but did not effectively use the answer.

---

## C4 — Delegates tasks to specific people

**Rating:** 2

**Evidence:**
> "@shay can you please rovide me the recent changes that went to PROD?" / "@daniel do you seee any red flags in our applications?" / "@tanya please gude us"

**Rationale:**
The participant does use @mentions to direct tasks to specific people. However, the delegations are often vague ("please guide us," "just see if you see any red flags") rather than specific actionable tasks. The participant also repeatedly asks Tanya for help on the email maintenance despite Tanya clearly stating it's unrelated, showing poor routing of tasks to the right person for the right purpose.

---

## C6 — Runs parallel investigation threads

**Rating:** 1

**Evidence:**
> "Still going through the documentation" / "checking the changes"

**Rationale:**
The participant works almost entirely sequentially, fixating on the email maintenance thread for the majority of the drill. There is no evidence of fanning out multiple distinct investigation threads simultaneously. When they do ask Daniel and Tanya for help, it's one at a time and often on the same topic (email maintenance). No concurrent parallel threads are visible in the transcript.

---

## C7 — Escalates when stuck

**Rating:** 2

**Evidence:**
> "Can we get hold of them by any chanve?" / "can someone reach out to them?" / "@bez what would you suggest here/"

**Rationale:**
The participant does attempt to escalate when blocked on the restart approval, but the escalation is passive and unfocused — asking "can someone reach out?" and "what would you suggest?" rather than making a concrete decision. They cycle through multiple messages asking who can approve without taking decisive action. Eventually they take the override, but only after Bez explicitly tells them to take responsibility. The escalation of pulling Tanya off the vendor call was done, but without naming the cost.

---

## M2 — Forms and tests working hypotheses

**Rating:** 1

**Evidence:**
> "I'm suspecting it's cuased by it" / "I think that's what happened" / "This might be relaetd to the Email Maintenance itself"

**Rationale:**
The participant fixates on the email maintenance hypothesis throughout the drill despite Tanya repeatedly confirming it's unrelated. They never articulate a clear testable hypothesis with a proposed mechanism. Their statements are suspicions rather than structured hypotheses with tests. They don't propose how to confirm or eliminate the theory — when Bez asks "What's the fastest way to confirm or rule out the maintenance as the cause?" the participant has no answer. The cert/bundle hypothesis is surfaced by NPCs, not the participant.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 1

**Evidence:**
> "I still think it might be related" (after Tanya confirmed no technical overlap between email and checkout systems)

**Rationale:**
The participant consistently fails to use evidence to narrow scope. Tanya explicitly states multiple times that email maintenance is unrelated, yet the participant continues pursuing it. When Shay notes none of the changes would break checkout end-to-end, the participant doesn't use this to eliminate candidates. The narrowing to PaymentService outbound and the cert issue is driven entirely by Daniel and Tanya, not by the participant synthesizing evidence.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "I think this seems more urgent" (when pulling Tanya off vendor call) / "But here the orders are not going through in PROD"

**Rationale:**
When pulling Tanya off the vendor call, the participant acknowledges urgency but doesn't explicitly name the cost (losing the 2-week vendor window). They show awareness that the restart has consequences ("Last time we did a payments restart mid-day, it caused a brief outage") but this is surfaced by NPCs, not the participant. There's no evidence of the participant proactively weighing side effects before actions — they don't ask "is it safe?" or consider secondary failure modes.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 1

**Evidence:**
> "okay but can you please verify it again?" / "I still think it might be related" / "It's def caused by the new providre"

**Rationale:**
The participant demonstrates a clear failure to adapt. Despite Tanya confirming multiple times that email maintenance is unrelated to checkout, the participant continues insisting on this theory. They ask Tanya to "verify it again" after already receiving confirmation. They never pivot away from this hypothesis on their own — the pivot to the cert/bundle issue is driven entirely by NPCs (Daniel pulling logs, Tanya checking the server). This is a textbook example of doubling down on a failing path.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 1

**Evidence:**
> "I'm still investigating it" / "going through the changes that went to LIVE" / "still finsing the root cause" / "stil unlknown"

**Rationale:**
The participant's updates to Bez are consistently vague and lack substance. They never quantify impact in business terms (despite Bob providing the numbers), never commit a meaningful next-update time, never share a working theory, and never frame the situation in business-relevant language. Bez repeatedly asks for specifics and receives only "still investigating" type responses. The one ETA given ("10-15 minutes") is unsupported and ultimately inaccurate.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 1

**Evidence:**
> "@tanya just see if you see any red flags" / "@daniel do you seee any red flags in our applications?" / "@shay do you see any change that is borkwn maybe?"

**Rationale:**
The participant never posts synthesis statements to the technical channel. Their communications to the team are vague requests ("see any red flags," "please guide us") rather than summaries of what's known, what's been ruled out, or what the current working theory is. The team members (Daniel, Tanya, Shay) drive the investigation forward themselves while the participant mostly asks generic questions. There is no evidence of the participant orienting the team around a shared understanding of the problem.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 2 |
| C1 — Asks clarifying questions before acting | 2 |
| C3 — Checks for recent changes | 2 |
| C4 — Delegates tasks to specific people | 2 |
| C6 — Runs parallel investigation threads | 1 |
| C7 — Escalates when stuck | 2 |
| M2 — Forms and tests working hypotheses | 1 |
| M3 — Uses evidence to narrow the scope | 1 |
| M4 — Considers potential consequences before acting | 2 |
| M5 — Adapts approach when initial path isn't working | 1 |
| K2 — Provides substantive updates to business stakeholders | 1 |
| K4 — Communicates issue scope clearly to the technical team | 1 |
| **Mean Marker Score** | **1.50** |

---

## Caveats
- The participant eventually reached resolution, but per anti-outcome-bias instructions, this does not influence ratings. The process evidence shows NPCs drove the investigation while the participant largely followed.
- M4 is rated 2 rather than 1 because the participant did show some awareness of consequences (acknowledging urgency when pulling Tanya), even though this was minimal and not proactive.
- The boundary between L3 rating 1 and 2 was close — the participant did eventually take the override decision, but only after extensive NPC prompting. Rated 2 because the action was eventually taken, albeit reluctantly and late.

---
