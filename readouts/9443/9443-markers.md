---

# Markers Analysis — 9443

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "So i am telling to restart it" / "I give the go ahead" / "Will take responsibility"

**Rationale:**
The participant eventually takes explicit ownership of the restart decision and accepts responsibility for the outcome. However, this came only after extended back-and-forth trying to get Bez, Tinus, or Hamed to approve, and after the NPC explicitly stated "whoever's running the incident would need to take responsibility." The ownership was real but required significant prompting and came late in the process.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "Hello @bob , what complaints are you getting? Can you be specific" / "How many customers are blocked from checking out? What's the revenue loss per minute right now?"

**Rationale:**
The participant's first moves after Bob's opening are clarifying questions — asking for specifics about the complaints and quantifying impact. They also later ask "@bob is this a complete checkout outage? or are some transactions going through?" to scope the issue. These are solid scope-validating questions before taking action, meeting the novice expectation.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "can i get the change chart @shay" / "@tanya lets start with rollbacking your change" / "@daniel you need to rollback your change as well"

**Rationale:**
The participant asks for the change log early, which is good. However, they then proceed to roll back multiple changes (Tanya's, Daniel's) without articulating a mechanism connecting those changes to the symptom. Shay explicitly noted "none of these changes look like they'd break checkout end to end like this," yet the participant still ordered rollbacks. They asked the question but didn't use the answer to eliminate candidates — they used it as a rollback queue.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@daniel I can see a change on checkoutService, 25 mins ago, can you investigate the logs" / "@tanya This is a P1 incident, Youll have to drop whatever you are doing" / "@tanya Can you team up with @Daniel and add the second certi as well"

**Rationale:**
The participant consistently names specific people for specific tasks throughout the drill. They direct Daniel to check logs, Tanya to review platform-side issues, and pair them together for the cert fix. The routing generally reflects understanding of access boundaries (Tanya for platform/cert, Daniel for app-side). Some tasks are vague ("Check all the changes and flag if anything suspicious"), but overall delegation is specific and named.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "@daniel and @shay meanwhile check if you can do something from your end"

**Rationale:**
The participant mostly works sequentially — asking one person to check something, waiting for results, then moving to the next step. The instruction to Daniel and Shay to "check if you can do something from your end" while waiting for Tanya is a parallel thread attempt, but it's vague and reactive rather than proactive. There's limited evidence of deliberately fanning out multiple distinct investigation threads simultaneously with clear, differentiated tasks.

---

## C7 — Escalates when stuck

**Rating:** 2

**Evidence:**
> "@hamed Id like you to take a lead on this" / "@tinus Can you approve Tanya leaving the maintenance session" / "@bez Need your approval here" / "@tanya Can you try and reach Tinus for this approval"

**Rationale:**
The participant attempts escalation multiple times but does so without strong context or fallback plans. When Hamed and Tinus auto-reply, the participant cycles through multiple people (Bez, Tanya) asking them to reach Tinus or approve the restart, rather than quickly accepting the chain is exhausted and taking ownership. The escalation lacks concrete framing of what's blocked and why. It took significant NPC prompting ("whoever's running the incident would need to take responsibility") before the participant moved forward.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "This looks like an external DNS failure, @tanya do you know any POC to handle this?" / "it looks like some change related to timeout"

**Rationale:**
The participant forms some implicit hypotheses (DNS failure, timeout change) but doesn't articulate them clearly or propose structured tests. The DNS hypothesis is stated but quickly disproven by Tanya's probe. The timeout hypothesis is vague. The participant doesn't explicitly name hypotheses and link them to tests — they tend to react to NPC findings rather than driving hypothesis-test cycles. They never articulate a mechanism connecting proposed causes to symptoms before acting.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "Can we summarize the issue, what is the error we can see across?" / "the certificate is expired?" / "What can be done here? it looks like a certiifcate is missing?"

