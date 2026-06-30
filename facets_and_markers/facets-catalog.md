# Facet Dictionary (FD)

The Uptime **Facet Dictionary** — a drill-independent catalog of complexity facets, derived from the Patterson, Roth & Woods (PRW) "Facets of Complexity in Situated Work" master taxonomy. Each entry has a stable Uptime ID `FD<N>`, a PRW reference, the PRW-assigned macrocognitive function(s), and a drill-agnostic description.

Source data: `notes/facets-of-complexity.csv` (38 PRW factors) and the companion paper `notes/FacetsofComplexityinSituatedWork_PattersonRothWoods.pdf`.

## What this catalog is — and is not

- **It is the dictionary.** Every facet is an atomic entry. No bundles, no consolidations. Per-drill rubrics select from this dictionary and (where useful) consolidate dictionary entries into a smaller rated set scoped to one drill's cognitive demands.
- **`FD<N>` ≠ `F<N>`.** Dictionary entries use the prefix `FD` (Facet Dictionary). Drill rubrics — like the M2 Rumours packet — use `F<N>` for their own selected/consolidated facet IDs. A reader seeing `FD3` knows it is the dictionary entry; seeing `F3` knows it is whatever a specific drill's packet defined.
- **Numbering follows the source CSV in PRW Table 14.2 row order**, FD1–FD38. This corrects an off-by-one introduced when M2 cited PRW facets as `PRW #2`–`PRW #39`. M2's existing artifacts (`milestones/milestone02/outputs/rumours-participant-eval/`) are **left unchanged** — they are in active use by M3. A sidecar mapping at `milestones/milestone02/outputs/rumours-participant-eval/facet-dictionary-remap.md` translates between M2's citations and the corrected FD# numbering.
- **The dictionary is treated as immutable for PRW-derived entries.** Per-drill rubrics may *select, drop, consolidate, or rename* facets; those scoping choices live in per-drill packets, not in this catalog. Future non-PRW additions (if any) extend this catalog at FD39+ with explicit non-PRW provenance noted.

## How to read each entry

- **`FD<N>`. Label.** Stable Uptime identifier and a short name (lifted from the CSV factor name, lightly cleaned).
- **PRW reference:** Patterson, Roth & Woods Table 14.2 factor name. Cited by name rather than by number to avoid the off-by-one trap.
- **Macrocognitive function:** PRW's primary function tag(s) — *Detecting, Sensemaking, Planning, Executing, Deciding, Coordinating*.
- **Description:** drill-agnostic statement of the complexity the facet captures, paraphrased from PRW.
- **Example from PRW:** PRW's own canonical example, when concrete grounding helps.

Rating-scale conventions for the packet (the 4-point importance scale and `N/A` handling) live in the packet entry point, not in the dictionary — facets and markers share the same scale. The dictionary describes *what* each facet captures; *how* it's rated for importance to a given drill is a packet-level decision.

---

## Coordinating

### FD1. Weak leadership / in-fighting

- **PRW reference:** Weak leadership (in-fighting).
- **Macrocognitive function:** Coordinating.
- **Description:** Competing factions or sub-teams undermine the effectiveness of the individual participant and the overall response. The leader does not intervene, or actively encourages competitive behaviour among factions. The facet captures whether the participant recognises factional dynamics as a coordination problem rather than a personality problem, and intervenes to surface shared goals or escalate as appropriate.
- **Example from PRW:** In a joint relief operation, two field commanders refuse to share intelligence, leading crew members to act on conflicting instructions.

### FD2. Unreliable communication systems

- **PRW reference:** Unreliable communication systems (poor communication).
- **Macrocognitive function:** Coordinating.
- **Description:** The communication tools available are unreliable; signals are noisy or ambiguous, channels drop, or message formatting/visibility is degraded. The facet captures whether the participant detects channel degradation, compensates through redundant or alternative channels, and avoids assuming a message was received because it was sent.
- **Example from PRW:** A remote drone operator receives a low-bandwidth radio feed that intermittently drops, making it difficult to judge the drone's altitude.

