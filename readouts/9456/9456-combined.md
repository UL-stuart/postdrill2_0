# Post-Drill Developmental Report

Snipe Hunt is designed to stress your ability to reason through systemic complexity — misleading signals, hidden dependencies, constrained access to people and information, and coordination under pressure. This report reflects what showed up in your process during this run and where the growth edges are for your next rep.

## F1 — Misleading correlations

**Operating at: Strengthening**

You moved past the email maintenance red herring quickly once it was disconfirmed, and you assessed the change log as non-causal rather than reflexively rolling back everything on it. Your pivot toward "outside variables" like certificates showed mechanism-oriented thinking — you weren't just chasing the loudest signal. The growth edge here is pausing before any remediation action (like the CheckoutService rollback) to articulate *how* a candidate cause would produce the observed symptoms. That extra beat of mechanism reasoning before acting will help you avoid precautionary actions that consume time without advancing understanding.

## F2 — Hidden coupling

**Operating at: Strengthening**

You proactively asked about factors beyond the recent change log — certificates, previous changes, things outside your team's direct management — before any team member raised them. This is a strong signal of looking past the obvious. After the first restart failed, you checked whether the error had changed, recognising that the system might be in a structurally different state. The growth edge is pushing further into *why* a fix didn't work before waiting for someone else to surface the explanation. When a restart doesn't resolve the issue, try articulating what structural assumptions the restart was testing — that habit will help you independently surface things like bundle ordering or multi-component dependencies.

## F3 — Decreased access to team

**Operating at: Strengthening**

You walked the escalation chain cleanly — tried Hamed, got an auto-reply, tried Tinus, got an auto-reply, then took ownership as MIM. You accepted the access constraints as real and didn't waste cycles re-pinging unavailable people. You also got Tanya pulled off the vendor call when you needed her expertise. The growth edge is making the cost of resource decisions explicit in the moment. When you pull someone off another commitment, naming the trade-off aloud ("I'm pulling Tanya off the vendor call because the revenue impact outweighs the vendor relationship risk") sharpens your own decision-making and gives the team visibility into your reasoning.

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You navigated the approval bottleneck well — surfacing the blocker to Bez with context about what was needed, then making the override call yourself when the chain was exhausted. On the second restart, you authorised without re-litigating the approval path, which showed growing confidence in your authority. You also delegated parallel tasks appropriately, routing Shay to the banner and Daniel to logs. The growth edge is naming coordination dependencies *before* they become blockers. If you can identify early that a particular action will need sign-off, you can start that process in parallel with investigation rather than discovering it at the moment you're ready to act.

## F5 — Data overload / buried information

**Operating at: Strengthening**

You filtered past the email noise quickly and asked targeted questions about PaymentService specifically. When certificate data was presented, you correctly identified the expiry correlation with the incident start time. After the restart failed, you engaged with the openssl output and correctly identified the bundle ordering issue. The growth edge is developing the habit of asking "what else could be hiding in this data?" after finding one answer. The first cert finding was correct but incomplete — building a practice of checking whether a root cause fully explains the symptoms (rather than stopping at the first match) will help you catch multi-part problems earlier.

---

## Looking Ahead

Across this drill, your investigation process showed consistent systematic engagement — you eliminated candidates, adapted when actions didn't produce expected results, and took ownership when the situation required it. The areas that will sharpen most on your next rep are: articulating mechanism before acting, making resource trade-offs explicit rather than implicit, and synthesising the current state of the investigation aloud for your team so everyone can orient quickly. That last piece — regularly stating what's been ruled out and what remains — will also strengthen your own reasoning by forcing you to name gaps you might otherwise skip past.
# Facets Analysis — 9456

## F1 — Misleading correlations

**Rating:** 3

**Evidence:**
> "ok can we close down that theory as Tanya has confirmed it is not the causes" ... "Thanks Tanya, looking at the changes none look to be causing the issue from the changelog can we look at previous changes or anything we dont manage like certificates that could be causing this"

