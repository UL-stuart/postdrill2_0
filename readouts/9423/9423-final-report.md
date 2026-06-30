# Post-Drill Report — Snipe Hunt

This drill placed you in a live incident requiring you to coordinate a distributed team, navigate access constraints, and work through layered technical complexity where early signals didn't straightforwardly point to root cause. The observations below focus on how you moved through that process.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you noted the timing overlap between email maintenance and the checkout failures and asked Tanya directly whether her change could be causing the issue. When she disconfirmed it, you didn't order a rollback — but you also didn't explicitly dismiss the correlation on mechanism grounds. The pivot away from that thread came once Daniel's log findings pointed to PaymentService gateway handshake failures rather than from your own reasoning about why email maintenance couldn't produce checkout symptoms.

*Growth edge:* When a coincidence surfaces, practise articulating *why* a candidate can or can't produce the observed symptoms — not just asking the person responsible whether it's them. Naming the mechanism ("email routing doesn't touch the payment path") closes the door faster and frees attention for stronger leads.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

After the first restart failed to resolve the issue, you recognised relatively quickly that the situation had changed structurally — a new error rather than a persistence of the old one. You engaged with the cert-bundle framing and drove toward the fix once the chain/order distinction was surfaced. The initial "beyond 24 hours" question that opened the cert-rotation thread came from a teammate rather than from you, but your reframe after the failed restart was prompt and purposeful.

*Growth edge:* Try to be the one who asks the structural question earlier — "what changed in the last day that we haven't accounted for?" — before a teammate surfaces it. That upstream curiosity is what separates recognising coupling from anticipating it.

---

## F3 — Decreased access to team / remote

**Operating at: Strengthening**

You handled access constraints actively: you pulled Tanya off a vendor call with an explicit priority statement, accepted Hamed's out-of-office as a dead end without re-pinging, and moved to alternative escalation paths when Tinus was also unavailable. You sent Tanya targeted questions during her vendor session rather than waiting passively. Your delegation showed awareness of who could access what — routing platform-level work to Tanya and app-side investigation to Daniel.

*Growth edge:* When you make a costly call like pulling someone off an external engagement, naming the trade-off aloud ("this may cost us the vendor reschedule, and I'm accepting that") makes the decision visible to the team and strengthens shared situational awareness.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the approval chain methodically — identified that Hamed or Tinus could authorise a restart, confirmed both were unavailable, then escalated to Bez for backing before proceeding. You also checked with the full team ("any reasons NOT to restart?") before executing. This showed clear awareness that the restart decision sat at an intersection of authority and risk.

*Growth edge:* Consider naming the full dependency structure in one place before you start walking it — "we need platform approval, we need to confirm no in-flight transactions, and we need someone with prod access" — so the team can attack bottlenecks in parallel rather than sequentially.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You initially focused on a noisy signal — the DNS_NXDOMAIN entry in the log output — rather than filtering to the service layer most likely to produce checkout failures. As the investigation progressed, teammates drove the narrowing: Daniel isolated PaymentService, Tanya surfaced the cert rotation and later the bundle-order issue. You engaged with each finding once presented but didn't independently drive the filtering or spot buried distinctions in the available documentation.

*Growth edge:* When a log dump or status page lands, practise a quick triage pass before reacting to any single line: "which service sits in the checkout path?" Then read only that service's entries first. This reduces the chance of anchoring on an eye-catching but irrelevant signal.

---

## Looking Ahead

Across this run, your coordination instincts — escalating access constraints, seeking approval before high-impact actions, checking for objections — served you well and form a solid foundation. The next growth area to focus on is driving the *analytical* thread with the same intentionality you bring to the *coordination* thread: stating hypotheses explicitly, naming mechanisms when ruling candidates in or out, and posting synthesis statements that orient the team on what's been eliminated. Strengthening that analytical voice will let you lead both the people and the problem simultaneously.