# Behavioural Markers Catalog (Generic)

Generic, drill-independent catalog of the 23 candidate behavioural markers for novice IC evaluation. Sourced from `notes/candidate-behavioral-markers.md`; descriptions have been genericized so the catalog reads as drill-agnostic, with Rumours-specific anchors retained as illustrative examples.

Numbering is preserved from the master catalog: marker IDs and labels here match exactly with the M2 Rumours packet (`milestones/milestone02/outputs/rumours-participant-eval/markers-reference.html`) so a reader toggling between the two sees no naming surprises. M2 selected 11 of these 23 markers (L2, L4, L5; C1, C5; M2, M3, M5; K1, K2, K4) — the remaining 12 are unused-by-Rumours but kept in scope for other drills.

## How to read this document

Each marker card includes:

- **What to look for** — concrete, drill-agnostic description of the observable behaviour.
- **Text observability** — how easy is this to identify in a text/chat transcript? (High = clearly visible / Medium = usually visible but may require inference / Low = difficult or impossible from text alone). Carried forward unchanged from the master catalog.
- **Example from Rumours** — a single-drill anchor preserved verbatim from the source. Treat as illustrative only; the cross-drill principle is in "What to look for", not in this example. The "X/35" frequency cited under "Existing `:star:` equivalent" is from Rumours data and will not generalize to other drills.
- **Existing `:star:` equivalent** — whether Uptime's drill engine already emits a closely related automated marker, with the Rumours frequency for reference.
- **Org-sensitive (🔧)** — where present, the marker's importance, threshold, or "what good looks like" is likely to vary by organisation. These markers should be evaluated uniformly within a single packet, but may need org-specific weighting or threshold adjustment when scoping for a customer.

Categories: **Leadership** (L1–L5), **Coordination** (C1–C7), **Mindset** (M1–M5), **Communication** (K1–K6). Total: 23 markers.

A "Markers NOT included (and why)" reference (low-observability behaviours that the research flags as important but that are not assessable from text) lives in the packet's appendices, not in this file.

---

## Leadership

### L1. Declares/creates an incident record  🔧

- **What to look for:** Participant uses the product's incident-declaration mechanism (the `/incident` command) to formally create an incident record, with timing and quality (severity, description) appropriate to the situation.
- **Text observability:** High — the system logs incident creation explicitly.
- **Example from Rumours:** All six players we read created incident records, but timing and quality varied enormously. Dylan created "sev-3 unable to add item to basket" (appropriate severity, clear description). Gowtham created "sev 1" (no description, arguably wrong severity). Marcin created "P3" *after* resolution.
- **Existing `:star:` equivalent:** "Incident record created" — fires in 33/35 Rumours transcripts.
- **🔧 Org-sensitive:** Some orgs mandate formal incident declaration with specific fields; others treat it as optional or informal. The expectation for *when* to declare (immediately vs. after initial scoping) also varies.

### L2. Assigns appropriate severity  🔧

- **What to look for:** The severity level in the incident record reflects the actual scope and business impact of the issue, not just the urgency of the reporter. Participant assigns severity based on evidence of impact rather than the loudness of whoever reported the problem.
- **Text observability:** High — severity is explicit in the incident record text.
- **Example from Rumours:** Dylan correctly assessed SEV-3 (one user, no customer impact). Jack assessed SEV-5 with detailed rationale. Elsa and Gowtham both initially assigned SEV-1/P1 based on the CTO's urgency, not the actual impact scope. Elsa later walked it back; Gowtham did not.
- **Existing `:star:` equivalent:** "Formally assign criticality level to the incident" — fires in 26/35 Rumours transcripts.
- **🔧 Org-sensitive:** Severity scales, definitions, and the processes triggered by each level vary significantly across organisations. What counts as "appropriate" depends on the org's severity matrix. Some orgs prefer to over-classify and downgrade; others expect precise initial classification.

### L3. Takes explicit ownership of the response

