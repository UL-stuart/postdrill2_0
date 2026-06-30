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