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