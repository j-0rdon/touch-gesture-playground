# Agent Orchestration Plan for Strategic Insights Research

**Purpose:** Design and coordinate parallel sub-agents to execute the Strategic Insights Discovery Plan efficiently.

**Version:** 2.0 (Reliability Update)
**Date:** 17 December 2025
**Key Change:** File-first architecture — agents write findings to disk before returning, preventing data loss on orchestrator context crash.

---

## 1. Research Plan Analysis

### 1.1 Task Inventory

The research plan contains **6 major sections** with **17 discrete research tasks**:

| Section | Tasks | Research Type |
|---------|-------|---------------|
| 1. Pattern Analysis | 3 | Internal operations |
| 2. Guest Experience Chain | 3 | Customer journey |
| 3. Role Relationship Analysis | 3 | Staff dynamics |
| 4. Market & Competitive Lens | 3 | External market |
| 5. Synthesis Methods | 3 | Analysis/combination |
| 6. Validation Approach | 2 | Framework/meta |

### 1.2 Domain Classification

**Primary Research Domains:**

1. **Restaurant Operations** — How venues function day-to-day
   - Staff struggles and pain points
   - Information flow between roles
   - Peak-time pressure dynamics

2. **Guest Experience** — Customer journey and expectations
   - Booking-to-departure lifecycle
   - Trust signals and loyalty drivers
   - Recovery when things go wrong

3. **Staff Role Dynamics** — Inter-role dependencies
   - Reservationist → Host → Server chain
   - Handoff quality and information loss
   - Competing incentives between roles

4. **Competitive Landscape** — Market positioning
   - OpenTable, Resy, SevenRooms capabilities
   - Segment-specific needs (fine dining vs casual)
   - Switching triggers and vendor selection

---

## 2. Dependency Mapping

### 2.1 Dependency Graph

```
                    ┌─────────────────────────────────────────────────┐
                    │           PHASE 1: PARALLEL RESEARCH            │
                    │                                                 │
     ┌──────────┐   │   ┌──────────┐  ┌──────────┐  ┌──────────┐     │
     │ Section 1│   │   │ Section 2│  │ Section 3│  │ Section 4│     │
     │ Pattern  │   │   │ Guest    │  │ Role     │  │ Market   │     │
     │ Analysis │   │   │ Journey  │  │ Relations│  │ Research │     │
     └────┬─────┘   │   └────┬─────┘  └────┬─────┘  └────┬─────┘     │
          │         │        │             │             │           │
          └─────────│────────┴─────────────┴─────────────┘           │
                    │                   │                             │
                    └───────────────────┼─────────────────────────────┘
                                        │
                                        ▼
                    ┌─────────────────────────────────────────────────┐
                    │           PHASE 2: SYNTHESIS                    │
                    │                                                 │
                    │              ┌──────────┐                       │
                    │              │ Section 5│                       │
                    │              │ Synthesis│                       │
                    │              └────┬─────┘                       │
                    │                   │                             │
                    └───────────────────┼─────────────────────────────┘
                                        │
                                        ▼
                    ┌─────────────────────────────────────────────────┐
                    │           PHASE 3: VALIDATION FRAMEWORK         │
                    │                                                 │
                    │              ┌──────────┐                       │
                    │              │ Section 6│                       │
                    │              │Validation│                       │
                    │              └──────────┘                       │
                    │                                                 │
                    └─────────────────────────────────────────────────┘
```

### 2.2 Within-Section Dependencies

**Section 1: Pattern Analysis**
```
1.1 Struggling Moments ──→ 1.2 Information Flow ──→ 1.3 Key Moments Overlap
    (clustering)              (mapping)               (timeline synthesis)
```
- 1.1 is foundational — identifies what breaks
- 1.2 traces how information degrades
- 1.3 requires both to map temporal overlaps

**Section 2: Guest Experience Chain**
```
2.1 Journey Mapping ──→ 2.2 Trust Model ──→ 2.3 Recovery Opportunities
    (touchpoints)         (signals)           (interventions)
```
- 2.1 establishes the journey framework
- 2.2 layers trust dynamics onto journey
- 2.3 identifies where to intervene