- **What to look for:** Participant clearly positions themselves as the person driving the response — not just participating. Visible through directing others, making explicit decisions, and using "I"/"we" statements about the response plan rather than reactively answering whoever pings them.
- **Text observability:** Medium — visible through directing others, making decisions, using "I" statements about the response plan.
- **Example from Rumours:** Jack: "We're still investigating the cause… bear with us. Sorry for putting the pressure on you." Elsa: "I raised it" / "looking at this now." Gowtham was more passive — responding to prompts from NPCs rather than directing.
- **Existing `:star:` equivalent:** "Take command" — fires in only 2/35 Rumours transcripts.

### L4. Manages stakeholder pressure without derailing investigation

- **What to look for:** When stakeholders apply pressure (demanding updates, asserting severity, pushing for premature action), the participant acknowledges the pressure without abandoning their systematic approach. They neither capitulate to the pressure nor ignore the stakeholder.
- **Text observability:** Medium — visible in how the participant responds to pressure messages.
- **Example from Rumours:** Jack to Tinus: "I think we're close, bear with us. Sorry for putting the pressure on you." Chandan provides structured updates to Bez while continuing investigation. Gowtham tells Bez "we are fixing the issue" repeatedly but this doesn't satisfy because it lacks substance. Elsa tells Hamed "I don't think it's quite a P1" — good reassessment under pressure.
- **Existing `:star:` equivalent:** None directly.

### L5. Reassesses severity as new information emerges

- **What to look for:** Participant updates their assessment of severity/scope when evidence suggests the initial assessment was wrong. Includes both upgrades (when impact turns out larger than first thought) and downgrades (when scope turns out narrower).
- **Text observability:** High — visible when participant explicitly changes severity or states the issue is less/more severe than initially thought.
- **Example from Rumours:** Elsa: "Hi Hamed — I dont think its quite a p1." Dylan: "Since we've had no further reports I would think this is just the one user" → creates incident at SEV-3. Gowtham never reassesses and creates a *second* SEV-1 incident record late in the drill.
- **Existing `:star:` equivalent:** Partially covered by "Qualify the problem" (12/35 Rumours transcripts).

---

## Coordination

### C1. Asks clarifying questions before acting

- **What to look for:** Participant's first actions after the incident report are questions (gathering information, scoping, verifying the report) rather than jumping straight to remediation.
- **Text observability:** High — the first participant messages after drill start are clearly visible.
- **Example from Rumours:** Dylan's first message: "Hmm — I can't replicate this from my end, is anyone else able to?" Jack: "Looks like it's not finding the product, Shay let me know what you find out." Chandan: "Tinus to confirm, the demo you were giving to the board was on the production environment?" Gowtham's first substantive message: "sev 1" (action, not question).
- **Existing `:star:` equivalent:** "Asking questions to validate impact of the problem" — 30/35 Rumours transcripts.

### C2. Attempts to reproduce the issue

- **What to look for:** Participant tries to replicate the reported problem themselves and/or asks others to try. The reproduction attempt is treated as an information-gathering step rather than an afterthought.
- **Text observability:** High — explicit in messages like "I tried to reproduce" or "could someone else test."
- **Example from Rumours:** Near-universal. All six players attempted reproduction. Chandan: "Let me see if I replicate the issue." Elsa: "I have checked and I can add the aviators to my basket — could someone else test please?"
- **Existing `:star:` equivalent:** "Attempt to replicate the issue" (33/35) and "Reproduces the incident" (23/35) Rumours transcripts.

### C3. Checks for recent changes

- **What to look for:** Participant asks about or reviews recent deployments/changes/configuration updates to the platform as part of scoping the problem.
- **Text observability:** High — explicit questions like "any recent changes?" or reviewing the change log link.
- **Example from Rumours:** Dylan: "Daniel are you able to check if there was any changes this morning?" Elsa: "Has anyone made any recent changes?" Gowtham: "any code changes today" (later than others). Marcin asks about changes but doesn't take this line of investigation far.
- **Existing `:star:` equivalent:** "Check changes done to the platform" (14/35) and "Reviewed changes" (12/35) Rumours transcripts.

