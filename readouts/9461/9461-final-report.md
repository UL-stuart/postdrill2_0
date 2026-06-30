# Post-Drill Report — Snipe Hunt

This drill placed you in a live incident with layered complexity: misleading timing coincidences, hidden system dependencies, constrained team availability, and a volume of information that required active filtering. The observations below reflect how you navigated that complexity across five dimensions of incident-response reasoning.

---

## F1 — Misleading correlations

**Operating at: Practicing**

Early in the drill, you picked up on the email/DNS maintenance as a plausible cause and pursued it actively — asking about rollback options and requesting details on the DNS change. When the platform engineer explicitly stated the maintenance couldn't be causing checkout failures, you continued chasing the DNS thread for several more exchanges before eventually moving on. The pivot away came because you ran out of actionable paths rather than because you reasoned through why the mechanism didn't fit.

*Growth edge:* When a coincident event is disconfirmed, practice pausing to ask "what mechanism would connect these?" before continuing to pursue it. The faster you can distinguish timing coincidence from causal linkage, the less time you'll spend on dead ends.

---

## F2 — Hidden coupling

**Operating at: Practicing**

After the restart failed to resolve the issue, you asked the team for ideas rather than independently reframing the problem. The shift in error character — from connection failures to certificate chain errors — was identified and interpreted by your team members rather than by you driving the reframe. You did connect the earlier certificate rotation to the current failure, but only in the retrospective phase after resolution, not during active investigation.

*Growth edge:* When a remediation attempt fails and the error changes shape, treat that as a strong signal that the problem's structure is different from what you assumed. Articulate the new shape yourself — even tentatively — before asking the team to brainstorm. This also connects to how you form hypotheses: naming "the error changed, so the problem might be structural rather than transient" gives the team a sharper frame to work within.

---

## F3 — Decreased access to team

**Operating at: Strengthening**

You demonstrated awareness of team constraints throughout. You initially preserved the vendor call, attempted to reach both Tinus and Hamed for restart approval, accepted their unavailability without repeated pinging, and made an explicit cost trade-off when you pulled the platform engineer off the vendor call. Your escalation language was direct and named the stakes.

*Growth edge:* Once you pull someone into the incident, maximise the value of their attention by having a focused ask ready. A couple of your early questions to the platform engineer were broad enough that they could have been answered by others or deferred — tightening the ask-per-person ratio will help when access is scarce.

---

## F4 — Interdependencies / coordination bottlenecks

**Operating at: Strengthening**

You walked the approval chain methodically — Tinus, Hamed, then Bez — and delegated parallel work to available team members. You ultimately took ownership of the restart decision, framing it as the right call given the information available. You also routed platform-level investigation to the right person once she was available, showing awareness of who could act on what.

*Growth edge:* When you take ownership of a decision under uncertainty, own it cleanly. Framing a decision as collectively endorsed ("are people happy?") can diffuse accountability in ways that slow future decisions. A clear "I'm authorising this; here's why" statement sets the tone for the team and removes ambiguity about who's accountable.

---

## F5 — Data overload / buried information

**Operating at: Practicing**

You noticed payment-service errors and asked about connection targets, which showed filtering instinct. However, the critical distinctions — handshake failures versus internal call failures, the reload-versus-restart difference in the activity doc, the certificate rotation from seven days prior — were all surfaced by team members rather than by you driving targeted questions into the data. You accepted summaries without further interrogation.

*Growth edge:* Practice asking temporal and structural questions yourself: "What changed in the last 7 days, not just 24 hours?" or "What does the runbook actually say about this step?" Driving the filtering — rather than waiting for someone else to surface the key detail — is the difference between reacting to information and actively hunting for it.

---

## Looking Forward

Across this drill, your coordination instincts — escalation awareness, delegation to named people, willingness to make hard trade-offs on team availability — are solid foundations. The growth opportunity for your next rep sits in the diagnostic layer: driving your own reframes when evidence shifts, articulating hypotheses before testing them, and actively filtering data rather than waiting for the team to surface what matters. Carry the coordination confidence forward; layer investigative assertiveness on top of it.