# Post-Drill Developmental Report

The Snipe Hunt drill puts you in the middle of a live incident where multiple systems, people, and information streams compete for your attention. It's designed to stress your ability to reason through misleading signals, navigate access constraints, and coordinate a team under pressure — all while the real cause hides beneath surface-level explanations.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you moved quickly to roll back recent changes — the shipping service update and the checkout service change — treating them as likely causes without first articulating a mechanism connecting them to the payment gateway failures. When a teammate flagged that none of the recent changes looked like they could break checkout end-to-end, you continued with the rollback approach until it concretely failed. The pivot to investigating the platform side came only after the rollbacks produced no improvement.

Your growth edge here is pausing before acting on a correlation to ask: *what mechanism would connect this change to this symptom?* If you can't name one, that's a signal to hold the hypothesis loosely rather than committing resources to it. On your next rep, try articulating one sentence of causal reasoning before ordering a remediation step.

---

## F2 — Hidden coupling

**Operating at: Practicing**

You engaged with the certificate thread once teammates surfaced it, acknowledging the expired cert and asking what could be done. However, the diagnostic reasoning — identifying TLS handshake failures, recognising the reload-vs-restart distinction, and later spotting the incomplete certificate bundle — was driven by your teammates rather than by your own questions. After the first restart didn't resolve the issue, your instinct was to revisit recent deploys rather than reframing around the new error pattern.

The growth edge is building a habit of asking "what changed beyond the obvious timeframe?" and noticing when a failed fix produces a *different* error — that's a structural signal worth naming aloud. On the next rep, try voicing the shift: "the error changed, so the problem has a different shape now."

---

## F3 — Decreased access to team

**Operating at: Practicing**

You walked the escalation chain — reaching out to multiple approvers and attempting to pull in the right people. When auto-replies came back, you cycled through alternatives, eventually asking a teammate to reach out on your behalf. However, you re-pinged people who had already indicated unavailability, and you didn't explicitly name the access constraint as a pattern shaping your decisions.

Your growth edge is recognising the constraint earlier and economising your moves: once two approvers are confirmed unavailable, name that aloud ("the approval chain is exhausted — I need to decide how to proceed") rather than continuing to cycle. You did eventually pull a teammate off another task, which showed awareness of trade-offs, but articulating the cost explicitly would strengthen your coordination.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Practicing**

You eventually took ownership of the restart decision and accepted responsibility for the outcome — a meaningful step. That said, this came after extended attempts to defer the decision and after a teammate explicitly framed the situation as requiring whoever was running the incident to step up. You also tended to work sequentially rather than fanning out parallel threads; for example, waiting for one person to be freed before starting a second line of investigation. Your delegation was generally well-targeted to specific people, which is a strength to build on.

The growth edge is naming the dependency structure earlier: "both approvers are out, this is my call" — and making that declaration without waiting for someone else to frame it for you. On the next rep, also look for moments where two people could be investigating different angles simultaneously.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You showed filtering instinct early by asking a teammate to investigate specific logs tied to a recent change. You also asked for a summary of the error landscape partway through. However, most of the meaningful signal extraction — identifying that all errors pointed to the payment service's external connection, ruling out DNS and network, and surfacing the bundle issue — was performed by teammates. After the restart failed, your request to "check all changes and flag anything suspicious" was broad rather than targeted.

Your growth edge is moving from requesting summaries to producing them. Try synthesising what's been ruled out and what remains: "internal calls are clean, DNS is clean — the boundary is between us and the gateway." That kind of orienting statement helps you and the team focus on the remaining signal. It also strengthens how you communicate scope to both technical teammates and business stakeholders — areas where more proactive framing would serve you well.

---

## Looking Ahead

You showed willingness to step into ownership under pressure and a consistent instinct to delegate to named individuals — both are foundations to build on. For your next rep, focus on two things: articulating *why* before acting (one sentence of mechanism reasoning before ordering a change), and narrating the investigation state aloud so the team shares a picture of what's been tried and what remains. These habits will help you drive the diagnostic process rather than following it.