### FD3. Decreased access to team members / remote teams

- **PRW reference:** Decreased access to team members (remote teams).
- **Macrocognitive function:** Coordinating.
- **Description:** Team members are physically distant, separated by time zone, or reachable only through low-richness channels (text-only, audio-only, async). The facet captures whether the participant adapts their request form, frequency, and content to each source's bandwidth — terse and specific to attention-constrained sources, richer queries to fully-available sources — rather than treating all channels uniformly.

### FD4. Interdependencies among roles / coordination bottlenecks

- **PRW reference:** Interdependencies among roles (coordination bottlenecks).
- **Macrocognitive function:** Coordinating.
- **Description:** Coordinating work among multiple participants is costly when there are sequencing constraints (A happens before B), shared resources (A is needed by B *and* C and cannot be used by both at once), or synchronisation requirements (A and B must happen at the same time). The facet captures whether the participant identifies the dependency structure, sequences work to avoid stalls, and surfaces blockers proactively rather than letting them queue silently.
- **Example from PRW:** A nuclear safe-door maintenance crew must wait for a licensed electrician to finish wiring before they can proceed, but the electrician is delayed by an unrelated inspection, stalling the entire schedule.

---

## Deciding

### FD5. Over-constrained task / can't do it all

- **PRW reference:** Over constrained task (can't do it all).
- **Macrocognitive function:** Deciding.
- **Description:** The participant is required to do tasks that cannot be accomplished without relaxing one or more constraints (and sacrificing the associated goals). The facet captures whether the participant recognises over-constraint explicitly, names the constraints they are relaxing, and surfaces the tradeoff to stakeholders rather than silently dropping a goal.
- **Example from PRW:** A satellite-control operator must monitor fuel, attitude, and mission-time budget simultaneously, but the onboard computer can process only two streams at once.

### FD6. Double-bind situations / dilemmas

- **PRW reference:** Double bind situations (dilemmas).
- **Macrocognitive function:** Deciding.
- **Description:** Two or more choices all carry highly undesirable elements. PRW catalogues several variants: *authority–responsibility* (responsibility without authority); *early–late* (intervene early at training/political cost vs. intervene late at escalation cost); *specialist–generalist* (when does specialist consultation justify the coordination overhead?); *differential cost–benefit* (help another vs. accomplish own task — "Gruden's law"). The facet captures whether the participant names the bind explicitly, surfaces the tradeoff, and avoids choosing by default.
- **Example from PRW:** A nurse must decide whether to obey a senior doctor's request for an invasive procedure that violates hospital policy on unnecessary interventions.

### FD7. Goal conflicts / impossible task

- **PRW reference:** Goal conflicts (impossible task).
- **Macrocognitive function:** Deciding.
- **Description:** Two or more incompatible goals must be met simultaneously. Variations include conflicts that turn out to be resolvable without sacrificing any goal once the situation is fully understood, and hidden conflicts that emerge only over time. The facet captures whether the participant detects the conflict, distinguishes apparent from genuine conflicts, and (where genuine) makes the tradeoff visible rather than silently optimising one goal at the expense of another.
- **Example from PRW:** A maintenance crew is instructed to keep a plant running 24/7 and to complete all safety inspections on schedule; the goals clash when inspection windows overlap with required uptime.

### FD8. Stress, fatigue / tunnel vision

- **PRW reference:** Stress, fatigue (tunnel vision).
- **Macrocognitive function:** Deciding.
- **Description:** Emotional load, fatigue, and fast tempo create incentives to respond in ways that diverge from desired practice. Fear of authority figures can induce undesirable priority orderings; concern for peers can compete with strategic objectives; tunnel vision makes it harder to step back and reframe the overall problem. The facet captures whether the participant maintains methodical practice under emotional load, and whether they retain the capacity to reformulate the problem space when the current framing is failing.

### FD9. Workload / time pressured

- **PRW reference:** Workload (time pressured).
- **Macrocognitive function:** Deciding, Executing, Coordinating.
- **Description:** Multiple mental or physical actions must be accomplished within a limited period of time, often spanning multiple displays or information sources. The facet captures whether the participant aggregates information efficiently, parallelises where possible, and avoids the failure mode of sequential single-thread work under conditions that demand parallel attention.
- **Example from PRW:** An air-traffic controller must clear multiple aircraft within a short window while simultaneously managing an emergency on another runway.

---

## Detecting

### FD10. Data overload / buried information

- **PRW reference:** Data overload (buried information).
- **Macrocognitive function:** Detecting.
- **Description:** The problem to be detected is buried in a large volume of potentially relevant information. The facet captures whether the participant filters, prioritises, and surfaces the signal — through deliberate sampling, queries, or attention management — rather than scanning passively or being captured by whichever item is loudest.
- **Example from PRW:** A cyber-security analyst receives a torrent of daily threat alerts; the single critical warning about an APT breach is buried among hundreds of benign reports.

### FD11. Signal–noise relationship / false alarms

- **PRW reference:** Signal-noise relationship (false alarms).
- **Macrocognitive function:** Detecting.
- **Description:** Detecting a signal from background noise is difficult because the signal is close to the noise distribution, especially in environments with high false-alarm rates and negative consequences for acting on false alarms. Information is prone to be discounted when indicators are perceived as unreliable. The facet captures whether the participant uses scope and base-rate evidence (e.g., "only one source reports this", "metrics look clean") as positive signal, and sizes their response proportionately to the signal strength rather than to the loudness of the loudest reporter.

### FD12. Attention demands / attention bottlenecks

- **PRW reference:** Attention demands (attention bottlenecks).
- **Macrocognitive function:** Detecting.
- **Description:** Information and requests arrive from multiple sources and require rapid attention shifts. The facet captures whether the participant manages attention across simultaneous monitoring/detecting demands without dropping signals on the channels that aren't currently the focus.
- **Example from PRW:** A railroad dispatcher monitors three trackside cameras, a departure schedule, and an automated fault-reporting system at once; rapid focus shifts cause missed status changes on the unattended feeds.

### FD13. Distributed information across individuals / organisations

- **PRW reference:** Distributed information across individuals/organizations (scattered puzzle pieces).
- **Macrocognitive function:** Detecting, Sensemaking, Coordinating.
- **Description:** Information distributed across people or roles is required to recognise a coherent pattern. Hard variants: unique access (only one person has a given piece), distributions that don't match role responsibilities, information that needs prior expertise to appreciate, mixed-sensitivity information (e.g., classified mixed with public), and incentives against sharing (e.g., legal risk). The facet captures whether the participant identifies *which* people likely hold *which* pieces, prompts for synthesis, and assembles the picture rather than receiving fragments and treating them as independent reports.

---

## Executing

### FD14. Demands on prospective memory / delayed follow-up

- **PRW reference:** Demands on prospective memory (delayed follow-up activity).
- **Macrocognitive function:** Executing.
- **Description:** A disconnected activity must be performed at a future point for which there is no strong memory cue, under high attention and working-memory load. Classic examples are forgetting the original from a copier or forgetting the bank card in an ATM. The facet captures whether the participant uses external scaffolding (notes, reminders, delegation) to offload prospective memory, rather than relying on their own attention to surface the pending task at the right moment.

### FD15. Incomplete advice / leave them hanging

- **PRW reference:** Incomplete advice (leave them hanging).
- **Macrocognitive function:** Executing.
- **Description:** An automated tool or advisor provides partial guidance that stops short of solving the problem. The facet captures whether the participant detects the gap, recognises the advice as incomplete, and supplements rather than treating the partial output as authoritative.
- **Example from PRW:** A GPS provides navigational guidance until a state boundary is crossed, then displays "Download data for West Virginia."

### FD16. Timing issues in following procedures / out-of-sequence steps

- **PRW reference:** Timing issues in following procedures (out of sequence steps).
- **Macrocognitive function:** Executing.
- **Description:** The expected order for procedural steps is deviated from due to timing problems (a prerequisite isn't yet available; a subsequent step's input is needed earlier than the procedure assumes). The facet captures whether the participant recognises the sequence violation, decides whether to deviate from the procedure deliberately, and documents the deviation rather than pretending the procedure was followed.

### FD17. Interruptions / memory bottleneck

- **PRW reference:** Interruptions (memory bottleneck).
- **Macrocognitive function:** Executing.
- **Description:** Frequent interruptions make it easy to forget unresolved tasks and prioritise inappropriately. The facet captures whether the participant absorbs interruptions without dropping pending work — through external task-tracking, deliberate re-orientation after each interrupt, or rate-controlling the interrupting channel.

### FD18. Mismatch between stimulus and response / mode confusion

- **PRW reference:** Mismatch between stimulus and response (mode confusion).
- **Macrocognitive function:** Executing.
- **Description:** An intended response to a stimulus probe requires an unnecessary translation to a different side, modality, or navigation to a different physical or conceptual space. The facet captures whether the participant recognises the mode mismatch, slows down to translate deliberately, and avoids the failure mode of executing the correct action in the wrong context.
- **Example from PRW:** A radiology workstation displays a patient ID on a touchscreen, but the operator must enter it into a separate desktop terminal using a keyboard.

### FD19. Negative transfer between tasks / not used to doing it this way

- **PRW reference:** Negative transfer between tasks (not used to doing it this way).
- **Macrocognitive function:** Executing.
- **Description:** Identical or similar tasks done in different settings, modes, or procedural sequences require different approaches. Prior expertise actively *interferes* rather than helps. The facet captures whether the participant recognises that their default approach was learned in a different context and may not transfer cleanly, and whether they slow down to execute deliberately in the new context.

### FD20. Similar-to-different task / capture error

- **PRW reference:** Similar to different task (capture error).
- **Macrocognitive function:** Executing.
- **Description:** A new task begins in a way that is similar to an overlearned task, and the overlearned sequence "captures" execution before the participant notices the divergence (the classic example: starting a drive to the grocery store and ending up halfway to work). The facet captures whether the participant detects the capture early enough to redirect, or recognises the conditions in which capture is likely (high overlap with familiar task) and pre-commits to deliberate execution.

---

## Planning

### FD21. Inadequate guidance / poor seed

- **PRW reference:** Inadequate guidance (poor seed).
- **Macrocognitive function:** Planning.
- **Description:** The participant is provided guidance — from a peer, colleague, handover, runbook, or other "seed" — that would predictably result in suboptimal performance if followed. The seed may include an inaccurate or poorly supported explanation, or a plan that is suboptimal or inadequate for the actual situation. The facet captures whether the participant treats incoming guidance as evidence to be evaluated rather than instruction to be followed, and whether they detect and resist a poor seed before it shapes the entire response.
- **Example from PRW:** An anesthesiologist is told by an outgoing colleague during a handover update to administer a medication during the upcoming surgery to which the patient has been highly allergic in the past.

### FD22. No predefined plan or procedure / novel situation

- **PRW reference:** No predefined plan or procedure (novel situation).
- **Macrocognitive function:** Planning.
- **Description:** An unfamiliar situation arises for which there is no training, runbook, or predefined guidance. The facet captures whether the participant recognises novelty (rather than trying to retrofit a familiar plan), invokes general problem-solving heuristics, and improvises a response with appropriate caution.
- **Example from PRW:** During a cyber-attack, an incident-response team encounters a zero-day exploit for which no playbook exists; they must improvise entirely.

### FD23. Unintended effects / managing side effects

- **PRW reference:** Unintended effects (managing side effects).
- **Macrocognitive function:** Planning.
- **Description:** An action that is encouraged or natural to take has unintended effects that are challenging to predict in advance without specific training or case expertise. The facet captures whether the participant anticipates side effects when choosing actions, monitors for them after acting, and communicates predicted side effects to others who might also act on the same system.
- **Example from PRW:** Firefighters use a high-pressure hose to extinguish a blaze, but the pressurised spray spreads flames to adjacent structures via wind.

### FD24. Mismatch between predefined plans and the situation / wrong plan

- **PRW reference:** Mismatch between predefined plans or procedures and the situation confronted (wrong plan).
- **Macrocognitive function:** Planning.
- **Description:** A predefined plan or procedure exists, but the actual situation deviates from the assumptions underlying the plan; following it verbatim will not achieve the desired goals. The facet captures whether the participant recognises the assumption violation, identifies *which* assumption is broken, and modifies the plan to fit the actual state of the world rather than executing the procedure on autopilot.
- **Example from PRW:** A disaster-response protocol assumes shelters have potable water; in a flood zone many shelters lack clean water, rendering the plan ineffective.

### FD25. Impasses and opportunities / unworkable plan

- **PRW reference:** Impasses and opportunities (unworkable plan).
- **Macrocognitive function:** Planning.
- **Description:** A plan can no longer be executed (an *impasse*) and must be revised, or an unexpected resource or event creates an opportunity to greatly improve the existing plan if recognised. The facet captures whether the participant detects impasse early enough to replan with time to spare, and whether they're alert to opportunities (rather than treating any deviation from plan as a problem to suppress).
- **Example from PRW:** In a military operation, the planned route becomes unavailable when a bridge is destroyed; the team must improvise an alternative.

### FD26. Shifting objectives / moving target

- **PRW reference:** Shifting objectives (moving target).
- **Macrocognitive function:** Planning.
- **Description:** The tasks originally given shift over time — due to changes in objectives from above, detection that prior assumptions were violated, or the need to synchronise with personnel who didn't accomplish their part of the original plan. The facet captures whether the participant detects the shift, revises the plan to meet the *original goals/intent* under the new constraints, and communicates the revision to dependent parties.

---

## Sensemaking

### FD27. False prime explanations / garden path

- **PRW reference:** False prime explanations (garden path).
- **Macrocognitive function:** Sensemaking.
- **Description:** Initial evidence strongly suggests a false-prime ("garden path") explanation. Over time, evidence accumulates that the prime is inaccurate or less supported than an alternative ("emerging path") explanation. The facet captures whether the participant recognises and resists the prime, holds the alternative open, and updates when the emerging path overtakes the prime in evidential weight.

### FD28. Context change / not in Kansas anymore

- **PRW reference:** Context change (not in Kansas anymore).
- **Macrocognitive function:** Sensemaking.
- **Description:** Requirements, plans, actions, decisions, or social norms that make sense in one context do not translate to another. The participant must recognise that defaults learned in one setting are not safe defaults in the new one, and re-evaluate baseline assumptions about command structures, procedures, communication norms, or operational rules. The facet captures whether the participant treats the context shift as something requiring active recalibration, rather than carrying forward defaults until they fail.
- **Example from PRW:** An intelligence analyst trained in a region where power is centralised in the national president must re-evaluate command-and-control assumptions when transferred to a region where power is distributed across tribal elders.

### FD29. Missing information / information gap

- **PRW reference:** Missing information (information gap).
- **Macrocognitive function:** Sensemaking.
- **Description:** Information needed for an accurate assessment is missing — due to lack of sensors, failed sensors, lack of system updates, lack of informants, or poor communication. The facet captures whether the participant recognises *which* information is missing, reasons explicitly about what its absence means, and seeks alternative sources rather than treating missing data as evidence of nothing being wrong.

### FD30. Misleading indicators / low predictive value

- **PRW reference:** Misleading indicators (low predictive value).
- **Macrocognitive function:** Sensemaking.
- **Description:** Information may be inaccurate — stale, from an unreliable source, distorted by translation or indirect reporting, or intentionally deceptive. Indirect indicators that are *usually* correlated with the variable of interest may not be in this situation (the canonical example: at Three Mile Island, pressuriser level was assumed to indicate adequate coolant, when in fact it did not). The facet captures whether the participant evaluates indicator reliability, distinguishes direct from indirect measures, and avoids inferring from a correlate whose correlation has broken down.

### FD31. Multiple simultaneous influences / more than one explanation required

- **PRW reference:** Multiple simultaneous influences (more than one explanation required).
- **Macrocognitive function:** Sensemaking.
- **Description:** Multiple independent influences are simultaneously present and only their *combination* explains the observed evidence. Single-cause hypotheses cannot account for the full pattern. The facet captures whether the participant entertains multi-cause explanations, resists single-cause closure when residual evidence is left unexplained, and discriminates between multi-cause situations and ones where one cause is masking another.
- **Example from PRW:** An unexpected voltage dip in a power grid is caused by both a sudden load change *and* a transformer fault; neither alone explains the observed waveform.

### FD32. Ambiguous cues / no obvious answer

- **PRW reference:** Ambiguous cues (no obvious answer).
- **Macrocognitive function:** Sensemaking.
- **Description:** Multiple alternative explanations exist for the pattern of symptoms observed; no single cue decisively narrows the field. The facet captures whether the participant enumerates alternatives, holds a hypothesis set open, and uses targeted tests to discriminate between candidates rather than latching onto one explanation prematurely.
- **Example from PRW:** A patient with gastrointestinal symptoms could have an allergic reaction, food poisoning, or a GI flu — the cue pattern alone doesn't pick one out.

### FD33. Uncertain information / unreliable data

- **PRW reference:** Uncertain information (unreliable data).
- **Macrocognitive function:** Sensemaking.
- **Description:** The accuracy of incoming information cannot be definitively ascertained. The information may be old, from an inherently unreliable or untrustworthy source, or from an automated system known to have a high false-alarm rate. The facet captures whether the participant attaches confidence levels to inputs, propagates uncertainty into downstream decisions, and avoids the failure mode of treating uncertain data as if it were certain.
- **Notes:** Distinct from FD11 (Signal–noise) — FD11 is about distinguishing signal from background noise at detection time; FD33 is about attaching reliability/confidence to information that has already been received.

### FD34. Complex or counterintuitive dynamics

- **PRW reference:** Complex or counterintuitive dynamics (non-intuitive).
- **Macrocognitive function:** Sensemaking.
- **Description:** A process changes over time in a complex, hard-to-predict manner, making it difficult to develop an appropriate mental model and to project the impact of changes forward. Counterintuitive dynamics (e.g., adding cold water to a system causes level to *decrease* before increasing, due to shrink effects) make state assessment and prediction unreliable. The facet captures whether the participant updates their mental model when behaviour diverges from expectation, and whether they treat unexpected dynamics as evidence about the system rather than noise.

### FD35. Stereotype violations / not the usual suspect

- **PRW reference:** Stereotype violations (not the usual suspect).
- **Macrocognitive function:** Sensemaking.
- **Description:** In most situations there is a stereotypical explanation for a set of data; in this scenario the stereotype ("usual suspect") explanation is not the best explanation. The facet captures whether the participant questions the prototypical reading of the situation when evidence accumulates that doesn't fit, and reframes toward a less-obvious cause.
- **Example from PRW:** A patient presenting classic flu symptoms during flu season may be diagnosed with "the flu" when in fact a more serious respiratory ailment is the actual cause.

### FD36. Implied relationship / red herring

- **PRW reference:** Implied relationship (red herring).
- **Macrocognitive function:** Sensemaking.
- **Description:** Findings that appear relevant to the situation may in fact be unrelated and misleading. Multiple data elements presented together (co-occurring in time or location) imply a relationship that doesn't actually hold; one element (the red herring) gets falsely included in the explanation that accounts for the others. The facet captures whether the participant tests whether each apparent piece of evidence actually belongs to the same situation, and whether they're willing to discard a co-occurring item as unrelated when investigation reveals it.
- **Example from PRW:** A series of reported events suggests growing anti-democracy violence; a house fire that killed a pro-democracy judge is included in the pattern; investigation later reveals the fire was caused by faulty wiring (red herring).

### FD37. Hidden coupling / effects at a distance / cascading effects

- **PRW reference:** Hidden coupling (effects at a distance; cascading effects).
- **Macrocognitive function:** Sensemaking.
- **Description:** A problem's source is difficult to detect because cascading secondary effects make it hard to connect observed symptoms back to the originating cause. Symptoms appear in physically or logically distant subsystems, generating their own alarms and noise that further obscure the trail. The facet captures whether the participant traces backwards from symptoms toward source, resists treating each downstream alarm as an independent problem, and surfaces the coupling structure as part of their diagnosis.
- **Example from PRW:** A cooling-system failure in one refinery unit causes pressure surges that trigger alarms and shutdown protocols across several other units, obfuscating the source.

### FD38. Distributed information across time / overturning updates

- **PRW reference:** Distributed information across time (overturning updates).
- **Macrocognitive function:** Sensemaking.
- **Description:** Situations require integrating information that arrives at different points in time. Individual pieces must be retained, connected to later pieces, and (critically) earlier assessments must be revised when later information overturns them. Failure modes include forgetting prior information, failing to connect across time, and failing to revise an earlier conclusion in light of new evidence. The facet captures whether the participant maintains a working timeline of evidence, links new inputs back to earlier ones, and explicitly updates assessments when later data contradicts earlier conclusions.

---

## Appendix A: Known consolidation patterns

Per-drill rubrics may consolidate dictionary entries into a smaller rated set when multiple FD entries manifest through the same observable behaviours in a particular drill. This appendix documents consolidations that have been used in production drill packets, as **reference patterns** — not as first-class dictionary entries. Per-drill packets cite component FDs directly; the named pattern is just shorthand for staff conversation.

### Pattern: "Diagnostic information access"

- **Components:** FD3 (Decreased access) + FD13 (Distributed information across individuals) + FD29 (Missing information).
- **Rationale for consolidation:** in drills where diagnostic information is the bottleneck, all three facets manifest through the same observable behaviours: gathering effort, synthesis across sources, targeted requests under attention constraints, and reasoning about what *absence* of signal means.
- **First used in:** M2 Rumours packet, where it appears as `F3` (see `milestones/milestone02/outputs/rumours-participant-eval/markers-reference.html`). M2's `F3` is a rubric-level ID; the dictionary equivalents are FD3 + FD13 + FD29.

### Pattern: "Workload and pressure management"

- **Components:** FD8 (Stress, fatigue / tunnel vision) + FD9 (Workload / time pressured) + FD17 (Interruptions / memory bottleneck).
- **Rationale for consolidation:** in drills with concurrent stakeholder demands and time pressure, these three facets co-manifest through comms-quality and thread-management behaviours under load.
- **First used in:** M2 Rumours packet, where it appears as `F6`. The dictionary equivalents are FD8 + FD9 + FD17.

Future drill packets are free to define new consolidation patterns; document them here when they recur.

---

## Appendix B: Cross-reference to M2 Rumours packet

M2's Rumours packet uses its own rubric IDs `F1`–`F6`, citing PRW with an off-by-one numbering convention (`PRW #N` = CSV row `N - 1`). M2's artifacts are unchanged; the table below maps M2's IDs to the dictionary's FD#s for cross-reference. A more detailed remap with the conversion rule lives at `milestones/milestone02/outputs/rumours-participant-eval/facet-dictionary-remap.md`.

| M2 packet F# | M2 PRW citation | Dictionary FD# | Facet name |
|--------------|-----------------|----------------|------------|
| F1 | PRW #36 | FD35 | Stereotype violations |
| F2 | PRW #28 | FD27 | False prime explanations |
| F3 (bundle) | PRW #4 + #14 + #30 | FD3 + FD13 + FD29 | Diagnostic information access pattern |
| F4 | PRW #33 | FD32 | Ambiguous cues |
| F5 | PRW #12 | FD11 | Signal–noise relationship |
| F6 (bundle) | PRW #9 + #10 + #18 | FD8 + FD9 + FD17 | Workload and pressure management pattern |

---

## Appendix C: Full cross-reference table

| FD#  | Label                                                        | Macrocognitive function           |
|------|--------------------------------------------------------------|-----------------------------------|
| FD1  | Weak leadership / in-fighting                                | Coordinating                      |
| FD2  | Unreliable communication systems                             | Coordinating                      |
| FD3  | Decreased access to team members / remote teams              | Coordinating                      |
| FD4  | Interdependencies among roles / coordination bottlenecks     | Coordinating                      |
| FD5  | Over-constrained task / can't do it all                      | Deciding                          |
| FD6  | Double-bind situations / dilemmas                            | Deciding                          |
| FD7  | Goal conflicts / impossible task                             | Deciding                          |
| FD8  | Stress, fatigue / tunnel vision                              | Deciding                          |
| FD9  | Workload / time pressured                                    | Deciding, Executing, Coordinating |
| FD10 | Data overload / buried information                           | Detecting                         |
| FD11 | Signal–noise relationship / false alarms                     | Detecting                         |
| FD12 | Attention demands / attention bottlenecks                    | Detecting                         |
| FD13 | Distributed information across individuals / organisations   | Detecting, Sensemaking, Coordinating |
| FD14 | Demands on prospective memory / delayed follow-up            | Executing                         |
| FD15 | Incomplete advice / leave them hanging                       | Executing                         |
| FD16 | Timing issues in following procedures / out-of-sequence steps| Executing                         |
| FD17 | Interruptions / memory bottleneck                            | Executing                         |
| FD18 | Mismatch between stimulus and response / mode confusion      | Executing                         |
| FD19 | Negative transfer between tasks                              | Executing                         |
| FD20 | Similar-to-different task / capture error                    | Executing                         |
| FD21 | Inadequate guidance / poor seed                              | Planning                          |
| FD22 | No predefined plan or procedure / novel situation            | Planning                          |
| FD23 | Unintended effects / managing side effects                   | Planning                          |
| FD24 | Mismatch between predefined plans and the situation          | Planning                          |
| FD25 | Impasses and opportunities / unworkable plan                 | Planning                          |
| FD26 | Shifting objectives / moving target                          | Planning                          |
| FD27 | False prime explanations / garden path                       | Sensemaking                       |
| FD28 | Context change / not in Kansas anymore                       | Sensemaking                       |
| FD29 | Missing information / information gap                        | Sensemaking                       |
| FD30 | Misleading indicators / low predictive value                 | Sensemaking                       |
| FD31 | Multiple simultaneous influences                             | Sensemaking                       |
| FD32 | Ambiguous cues / no obvious answer                           | Sensemaking                       |
| FD33 | Uncertain information / unreliable data                      | Sensemaking                       |
| FD34 | Complex or counterintuitive dynamics                         | Sensemaking                       |
| FD35 | Stereotype violations / not the usual suspect                | Sensemaking                       |
| FD36 | Implied relationship / red herring                           | Sensemaking                       |
| FD37 | Hidden coupling / effects at a distance / cascading effects  | Sensemaking                       |
| FD38 | Distributed information across time / overturning updates    | Sensemaking                       |

**Coverage check:** all 38 PRW facets from `notes/facets-of-complexity.csv` appear exactly once in the dictionary as FD1–FD38, in CSV row order, grouped by macrocognitive function.
