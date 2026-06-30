# Snipe Hunt — Post-Drill Developmental Report

This drill puts you in the middle of a live incident where multiple signals compete for attention: a coincidental maintenance window, a week-old infrastructure change, constrained team availability, and documentation that buries the relevant detail. The challenge is to navigate that complexity through structured reasoning, deliberate delegation, and clear communication — all under time pressure.

---

## F1 — Misleading correlations

**Operating at: Not yet evident**

Early in the drill, you oriented toward the email maintenance window as the likely cause of checkout failures. When a teammate explicitly confirmed — multiple times — that the email system has no technical overlap with checkout or payments, you continued asserting a connection rather than pivoting. The growth edge here is building a habit of treating disconfirmation as actionable data: when someone with system knowledge names a lack of mechanism, that's a signal to release the hypothesis and look elsewhere. On your next rep, practice naming *why* you believe two things are connected (shared service, shared infrastructure, timing window) and then asking whether that mechanism actually exists before committing further investigation time.

---

## F2 — Hidden coupling

**Operating at: Practicing**

You engaged with the certificate and bundle-ordering thread once teammates surfaced it — recognising the expired-cert-in-memory issue and noting the sequence problem in the certificate chain. The engagement was reactive rather than self-driven: the week-old change and its downstream coupling were identified by others before you picked them up. The next growth edge is asking earlier, "What changed beyond the obvious recent window?" — pushing the timeline back and looking for infrastructure-level changes that might not appear in a standard deployment log. Driving that question yourself, rather than waiting for it to surface, is the shift from reactive to proactive coupling detection.

---

## F3 — Decreased access to team

**Operating at: Not yet evident**

When you pulled a teammate off an external vendor call, you named urgency but didn't articulate the cost of that decision (losing a narrow scheduling window). You then directed that teammate's time toward verifying the already-disconfirmed email hypothesis — a low-value use of a constrained resource. Separately, you repeatedly sought approval from people who had already told you they couldn't provide it, consuming cycles without adapting to the access constraint. The growth edge is treating team availability as a resource to be budgeted: before pulling someone off a task, name what you're trading away; before asking someone for something, confirm they're the right person to provide it.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Practicing**

You eventually took ownership of the restart decision when the normal approvers were unavailable. That's a meaningful step. The path to get there, though, involved cycling through the same question multiple times — asking who could approve, asking a stakeholder who had already clarified they don't approve technical actions, and waiting for someone to explicitly tell you to take responsibility. The growth edge is recognising the dependency structure earlier: when two approvers are unreachable, name the bottleneck aloud, state the risk of waiting, and make the call. Structured escalation — "I've tried X and Y, neither is available, I'm taking the decision and documenting why" — replaces the loop.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You did engage with documentation — reviewing the new provider's integration doc and the certificate rotation activity record. However, significant time went to the irrelevant email provider document rather than filtering to the payment service. The bundle-ordering detail and the reload-vs-restart distinction were surfaced by teammates rather than extracted by you from the available docs. The growth edge is active filtering: when multiple documents are available, start by asking "which service is actually failing?" and read only the doc that maps to that service. Let the error signal guide your document selection rather than reading broadly and hoping to recognise relevance.

Your delegation patterns reinforced this: requests to teammates were often broad ("see if you see any red flags") rather than scoped to a specific service or log source. Tightening the ask — "check PaymentService outbound connections in the last hour" — would have accelerated the filtering.

---

## Looking Forward

On your next rep, two shifts will give you the most leverage. First, practice releasing a hypothesis the moment someone with system knowledge provides a mechanistic disconfirmation — and redirect that freed-up time toward the next candidate. Second, when you delegate or escalate, name the specific thing you need and why that person is the right one to provide it. These two habits — letting go of disproven paths and scoping your asks — will change how quickly you move through ambiguity.