**Section 3: Role Relationships**
```
3.1 Dependency Mapping ──→ 3.2 Handoff Quality ──→ 3.3 Misaligned Incentives
    (who needs whom)         (information loss)      (competing goals)
```
- 3.1 maps the relationship structure
- 3.2 examines handoff quality within that structure
- 3.3 explains why handoffs fail (incentive conflicts)

**Section 4: Market & Competitive**
```
4.1 Segment Needs ──→ 4.2 Positioning Gaps ──→ 4.3 Switching Triggers
    (what matters)       (whitespace)            (why they move)
```
- 4.1 segments the market
- 4.2 finds gaps relative to segments
- 4.3 identifies catalysts for change

### 2.3 Cross-Section Dependencies

| From | To | Dependency Type |
|------|-----|-----------------|
| All Sections 1-4 | Section 5 | **Hard** — Synthesis requires all inputs |
| Section 5 | Section 6 | **Soft** — Validation framework can be drafted earlier |
| Section 1.1 | Section 3.2 | **Informational** — Struggles inform handoff analysis |
| Section 2.1 | Section 3.1 | **Informational** — Journey informs role dependencies |
| Section 4.2 | Section 5.3 | **Informational** — Positioning gaps inform hypotheses |

---

## 3. Agent Design Decisions

### 3.1 Architecture Choice: Orchestrator-Worker Pattern

Based on Anthropic's [multi-agent research system documentation](https://www.anthropic.com/engineering/multi-agent-research-system), using:
- **Orchestrator** (me): Coordinates agents, manages dependencies, synthesises results
- **Workers** (sub-agents): Specialised research agents running in parallel

**Rationale:**
- Maximises parallelisation for data gathering
- Keeps synthesis centralised for coherence
- Allows dynamic adjustment based on findings

### 3.2 Agent Design: Domain-Specialised Workers

Rather than one agent per section (which would require sequential within-section work), I'm designing **4 domain-expert agents** that can work through their entire domain in parallel:

| Agent | Domain | Sections Covered | Model |
|-------|--------|------------------|-------|
| **ops-researcher** | Restaurant Operations | 1.1, 1.2, 1.3 | sonnet |
| **cx-researcher** | Customer Experience | 2.1, 2.2, 2.3 | sonnet |
| **roles-researcher** | Staff Role Dynamics | 3.1, 3.2, 3.3 | sonnet |
| **market-researcher** | Competitive Intelligence | 4.1, 4.2, 4.3 | sonnet |

**Why Sonnet for all?** Research tasks require reasoning about complex information, evaluating source quality, and synthesising findings — capabilities where Sonnet excels over Haiku.

### 3.3 Agent Responsibilities

**Each agent will:**
1. Conduct web research on their domain
2. Gather evidence from multiple sources
3. Structure findings according to the research plan outputs
4. Flag confidence levels (High/Medium/Low)
5. Note validation suggestions

