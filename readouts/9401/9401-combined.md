# Post-Drill Report — Snipe Hunt

This drill placed you in a live incident requiring you to navigate systemic complexity: misleading signals, hidden technical dependencies, reduced team availability, and a volume of information that needed active filtering. The observations below reflect how you engaged with each of these challenges during this run.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you engaged with the email-maintenance timing coincidence by asking whether order completion actually requires email — a useful mechanism question. When told it didn't, you moved on. The pivot away from the misleading correlation happened, but it was driven by the NPC's disconfirmation rather than by your own upstream reasoning about why timing alone doesn't imply causation. On your next rep, try articulating *why* a coincident factor would or wouldn't have a causal path before asking someone else to confirm — this builds the habit of mechanism-first reasoning that helps you dismiss red herrings faster and with more confidence.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

Once the initial restart failed to resolve the issue, you asked within a few exchanges whether the errors had changed — showing recognition that the post-restart state might be structurally different from the pre-restart state. You then followed the thread forward into the certificate bundle issue. This reframing behaviour is exactly what this facet is designed to surface. The growth edge here is surfacing the "what changed beyond the obvious window" question yourself, rather than waiting for team members to bring it to you. In this run, the cert rotation was surfaced by others; next time, consider proactively asking what changed in adjacent systems over a wider timeframe.

---

## F3 — Decreased access to team / remote

**Operating at: Strengthening**

You walked the escalation chain methodically — reaching out to Hamed, accepting the auto-reply, moving to Tinus, accepting that auto-reply, and then escalating to Bez with explicit context about who was unavailable and why you needed help. You didn't waste cycles re-pinging unavailable people, and you named the constraint clearly when escalating. You also successfully got Tanya pulled off a vendor call by framing the urgency appropriately. This is solid constraint-navigation. The next growth edge is anticipating access gaps earlier — for instance, checking availability proactively at the start of an incident rather than discovering it sequentially as you need each person.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the approval chain to its end and ultimately took ownership of the restart decision when Bez clarified it was yours to make. You delegated parallel work appropriately — assigning specific people to logs, comms, and the customer-facing banner. On the second restart, you authorized without re-litigating the approval chain, which shows growing comfort with the incident-lead role. The growth edge is owning the decision earlier: rather than seeking approval from someone above you, name the dependency structure up front ("I need platform access, and the people who have it are unavailable — so I'm going to authorize this myself and accept the risk"). That proactive framing signals stronger ownership of the coordination bottleneck.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You asked Tanya to run health checks and review logs, and you asked targeted follow-up questions when results came back. However, the key filtering work — identifying that internal calls were clean while external boundary calls were failing, surfacing the cert comparison, spotting the bundle ordering issue — was driven by your team members rather than by your own interrogation of the data. On your next rep, try driving the filter yourself: when you receive a log or a summary, ask what's *absent* from it, or what pattern would distinguish one hypothesis from another. The goal is to move from receiving filtered information to actively constructing the filter.

Your delegation was clear and well-targeted throughout — you consistently named specific people for specific tasks and routed work to the right expertise. Your scope-validating questions at the start of the incident were well-placed, asking about the nature of complaints and whether the outage was total before taking action. Where you can grow is in synthesising the investigation state for your team: rather than directing through individual task assignments alone, periodically posting a brief summary of what's been ruled out and where focus should shift helps orient everyone and can surface information you haven't thought to ask for.

---

## Looking Ahead

Carry two things into your next drill. First, practice articulating your reasoning out loud — name hypotheses before testing them, and name what you've ruled out as you go. This makes your investigation logic visible to your team and to yourself, which accelerates narrowing. Second, look for opportunities to drive the information filter rather than delegating it entirely: when data comes back, ask yourself what would need to be true or absent for your current theory to hold, and check for that specifically.
# Facets Analysis — 9401

## F1 — Misleading correlations

**Rating:** 2

