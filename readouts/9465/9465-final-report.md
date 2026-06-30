# Snipe Hunt — Post-Drill Report

This drill placed you in a live incident with multiple competing signals, absent key personnel, and a system whose failure mode required tracing through several layers of infrastructure. The challenge exercises your ability to filter noise, coordinate under constraint, and adapt your mental model as new evidence arrives.

---

## F1 — Misleading correlations

**Operating at: Strengthening**

Early in the drill, you investigated whether the email maintenance window was related to the checkout failures, but once you received evidence that email confirmations were still flowing, you ruled it out cleanly. You explicitly named that correlation doesn't imply causation when a teammate continued pushing the email timing as suspicious. This is a strong filtering instinct — you used mechanism reasoning rather than proximity to drive your decision.

Your growth edge here is surfacing the *why* of the temptation itself. When a red herring is well-timed, naming it as a prime ("this looks compelling because of timing alone, but the mechanism doesn't connect") helps the team understand your reasoning and builds shared resistance to the same trap on future incidents.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

When the first restart didn't resolve the issue, you moved forward rather than repeating the same action. You asked whether the old certificate was still loaded and whether a restart was needed to pick up new ones, showing engagement with the structural question of *why* the fix didn't take. You continued tracing into the bundle ordering issue once it was raised.

The next-rep growth edge is initiating the "what changed beyond the obvious window" question yourself. In this run, the certificate rotation was surfaced by your team rather than driven by your own inquiry. Proactively asking "what changed in the last 7–14 days, not just the last 24 hours?" can surface hidden coupling earlier.

---

## F3 — Decreased access to team

**Operating at: Strengthening**

You named the access constraints clearly — noting that both Hamed and Tinus were unavailable — and made the decision to pull Tanya off the vendor call to support the investigation. You accepted auto-replies as terminating signals without re-pinging, and you gave Tanya targeted, scoped tasks rather than open-ended requests. Your delegation reflected awareness of who had what access, routing platform-level work to Tanya and log investigation to Daniel.

The growth edge is articulating the trade-off explicitly when you make a resource decision. When you pulled Tanya off the vendor call, naming the cost ("we lose the vendor window, but a global outage takes priority") makes the decision legible to the team and creates a record of deliberate prioritisation.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the escalation chain in observable order — attempting Hamed, noting Tinus's absence, then explicitly taking ownership of the restart approval as a P1 decision. On the second restart after the bundle fix, you authorised without re-litigating the approval chain. This showed clean ownership transfer when the normal path was blocked.

To move further, consider verbalising the dependency structure as a single statement at the moment you take ownership: "Hamed is out, Tinus is unreachable, this is P1, so I'm approving — and here's what that means for rollback responsibility." Naming the full constraint set in one place helps the team understand the shape of the decision, not just the outcome.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You correctly identified PaymentService as the relevant service and directed log investigation there, filtering away from the noisy email errors. However, the key discoveries in this run — the certificate rotation, the reload-vs-restart distinction, the bundle ordering issue — were surfaced by your teammates rather than driven by your own interrogation of available documentation or raw evidence.

The growth edge is moving from accepting NPC summaries to driving your own filtering. When a teammate surfaces a finding, asking "where did you see that?" or "what else is in that document?" can help you catch adjacent buried information that a summary might miss. The drill rewards participants who pull on threads in runbooks and logs rather than waiting for teammates to surface the critical detail.

---

## Looking Forward

Across this run, you showed consistent ability to rule out distractors, accept constraints, and take ownership when the normal path was blocked. The pattern to carry into your next drill is shifting from *reactive filtering* (acting well on what teammates surface) toward *proactive excavation* — driving your own queries into raw evidence, naming trade-offs aloud, and running threads in parallel rather than sequentially. You have the coordination instincts; the next layer is generating the critical information yourself.