### C4. Delegates tasks to specific people

- **What to look for:** Participant assigns specific investigation tasks to specific named team members (via @mentions or direct asks), rather than broadcasting general requests to the channel and hoping someone picks them up.
- **Text observability:** High — visible through @mentions and direct asks.
- **Example from Rumours:** Jack: "Shay can you work with Daniel to confirm if we can roll back…" / "Tanya are you able to have a look at the Product database…" Dylan: "Daniel are you able to check…" / "Tanya Could you check the logs…" Gowtham: "Shay pls we have logs" (vaguer). Marcin: "Daniel Maya Tanya can you check…" (bulk delegation, less specific).
- **Existing `:star:` equivalent:** "Form an effective investigation team" — 8/35 Rumours transcripts.

### C5. Asks about customer/business impact

- **What to look for:** Participant proactively asks about whether customers are experiencing the issue, checks customer-facing metrics, or asks about business impact — rather than treating the technical symptom as the only signal that matters.
- **Text observability:** High — explicit questions to business-side roles or references to metrics/reports.
- **Example from Rumours:** Dylan: "Bob do we have any customer reports of issues like the above?" Jack: "Bob Are we hearing anything from customers trying to purchase that they can't add things to the basket?" Gowtham: "Bob can you pls lets know customers facing issue" (later, after prompting).
- **Existing `:star:` equivalent:** "Asking questions to validate impact of the problem" (30/35) and "Use metrics as evidence" (6/35) Rumours transcripts.

### C6. Runs parallel investigation threads

- **What to look for:** Participant has multiple team members investigating different hypotheses simultaneously rather than pursuing one thread at a time. Visible through delegating multiple distinct tasks in quick succession.
- **Text observability:** Medium — visible when participant assigns tasks to multiple people in quick succession with different objectives.
- **Example from Rumours:** Jack delegates simultaneously: Shay (reproduce), Daniel (check changes), Bob (customer reports), Tanya (product database). Dylan similarly runs parallel threads. Gowtham works more sequentially — one thread at a time, waiting for results before starting the next.
- **Existing `:star:` equivalent:** None directly (partially captured by "Form an effective investigation team").

### C7. Escalates when stuck  🔧

- **What to look for:** Participant brings in additional resources (e.g., a senior engineer, on-call escalation, subject-matter expert) when the existing team can't make progress. Quality of the escalation — whether sufficient context is handed over with the ask — matters as much as the timing.
- **Text observability:** High — visible through explicit @mentions of people not yet involved.
- **Example from Rumours:** Chandan: "Hamed S need your help on this please" with clear briefing of context. Gowtham: "Daniel Hamed S can you pls look into issue" (less context).
- **Existing `:star:` equivalent:** "Escalating when required" — 8/35 Rumours transcripts.
- **🔧 Org-sensitive:** Escalation paths, thresholds for when to escalate, and who to escalate to vary by org. Some have formal on-call chains; others expect the IC to use judgement. The quality of the escalation (context provided, clarity of ask) is more universal than the timing.

---

## Mindset

### M1. Prioritises restoration over root cause  🔧

- **What to look for:** Participant focuses on getting the service working again (e.g., suggesting a rollback, workaround, or mitigation) before fully understanding why it broke. The marker is about whether the participant treats restoration as the primary near-term goal, not whether they happen to find the root cause.
- **Text observability:** High — visible through explicit suggestions of rollbacks, workarounds, or quick fixes.
- **Example from Rumours:** Chandan: "can you roll back this" early in investigation. Gowtham tries three rollbacks. Jack asks for rollback but also continues investigation in parallel. Elsa suggests "clearing your browser cached creds" — a workaround approach.
- **Existing `:star:` equivalent:** "Restoration over root cause analysis" — 10/35 Rumours transcripts.
- **🔧 Org-sensitive:** Some orgs strongly prefer "restore first, investigate later"; others (especially those with complex interdependencies) want root cause understood before making changes. The balance between speed of restoration and confidence in the fix is org-dependent.

### M2. Forms and tests working hypotheses

