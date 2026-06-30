# Post-Drill Report — Snipe Hunt

This drill placed you in a live checkout outage with multiple competing signals, constrained team availability, and a root cause hidden beneath layers of recent but unrelated changes. It's designed to stress your ability to filter noise, trace hidden dependencies, coordinate under access constraints, and drive toward resolution when the obvious paths don't work.

---

## F1 — Misleading correlations

**Operating at: Practicing**

You identified early that the email/DNS maintenance window coincided with the outage and treated it as a lead worth pursuing. When rollbacks of recent deployments didn't resolve the issue and Tanya confirmed the email system was isolated, you continued pressing on the DNS dependency for several exchanges before eventually pivoting to PaymentService logs. The pivot did happen — which matters — but it came reactively, after repeated disconfirmation rather than after a deliberate re-evaluation of the evidence. On your next rep, practice setting an internal threshold: if two distinct signals contradict a lead, pause and explicitly reframe rather than seeking one more confirmation.

---

## F2 — Hidden coupling

**Operating at: Practicing**

The week-old certificate rotation emerged as the likely root cause, but it was surfaced by teammates rather than through your own investigation. When you encountered the cert change, your first instinct was to propose rolling it back — without considering that the old certificate had already expired, making rollback ineffective. After that was clarified, you shifted to asking for cert details, which was a reasonable next step. The growth edge here is building the habit of asking "what makes this change different from a simple rollback target?" before proposing action — especially for infrastructure changes where time-based expiry creates irreversible state.

---

## F3 — Decreased access to team

**Operating at: Practicing**

You navigated a constrained environment — Hamed was out of office, Tinus was unavailable, and Tanya was on a vendor call. You pulled Tanya into the incident, which was a valid move given the severity. However, you didn't articulate the trade-off you were making (pulling her off scheduled work) or economise her time once she joined. At the end of the drill, you attempted to route restart approval through someone who didn't have that authority, suggesting the constraint structure wasn't fully mapped in your mental model. Next rep, try naming the constraints aloud early: "Who can approve this? Who's available? What's my fallback if they're not?" This makes the access landscape visible to you and the team.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Not yet evident**

When the restart approval bottleneck was surfaced — both authorised approvers unavailable — you suggested routing the decision to someone without the authority to make it. The drill ended without resolution of this coordination problem. The growth opportunity here is significant: when the escalation chain is exhausted and the situation demands action, the incident lead needs to either own the override decision or explicitly articulate why they cannot. On your next rep, practice recognising the moment when "finding someone else to decide" stops being an option and "making the call yourself, with documented reasoning" becomes the path forward. This also connects to how you sequenced work throughout — requests were largely one-at-a-time rather than fanned out, which compounds the bottleneck when people are unavailable.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You engaged with logs and identified the handshake failure, which was a meaningful signal to land on. However, the path to that signal was largely guided by teammates pointing you toward PaymentService after your initial focus on the loudest signals (recent deploys, email maintenance). You accepted NPC summaries without interrogating the underlying data or reasoning about what was absent — for example, internal service calls were clean, which is itself a narrowing signal. On your next rep, try asking "what's *not* failing?" as actively as you ask "what *is* failing?" Absence of signal is evidence too, and it can help you filter faster than chasing each noisy lead sequentially.

---

## Looking Ahead

Two threads to carry into your next drill: first, practice owning the decision when the escalation path runs out — the discomfort of making a call without explicit authority is exactly what these drills are designed to build tolerance for. Second, work on driving the investigation rather than following it — set your own hypotheses, name them, and let the evidence confirm or kill them rather than waiting for teammates to point you toward the next thread. Both of these are buildable skills, and the fact that you engaged with the problem space throughout gives you a foundation to build on.