**Rationale:**
The participant asks for summaries and acknowledges findings (expired cert, missing cert in bundle) but rarely synthesizes evidence themselves to narrow scope. Most narrowing is done by NPCs (Daniel: "All errors are coming from PaymentService trying to reach the gateway"; Tanya: "It's not DNS or network"). The participant's "Can we summarize the issue" is a request for others to synthesize rather than doing it themselves. They don't explicitly rule things out or name what's been eliminated.

---

## M4 — Considers potential consequences before acting

**Rating:** 1

**Evidence:**
> "@tanya lets start with rollbacking your change" / "do it" / "fix it" / "immediatelt"

**Rationale:**
The participant consistently issues action commands without considering potential consequences. Rollbacks are ordered without asking "is it safe?" or considering side effects. The restart is ordered without checking the bundle state on disk first. Commands like "do it," "fix it," and "immediatelt" show urgency without consequence-weighing. There's no evidence of the participant asking whether an action could make things worse or anticipating secondary failure modes.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 2

**Evidence:**
> "This looks like an external DNS failure, @tanya do you know any POC to handle this?" (after rollbacks failed) / "@tanya and @daniel try checking out Hameds changes as well" (after restart failed)

**Rationale:**
After rollbacks fail, the participant does shift to DNS/platform investigation, showing some adaptation. However, after the first restart fails, the participant's next move is to check Hamed's changes and ask to review all changes again — returning to the change-review approach that had already been exhausted. They don't recognize the structurally different error (chain verification vs. expiry) themselves; the NPCs (Tanya and Daniel) identify the bundle issue. The participant follows NPC leads rather than reframing the problem independently.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 1

**Evidence:**
> "not yet, forming an investigating tesm" / "all our checkouts are falining" / "Since the reload didn't work, a full restart is our next option."

**Rationale:**
The participant's communications to Bez are minimal and lack business framing. "Not yet, forming an investigating team" and "all our checkouts are failing" provide no scope quantification, no working theory, no ETA, and no committed next-update time. The most substantive message to Bez is about needing approval for the restart, which is a request rather than a stakeholder update. There are no proactive business-framed updates throughout the drill.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 2

**Evidence:**
> "Can we summarize the issue, what is the error we can see across?" / "the certificate is expired?" / "What can be done here? it looks like a certiifcate is missing?"

**Rationale:**
The participant rarely posts synthesis statements to orient the technical team. Instead of summarizing what's known and what's been ruled out, they ask the team to summarize for them ("Can we summarize the issue"). Their statements tend to be questions or brief acknowledgments rather than orienting synthesis. The team receives directives ("check this," "fix it") but not a shared picture of the investigation state. The NPCs do most of the scope communication themselves.

---

## Score Summary

| Marker | Rating |
|--------|--------|
| L3 — Takes explicit ownership | 3 |
| C1 — Asks clarifying questions before acting | 3 |
| C3 — Checks for recent changes | 2 |
| C4 — Delegates tasks to specific people | 3 |
| C6 — Runs parallel investigation threads | 2 |
| C7 — Escalates when stuck | 2 |
| M2 — Forms and tests working hypotheses | 2 |
| M3 — Uses evidence to narrow the scope | 2 |
| M4 — Considers potential consequences before acting | 1 |
| M5 — Adapts approach when initial path isn't working | 2 |
| K2 — Provides substantive updates to business stakeholders | 1 |
| K4 — Communicates issue scope clearly to the technical team | 2 |
| **Mean Marker Score** | **2.08** |

---

## Caveats
- L3 rating of 3 is a borderline call. The participant did eventually take ownership ("Will take responsibility"), but only after extended attempts to defer and after explicit NPC prompting about the escalation process. A case could be made for 2, but the explicit "Will take responsibility" statement meets the tier-3 threshold of making the override call when the approval chain is exhausted.
- C7 rating of 2 reflects that while the participant attempted escalation multiple times, the quality was low (no context, no fallback plan, cycling through people without adapting the ask), and resolution only came after NPC guidance.
- Anti-outcome-bias note: The participant reached resolution, but this was largely driven by NPC findings and guidance rather than participant-driven investigation. Ratings reflect process quality, not outcome.

---