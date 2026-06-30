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