- **What to look for:** Participant articulates a theory about what might be happening and then proposes a way to test it. Hypothesis and test are linked rather than acting before forming a theory or theorising without acting.
- **Text observability:** Medium — sometimes explicit ("I think X, let's test by doing Y") but sometimes implicit in the sequence of actions.
- **Example from Rumours:** Jack: "none of those services sound like ones that would have an impact, but there is a banner for a discount appearing in the screenshot that's not there when I check" — observed discrepancy, formed hypothesis. Dylan: noticed product ID mismatch (OLJCESPC7D vs OLJCESPC7Z) — analytical hypothesis. Gowtham: tried rollbacks without articulating a hypothesis first.
- **Existing `:star:` equivalent:** "Form a working theory" — 6/35 Rumours transcripts.

### M3. Uses evidence to narrow the scope

- **What to look for:** Participant uses available data (customer reports, metrics, reproduction attempts, log checks) to systematically narrow what the problem is and isn't. Visible through synthesis statements that combine multiple pieces of evidence into a tighter scope.
- **Text observability:** Medium — visible through synthesis statements like "so it's only affecting one user" or "this rules out X."
- **Example from Rumours:** Dylan: "Since we've had no further reports I would think this is just the one user." Elsa: "ok so this appears to be an issue only for a few." Jack: "there's something erroring but nothing consistent." Gowtham doesn't synthesise evidence — jumps to rollback actions instead.
- **Existing `:star:` equivalent:** "Qualify the problem" (12/35) and "Facts over opinion" (6/35) Rumours transcripts.

### M4. Considers potential consequences before taking action

- **What to look for:** Participant considers whether a proposed action (e.g., rollback, restart, config change) could make things worse before executing it. Visible through "is it safe to…?" checks or weighing of side effects with the team.
- **Text observability:** Medium — visible when participant asks "is it safe to roll back?" or considers side effects.
- **Example from Rumours:** Jack: "Daniel rollback the change now please" but only after confirming with Shay it's safe. Gowtham rolls back three changes in succession without checking whether they're related to the issue. Chandan rolls back but Hamed warns "this issue doesn't seem to be change related."
- **Existing `:star:` equivalent:** None directly.

### M5. Adapts approach when initial path isn't working

- **What to look for:** Participant changes strategy when evidence suggests their current approach is wrong — abandons a failing line of investigation, considers alternative hypotheses, or reframes the problem rather than doubling down on a path that isn't producing results.
- **Text observability:** Medium — visible through explicit pivot statements or abandoning one line of investigation for another.
- **Example from Rumours:** Elsa: initially declares P1, then reassesses. Gowtham: rolls back three changes, all fail, but doesn't pivot to alternative hypotheses until prompted by Hamed. Jack: rollback fails, immediately considers "Is there a chance the board meeting is somehow reaching the test site?"
- **Existing `:star:` equivalent:** None directly.

---

## Communication

### K1. Sends first business communication within 5 minutes  🔧

- **What to look for:** Participant posts to a business/stakeholder communication channel promptly after the drill starts (default threshold: within 5 minutes). The principle is early stakeholder communication; the specific threshold is a starting point that should be tuned to org SLAs.
- **Text observability:** High — timestamps and channel are explicit.
- **Example from Rumours:** Elsa: incident created in business-comms at 15:08:50 (35 seconds after drill start — very fast). Gowtham: 15:06:32 (~1.5 min). Chandan: business-comms at 14:24:00 (~9 min — late). Dylan: business-comms at 15:10:31 (~6 min — borderline). Jack: business-comms at 10:13:09 (~5.5 min — borderline). Marcin: business-comms at 13:15:08 — *after* resolution.
- **Existing `:star:` equivalent:** "Send first comms in first 5 minutes" — 30/35 Rumours transcripts.
- **🔧 Org-sensitive:** The "5 minutes" threshold is a reasonable default but orgs have different SLAs for initial communication. Some mandate updates within 2-3 minutes for high-severity incidents; others are more relaxed. The principle (communicate early) is universal; the specific timing threshold is org-dependent.