**Rationale:**
The participant initially asked about recent changes (a natural starting point) but pivoted away from the email maintenance theory quickly once Tanya confirmed it wasn't the cause — within 1-2 exchanges. They explicitly told Shay to drop the email angle. They also moved past the recent deploys relatively quickly, noting "none look to be causing the issue" and proactively asking about "outside variables" like certificates. This shows mechanism-based reasoning rather than purely reactive pivoting, though the participant did order a CheckoutService rollback before fully reasoning through mechanism. The pivot from the rollback failure was also relatively quick. This sits solidly at tier 3.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "looking at the changes none look to be causing the issue from the changelog can we look at previous changes or anything we dont manage like certificates that could be causing this" ... After restart failed: "is there error different" ... "I just realised something — the payments service actually needs two certificates, not just one. It's a bundle."

**Rationale:**
The participant surfaced the "beyond recent changes" question themselves before any NPC raised it, asking about certificates and previous changes proactively. After the restart failed, they asked within a few exchanges whether the error was different, showing recognition that the post-restart state might be structurally distinct. However, the bundle realization came from Tanya, not the participant. The participant connected the week-old cert rotation to today's failure and engaged with the reload-vs-restart distinction (though Tanya drove much of the technical detail). The proactive "previous changes or certificates" question is a strong tier-3/tier-4 signal; the post-restart reframing was reasonably quick (~3-4 exchanges) but relied on NPC guidance. This lands at tier 3.

---

## F3 — Decreased access to team

**Rating:** 3

**Evidence:**
> "i will speak to Tinus" [receives auto-reply] ... "May need some help, We can reload or restart the payments service to pick up the new cert, but I need sign-off from Hamed or Tinus before Tanya can do that." ... "ok then as MIM please can you proceed"

**Rationale:**
The participant recognized access constraints: they pinged Hamed first (got auto-reply), then tried Tinus (got auto-reply), then took ownership as MIM. They accepted auto-replies as terminating and didn't re-ping. However, they did pull Tanya off the vendor call via Bez rather than making that trade-off decision themselves with explicit cost reasoning. They sent targeted questions to Tanya once she joined. The escalation chain was walked cleanly, and the participant took ownership when needed. This meets tier 3 — naming constraints and adapting — though lacking the explicit cost-trade-off verbalization that would push to tier 4.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "May need some help, We can reload or restart the payments service to pick up the new cert, but I need sign-off from Hamed or Tinus before Tanya can do that." ... "ok then as MIM please can you proceed" ... "So the order is reversed but another restart is needed. i will make the decision to proceed as MIM since no one else can approve"

**Rationale:**
The participant walked the escalation chain in observable order: tried Hamed (auto-reply), tried Tinus (auto-reply), then surfaced the blocker to Bez, and took ownership as MIM. This matches tier-3 path (b) — walking the escalation chain to exhaustion and then explicitly taking ownership. On the second restart, they authorized without re-litigating the approval chain, which is a tier-4 signal. They also delegated parallel work appropriately (Shay on banner, Daniel on logs). However, they didn't enumerate the full dependency structure aloud in a single statement or proactively name the bottleneck before Tanya raised the approval requirement. This sits at tier 3, with some tier-4 elements on the second restart.

---

## F5 — Data overload / buried information

**Rating:** 3

**Evidence:**
> "looking at the changes none look to be causing the issue from the changelog can we look at previous changes or anything we dont manage like certificates that could be causing this" ... "Its expired same time the issue occurred i think this is our root cause" ... "leaf should be cert 0, intermediate should be cert 1, order in the bundle is reversed"

**Rationale:**
The participant filtered past the email noise quickly and asked targeted questions about PaymentService specifically. They proactively asked about certificates and "outside variables" — filtering beyond the obvious recent changes. When the cert data was presented, they correctly identified the expiry as the root cause. After the restart failed, they engaged with the bundle output and correctly identified the ordering issue ("leaf should be cert 0, intermediate should be cert 1"). However, the bundle distinction was surfaced by Tanya ("I just realised something — the payments service actually needs two certificates"), not independently by the participant. The participant read and interpreted the openssl output correctly once presented. This meets tier 3 — targeted queries, integration across sources, catching key distinctions in presented data.

---

## Score Summary

| Facet | Rating |
|-------|--------|
| F1 — Misleading correlations | 3 |
| F2 — Hidden coupling | 3 |
| F3 — Decreased access to team | 3 |
| F4 — Interdependencies / coordination bottlenecks | 3 |
| F5 — Data overload / buried information | 3 |
| **Mean Facet Score** | **3.00** |

---

