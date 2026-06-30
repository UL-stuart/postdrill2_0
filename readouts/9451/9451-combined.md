# Post-Drill Developmental Report

This drill placed you in a live incident requiring you to navigate misleading signals, coordinate across a partially unavailable team, and synthesise information under pressure. The observations below reflect how you engaged with those challenges and where your next growth edges sit.

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you noticed the timing coincidence between the DNS change and the onset of checkout failures, and you pursued that correlation as a leading hypothesis. You did question the mechanism at one point — wondering aloud whether email DNS could plausibly affect checkout — but you proceeded with the rollback anyway rather than letting that doubt redirect your investigation. After the rollback failed to resolve the issue, you moved to the next change rather than explicitly naming the correlation as a false lead.

*Growth edge:* When you notice yourself questioning a mechanism ("how would X cause Y?"), treat that doubt as a decision gate. If you can't articulate a plausible causal chain, deprioritise the hypothesis before investing action on it. The instinct to question was there — the next step is letting that instinct actually steer your choices.

## F3 — Decreased access to team / remote

**Operating at: Strengthening**

You recognised the access constraints clearly — identifying that Hamed was on leave, accepting the auto-reply without re-pinging, and naming Tanya as the sole platform resource. You escalated through Bez to pull Tanya off a vendor call when severity warranted it, and you directed targeted requests to her rather than vague asks. Your delegation to specific people with named tasks supported this coordination.

*Growth edge:* When you make the call to pull someone off another commitment, articulate the cost trade-off yourself — even briefly. Naming "I'm pulling Tanya because the revenue impact outweighs the vendor call" makes the decision visible to the team and strengthens your ownership of the escalation path.

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Practicing**

You recognised some bottlenecks — Hamed unavailable, Tanya occupied — and you did eventually get Tanya engaged. However, the coordination pattern was largely reactive: you waited for each rollback to complete before starting the next investigation thread, and the escalation to free Tanya came after team pressure rather than from your own proactive sequencing. You delegated rollbacks to Daniel but didn't simultaneously assign someone else to investigate alternative hypotheses.

*Growth edge:* When you identify that a key resource is blocked, map out what can proceed in parallel without them. Fanning out — one person rolling back while another pulls logs from a different service — prevents the investigation from stalling in a single queue. Think about sequencing work around the bottleneck, not just through it.

## F5 — Data overload / buried information

**Operating at: Not yet evident**

The drill surfaced multiple data streams — logs, change records, NPC observations about which services were and weren't affected — and the filtering challenge here was significant. You chased each recent change sequentially without reasoning about which services had plausible causal paths to the payment failure. When team members surfaced log information pointing toward the actual failure pattern, you misread it as confirming the DNS hypothesis. You also declared the cart service as root cause without supporting evidence, then abandoned that when told cart logs were clean.

*Growth edge:* Before asking "can someone check," pause to integrate what's already been surfaced in-channel. Build a habit of asking yourself: "What has already been ruled out? What signal am I ignoring?" When a team member surfaces information, take a beat to reconcile it with your current theory before issuing the next action. The goal is to let disconfirming evidence actually change your direction rather than passing through unprocessed.

---

## Looking Forward

The instincts that will serve you well are already visible: you asked clarifying questions before declaring severity, you checked for risk before some rollbacks, and you recognised access constraints quickly. The pattern to work on across your next reps is shifting from a serial rollback-and-test approach toward mechanism-first reasoning — asking "how would this cause that?" before acting, and using failed experiments as elimination evidence rather than just moving to the next item on the list. Building in brief synthesis moments ("here's what we've ruled out, here's where we're looking next") will also help you orient your team and catch buried signals before they slip past.
# Facets Analysis — 9451

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "yes we are receiving 0 orders so revenue is impacted" ... "@shay can we link the dns changes to this issue?" ... "I don't see how email DNS would hit checkout directly, but the timing is weird." ... "yes please but that is likely not going to affect the checkout or payment service? or can it?"