### K2. Provides substantive updates to business stakeholders  🔧

- **What to look for:** Business-comms messages contain useful information (what the issue is, who's affected, what's being done, when the next update is expected) rather than vague reassurances such as "we're working on it." A fast-but-empty update is not a substantive update.
- **Text observability:** High — the content of business-comms messages is directly readable.
- **Example from Rumours:** Chandan sends structured ITIL-style updates: "Impact Description: Starting at 14:13 UTC… Latest Update: Team is investigating… Next Update: 14:40 UTC." Jack: "We've got an incident but at the moment it seems to only be affecting the one user — no further customer reports of issues." Gowtham: "we are fixing the issue" / "one of the product is not available" — vague, gets pushback from Bez.
- **Existing `:star:` equivalent:** "Send regular business comms" — 2/35 Rumours transcripts.
- **🔧 Org-sensitive:** Communication format expectations vary widely. Some orgs expect structured templates (incident number, impact, next update time — ITIL style). Others prefer brief, conversational updates. The principle (substantive over vague) is universal; what "substantive" looks like in practice is org-dependent.

### K3. Responds to stakeholder requests for updates

- **What to look for:** When stakeholders ask for an update, the participant responds promptly and substantively rather than going silent, deflecting, or repeating thin reassurances.
- **Text observability:** High — both the request and the response are visible in the transcript.
- **Example from Rumours:** Gowtham: Bez asks repeatedly ("update please?" / "I need updates" / "This is not acceptable") — Gowtham's responses are slow and thin. Jack: Bez asks "Are we making any progress?" — Jack responds with current status. Chandan: responds to Bez requests but sometimes with thin content.
- **Existing `:star:` equivalent:** `:bulb:` "keep the business informed regularly" appears as a hint in 3/35 Rumours transcripts (suggesting 3 players were slow to do this).

### K4. Communicates issue scope clearly to the technical team

- **What to look for:** Participant shares their working understanding of the problem with the technical channel — what they know, what they don't know, what's been ruled out. Synthesis messages, not just question/answer exchanges.
- **Text observability:** High — visible in synthesis messages to the technical channel.
- **Example from Rumours:** Dylan: "Alright, so there's something erroring but nothing consistent." Jack: "none of those services sound like ones that would have an impact." Elsa: "it must be an external issue… a local issue to individual devices." Gowtham: minimal synthesis — mostly asks questions without summarising what's been established.
- **Existing `:star:` equivalent:** None directly.

### K5. Confirms resolution with stakeholders

- **What to look for:** After the issue is resolved, the participant communicates the resolution to the business/stakeholder channel — closing the loop rather than letting the incident trail off.
- **Text observability:** High — visible in post-resolution business-comms messages.
- **Example from Rumours:** Elsa: "we have sorted it — he just had to clear his cache — we can close the incident." Jack: "The cause of the issue has been found at this time and is no longer occurring." Gowtham: "issue is resolved" (minimal).
- **Existing `:star:` equivalent:** "Confirm resolution with the business" — 8/35 Rumours transcripts.

### K6. Includes incident description in the incident record  🔧

- **What to look for:** The incident record created via `/incident` includes a meaningful description of the issue (impact, who's affected, what's being investigated) — not just a severity level. Enough context that someone arriving late to the incident can orient themselves.
- **Text observability:** High — the incident record text is logged explicitly.
- **Example from Rumours:** Jack: "Sev-5 We're currently investigating an issue where some users are unable to add items to their basket, this doesn't look to be widespread at this time and we're continuing to investigate the cause." Gowtham: "sev 1" (severity only, no description). Chandan: "SEV1 500 error we are investigating" (brief but present).
- **Existing `:star:` equivalent:** Partially covered by "Incident record created" but that marker doesn't assess quality.
- **🔧 Org-sensitive:** What's expected in an incident record varies — some orgs have mandatory fields (impact, affected systems, customer-facing?); others just want a brief description. The principle (include enough context for someone arriving late to understand the situation) is universal.
