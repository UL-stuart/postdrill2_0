# Snipe Hunt — Post-Drill Developmental Report

This drill puts you in the middle of a live checkout outage where multiple systems, team members, and approval chains intersect under time pressure. It's designed to stress your ability to reason through misleading signals, navigate hidden technical dependencies, and coordinate a distributed team when access is constrained. Here's what this run surfaced about your process.

## F1 — Misleading correlations

**Operating at: Not yet evident**

Early in the drill, you identified the email maintenance change as coinciding with the checkout failure and pursued it as the primary cause — requesting a rollback and pulling Tanya off her vendor call to action it. When Tanya explained that the email provider hadn't been touched and that confirmations were still flowing, the thread continued rather than being reconsidered. The pivot away from this correlation happened because another team member's investigation naturally redirected attention, not because you questioned the mechanism linking email maintenance to checkout failures.

The growth edge here is pausing when a correlation surfaces and asking: *could this plausibly cause the symptom I'm seeing?* A quick mechanism check — "how would an email change break payment processing?" — can save significant time and prevent pulling teammates off productive work.

## F2 — Hidden coupling

**Operating at: Practicing**

When the first restart didn't resolve the issue, you moved to suggesting a backup server switch — repeating a similar remediation rather than reframing the problem as structurally different. The cert rotation coupling and the reload-vs-restart distinction were surfaced by teammates rather than driven by your own investigation. You engaged with the cert thread once it was presented, but the recognition that a week-old change could manifest now wasn't something you articulated independently.

For the next rep, notice when a "standard fix" fails — that's a signal the problem's structure is different from what you assumed. Asking "why didn't that work?" before proposing the next action can open up the hidden-coupling reasoning earlier.

## F3 — Decreased access to team

**Operating at: Practicing**

You pulled Tanya from her vendor call without articulating the trade-off or economising on her availability. When Hamed and Tinus were unreachable, you walked the escalation chain and eventually reached Bez — showing persistence. However, there's room to grow in naming the constraint pattern explicitly and batching your asks to make the most of limited windows. When you direct someone away from another commitment, framing the cost ("I know this pulls you off the vendor window — here's specifically what I need from you") helps both of you make better decisions about where attention goes.

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

This was your strongest area in this run. You walked the approval chain methodically — Tinus, then Bez — and when both primary approvers were unavailable, you explicitly claimed authority as the escalation lead, named who was absent, and issued the directive. On the second restart after the bundle fix, you authorised without re-litigating. This shows you can recognise when a bottleneck needs to be broken and take ownership of that decision. Your delegation throughout was appropriately routed — directing Daniel toward logs, Tanya toward platform-side checks, Shay toward config.

The next growth edge is proactive sequencing: rather than waiting for each step to complete before initiating the next, look for opportunities to fan out work in parallel so that the approval chain and the technical investigation aren't blocking each other.

## F5 — Data overload / buried information

**Operating at: Practicing**

You asked Daniel for change request details and agreed to a deep-dive into PaymentService logs, which shows engagement with the information landscape. However, the filtering work — identifying that internal calls were clean, spotting the bundle ordering issue, connecting the cert rotation timeline — was largely driven by your teammates. You accepted summaries without much further interrogation and didn't produce synthesis statements that combined evidence to rule things out.

On the next rep, try narrating what you know so far: "email is ruled out, deploys don't match the timeline, so what's left?" This kind of active filtering helps you — and your team — converge faster on buried signals.

## Looking Forward

Two things to carry into your next drill: first, build a habit of testing mechanism before acting on correlation — even a single sentence asking "how would X cause Y?" can prevent extended pursuit of a dead end. Second, when a standard fix fails, treat that as new diagnostic information rather than a prompt to try the next standard fix. These two shifts will compound across the other areas — better mechanism reasoning will free up your team's time, and reframing after failure will help you surface hidden structure earlier.