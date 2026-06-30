# Post-Drill Report — Snipe Hunt

This drill placed you in a live incident requiring you to navigate misleading signals, hidden system dependencies, constrained team availability, and a volume of technical detail that needed filtering under pressure. The observations below reflect how you engaged with each of these dimensions during this run.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill you pursued the email maintenance coincidence — a reasonable initial thread given the timing overlap. When team members explicitly disconfirmed the connection (isolated infrastructure, no shared pathway to payments), you moved on. The growth edge here is in *how* you let go of a coincident factor: rather than waiting for someone else to close the door, practice asking yourself what mechanism would connect the two systems before investing investigation time. On your next rep, try articulating "what would have to be true for this correlation to be causal?" before assigning someone to check it.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

Once the certificate rotation from the previous week surfaced, you drove the investigation forward — asking Tanya to verify the playbook steps, connecting the bundle-ordering issue to the authentication failure, and authorising the restart promptly when the reload-vs-restart distinction was raised. You engaged with the week-old coupling and acted on it decisively. The next growth edge is surfacing that kind of coupling *before* a teammate raises it: when a system depends on a credential or certificate, proactively asking "when was this last touched, and did anything change in the chain?" can shorten the path to discovery.

---

## F3 — Decreased access to team

**Operating at: Strengthening**

You managed access constraints deliberately. You initially preserved Tanya's vendor call, only pulling her off when the investigation required platform-level access — and you named the trade-off when you did so. When Hamed was out and Tinus auto-replied, you accepted those constraints without re-pinging and moved to self-authorisation with a clear ownership statement. Your delegation routing was appropriate throughout — recognising who had access to what. The growth edge is making the cost of these trade-offs more explicit to stakeholders (e.g., naming the vendor-call consequence aloud so the business context is visible to the channel).

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the approval chain methodically — Hamed, then Tinus, then self-authorisation — and issued the restart directive as a distinct, owned decision. You also distributed work appropriately across Daniel and Tanya based on their access and expertise. The slight detour through Bez for approval didn't undermine the pattern but did add a step. For the next rep, consider anticipating the bottleneck earlier: when you see a restart or risky action on the horizon, you can begin the approval thread in parallel with the final diagnostic step rather than sequentially after confirming the fix.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You asked Daniel to pull logs and engaged with the results, but initially focused on cart-service errors rather than the more critical PaymentService TLS failures. The filtering that led to the certificate discovery was largely driven by teammates' summaries rather than your own interrogation of the data. You accepted those summaries and moved forward, which kept momentum — but the growth edge is in actively driving the filter yourself. On the next rep, try asking "what's the most specific error class in these logs?" or "what's absent that should be present?" before accepting a teammate's summary at face value.

---

## Looking Forward

Two patterns stand out as areas to carry into your next drill. First, your instinct to delegate and route tasks to the right people is solid — lean into that by also sharing your working theory with the team so they can self-direct when you're occupied. Second, the moments where you relied on teammates to close out dead-end hypotheses or surface the critical signal are natural in a first encounter with this kind of complexity; building the habit of stating your reasoning aloud ("I think X because Y, so let's test Z") will help you catch buried information earlier and let go of misleading threads faster.