**Each agent will NOT:**
1. Attempt synthesis across domains (orchestrator's job)
2. Make strategic recommendations (Phase 2)
3. Access local files (web research only)

### 3.4 Output Format Specification

All agents will produce structured markdown with:

```markdown
# [Section Name] Research Findings

## Executive Summary
[3-5 bullet points of key findings]

## Detailed Findings

### [Subsection 1]
**Finding:** [What was discovered]
**Evidence:** [Sources and data]
**Confidence:** High/Medium/Low
**Validation Needed:** [What would strengthen this]

### [Subsection 2]
...

## Sources
- [Source 1](url)
- [Source 2](url)
...
```

---

## 4. Execution Strategy

### 4.0 CRITICAL: Reliability Architecture

**Problem from previous attempt:** Agents ran, but orchestrator context crashed before consuming results. All research was lost.

**Solution: File-First Architecture**

```
┌──────────────────────────────────────────────────────────────────────┐
│  RELIABILITY PRINCIPLE: Files are the source of truth, not memory   │
│                                                                      │
│  1. Each agent WRITES findings to disk FIRST                         │
│  2. Orchestrator READS files (never relies on Task output)           │
│  3. Status file tracks completion state                              │
│  4. If orchestrator crashes → restart reads from files               │
└──────────────────────────────────────────────────────────────────────┘
```

**Agent Output Contract:**
- Each agent MUST write to their designated file in `findings/`
- File write is the PRIMARY deliverable (not Task return value)
- Agent confirms file write success before completing
- If agent crashes mid-write, file will be incomplete but recoverable

### 4.1 Phase 1: Parallel Research (4 agents simultaneously)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     PARALLEL EXECUTION                              │
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │    ops-     │  │    cx-      │  │   roles-    │  │  market-   │ │
│  │ researcher  │  │ researcher  │  │ researcher  │  │ researcher │ │
│  │   WRITES    │  │   WRITES    │  │   WRITES    │  │   WRITES   │ │
│  │     ↓       │  │     ↓       │  │     ↓       │  │     ↓      │ │
│  │ 01-pattern  │  │ 02-guest    │  │ 03-role     │  │ 04-market  │ │
│  │ -analysis.md│  │-experience.md│ │-relations.md│  │-competitive│ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │
│                                                                     │
│  Mode: run_in_background=true (prevents orchestrator blocking)      │
│  Expected duration: 10-15 minutes per agent                        │
└─────────────────────────────────────────────────────────────────────┘
```

**Launch Protocol:**
1. Launch all 4 agents in parallel with `run_in_background=true`
2. Orchestrator uses `TaskOutput` to poll for completion
3. Even if orchestrator crashes, files persist on disk

**Completion Verification:**
- Check file exists AND has expected structure
- If incomplete, can re-run individual agent

### 4.2 Phase 2: Synthesis (Sequential, orchestrator-led)

**After all Phase 1 files exist and are complete:**

1. Orchestrator READS files from disk:
   - `findings/01-pattern-analysis.md`
   - `findings/02-guest-experience.md`
   - `findings/03-role-relationships.md`
   - `findings/04-market-competitive.md`

2. Executes Section 5: Synthesis Methods
   - 5.1 Jobs Chain Construction
   - 5.2 Leverage Point Identification
   - 5.3 Strategic Hypothesis Generation

3. WRITES synthesised findings to `findings/05-synthesis.md`

**Why orchestrator, not agent?** Synthesis requires:
- Full context of all research findings
- Strategic judgement about priorities
- Coherent narrative across domains

### 4.3 Phase 3: Validation Framework (Sequential)

After synthesis file is written:
1. Apply Section 6 validation framework to each insight
2. Categorise by confidence level
3. Define validation methods
4. Assess risk if wrong
5. WRITE final report to `strategic-insights-report.md`

### 4.4 Recovery Protocol

**If orchestrator context crashes at any point:**

| State | Recovery Action |
|-------|-----------------|
| No files in `findings/` | Re-run Phase 1 from scratch |
| Some files present | Check completeness, re-run missing agents only |
| All 4 research files present | Skip Phase 1, proceed to Phase 2 synthesis |
| Synthesis file present | Skip to Phase 3 validation |
| All files complete | Deliver final report |

**Completeness Check:**
```bash
# Quick validation: each file should have "## Sources" section
grep -l "## Sources" findings/*.md | wc -l
# Should return 4 for Phase 1 complete, 5 for Phase 2 complete
```

---

## 5. Agent Prompts

### 5.1 Operations Researcher Prompt

```
You are a restaurant operations research specialist. Your task is to
research and WRITE comprehensive findings about how restaurant staff
struggle in their daily work.

═══════════════════════════════════════════════════════════════════════
CRITICAL: YOUR PRIMARY DELIVERABLE IS A FILE
You MUST use the Write tool to save your findings to:
/Users/jordonhughes/Code/Fox/product/research/strategic-insights/findings/01-pattern-analysis.md

Do NOT just return findings - you must WRITE THE FILE.
The orchestrator will read this file after you complete.
═══════════════════════════════════════════════════════════════════════

RESEARCH TASKS:

SECTION 1.1 - Struggling Moments Clustering
Research and gather data on:
- Common operational failures in restaurants (what breaks most often?)
- Cascade failures (how one role's struggle impacts another)
- High-frequency, high-severity operational problems
- Staff pain points during service
Output: Prioritised problem themes with evidence

SECTION 1.2 - Information Flow Mapping
Research and gather data on:
- How information moves between restaurant roles
- Reservationist → Host handoff quality
- Host → Server communication patterns
- How guest needs travel through staff systems
- Where information gets lost or degraded
Output: Information flow patterns and breakdown points

SECTION 1.3 - Key Moments Overlap
Research and gather data on:
- Peak service pressure dynamics (e.g., Saturday 7pm)
- Which roles face simultaneous pressure
- Competing priorities that create conflict
- Guest experience during high-pressure moments
Output: Critical intersection points

Use web search to find:
- Industry reports on restaurant operations
- Staff surveys and testimonials
- Restaurant technology vendor research
- Academic studies on hospitality operations
- Trade publications (Restaurant Business, Nation's Restaurant News, etc.)

REQUIRED OUTPUT FORMAT (write this to the file):

# Section 1: Pattern Analysis - Research Findings

## Executive Summary
[3-5 bullet points of key findings]

## 1.1 Struggling Moments Clustering
### Finding 1: [Title]
**Finding:** [What was discovered]
**Evidence:** [Sources and data]
**Confidence:** High/Medium/Low
**Validation Needed:** [What would strengthen this]
[Repeat for each finding]

## 1.2 Information Flow Mapping
[Same structure]

## 1.3 Key Moments Overlap
[Same structure]

## Sources
- [Source 1](url)
- [Source 2](url)

After writing the file, confirm: "File written to findings/01-pattern-analysis.md"
```

### 5.2 Customer Experience Researcher Prompt

```
You are a customer experience research specialist focusing on hospitality.
Your task is to research and WRITE comprehensive findings about the guest
journey in restaurants.

═══════════════════════════════════════════════════════════════════════
CRITICAL: YOUR PRIMARY DELIVERABLE IS A FILE
You MUST use the Write tool to save your findings to:
/Users/jordonhughes/Code/Fox/product/research/strategic-insights/findings/02-guest-experience.md

Do NOT just return findings - you must WRITE THE FILE.
The orchestrator will read this file after you complete.
═══════════════════════════════════════════════════════════════════════

RESEARCH TASKS:

SECTION 2.1 - End-to-End Journey Mapping
Research and gather data on:
- The complete guest journey: Booking → Confirmation → Reminder →
  Arrival → Seating → Service → Departure
- Which staff role owns each stage
- What commonly goes wrong at each stage
- What creates moments of delight
Output: Experience chain with failure points and delight moments

SECTION 2.2 - Trust Accumulation Model
Research and gather data on:
- How first-time guests build confidence in a restaurant
- What makes returning guests feel known and valued
- How group organisers are supported (and what makes them look good)
- Trust signals at each journey stage
Output: Trust levers by guest type

SECTION 2.3 - Recovery Opportunities
Research and gather data on:
- Service recovery best practices
- Which failures are recoverable vs. fatal to the experience
- What tools and information enable staff to recover situations
- Guest expectations around service recovery
Output: Recovery intervention points

Use web search to find:
- Customer experience research in hospitality
- Guest satisfaction studies
- Service recovery academic literature
- Restaurant review analysis themes
- Hospitality industry reports on guest expectations

REQUIRED OUTPUT FORMAT (write this to the file):

# Section 2: Guest Experience Chain - Research Findings

## Executive Summary
[3-5 bullet points of key findings]

## 2.1 End-to-End Journey Mapping
### Finding 1: [Title]
**Finding:** [What was discovered]
**Evidence:** [Sources and data]
**Confidence:** High/Medium/Low
**Validation Needed:** [What would strengthen this]
[Repeat for each finding]

## 2.2 Trust Accumulation Model
[Same structure]

## 2.3 Recovery Opportunities
[Same structure]

## Sources
- [Source 1](url)
- [Source 2](url)

After writing the file, confirm: "File written to findings/02-guest-experience.md"
```

### 5.3 Role Dynamics Researcher Prompt

```
You are an organisational dynamics research specialist focusing on
restaurant staffing. Your task is to research and WRITE comprehensive
findings about how restaurant roles interact.

═══════════════════════════════════════════════════════════════════════
CRITICAL: YOUR PRIMARY DELIVERABLE IS A FILE
You MUST use the Write tool to save your findings to:
/Users/jordonhughes/Code/Fox/product/research/strategic-insights/findings/03-role-relationships.md

Do NOT just return findings - you must WRITE THE FILE.
The orchestrator will read this file after you complete.
═══════════════════════════════════════════════════════════════════════

RESEARCH TASKS:

SECTION 3.1 - Dependency Mapping
Research and gather data on:
- Role interdependencies in restaurants (who needs whom)
- Hard dependencies (can't function without)
- Soft dependencies (better with, but can work around)
- Critical path roles in service delivery
Output: Dependency patterns with criticality ratings

SECTION 3.2 - Handoff Quality
Research and gather data on:
- Information transfer between roles
- What information should transfer at each handoff
- What actually transfers today (common gaps)
- Cost to guest experience of bad handoffs
Output: Handoff quality gaps

SECTION 3.3 - Misaligned Incentives
Research and gather data on:
- Where role motivations conflict in restaurants
- Host (seat fast) vs Server (steady pacing) tension
- Reservationist (full book) vs Host (buffer) tension
- GM (covers) vs Kitchen (predictability) tension
- How technology can mediate these conflicts
Output: Tension points requiring system design

Use web search to find:
- Restaurant management studies
- Hospitality workforce research
- Restaurant technology case studies
- Trade publications on staffing challenges
- Academic research on service operations

REQUIRED OUTPUT FORMAT (write this to the file):

# Section 3: Role Relationship Analysis - Research Findings

## Executive Summary
[3-5 bullet points of key findings]

## 3.1 Dependency Mapping
### Finding 1: [Title]
**Finding:** [What was discovered]
**Evidence:** [Sources and data]
**Confidence:** High/Medium/Low
**Validation Needed:** [What would strengthen this]
[Repeat for each finding]

## 3.2 Handoff Quality
[Same structure]

## 3.3 Misaligned Incentives
[Same structure]

## Sources
- [Source 1](url)
- [Source 2](url)

After writing the file, confirm: "File written to findings/03-role-relationships.md"
```

### 5.4 Market Researcher Prompt

```
You are a competitive intelligence specialist focusing on the restaurant
technology market. Your task is to research and WRITE comprehensive
findings about the competitive landscape.

═══════════════════════════════════════════════════════════════════════
CRITICAL: YOUR PRIMARY DELIVERABLE IS A FILE
You MUST use the Write tool to save your findings to:
/Users/jordonhughes/Code/Fox/product/research/strategic-insights/findings/04-market-competitive.md

Do NOT just return findings - you must WRITE THE FILE.
The orchestrator will read this file after you complete.
═══════════════════════════════════════════════════════════════════════

RESEARCH TASKS:

SECTION 4.1 - Segment-Specific Needs
Research and gather data on:
- Fine Dining needs: recognition, personalisation, occasion delivery
- Casual Dining needs: speed, group handling, turn efficiency
- Polished Casual needs: blend of both
- How reservation system needs differ by segment
Output: Segment-specific priority matrix

SECTION 4.2 - Competitive Positioning Gaps
Research and gather data on:
- OpenTable: capabilities, positioning, weaknesses
- Resy: capabilities, positioning, weaknesses
- SevenRooms: capabilities, positioning, weaknesses
- Other players (Yelp Reservations, Toast, etc.)
- Where guest experience is underserved
Output: Positioning whitespace analysis

SECTION 4.3 - Switching Triggers
Research and gather data on:
- What makes venues switch reservation systems
- Is it Host frustration? GM mandate? Guest complaints?
- Common "last straw" moments
- Switching costs and barriers
- Decision-making process for technology changes
Output: Switching trigger hypotheses

Use web search to find:
- Restaurant technology market reports
- Vendor comparison articles
- User reviews of reservation systems
- Industry analysis (Skift, Restaurant Technology News)
- Case studies of venue platform switches

REQUIRED OUTPUT FORMAT (write this to the file):

# Section 4: Market & Competitive Lens - Research Findings

## Executive Summary
[3-5 bullet points of key findings]

## 4.1 Segment-Specific Needs
### Finding 1: [Title]
**Finding:** [What was discovered]
**Evidence:** [Sources and data]
**Confidence:** High/Medium/Low
**Validation Needed:** [What would strengthen this]
[Repeat for each finding]

## 4.2 Competitive Positioning Gaps
[Same structure]

## 4.3 Switching Triggers
[Same structure]

## Sources
- [Source 1](url)
- [Source 2](url)

After writing the file, confirm: "File written to findings/04-market-competitive.md"
```

---

## 6. Output Files

Research outputs will be saved to:

```
product/research/strategic-insights/
├── research-plan.md                    (original plan)
├── agent-orchestration-plan.md         (this document)
├── findings/
│   ├── 01-pattern-analysis.md          (ops-researcher output)
│   ├── 02-guest-experience.md          (cx-researcher output)
│   ├── 03-role-relationships.md        (roles-researcher output)
│   ├── 04-market-competitive.md        (market-researcher output)
│   └── 05-synthesis.md                 (orchestrator synthesis)
└── strategic-insights-report.md        (final consolidated report)
```

---

## 7. Success Criteria

### Phase 1 Success (Research Agents)
- [ ] Each agent returns structured findings
- [ ] Evidence includes credible sources
- [ ] Confidence levels assigned to findings
- [ ] All 17 research tasks addressed

### Phase 2 Success (Synthesis)
- [ ] Jobs Chain constructed across roles
- [ ] Leverage points identified with rationale
- [ ] Strategic hypotheses generated
- [ ] Cross-domain patterns identified

### Phase 3 Success (Validation)
- [ ] Each insight has confidence level
- [ ] Validation methods defined
- [ ] Risk-if-wrong assessed
- [ ] Priority recommendations clear

---

## 8. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **Orchestrator context crash** | File-first architecture ensures work persists; recovery protocol resumes from files |
| **Agent fails to write file** | Task output will show error; re-run individual agent |
| **Incomplete file written** | Completeness check (look for "## Sources" section); re-run if missing |
| Agent returns low-quality findings | Review file outputs before synthesis; re-run if needed |
| Insufficient web sources | Expand search terms; accept lower confidence |
| Conflicting findings across agents | Flag conflicts in synthesis; note for validation |
| Agent context overflow | Task prompts designed for single-pass execution |
| Synthesis coherence | Orchestrator maintains narrative thread |

### 8.1 Pre-Flight Checklist

Before launching agents:
- [ ] Confirm `findings/` directory exists
- [ ] Verify no partial files from previous attempts
- [ ] If partial files exist, decide: delete or resume

---

## 9. Next Steps (Reliable Execution Protocol)

### Step 1: Pre-Flight
```bash
# Verify findings directory exists
ls -la product/research/strategic-insights/findings/
# Should be empty or have only complete files
```

### Step 2: Launch Phase 1 (Background Agents)
Launch all 4 agents with `run_in_background=true`:
- ops-researcher → writes `01-pattern-analysis.md`
- cx-researcher → writes `02-guest-experience.md`
- roles-researcher → writes `03-role-relationships.md`
- market-researcher → writes `04-market-competitive.md`

### Step 3: Monitor Progress
```bash
# Check file creation/progress
ls -la product/research/strategic-insights/findings/
# Once files appear, check completeness:
grep "## Sources" product/research/strategic-insights/findings/*.md
```

### Step 4: Verify Completion
- Use `TaskOutput` to check each background task
- Verify all 4 files exist and have "## Sources" section
- If any incomplete, re-run that specific agent

### Step 5: Execute Phase 2 (Synthesis)
- Orchestrator reads all 4 files from disk
- Performs synthesis
- Writes `findings/05-synthesis.md`

### Step 6: Execute Phase 3 & Deliver
- Apply validation framework
- Write final `strategic-insights-report.md`

---

**Document Status:** Ready for execution (v2 - with reliability improvements)
**Key Change:** File-first architecture prevents data loss on context crash
**Prepared by:** Claude (Orchestrator)
**Execution approval:** Awaiting user confirmation

---

## Sources Referenced

- [Anthropic Sub-agents Documentation](https://code.claude.com/docs/en/sub-agents)
- [Anthropic Multi-Agent Research System](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