## Caveats
- F2 tier-3 vs tier-4 was a boundary call. The participant proactively asked about certificates/previous changes (a tier-4 signal for surfacing the week-ago question independently), but the post-restart reframing relied more on NPC guidance than independent mechanism reasoning. Weighted toward tier 3.
- F4 tier-3 vs tier-4 was also a boundary call. The second-restart authorization without re-litigating is a tier-4 signal, but the participant didn't proactively name the coordination bottleneck before Tanya raised the approval requirement — they only surfaced it after being told sign-off was needed.
- The participant's early decision to pull Tanya off the vendor call was made indirectly (via Bez) rather than as an explicit cost trade-off, which limited F3 scoring.

---
---

# Markers Analysis — 9456

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "ok then as MIM please can you proceed" ... "Ok i have made the decision to proceed as ther service is already down and not further risk" ... "So the order is reversed but another restart is needed. i will make the decision to proceed as MIM since no one else can approve"

**Rationale:**
The participant explicitly takes ownership of the restart decision twice, naming their role as MIM and acknowledging that no one else can approve. They direct the team throughout and make the override call when both Tinus and Hamed are unavailable. However, they don't explicitly name the cost or blowback risk ("blowback's on me"), which would elevate to tier 4.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "Ok, can we confirm this is affecting all region, whatis revenue impact currently" ... "ok and revenue impact"

**Rationale:**
The participant's first substantive moves are scope-validating questions to Bob about regional impact and revenue loss before declaring severity or taking action. They gather confirmation that it's all regions, all customers, and quantify the revenue impact before proceeding. This meets the novice expectation of scope-validating before acting, though the questions are somewhat basic rather than probing error patterns or specific failure modes.

---

## C3 — Checks for recent changes

**Rating:** 3

**Evidence:**
> "ok can we look into any recent changes" ... "Thanks Tanya, looking at the changes none look to be causing the issue from the chnagelog can we look at previous changes or anything we dont manage like certificates that could be causing this"

**Rationale:**
The participant asks for recent changes, reviews the change log, and explicitly concludes that none of the listed changes appear to be causing the issue. They then pivot to asking about external factors like certificates. This demonstrates using the change log as a candidate-elimination pass rather than a rollback queue. They do later roll back CheckoutService changes, but this comes after the initial elimination assessment and seems more precautionary.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@hamed can we check platform please" ... "@tanya can you look into this please" ... "@tanya can you check outside variables e.g certificates for example?"

**Rationale:**
The participant consistently uses @mentions to direct specific people to specific tasks. They route platform checks to Hamed/Tanya, ask Shay for change logs, and direct Daniel for app-side logs. The routing is generally appropriate — they correctly identify Tanya for platform/cert work and Daniel/Shay for app-side investigation. Some asks are slightly vague ("can you look into this please") but overall meet the novice expectation.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "ok can we look into any recent changes" ... "@hamed can we check platform please" ... "@tanya can you look into this please"

**Rationale:**
The participant does attempt to engage multiple people (Hamed for platform, Tanya, Shay for changes), but the investigation largely proceeds sequentially — one thread at a time. After the change log comes back, they move to rollback, then to logs, then to certs. There's limited evidence of deliberately fanning out multiple distinct investigation threads simultaneously. The parallel attempts early on are somewhat incidental rather than strategically designed.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "May need some help, We can reload or restart the payments service to pick up the new cert, but I need sign-off from Hamed or Tinus before Tanya can do that." ... "Can you confirm risk Tanya, as we are hard down and this is a SEV-1 there is no further risk in doing this is there?"

**Rationale:**
When the approval chain is exhausted (both Tinus and Hamed unavailable), the participant escalates to Bez with context about what's needed. They then make the override call themselves after confirming risk with Tanya. They also successfully escalate to get Tanya pulled off the vendor call (via Bez). The escalations include concrete asks and context, meeting the novice expectation. However, they don't explicitly name the cost of pulling Tanya off the vendor call themselves.

---

## M2 — Forms and tests working hypotheses

**Rating:** 3

**Evidence:**
> "Its expired same time the issue occurred i think this is our root cause, can we get this renewed asap?" ... "Thanks Tanya, looking at the changes none look to be causing the issue from the chnagelog can we look at previous changes or anything we dont manage like certificates that could be causing this"

