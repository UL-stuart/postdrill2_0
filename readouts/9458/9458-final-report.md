# Post-Drill Developmental Report

This drill placed you in a live incident with layered complexity: misleading surface signals, a root cause hidden behind a time-delayed change, constrained access to key people, and a coordination bottleneck around remediation approval. The design pressures your ability to reason through noise, manage dependencies, and drive toward resolution when the path forward isn't straightforward.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you pursued the email/DNS correlation as a likely cause, directing investigation toward DNS changes and telling the business stakeholder it was a potential DNS failure. You did eventually move away from this thread — but the pivot came reactively, after an NPC explicitly disconfirmed the email-maintenance link and after logs surfaced TLS handshake failures in the payment service. The inconsistency showed up in moments where you acknowledged changes weren't suggesting the root cause, yet still directed the team to start with the email service as "the biggest culprit."

**Growth edge:** Practice articulating *why* a correlation might or might not represent causation before committing investigation effort. When you notice a surface-level match (email maintenance + checkout failures), pause to ask: "What mechanism would connect these?" If you can't name one, deprioritise it earlier.

---

## F2 — Hidden coupling

**Operating at: Strengthening**

Once the week-old certificate rotation surfaced as a candidate, you engaged with it systematically. You directed Tanya to open the bundle file, and you independently identified the ordering problem — recognising that the intermediate and leaf certificates were sequenced incorrectly. You connected the cert rotation from seven days prior to the current failure. The coupling wasn't something you surfaced on your own (the NPC investigation brought the change into view), but once it was visible, you drove the technical reasoning forward.

**Growth edge:** Work on independently asking "what changed beyond the obvious window?" Earlier in the drill, your change-log review focused on recent deploys. Expanding your temporal aperture — asking what changed in the past week or two, not just the past day — could help you surface hidden couplings before an NPC does.

---

## F3 — Decreased access to team

**Operating at: Strengthening**

You recognised the access constraints clearly: Hamed out of office, Tinus at the summit, Tanya on a vendor call with a two-week rescheduling cost. You named these constraints explicitly and made a reasonable trade-off decision by escalating to Bez to pull Tanya off the call, framing the cost clearly. Where this became less efficient was in the repeated pings to Bez and Tinus for restart approval — five or more messages without restructuring your approach when responses were non-committal or absent.

**Growth edge:** When you've named a constraint and your first escalation attempt doesn't land, shift to a different strategy rather than repeating the same request. Ask yourself: "If this person doesn't respond in the next two minutes, what's my Plan B?" That reframe can move you from waiting to adapting. Your delegation to specific people with appropriate routing (Daniel for logs, Tanya for platform work, Shay for change details) was a strength here — carry that forward.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Practicing**

You recognised the coordination bottleneck — the restart required approval from people who were unavailable — and you walked the escalation chain methodically. You explored creative workarounds, asking whether a different fix could bypass the approval requirement or whether the team would hypothetically restart without sign-off. But you never arrived at taking ownership of the override decision yourself. The drill ended with you asking "what's the procedure to escalate?" — still looking for external authorisation rather than making the call.

**Growth edge:** In situations where the approval chain is exhausted and the business impact is clear, practice framing the decision as yours to own: "Given X impact and Y unavailability, I'm making this call and accepting the consequences." You demonstrated awareness of the business cost (revenue loss per minute) — the next step is connecting that awareness to a decision you personally authorise. You weighed consequences well when deciding to pull Tanya off the vendor call; apply that same decisiveness to the restart decision.

---

## F5 — Data overload / buried information

**Operating at: Strengthening**

You filtered effectively once the investigation was underway — requesting PaymentService-specific logs from Daniel, moving past the noisy email errors once payment TLS failures appeared, and driving toward the bundle file as the specific artifact to inspect. You integrated information across multiple channels (logs, cert investigation, the activity document) and independently read the bundle output to identify the ordering issue.

**Growth edge:** Push yourself to synthesise the current state of the investigation aloud for the team at key decision points. You narrowed scope well internally, but your technical channel messages were mostly questions and delegations rather than "here's what we know, here's what's ruled out, here's what we're testing next." That synthesis step helps the team stay oriented and can surface gaps in your own reasoning.

---

## Looking Ahead

Carry forward your willingness to engage with technical artifacts directly — reading the bundle file and identifying the ordering problem showed real diagnostic ownership. On your next rep, focus on two things: expanding your temporal window when reviewing changes (ask about the past week, not just the past day), and practising the moment where you shift from seeking approval to owning the decision. Both are edges where small shifts in habit will change how the drill unfolds.