**Rationale:**
The participant initially pursued the email/DNS correlation as a leading hypothesis and ordered multiple rollbacks based on timing coincidence. They did show some questioning of the mechanism ("that is likely not going to affect the checkout or payment service? or can it?"), but ultimately pursued the DNS rollback anyway. After the DNS rollback failed, they pivoted reactively to other changes rather than from mechanism reasoning. They never explicitly named the correlation as a false prime or articulated why email DNS couldn't plausibly break payment. The pivot was driven by failed experiments (rollbacks not working) rather than upstream reasoning, placing this squarely in tier 2.

---

## F2 — Hidden coupling

**Rating:** N/A

**Evidence:**
> "Could we explore if this is a non change related event as in any service provider issues again please do we have any maintenance emails in from vendors etc?"

**Rationale:**
The participant never reached the cert thread. They spent the entire drill on the F1 garden path — rolling back recent changes one by one. While they briefly asked about "non change related" events and vendor maintenance emails, they never engaged with the cert rotation from a week ago, never identified the reload-vs-restart distinction, and the drill timed out before any cert-related investigation began. Per the rubric's N/A semantics: "F1-driven F2 absence (the participant timed out without ever engaging cert work) is N/A, not tier 1."

---

## F3 — Decreased access to team / remote

**Rating:** 3

**Evidence:**
> "OK @tanya we currently have a sev-1 ticket and will require your assistance asap please as you are the only Platform resource we have" ... "@hamed Are you able to assist here please" ... after auto-reply: "can anyone look at this from a platform side in Hamed or Tanyas absence?"

**Rationale:**
The participant named the access constraints in their own words — recognising Hamed was on holiday (accepted the auto-reply and moved on after one attempt), Tanya was on a vendor call, and that Tanya was the only platform resource available. They escalated appropriately through Bez to pull Tanya off the vendor call when the severity warranted it. They did not re-ping Hamed after the auto-reply. They sent Tanya targeted requests rather than vague queries. However, they didn't explicitly articulate the cost trade-off when pulling Tanya off the vendor call — that reasoning came from Bez/the system rather than the participant verbalising it. This meets tier 3 anchors.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 2

**Evidence:**
> "can anyone look at this from a platform side in Hamed or Tanyas absence?" ... "Ok can we revert all today's changes please, can anyone confirm the risk and also place a change freeze while we resolve this we are burning through money" ... "@daniel could you continue reverting back the rest of the changes and testing in between please @All can you assist daniel if needed please"

**Rationale:**
The participant recognised some bottlenecks (Hamed unavailable, Tanya on a call) but did not name the dependency structure aloud or sequence work to avoid stalls. They delegated rollbacks to Daniel sequentially but didn't run parallel investigation threads. The escalation to get Tanya off the vendor call happened only after team pressure (Bez intervened). They never explicitly owned an override decision or articulated the escalation chain as exhausted. There was some coordination (asking Daniel to test between rollbacks, asking Shay for change logs simultaneously), but the overall pattern was reactive rather than proactively structured. This fits tier 2 — recognises some bottlenecks but doesn't sequence around them effectively.

---

## F5 — Data overload / buried information

**Rating:** 1

**Evidence:**
> "Ok so the final change is the cart service, we have been looking at this wrong entirely the issue stems from the cart" ... "@Tanya those log point to DNS" ... "there are errors on all services @Tanya"

**Rationale:**
The participant was captured by the loudest signals and failed to filter effectively. They chased every recent change sequentially without reasoning about which services had plausible causal chains to the payment failure. When Daniel surfaced logs showing the actual failure pattern, the participant misread them as pointing to DNS. They declared the cart service was the root cause without evidence, then abandoned that when told cart logs were clean. They never asked for PaymentService-specific logs, never reasoned about absence of signal (internal calls clean → external boundary), and never engaged with the mechanism of the failure despite NPCs surfacing relevant information. The participant repeatedly delegated "can someone check" without integrating information already available in-channel.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 2 |
| F2 — Hidden coupling | N/A |
| F3 — Decreased access to team | 3 |
| F4 — Interdependencies / coordination bottlenecks | 2 |
| F5 — Data overload / buried information | 1 |
| **Mean Facet Score** | **2.00** |

---

