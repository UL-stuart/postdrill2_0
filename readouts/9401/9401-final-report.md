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