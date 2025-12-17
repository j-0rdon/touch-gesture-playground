Gaps & Issues Report: User Roles & Product Principles

  Document: draft-user-roles-principles-rests.md v7.0

  Reviewed Against: Strategic Insights Research (Sections 1-5)

  ---
  1. Assumptions Not Supported by Research

  1.1 Expeditor Role Missing

  Issue: The document covers Host, Reservationist, Server, Kitchen, GM, and Operator but omits the Expeditor (Expo) role entirely.

  Research Evidence (Section 3):
  "The expeditor (expo) role functions as the single most critical coordination point in full-service restaurants, acting as the bridge between kitchen timing and server delivery. When this role is absent or ineffective, service quality degrades rapidly."

  Impact: The expo is described as "the quarterback of the restaurant" and the absence of this role from the document means:
  - Critical coordination functions aren't assigned
  - Kitchen→Server handoff is underspecified
  - Quality control checkpoint is missing

  Recommendation: Add Expeditor as a distinct role, or explicitly note which role absorbs expo functions in venues without a dedicated expo.

  ---
  1.2 Busser Role Missing

  Issue: Bussers are not mentioned despite being critical to table turnover.

  Research Evidence (Section 3):
  "Busser | Server | Table turnover for new seating | High | Revenue loss; guest wait times increase"

  "Bus staff trained to clean tables in 1-2 minutes directly improve turnover rates" (Section 4)

  Impact: Table turn economics depend heavily on busser efficiency. Without this role:
  - Server workload during turns is underestimated
  - Host seating pace dependency on bussers isn't captured

  Recommendation: Add Busser role or note busser functions under Server with explicit handoff quality considerations.

  ---
  1.3 Assumption: Notes Written = Notes Delivered

  Issue: Document assumes the problem is "notes written but host never sees them." Research shows the problem is more systemic—notes degrade through multiple handoffs, not just one.

  Research Evidence (Section 3):
  "Dietary restrictions and special requests often pass through 3-4 handoff points (guest → reservationist → host → server → kitchen), with information degrading at each transfer."

  Document's framing:
  "Notes written carefully but host never sees them — guest's request missed"

  Gap: This frames it as a one-hop problem (Reservationist→Host) when research shows it's a multi-hop degradation problem. A guest's allergy noted at booking may be lost at any of 3-4 subsequent handoffs.

  Recommendation: Reframe "Deliver information, not just store it" to explicitly address chain-of-custody through multiple handoffs, not just initial surfacing.

  ---
  1.4 Assumption: Server Needs Are "Light"

  Issue: Document classifies Server's system interaction as "Light" and states "Don't require active input from servers."

  Research Evidence:
  - Section 1: "Server→Kitchen communication via POS has critical gaps"
  - Section 2: "Server approaches within 2 minutes of seating" is a key delight moment
  - Section 3: "Server tip vs restaurant table turn tension" creates ongoing friction

  Contradiction: Research shows servers are high-frequency users during service, constantly checking section status, table timing, and guest needs. "Light" interaction misrepresents their actual engagement pattern.

  Recommendation: Recategorise Server interaction as "Medium" during service, with distinction between pre-service (light) and active service (medium-heavy).

  ---
  1.5 Assumption: Kitchen Needs "Minimal" Interaction

  Issue: Document states Kitchen has "Minimal" system interaction.

  Research Evidence (Section 3):
  "Kitchen Display Systems that support expo coordination cut order errors by 90%, reduce customer wait times by 20-30%, and boost kitchen efficiency by 15-25%"

  Section 1:
  "Kitchen gets slammed with orders all at once, extending ticket times" is a cascade failure from host seating decisions

  Gap: Modern kitchens with KDS have constant system interaction. Even without KDS, kitchen capacity signals should flow to FOH. "Minimal" undersells the integration opportunity.

  Recommendation: Reframe Kitchen interaction as "Light-Medium" with explicit note that integration depth varies by tech stack.

  ---
  2. Framing/Positioning That Contradicts Research

  2.1 "Win the Host First" Priority Stack

  Document's Priority Stack:
  1. Host
  2. Reservationist
  3. Guest
  4. GM
  5. Server/Kitchen

  Research Alignment: Partially supported but Server positioning is too low.

  Research Evidence (Section 2):
  "Server approaches within 2 minutes of seating with warm greeting" — key delight moment
  "45% of diners wouldn't return if party meals arrived more than 10-15 minutes apart"
  "Friendly service ranks first before taste in positive reviews"

  Contradiction: Server experience directly shapes guest satisfaction more than any other role except possibly Host. Ranking Server as "must not get in the way" undervalues their guest-facing impact.

  Recommendation: Consider a 2-tier model:
  - Tier 1 (Guest-facing moment): Host, Server
  - Tier 2 (Setup/support): Reservationist, GM, Kitchen

  ---
  2.2 Information Flow Table Missing Key Flows

  Document's Information Flow Table:
  | Role | Creates | Needs | If it breaks → Guest impact |

  Missing Critical Flows from Research:

  | Missing Flow                 | Research Evidence                                                                         |
  |------------------------------|-------------------------------------------------------------------------------------------|
  | Shift→Shift handoff          | "Over 23% of medical errors linked to communication failures during handoffs" (Section 3) |
  | Host→Kitchen capacity signal | "Host doesn't know kitchen capacity when seating" (Section 3)                             |
  | Kitchen→Host pacing signal   | "Kitchen in the weeds should signal FOH to slow seating" (Section 1)                      |
  | Expo→Server food ready       | "Expo alerts servers when food is ready" (Section 3)                                      |

  Gap: Document focuses on guest-facing information but misses operational coordination flows that indirectly affect guest experience.

  Recommendation: Add "Internal Coordination" information flow table covering role-to-role operational signals.

  ---
  2.3 Recovery Moments Underemphasise Speed

  Document's Recovery Framing:
  "A great save can turn a failure into a loyalty moment."

  Research Evidence (Section 2):
  "Immediate recovery is significantly more effective than delayed compensation"
  "Recoveries that offer a solution in the future (such as coupon) will be less effective than actions that offer immediate recovery"
  "Restaurants where servers had authority to comp items... resolved complaints 74% faster"

  Gap: Document emphasises recovery capability but doesn't emphasise timing windows. Research shows the difference between "within 2 minutes" and "end of meal" recovery is substantial.

  Recommendation: Add timing expectations to recovery moments:
  - Immediate (0-2 min): Acknowledge and take action
  - Fast (5 min): Resolution delivered
  - Follow-up (24hr): Post-visit communication

  ---
  2.4 No-Show Treated as Revenue Problem, Not Cascade Problem

  Document Framing:
  "No-show burns a prime table on a busy night"
  "No-shows hurt revenue unpredictably"

  Research Evidence (Section 1):
  No-show not marked until 30 mins late
      → Table sits empty during peak
          → Walk-ins turned away ("fully booked")
              → Revenue lost + guests disappointed
                  → Meanwhile, empty table visible from the door

  Gap: Document treats no-shows primarily as a revenue/Host problem. Research shows no-shows cascade to guest perception (visible empty tables while being told "fully booked") and staff morale (servers scheduled for covers that don't arrive earn less).

  Recommendation: Expand no-show framing to include cascade impacts on other guests and staff.

  ---
  2.5 Guest Journey Oversimplified

  Document's Guest Roles:
  - First-time: Book with confidence
  - Group Organiser: Make it work for the group
  - Returning: Rebook easily, feel known

  Research Evidence (Section 2) - 8-Stage Journey:
  1. Booking
  2. Confirmation & Reminder
  3. Arrival
  4. Seating & Wait Management
  5. Service (Ordering, Dining, Course Delivery)
  6. Service Recovery
  7. Departure & Payment
  8. Post-Visit Engagement

  Gap: Document's guest roles focus heavily on booking but underweight:
  - Departure ("the most critical touchpoint" per research)
  - Post-visit engagement (70% never return; re-engagement is key)

  Recommendation: Add explicit jobs for guests at departure and post-visit stages, or create a separate "Guest Journey" section.

  ---
  3. Missed Jobs / Bad Prioritisation

  3.1 Missed Job: Host Managing Kitchen Capacity Visibility

  Research Evidence (Section 3):
  "Host→Kitchen advance notice of party sizes" is a soft dependency
  "Kitchen lacks adequate prep time when volumes exceed forecasts"

  Current Document: Host jobs focus on seating, waiting, and communicating with servers. No mention of kitchen awareness.

  Missed Job: "Monitor kitchen capacity signals to pace seating appropriately."

  ---
  3.2 Missed Job: Server Pre-Shift Section Awareness

  Research Evidence (Section 3):
  "Triple-seating" (seating 3 tables in one section rapidly) creates cascade failures
  "If you know you'll have to seat guests in an already busy section, give the server a heads up"

  Current Document: Server pre-shift job is "scanning what's coming for my section."

  Missing Nuance: Servers need to communicate back to host about capacity, not just receive information. Two-way communication is underspecified.

  ---
  3.3 Missed Job: GM Intervention During Peak

  Research Evidence (Section 2):
  "Manager visits table personally to ensure satisfaction" — key recovery moment
  "Manager farewell for special occasions or regular guests"

  Current Document: GM jobs are mostly analytical ("Review reservations daily," "Analyse trends"). Recovery mentions "Step in during crunch moments" but this is buried.

  Bad Prioritisation: GM's floor presence during peak service is underweighted relative to back-office analysis. Research shows GM visibility during peak is critical for:
  - Recovery escalation
  - VIP recognition
  - Staff support

  Recommendation: Elevate "Be visible on floor during peak service" as a primary GM job, not secondary.

  ---
  3.4 Missed Job: Reservationist Overbooking Strategy

  Research Evidence (Section 3):
  "Strategic overbooking based on no-show data"
  "Restaurants that have last-minute demand and high walk-in rates can generally offset the costly impact of reservation no-shows"

  Current Document: Reservationist jobs mention "Block tables strategically for walk-in buffer" but don't address intentional overbooking.

  Missed Job: "Apply overbooking strategy based on historical no-show patterns."

  ---
  3.5 Bad Prioritisation: Payment/Departure Underweighted

  Research Evidence (Section 2):
  "Departure phase is the most important touchpoint in the guest journey"
  "Final impression guests take home influences future loyalty more than any other stage"
  "Average checkout time decreased by nearly 40% with streamlined systems"

  Current Document: Payment/departure is not mentioned as a job for any role. No recovery moment for slow checkout.

  Gap: This is a significant omission given research emphasis on departure as "most important touchpoint."

  Recommendation: Add explicit departure jobs:
  - Server: "Process payment promptly when guest signals readiness"
  - Host: "Provide warm farewell at departure"
  - Recovery: "Slow checkout → Apologise, expedite, consider small gesture"

  ---
  3.6 Missed: FOH-BOH Pay Gap as Context

  Research Evidence (Section 3):
  "FOH-BOH pay gap (servers earning $25.34/hour median vs. line cooks at $13/hour) creates adversarial dynamics"
  "The most famous division in the restaurant industry is the front- and back-of-house divide"

  Current Document: No mention of structural incentive conflicts between roles.

  Impact: Understanding role tensions helps explain why information handoffs fail and why coordination is difficult. This context would help product decisions.

  Recommendation: Add a "Role Tensions" section noting structural conflicts that product design must accommodate (not solve, but not exacerbate).

  ---
  3.7 Missed: Wait Time Perception vs Reality

  Research Evidence (Section 2):
  "Guests overestimate wait times by 20-50% (10 minutes feels like 15)"
  "Communication and expectation management more important than actual speed"

  Current Document: Host job includes "Keep wait times accurate" but doesn't acknowledge perception gap.

  Recommendation: Add principle or design note: "Guests perceive waits as 20-50% longer than reality—proactive communication matters more than speed."

  ---
  4. Structural Recommendations

  4.1 Add "Information Chain of Custody" Section

  The document has "Information Flow" but doesn't trace information through the full chain. Recommended addition:

  | Information         | Origin          | Handoffs                                 | Final User | Failure Mode            |
  |---------------------|-----------------|------------------------------------------|------------|-------------------------|
  | Dietary restriction | Guest (booking) | Reservationist → Host → Server → Kitchen | Kitchen    | Any break = safety risk |
  | VIP status          | Reservationist  | Host → Server                            | Server     | Missed recognition      |
  | Table status        | Server/Busser   | Host                                     | Host       | Bad seating decisions   |
  | Kitchen capacity    | Kitchen         | Expo → Host                              | Host       | Over-seating            |

  4.2 Add Segment-Specific Variations

  Research Evidence (Section 4): Segment needs vary dramatically. Fine dining needs deep CRM; casual needs fast turns.

  Current Document: Single role definition applies across segments.

  Recommendation: Add segment callouts for role variations:
  - Fine Dining Host: VIP recognition critical
  - Casual Host: Waitlist management critical
  - Fast Casual: Queue management, minimal reservation complexity

  4.3 Add "System Integration Requirements" Section

  Research Evidence (Section 4):
  "Integration beats features"
  "Toast captured 5% market share in one year primarily through POS integration"

  Current Document: Design principles mention "Works when internet is flaky" but don't address POS/KDS integration.

  Recommendation: Add section on what integrations each role needs:
  - Host: Reservation↔POS table status sync
  - Server: POS order history for guest recognition
  - Kitchen: KDS integration for pacing visibility

  ---
  Summary: Priority Issues

  | Priority | Issue                                                     | Impact                                 |
  |----------|-----------------------------------------------------------|----------------------------------------|
  | Critical | Missing Expeditor role                                    | Coordination gap in jobs chain         |
  | Critical | Payment/Departure jobs missing                            | Ignores "most important touchpoint"    |
  | High     | Information flow is single-hop, should be multi-hop chain | Underestimates degradation problem     |
  | High     | Server interaction classified as "Light"                  | Underweights their system needs        |
  | High     | Recovery timing not specified                             | Research shows timing is critical      |
  | Medium   | GM floor presence underweighted                           | Buried relative to back-office tasks   |
  | Medium   | No segment variations                                     | One-size-fits-all misses segment needs |
  | Medium   | Busser role missing                                       | Table turn dependency unclear          |
  | Low      | No FOH-BOH tension acknowledgment                         | Context for design decisions           |
  | Low      | Wait time perception gap not noted                        | Useful design principle                |

  ---
  Review completed: 17 December 2025
  Reviewed by: Claude (against strategic insights research)
  Recommendation: Address Critical and High priority issues before finalising v8.0