## Caveats
- F2 is rated N/A because the participant never engaged with the cert thread; the entire drill was spent on the F1 garden path of rolling back recent changes. This is consistent with the rubric's explicit guidance that F1-driven F2 absence is N/A, not tier 1.
- F5 rating of 1 is a boundary call — the participant did eventually ask for logs and made some filtering attempts, but the misreading of surfaced information and failure to integrate NPC-provided signals (e.g., "Checkout fails before cart is even touched" being ignored when declaring cart as root cause) anchors this at tier 1.
- The drill timed out before the participant could reach the cert/payment service investigation, limiting evidence for F2 and the higher-leverage F4 moments (restart approval).

---
---

# Markers Analysis — 9451

## L3 — Takes explicit ownership of the response

**Rating:** 2

**Evidence:**
> "ok lets raise a sev-1 immediately for this"
> "we are still exploring other avenues now will report back shortly with a meaningful update asap"
> "Ok so the rollback did not work, currently as Hamed is on AL and Tanya is stuck on a vendor call i have asked if she can jump in due to severity"

**Rationale:**
The participant does drive the response to some degree — raising the SEV-1, directing rollbacks, and requesting Tanya's involvement. However, they never explicitly take personal ownership of the decision to override approval chains or accept consequences. When the restart/approval moment arrives, they defer to Bez to pull Tanya in rather than making the call themselves. There is no "I authorize" or "blowback's on me" moment.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "@bob what kind of complaints?"
> "ok lets just slow down a moment since this is affecting all regions and checkouts can we first replicate the issue please"
> "How many customers are blocked from checkout right now? What's the revenue loss per minute? Is this a total outage or are some orders still going through?"

**Rationale:**
The participant's first actions are clarifying questions to Bob about the nature of complaints, followed by asking for replication before acting. They explicitly say "let's slow down" and scope the issue before declaring SEV-1. This meets the novice expectation of scope-validating before acting, though the questions are somewhat generic rather than deeply targeted at pattern differentiation.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "@all have any other changes been made today"
> "so i see 2 changes for the checkout service who carried these out please?"
> "@daniel was checkout service working prior to your changes"

**Rationale:**
The participant does ask for the change log and reviews recent deploys. However, they use the change log primarily as a rollback queue — systematically rolling back every change one by one without articulating a mechanism connecting any specific change to the symptom. They never use absence-of-match as evidence to deweight the deploys lead. This is the classic tier-2 pattern: asked the question but used the answer as a rollback list rather than an elimination tool.

---

## C4 — Delegates tasks to specific people

**Rating:** 2

**Evidence:**
> "@daniel was checkout service working prior to your changes"
> "@tanya could you advise on your change please"
> "@daniel could you continue reverting back the rest of the changes and testing in between please @All can you assist daniel if needed please @Shay can i have the change log please"

**Rationale:**
The participant does use @mentions and direct asks to specific people. However, many asks are vague ("@All can you assist daniel if needed please") or misrouted (asking Shay about DNS when only Tanya has platform access, repeatedly asking Tanya about DNS when she's confirmed it's not the issue). The delegation lacks precision in matching tasks to access boundaries, placing this at tier 2.

---

## C6 — Runs parallel investigation threads

**Rating:** 1

**Evidence:**
> "yes please that was the initial change to be rolled back @daniel why was this not done?"
> "@daniel could you continue reverting back the rest of the changes and testing in between please"

**Rationale:**
The participant works almost entirely sequentially — rolling back one change at a time, waiting for results, then moving to the next. There is no evidence of multiple distinct investigation threads running simultaneously. They never fan out tasks to different people investigating different hypotheses concurrently. The entire approach is serial rollback-and-test.

---

## C7 — Escalates when stuck

**Rating:** 2

**Evidence:**
> "@hamed Are you able to assist here please, could platform be checked as a matter of urgency this is a SEV-1 inc"
> "OK @tanya we currently have a sev-1 ticket and will require your assistance asap please as you are the only Platform resource we have"

**Rationale:**
The participant does attempt escalation — pinging Hamed (who auto-replies) and then asking Tanya to join. However, when Hamed auto-replies, the participant doesn't immediately pivot to Tinus or take the override decision themselves. The escalation to Tanya is somewhat passive ("will require your assistance asap please") rather than directive, and ultimately Bez is the one who pulls Tanya off the vendor call. The escalation lacks the concrete context and decisiveness expected at tier 3.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "Ok so the final change is the cart service, we have been looking at this wrong entirely the issue stems from the cart"
> "More of a timing issue here, the issue occured right around the time of the DNS change"

