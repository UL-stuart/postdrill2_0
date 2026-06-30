---

# Markers Analysis — 9427

## L3 — Takes explicit ownership of the response

**Rating:** 3

**Evidence:**
> "i will face conequence should there be any issues"

**Rationale:**
The participant eventually takes explicit ownership of the restart decision when both approvers are unavailable, stating they will face consequences. However, this came late in the drill after extended attempts to get someone else to approve. Earlier in the drill, the participant was more reactive than directive, but they did ultimately make the override call themselves.

---

## C1 — Asks clarifying questions before acting

**Rating:** 3

**Evidence:**
> "hello what are the complaints we are seeing?"

**Rationale:**
The participant's first action after Bob's alert is a clarifying question about the nature of the complaints. They also later ask "@bob are any transactions going through?" and "@bob when did the complaints start coming in does this line up with @tanya's work?" These are scope-validating questions before taking remediation action. They gather information before declaring the incident or ordering changes.

---

## C3 — Checks for recent changes

**Rating:** 2

**Evidence:**
> "@shay can we get list of all recent changes"

**Rationale:**
The participant asks for the change log, which is good. However, after receiving it — with Shay explicitly noting "none of these look like they'd break checkout end-to-end" — the participant proceeds to ask Daniel to review and roll back his checkout changes anyway, without articulating a mechanism connecting them to the symptom. They asked the question but didn't effectively use the answer as a candidate-elimination pass.

---

## C4 — Delegates tasks to specific people

**Rating:** 3

**Evidence:**
> "@shay can we get list of all recent changes" / "@daniel please review your checkout changes to be sage" / "@tanya please come back to the chat" / "@shay please help daniel deep dive on app with highest error rate"

**Rationale:**
The participant consistently uses @mentions to assign specific tasks to specific people. They route platform questions to Tanya, app-side checks to Daniel, and change-log review to Shay. While not always perfectly matched to access boundaries (e.g., asking Shay to restart when only Tanya can), the delegation is generally targeted and named.

---

## C6 — Runs parallel investigation threads

**Rating:** 2

**Evidence:**
> "@tanya the work @shay is referring to can we get an update on this?" followed later by "@daniel please review your checkout changes"

**Rationale:**
The participant mostly works sequentially — asking one question, waiting for a response, then moving to the next thread. While there are occasional moments of multiple asks in proximity, the overall pattern is serial investigation rather than deliberate parallel threads. They don't fan out multiple distinct tasks simultaneously in the way a tier 3+ participant would.

---

## C7 — Escalates when stuck

**Rating:** 2

**Evidence:**
> "@tinus URGENT - can we get approval for restarting payment service" / "@bez as @tinus is with you at the fireside can you please ask him to sign off on this as it is urgent"

**Rationale:**
The participant attempts escalation through multiple channels (Tinus, Hamed, Bez), which shows awareness of the need to escalate. However, the escalation is prolonged and somewhat passive — they repeatedly ask Bez for approval despite Bez stating it's not in their remit, and they spend significant time cycling through unavailable approvers before finally making the override call themselves. The escalation lacks the decisive quality of a tier 3 response.

---

## M2 — Forms and tests working hypotheses

**Rating:** 2

**Evidence:**
> "was confirmed issues started before maintance started" / "@tanya are you certain the maintenance is not related"

**Rationale:**
The participant partially engages with hypothesis testing. They note the timing mismatch between email maintenance and complaints, which should eliminate the email hypothesis. However, they repeatedly return to asking Tanya about the maintenance even after it's been disconfirmed multiple times. They don't explicitly articulate hypotheses or propose clear tests — they mostly ask others to check things without framing what they're testing or why.

---

## M3 — Uses evidence to narrow the scope

**Rating:** 2

**Evidence:**
> "was confirmed issues started before maintance started" / "@bob are complaints still global?"

**Rationale:**
The participant occasionally uses evidence to narrow scope — noting the timing mismatch with email maintenance and confirming global impact. However, they don't produce synthesis statements that combine multiple pieces of evidence into a tighter scope. They continue pursuing the email maintenance thread long after evidence should have eliminated it, and they don't articulate what's been ruled out to focus the team.

---

## M4 — Considers potential consequences before acting

**Rating:** 2

**Evidence:**
> "i will face conequence should there be any issues"

**Rationale:**
The participant acknowledges potential consequences of the restart override, which shows some awareness. However, this comes only at the final override moment. Earlier actions (rollbacks of Daniel's changes, pulling Tanya off the vendor call) are executed without any "is it safe?" checks or consideration of side effects. The consequence consideration is limited to one moment rather than a consistent pattern.

---

## M5 — Adapts approach when initial path isn't working

**Rating:** 2

**Evidence:**
> "@tanya is there anything else we can restart" / "any config issue @tanya"

**Rationale:**
After the first restart fails, the participant doesn't clearly reframe the problem or recognize the structurally different error. They ask generic questions ("anything else we can restart?", "any config issue?") rather than engaging with the new failure mode (chain verification vs. expiry). The pivot to the bundle fix comes from Tanya and Daniel's investigation rather than from the participant recognizing the new error pattern. They do eventually follow the team's lead, but don't drive the adaptation themselves.

---

## K2 — Provides substantive updates to business stakeholders

**Rating:** 2

**Evidence:**
> "Most likely the cert rotation last week. If the cert wasn't loaded right, handshake will fail before ClearBank. Going to try try reloading the payments service. The process is still running with the expired cert, so a restart would load the new one from disk."

**Rationale:**
The participant provides one substantive update to Bez with a working theory and proposed action. However, most communications to Bez are vague ("looking into this urgently", "we are still investigating", "once we have information i will let you know"). They don't quantify business impact in their updates, don't commit to next-update times consistently, and repeatedly deflect Bez's requests for specifics. The one good update is the exception rather than the pattern.

---

## K4 — Communicates issue scope clearly to the technical team

**Rating:** 1

**Evidence:**
> "do we have any more leads here" / "we need to find the root cause" / "@daniel @tanya please check all possible platforms"

**Rationale:**
The participant rarely synthesizes the current state of knowledge for the technical team. They don't post messages that summarize what's been ruled out or what the current working theory is. Instead, they ask generic questions ("any more leads?", "check all possible platforms") without orienting the team on what's known. The technical team drives its own investigation while the participant mostly asks for updates rather than providing synthesis.

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
| M4 — Considers potential consequences before acting | 2 |
| M5 — Adapts approach when initial path isn't working | 2 |
| K2 — Provides substantive updates to business stakeholders | 2 |
| K4 — Communicates issue scope clearly to the technical team | 1 |
| **Mean Marker Score** | **2.17** |

---

## Caveats
- L3 rating is a borderline 2/3 call. The participant did eventually make the override call and accept consequences ("i will face conequence should there be any issues"), which meets the tier 3 threshold, but the extended delay and repeated attempts to get others to approve weakens the ownership signal. Rated 3 because the explicit acceptance of consequences is present.
- K2 has one substantive update that could push toward a 3, but the overall pattern of vague responses to Bez ("we are still investigating" repeated multiple times) keeps it at 2.
- The participant's typos and brief messages make it harder to infer intent; ratings are based on what was actually communicated rather than what may have been intended.

---