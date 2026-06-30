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