**Rationale:**
The participant forms implicit hypotheses (checkout service change caused it, DNS caused it, cart service caused it) but rarely articulates them explicitly before testing. The "tests" are all rollbacks without mechanism reasoning — they never ask "how would X cause Y?" before acting. The cart hypothesis is stated as fact ("the issue stems from the cart") without evidence, and is immediately disconfirmed. This is the tier-2 pattern of sequential action without named hypotheses or mechanism testing.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "Brilliant so we have nailed it down to the correct step"
> "so it's not region specific"
> "so no changes on frontend prod today, but your change seems to fix a similair issue we are seeing"

**Rationale:**
The participant does make some narrowing observations (not region-specific, fails at payment step). However, they fail to synthesize disconfirmations into a tighter scope. After multiple rollbacks fail, they don't use those negatives to rule out the change-related hypothesis. They never produce a synthesis statement like "it's not deploys, focus on X." The narrowing is minimal and doesn't drive the investigation forward effectively.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "Can anyone confirm if reverting DNS will cause any fruther risk"
> "Lets do a test inbetween please"
> "ok that's either fairly close any risk to roll that back"

**Rationale:**
The participant does ask about risk before some rollbacks ("any risk to roll that back?", "Can anyone confirm if reverting DNS will cause any further risk"). However, these are formulaic safety checks rather than genuine consequence reasoning. They never anticipate secondary failure modes, never name the cost of pulling Tanya off the vendor call, and don't consider whether mass rollbacks could introduce instability. The checks are present but shallow.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 1

**Evidence:**
> "Ok can we revert all today's changes please"
> "@daniel could you continue reverting back the rest of the changes and testing in between please"
> "ok does anyone have any idea what else could be causing this"

**Rationale:**
The participant's approach throughout the drill is to roll back changes one by one. After each rollback fails, they move to the next change rather than questioning the rollback-based strategy itself. Even after 5+ failed rollbacks, they continue with "revert all today's changes." The eventual pivot to logs comes only after exhausting all rollbacks, and even then the drill times out before meaningful adaptation occurs. This is the tier-1 pattern of repeating the same approach.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "we are losing thousands in sales already but we have identified a change that occured right before it went down"
> "we are still exploring other avenues now will report back shortly with a meaningful update asap"
> "Ok so the rollback did not work, currently as Hamed is on AL and Tanya is stuck on a vendor call i have asked if she can jump in due to severity"

**Rationale:**
The participant does provide some updates to Bez, but they are largely reactive (responding to Bez's pressure rather than proactively updating) and lack substance. They never quantify revenue impact in concrete terms, never commit to a specific next-update time, and never share a working theory in business terms. The updates are vague reassurances ("exploring other avenues") rather than substantive business communications.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 1

**Evidence:**
> "ok does anyone have any idea what else could be causing this"
> "yes can we check is this is related to the payment service please"

**Rationale:**
The participant rarely synthesizes the current state of knowledge for the technical team. There are no messages that summarize what's been ruled out, what the current working theory is, or where the investigation should focus next. Instead, the participant asks individual questions and directs individual rollbacks without providing the team with an overall picture. The "ok does anyone have any idea" message is the opposite of a synthesis — it broadcasts confusion rather than orienting the team.

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
| M4 — Considers potential consequences before acting | 2 |
| M5 — Adapts approach when initial path isn't working | 1 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 1 |
| **Mean Marker Score** | **1.83** |

---

## Caveats
- The drill timed out before the participant reached the cert/TLS root cause, which limits observation of later-stage markers (M5 pivot after restart failure, K2 updates through secondary failure). However, the timer expiry itself is not used as a rating factor — ratings are based on process evidence during the active period.
- The participant's confusion about whether CheckoutService was actually rolled back (conflicting messages with Daniel) may reflect NPC behavior rather than participant error, but the participant's failure to verify and track rollback state is still relevant to M3 and K4.
- C7 is a borderline 2/3 call — the participant does eventually get Tanya pulled in, but it's Bez who makes the actual call after the participant's request, and the participant never attempts Tinus as a backup approver.

---
