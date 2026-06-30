# Post-Drill Report — Snipe Hunt

This drill placed you in a live incident with cascading service failures, limited team availability, and multiple competing signals about root cause. It's designed to stress your ability to reason through misleading data, navigate coordination constraints, and drive investigation under pressure. Here's where your process landed and where the next growth edges are.

---

## F1 — Misleading correlations

**Operating at: Practicing**

You engaged with the email maintenance timing overlap as a leading hypothesis and invested time exploring it with Tanya. When disconfirmation came back — Tanya confirmed email was unrelated and Daniel's logs pointed elsewhere — you did pivot. The pivot, though, was reactive: it came from NPCs telling you the correlation didn't hold rather than from you reasoning about whether the mechanism was plausible ("could email maintenance plausibly break payment handshakes?"). On your next rep, try articulating *why* a correlation might or might not be causal before investing investigation time in it. That mechanism-first filter can save cycles and keep you from chasing coincidences.

---

## F2 — Hidden coupling

**Operating at: Practicing**

You questioned the 7-day-old cert rotation — noting that things had been working fine since — which shows healthy skepticism about temporal gaps. But the coupling insight (reload-vs-restart, bundle ordering) was surfaced by your team rather than by you probing for it. After the first restart failed, you redirected investigation, which is good, but you didn't articulate *why* the failure was structurally different from what you expected. Growth edge: when a remediation doesn't work, pause and ask "what does this failure tell me about the system's structure?" rather than opening the floor broadly. That reframing question is what separates reactive pivots from diagnostic ones.

---

## F3 — Decreased access to team

**Operating at: Strengthening**

You named the access constraints clearly — Hamed's auto-reply, Tinus at the summit, Tanya on the vendor call — and adapted your approach accordingly. Your decision to pull Tanya off the vendor call was preceded by multiple clarifying questions about the cost of losing the migration slot, which showed deliberate trade-off reasoning. You also accepted auto-replies as terminal rather than re-pinging, which kept you from wasting cycles. One area to tighten: while Tanya was still on the vendor call, you asked her several questions that could have waited, which split her attention. On the next rep, consider batching your asks or explicitly releasing someone until you're ready to fully redirect them.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the escalation chain in a visible, logical order — Tinus, Hamed, then Bez — and named the bottleneck explicitly when seeking executive backing. You delegated parallel work appropriately: Daniel on logs, Shay on root cause, Bob on revenue data. The coordination was sound. Where it stretched was in the time it took to commit: you spent several exchanges trying to get approval through other channels before escalating to Bez. On the next rep, once you've identified that the normal approval path is exhausted, move to escalation faster. You demonstrated you know *how* to escalate — the growth edge is *when*.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

The filtering work in this run was largely NPC-driven. Daniel surfaced PaymentService as the focal point; you followed that lead effectively once pointed there, but you didn't independently filter toward it from the noise. Early on, you shared CartService log data that turned out to be irrelevant, and you accepted NPC summaries without much further interrogation. Your one synthesis attempt — "go back to the first failure we see in the logs" — was directionally useful but vague. Growth edge: before delegating broadly, try stating what you've ruled out and what remains. Even a rough elimination list ("it's not email, it's not recent deploys, so what's left?") gives your team a shared filter and keeps you from re-treading ground.

---

## Looking Ahead

You're showing solid instincts around coordination — naming constraints, delegating to specific people, running parallel threads, and escalating when the path is blocked. Those are real strengths to carry forward. The consistent growth edge across this run is in *diagnostic ownership*: forming your own hypotheses before testing, articulating mechanism reasoning rather than following NPC leads, and synthesizing what's been ruled out so the team shares a narrowing picture. On your next rep, try verbalizing one explicit hypothesis and one elimination statement before each major action. That small habit can shift you from reactive to directive in the investigation layer.