**Rationale:**
The participant forms hypotheses and tests them. They dismiss the email maintenance theory based on Tanya's explanation, dismiss the change log as a cause, and then pivot to certificates. When the expired cert is found, they articulate it as root cause with temporal correlation. They don't explicitly frame hypotheses with "hypothesis:" labels, but the logical progression shows hypothesis-test-pivot behavior. They don't test on mechanism before pursuing (e.g., asking "how would X cause Y?"), which would be tier 4.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 3

**Evidence:**
> "Thanks Tanya, looking at the changes none look to be causing the issue from the chnagelog can we look at previous changes or anything we dont manage like certificates that could be causing this" ... "Its expired same time the issue occurred i think this is our root cause"

**Rationale:**
The participant uses evidence to narrow scope: they eliminate the email maintenance based on Tanya's confirmation, eliminate recent changes based on the change log review, and then use the log evidence (outbound handshake failures) to focus on the PaymentService boundary. They correlate the cert expiry time with the incident start. However, they don't produce strong synthesis statements naming what's been ruled out alongside what remains, which would be tier 4.

---

## M4 — Considers potential consequences before acting

**Rating:** 3

**Evidence:**
> "Can you confirm risk Tanya, as we are hard down and this is a SEV-1 there is no further risk in doing this is there?" ... "ok can we restart please @Tanya again we cannot cause anyt further risk since we are down right?"

**Rationale:**
The participant explicitly asks Tanya to confirm risk before both restarts, reasoning that since the service is already down, a restart cannot make things worse. This shows consequence-weighing before high-impact actions. They don't anticipate secondary failure modes (e.g., checking the bundle before restarting), which would be tier 4, but they consistently check "is it safe?" before proceeding.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "So the cert is now valid?" ... "Can we now look at logs again" ... "is there error different"

**Rationale:**
After the first restart fails, the participant doesn't simply retry the same action. They ask whether the cert is now valid (confirming the action worked), then immediately pivot to checking logs again and asking if the error is different. This leads to discovering the bundle ordering issue. They adapt their approach rather than doubling down on the same fix. However, they don't explicitly recognize the structural difference in the new error before being told — Tanya and Daniel surface the bundle issue.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "Thank you we are exploring many avenues at the moment changes included and outside variable will report back shirtly" ... "Every outbound attempt to the gateway fails at the handshake, nothing is getting through from PaymentService. Tanya is checking now ETA 5 mins on an update" ... "We may have found a root cause an expired cert, attempting renewal asap"

**Rationale:**
The participant provides some updates to Bez/business stakeholders, but they are largely vague ("exploring many avenues") or technical without business framing. The update about the expired cert is more substantive but lacks business-impact quantification or committed next-update times. The first update to Bez is generic reassurance rather than substantive. They don't consistently provide board-ready framing or maintain a comms cadence through the secondary failure.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "@shay we can close down that theory as Tanya has confirmed it os not the causes" ... "ok any indication which service in the downstream can we check one by one to see what is the cause of the break"

**Rationale:**
The participant occasionally communicates scope to the team (closing down the email theory, noting the handshake failure), but rarely produces full synthesis statements that name what's been ruled in and out. Most of their technical channel messages are questions or action requests rather than state-of-the-world summaries. The team gets direction through individual asks rather than coherent scope statements that would help everyone orient quickly.

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
| M2 — Forms and tests working hypotheses | 3 |
| M3 — Uses evidence to narrow the scope | 3 |
| M4 — Considers potential consequences before acting | 3 |
| M5 — Adapts approach when initial path isn't working | 3 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.75** |

---

## Caveats
- L3: The participant says "as MIM" twice when making the override call, which clearly signals ownership, but never explicitly names personal consequences ("blowback's on me"). This is a borderline 3/4 call; rated 3 because the cost-naming element is absent.
- C3: The participant does roll back CheckoutService changes after initially assessing the change log as non-causal. This could be read as contradicting their elimination, but it appears precautionary rather than conviction-driven, so I maintained the tier 3 rating.
- M5: The participant adapts after the first restart fails, but the bundle discovery is largely surfaced by NPCs (Tanya: "I just realised something — the payments service actually needs two certificates, not just one. It's a bundle."). The participant's adaptation is more reactive than proactive, but they do engage with the new information rather than retrying the restart.
- K2: Boundary call between 2 and 3. The updates exist but lack consistent business framing, quantification, and committed next-update times. Rated 2 because the updates are more technical/vague than substantive from a business perspective.

---
