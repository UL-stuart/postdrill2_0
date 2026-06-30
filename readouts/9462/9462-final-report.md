# Snipe Hunt — Post-Drill Developmental Report

This drill puts you in the middle of a live incident where multiple signals compete for attention, key people are unavailable, and the root cause hides behind a plausible-looking coincidence. The work it's designed to stress — separating correlation from causation, navigating access constraints, and synthesising information under pressure — showed up clearly in your run.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you locked onto the email/DNS maintenance as the likely cause and pressed repeatedly to roll back those changes. You did eventually pivot to the certificate investigation, but that pivot came after teammates explicitly disconfirmed the DNS hypothesis rather than from your own mechanism reasoning. The growth edge here is noticing *when* you're treating a time-coincidence as a causal link and asking yourself "what mechanism would connect these?" before committing investigation cycles. On the next rep, try articulating *why* a candidate cause would produce the specific symptoms you're seeing — that reasoning often reveals the gap before a teammate has to surface it for you.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

Once the cert rotation thread surfaced, you drove the investigation forward — asking about reload requirements and checking cert validity. Importantly, when the restart failed, you didn't repeat the same action. You redirected by asking for fresh error output and re-confirming the cert state, which kept the investigation moving toward the bundle-ordering issue. The growth edge is surfacing the hidden-coupling question yourself: asking "what changed outside the obvious 24-hour window?" before a teammate brings it to you. You responded well to the unexpected failure; the next step is anticipating that kind of layered dependency earlier.

---

## F3 — Decreased access to team / remote

**Operating at: Strengthening**

You showed solid awareness of who was available and what constraints they were under. You sent Tanya targeted questions during her vendor call rather than low-value pings, accepted Hamed's auto-reply without re-pinging, and only pulled Tanya fully into the incident when the severity justified the cost. You also attempted to escalate through the proper chain before self-authorising. The growth edge is making the cost trade-off more explicit when you do pull someone in — naming the specific consequence ("this means we lose the vendor window for two weeks, but the outage justifies it") helps the team understand your reasoning and builds shared context.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the escalation chain in observable order — Hamed, then Bez, then self-authorisation — and delegated parallel work appropriately across the team, routing platform tasks to Tanya, log analysis to Daniel, comms to Bob, and banner management to Shay. On the second restart after the bundle fix, you authorised without re-litigating. The initial uncertainty about whether you could authorise the restart is natural, but the growth edge is mapping the dependency structure earlier: knowing *before* you need the decision who holds the authority and what the fallback path is. That pre-mapping saves time when the clock is running.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You asked for filtered information — requesting specific log output and service checks — which is a good instinct. However, the key buried signals in this drill (the cert rotation timing, the reload-vs-restart distinction in the runbook, the bundle ordering issue) were surfaced by teammates rather than by your own reading of the artifacts. You followed the evidence trail well once it was laid out, but didn't independently extract the critical distinctions. The growth edge is treating documents and logs as active investigation tools: when someone shares a runbook or a change log, scanning for the thing that *doesn't* match your current hypothesis rather than confirming what you already suspect.

---

## Looking Forward

Two patterns stand out as growth edges for your next rep. First, your investigation instincts are sound but often reactive — you respond well to disconfirming evidence once it arrives, and the next step is generating that disconfirmation yourself through mechanism reasoning and active artifact reading. Second, your coordination and delegation are solid; layering in more explicit synthesis for both your technical team and business stakeholders — naming what's been ruled out, what the current theory is, and what you're checking next — will help the people around you track your reasoning without having to ask.