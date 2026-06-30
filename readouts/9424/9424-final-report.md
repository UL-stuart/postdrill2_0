# Post-Drill Report — Snipe Hunt

This drill placed you in a live incident requiring you to navigate ambiguous signals, coordinate a distributed team under access constraints, and drive toward resolution while managing stakeholder communication. The observations below reflect how you engaged with each dimension of complexity the drill surfaced.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you identified email maintenance and the payment application as two possible causes and held both open for investigation. When evidence came back that email wasn't causing checkout failures, you continued to treat it as a live thread rather than ruling it out based on mechanism reasoning. The pivot away from email ultimately came through repeated disconfirmation from team members rather than from your own reasoning about whether a plausible causal path existed.

*Growth edge:* When a correlation surfaces (timing overlap, co-occurring maintenance), practice asking yourself — and the team — "what's the mechanism that would connect this to the symptom?" If you can't articulate one, deprioritise it earlier and redirect attention. This frees up investigation bandwidth for higher-probability threads.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

Once the certificate rotation thread was surfaced, you engaged with it directly — asking what an expired cert would mean, following through to the in-memory discovery, and driving toward the restart. When the restart didn't resolve the issue, you didn't repeat the same action or blame downstream services. Instead, you redirected investigation, asking the team to look for another cause and check from the platform side again. You connected the dots between the cert state and the observed failures once the information was available.

*Growth edge:* The "what changed beyond 24 hours" question came from team investigation rather than from you. On the next rep, consider proactively widening the change window when recent-change checks come back clean — asking "what changed in the last week that could have a delayed effect?" can surface coupling that doesn't manifest immediately.

---

## F3 — Decreased access to team / remote

**Operating at: Strengthening**

You worked through the escalation chain methodically — contacting Hamed, then Tinus, then Bez — and accepted the constraints when auto-replies came back. You made the trade-off of pulling Tanya off a vendor call when her platform expertise was needed, and you took ownership of the restart decision when the approval chain was exhausted. Your willingness to say "I will take accountability" and proceed was a clear signal of constraint adaptation.

*Growth edge:* When making forced trade-offs (like pulling someone off another commitment), naming the cost explicitly — even briefly — helps the team understand your reasoning and builds shared context. On the next rep, try verbalising the trade-off: "I know this pulls you off the vendor call, but we need platform-side eyes on this now."

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the approval chain to exhaustion in a visible, ordered way and then took ownership. You delegated parallel work appropriately — routing Daniel to logs, Shay to testing, Tanya to platform investigation, and Bob to customer communication. You surfaced blockers to the business channel when approvers were unavailable. Your delegation was generally well-targeted to people's expertise areas, though some early routing was slightly misaligned (reaching out to unavailable people or asking about email when the investigation had moved on).

*Growth edge:* Before the chain exhausts, try naming the dependency structure as a single constraint statement: "We need platform-level approval, Tinus and Hamed are both unavailable, Bez is next in line." This gives the team — and stakeholders — a clear picture of where the bottleneck sits before you've resolved it.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You directed team members to focus areas and eventually narrowed to PaymentService, but the filtering and synthesis work was largely performed by your team rather than driven by you. You asked Tanya to check email failures on the platform side even after the investigation had moved past email, suggesting incomplete integration of what had already been established. You accepted NPC summaries and acted on them effectively, but didn't independently catch distinctions like reload-vs-restart from the runbook or reason about absence of signal.

*Growth edge:* Practice posting brief synthesis statements as the investigation progresses — "here's what we've ruled out, here's what's still live, here's what we're checking next." This forces you to integrate incoming information actively rather than holding multiple threads loosely. It also helps the team self-organise around your current understanding.

---

## Looking Forward

You showed clear strengths in ownership, constraint adaptation, and willingness to pivot when an action didn't produce the expected result. The consistent growth edge across this run is moving from *reactive* synthesis — waiting for the team to surface and filter information — toward *proactive* synthesis: articulating mechanisms, naming what's been ruled out, and framing the problem for the team before they frame it for you. On your next rep, focus on being the person who narrates the investigation's current state, not just the person who directs the next action.