**Evidence:**
> "does order completion require an email ? or would the order complete but no email would be sent?"

**Rationale:**
The participant initially engaged with the email maintenance correlation (Shay's nudge about timing), but tested it by asking whether email is actually required for order completion. Once told it wasn't, they moved on — but this pivot was reactive to NPC disconfirmation rather than driven by upstream mechanism reasoning. They didn't articulate "correlation needs a mechanism" framing, but they did test the hypothesis and pivot within a reasonable window. The recent deploys lead was briefly noted but not pursued deeply. This fits tier 2: treats the coincident factor as a lead, pursues it to disconfirmation, then pivots reactively.

---

## F2 — Hidden coupling

**Rating:** 3

**Evidence:**
> "did we update or change the TLS version in an update?" ... "do we need to load that cert?" ... "are there any different errors other than the handshake now cert is loaded?"

**Rationale:**
The participant engaged with the cert thread once Daniel surfaced the week-old rotation. After the restart failed, the participant asked within a few exchanges whether there were different errors now — showing recognition that the post-restart failure might be structurally different. They didn't independently surface the "what changed beyond 24 hours" question (Daniel/Tanya surfaced the cert rotation), but once the restart failed, they reframed within ~3-4 exchanges by asking about different errors and then driving toward the bundle issue. This fits tier 3: reframes within ~5 exchanges of the restart failing, recognises the new error is structurally different, and continues tracing forward to the bundle.

---

## F3 — Decreased access to team / remote

**Rating:** 3

**Evidence:**
> "@hamed can you check..." [auto-reply] "@tinus..." [auto-reply] "@bez sorry to escalate, but Tinus and Hamed both out need someone to check the underlying systems"

**Rationale:**
The participant walked the escalation chain methodically — Hamed (auto-reply), Tinus (auto-reply), then Bez. They accepted auto-replies as terminating and moved on after one cycle. They explicitly named the constraint to Bez ("Tinus and Hamed both out"). They pulled Tanya off the vendor call through Bez with appropriate urgency framing. They didn't re-ping auto-replied NPCs. This fits tier 3: names access constraints, accepts auto-replies as terminating, escalates appropriately.

---

## F4 — Interdependencies / coordination bottlenecks

**Rating:** 3

**Evidence:**
> "@bez can you give approval to restart the server? as all payments are down" ... "Bez has said i can approve restart, please restart server"

**Rationale:**
The participant walked the escalation chain (Hamed → Tinus → Bez) and when told by Bez that restart approval was their call as incident lead, they took ownership and authorized the restart. They delegated parallel work appropriately (Daniel on logs, Shay on banner, Bob on comms). However, they initially tried to get Bez to approve rather than owning it themselves, and only took the call after Bez redirected. They also authorized the second restart without re-litigating the approval chain. This fits tier 3 path (b): walks the escalation chain to exhaustion in observable order, then takes ownership. They didn't proactively name the dependency structure before it became a blocker.

---

## F5 — Data overload / buried information

**Rating:** 2

**Evidence:**
> "tanya can you start with a health check of the systems and OS invovled and then take a look at the logs provided"

**Rationale:**
The participant relied heavily on NPCs to surface and filter information. Daniel identified the PaymentService handshake failure; Tanya surfaced the cert comparison; Tanya identified the bundle ordering issue. The participant asked some targeted questions ("are there any different errors other than the handshake now cert is loaded?") but didn't independently drive filtering or catch buried distinctions. They didn't reason about absence of signal (internal calls clean → external boundary failure) — Daniel provided that. They engaged with the bundle concept once Tanya surfaced it but didn't drive the filter themselves. This fits tier 2: asks for filtered information but accepts NPC summaries without further interrogation; engages with key concepts once surfaced but doesn't drive the discovery.

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
- F1 rating is a borderline 2/3 call. The participant did ask a mechanism question ("does order completion require an email?") which shows some hypothesis-testing, but they didn't articulate the correlation-vs-causation frame explicitly, and the pivot was driven by NPC disconfirmation rather than independent mechanism reasoning.
- F4 rating is a borderline 2/3 call. The participant initially asked Bez to approve the restart (tier-2 behaviour), but Bez's response was more of a role-clarification than "team pressure," and the participant took ownership promptly after. The chain-walk pattern (Hamed → Tinus → Bez → self) supports tier 3 path (b).
- F2: The participant did not independently surface the "what changed beyond 24 hours" question, which would be needed for tier 4. The cert rotation was surfaced by Daniel/Tanya.

---
---

# Markers Analysis — 9401

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "Bez has said i can approve restart, please restart server" ... "@bez can you give approval to restart the server? as all payments are down" ... "i dont want to mark as resolved until dash reflects a higher order per min"

**Rationale:**
The participant drives the response throughout — directing team members, making decisions about restarts, and controlling the resolution timeline. They seek approval from Bez for the restart rather than self-authorizing, but they do position themselves as the decision-maker once Bez defers. They don't explicitly say "blowback's on me" or name the cost of the override, which keeps this at tier 3 rather than 4.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "whats the nature of complaints?" ... "How many customers are blocked from checking out? What is the estimated revenue loss per minute right now?" ... "Is this a total checkout outage or are some transactions still going through? I need clarity on scope."

**Rationale:**
The participant's first actions are scope-validating questions to Bob — asking about the nature of complaints, the number of affected customers, and whether it's a total outage. These are targeted, relevant questions asked before any remediation action. This meets the novice expectation of scope-validating before acting.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "can we start to review, i will take a look at the website" ... [After Shay provides the deployment list, participant does not explicitly use it to eliminate candidates or articulate a mechanism]

**Rationale:**
The participant does engage with the change log — Shay provides the full prod deployment list and the participant reviews it. However, the participant never explicitly uses the change log as a candidate-elimination pass. They don't articulate "none of these touch the gateway" or use the absence of PaymentService changes as evidence. The change log is received but not visibly synthesized into the investigation logic.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@hamed can you check the health of the underlying systems and OS" ... "@tanya please come off the vendor call, this is more important right now" ... "tanya can you start with a health check of the systems and OS involved and then take a look at the logs provided" ... "@bob prepare comms" ... "@shay confirm when complete"

**Rationale:**
The participant consistently names specific people for specific tasks — Tanya for platform/cert checks, Daniel for logs, Bob for comms, Shay for the banner. They route tasks to the right people (Tanya for platform-side, Daniel for app-side). The delegation is clear and appropriately targeted, meeting the tier 3 expectation.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "can we start to review, i will take a look at the website" ... [Participant works mostly sequentially — asks Daniel for logs, waits, then asks Tanya to join, then works the cert thread]

**Rationale:**
The participant does have Daniel pulling logs while they check the website, and later has Bob preparing comms while Tanya works on certs. However, the investigation is largely sequential — one thread at a time with waiting between responses. There's no clear moment where multiple distinct investigation threads are fanned out simultaneously to different team members in close temporal sequence.

---

## C7 — Escalates when stuck

**Rating:** 3

**Evidence:**
> "@bez sorry to escalate, but Tinus and Hamed both out need someone to check the underlying systems" ... "might need your help @bez tinu and hamed out, tanya on vendor call, i think this is more important and we should focus resource here" ... "@bez can you give approval to restart the server? as all payments are down"

**Rationale:**
The participant escalates to Bez when both Tinus and Hamed are unavailable, and successfully gets Bez to pull Tanya off the vendor call. They also escalate the restart approval to Bez. The escalations include context (who's unavailable, what's needed). However, they don't explicitly name the cost of pulling Tanya off the vendor call (the 2-week slot loss), which keeps this at tier 3.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "does order completion require an email ? or would the order complete but no email would be sent?" ... "@daniel is that network or authentication handshake ?" ... "did we update or change the TLS version in an update?"

**Rationale:**
The participant asks questions that implicitly test hypotheses (email maintenance causing the issue, network vs. authentication), but never explicitly articulates a hypothesis before testing it. They don't say "my hypothesis is X, let's test by doing Y." The investigation proceeds through questions rather than named hypotheses with proposed tests. This is inconsistent/implicit hypothesis formation — tier 2.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 3

**Evidence:**
> "does order completion require an email ? or would the order complete but no email would be sent?" [After learning email is independent:] "@daniel is that network or authentication handshake ?" ... [After Daniel confirms authentication:] "did we update or change the TLS version in an update?"

**Rationale:**
The participant uses evidence to narrow scope — ruling out email as a cause, distinguishing network from authentication failures, and narrowing to the cert issue. They ask targeted questions that progressively narrow the problem space. However, they don't produce explicit synthesis statements naming what's been ruled out, which keeps this at tier 3 rather than 4.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "please restart" ... "can you plese rectify" ... "please restart service"

**Rationale:**
The participant issues restart and fix commands without visible consequence-weighing. There's no "is it safe?" check, no consideration of what could go wrong with the restart, no anticipation that the restart might expose a secondary issue (the bundle ordering problem). They don't name the cost of pulling Tanya off the vendor call either. Actions are fired without visible deliberation about side effects.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 3

**Evidence:**
> "are there any different errors other than the handshake now cert is loaded?" ... [After restart fails:] Engages with the new error about certificate chain verification, asks about the bundle, and pivots to fixing the bundle order.

**Rationale:**
When the first restart doesn't fix the issue, the participant doesn't retry the same action. They ask about different errors, engage with the new certificate chain verification failure, and pivot to investigating the bundle ordering issue. This shows adaptation when the initial path (cert reload/restart) doesn't work. They don't explicitly reframe the problem as structurally different, but they do follow the new evidence forward.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "no Root cause identified, working on resourcing. no ETA available yet, i will update every 5 minutes" ... "we have a certificate issue from a change earlier, we are reloading the cert now" ... "cert is now loaded, but we have an issue with certificate chain have asked tanya to rectify"

**Rationale:**
The participant provides updates but they lack business framing. The first update ("no root cause, no ETA") is vague. Later updates mention technical details (certificate issue, chain problem) without translating to business impact (full checkout outage, revenue loss, customer scope). They commit to a 5-minute cadence but the updates themselves lack the substantive business-frame content expected at tier 3.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "total outage, no orders going through, we can replicate the issue on the site" ... "restarting service now, should only take a minute"

**Rationale:**
The participant provides some scope information to the team ("total outage, no orders going through") but rarely synthesizes the investigation state for the technical team. They don't post messages like "we've ruled out email, ruled out deploys, focus is now on PaymentService outbound." The team gets directed through individual task assignments rather than synthesis statements that orient everyone to the current understanding.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 3 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 2 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 2 |
| C7 — Escalates when stuck | 3 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 3 |
| M4 — Considers potential consequences before acting | 2 |
| M5 — Adapts approach when initial path isn't working | 3 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.50** |

---

## Caveats
- **L3 boundary call:** The participant sought Bez's approval for the restart rather than self-authorizing. Bez then said "I can't approve technical restarts, that's for you as incident lead," and the participant then said "Bez has said i can approve restart, please restart server" — which slightly misrepresents what Bez said but does result in taking the decision. This is borderline 2/3; rated 3 because they ultimately drove the response and made the call.
- **M2 boundary call:** The participant's questions implicitly test hypotheses (e.g., "does order completion require an email?" tests the email-maintenance hypothesis), but they never explicitly name a hypothesis. Rated 2 because the rubric emphasizes explicit articulation.
- **K2:** The participant's updates to the business channel are technically present but lack business framing. The "2 minute ETA on next fix" message is useful but isolated. Borderline 2/3; rated 2 because the updates don't quantify business impact or provide working theories in business terms.

---
