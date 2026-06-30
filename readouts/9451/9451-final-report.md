# Post-Drill Developmental Report

This drill placed you in a live incident requiring you to navigate misleading signals, coordinate across a partially unavailable team, and synthesise information under pressure. The observations below reflect how you engaged with those challenges and where your next growth edges sit.

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you noticed the timing coincidence between the DNS change and the onset of checkout failures, and you pursued that correlation as a leading hypothesis. You did question the mechanism at one point — wondering aloud whether email DNS could plausibly affect checkout — but you proceeded with the rollback anyway rather than letting that doubt redirect your investigation. After the rollback failed to resolve the issue, you moved to the next change rather than explicitly naming the correlation as a false lead.

*Growth edge:* When you notice yourself questioning a mechanism ("how would X cause Y?"), treat that doubt as a decision gate. If you can't articulate a plausible causal chain, deprioritise the hypothesis before investing action on it. The instinct to question was there — the next step is letting that instinct actually steer your choices.

## F3 — Decreased access to team / remote

**Operating at: Strengthening**

You recognised the access constraints clearly — identifying that Hamed was on leave, accepting the auto-reply without re-pinging, and naming Tanya as the sole platform resource. You escalated through Bez to pull Tanya off a vendor call when severity warranted it, and you directed targeted requests to her rather than vague asks. Your delegation to specific people with named tasks supported this coordination.

*Growth edge:* When you make the call to pull someone off another commitment, articulate the cost trade-off yourself — even briefly. Naming "I'm pulling Tanya because the revenue impact outweighs the vendor call" makes the decision visible to the team and strengthens your ownership of the escalation path.

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Practicing**

You recognised some bottlenecks — Hamed unavailable, Tanya occupied — and you did eventually get Tanya engaged. However, the coordination pattern was largely reactive: you waited for each rollback to complete before starting the next investigation thread, and the escalation to free Tanya came after team pressure rather than from your own proactive sequencing. You delegated rollbacks to Daniel but didn't simultaneously assign someone else to investigate alternative hypotheses.

*Growth edge:* When you identify that a key resource is blocked, map out what can proceed in parallel without them. Fanning out — one person rolling back while another pulls logs from a different service — prevents the investigation from stalling in a single queue. Think about sequencing work around the bottleneck, not just through it.

## F5 — Data overload / buried information

**Operating at: Not yet evident**

The drill surfaced multiple data streams — logs, change records, NPC observations about which services were and weren't affected — and the filtering challenge here was significant. You chased each recent change sequentially without reasoning about which services had plausible causal paths to the payment failure. When team members surfaced log information pointing toward the actual failure pattern, you misread it as confirming the DNS hypothesis. You also declared the cart service as root cause without supporting evidence, then abandoned that when told cart logs were clean.

*Growth edge:* Before asking "can someone check," pause to integrate what's already been surfaced in-channel. Build a habit of asking yourself: "What has already been ruled out? What signal am I ignoring?" When a team member surfaces information, take a beat to reconcile it with your current theory before issuing the next action. The goal is to let disconfirming evidence actually change your direction rather than passing through unprocessed.

---

## Looking Forward

The instincts that will serve you well are already visible: you asked clarifying questions before declaring severity, you checked for risk before some rollbacks, and you recognised access constraints quickly. The pattern to work on across your next reps is shifting from a serial rollback-and-test approach toward mechanism-first reasoning — asking "how would this cause that?" before acting, and using failed experiments as elimination evidence rather than just moving to the next item on the list. Building in brief synthesis moments ("here's what we've ruled out, here's where we're looking next") will also help you orient your team and catch buried signals before they slip past.