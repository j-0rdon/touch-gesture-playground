---
title: User Roles & Product Principles
version: "8.0"
last_updated: 2024-12-17
status: active
domain: restaurant-technology
product: reservation-management

description: |
  Defines user roles, jobs-to-be-done, and product principles for restaurant
  reservation and table management software. Covers internal roles (Host,
  Reservationist, Server, Expeditor, Busser, Kitchen, GM, Operator) and external
  roles (Guest types). Includes segment variations and role tension analysis.

key_concepts:
  - Jobs-to-be-done framework for each role
  - Information chain of custody (multi-hop handoffs)
  - Recovery patterns and timing windows
  - Segment-specific variations (Fine Dining → Casual)
  - Role tensions and design implications

document_structure:
  - Restaurant Types: Market segmentation and addressable market
  - Summary: Role overview table
  - Principles: 7 product principles with tests
  - Internal Roles: Host, Reservationist, Server, Expeditor, Busser, Kitchen, GM, Operator
  - Role Tensions: Structural conflicts between roles
  - Segment Variations: How roles differ by restaurant type
  - External Roles: Guest personas (First-time, Group Organizer, Returning)

related_documents:
  - strategic-insights-report.md
  - gaps-and-insights-report.md

tags:
  - user-research
  - product-principles
  - restaurant-ops
  - hospitality
  - jobs-to-be-done
---

# User Roles & Product Principles

---

## Restaurant Types

These user roles are shaped by the restaurant context they operate in. Categories align with industry-standard segmentation used by IBISWorld, Technomic, and the National Restaurant Association.

### Addressable Market: Full-Service Restaurants

| Type | Description | Reservation behaviour | Market context |
|------|-------------|----------------------|----------------|
| **Fine Dining** | Premium, multi-course dining with high service standards. Often chef-driven with curated wine lists. Dress codes common. Avg check $50–$150+. | Heavy reliance on reservations. Longer seatings (2–3 hrs). No-shows critical (5–10% reported). | ~4,600 US locations. $17B US market (2025). 25% of FSR segment. Highest margins (10–15%). |
| **Polished Casual** | Elevated casual dining with better décor, trained staff, and quality ingredients. Sometimes called "upscale casual." Avg check $30–$50. | Moderate-to-high reservation use. Mix of reservations and walk-ins. | ~20,000 US restaurants (~1% of total). Growing segment, higher profitability per unit than casual. |
| **Casual Dining** | Relaxed full-service with broad menus and moderate prices. Family-friendly. Table service throughout. Avg check $15–$25. | Mix of reservations and walk-ins. High turn pressure at peak. Group bookings common. | ~206,000 US operators. 42% of FSR segment, 65% of FSR value. $333B global (2025). |
| **Family Dining** | Budget-friendly, all-ages dining. Often breakfast/brunch focused. Booth seating, comfort food. Avg check $10–$18. | Primarily walk-in. Some reservations for large groups. | 19% of FSR segment. Franchise-heavy (IHOP, Denny's). |
| **Bars & Pubs** | Drink-focused venues, increasingly offering quality food (gastropubs). May have separate dining areas. | Walk-in dominant. Reservations growing for dining areas and gastropubs. | AU: 6,935 businesses, $20.3B market. US: ~60,000 bars. Wine bars and gastropubs driving growth. |

---

### Market Size Summary (Addressable)

| Market | Size (2025) | Notes |
|--------|-------------|-------|
| US Full-Service Restaurants | $361B | Growing at 11.3% CAGR |
| AU Restaurants | $26.2B | Growing at 8.2% CAGR |
| AU Pubs, Bars & Nightclubs | $20.3B | 6,935 businesses |

*Data sources: IBISWorld, Mordor Intelligence, National Restaurant Association, Technomic (2024–2025)*

---

## Summary

| Role | System interaction | Frequency | Core job (short) |
|------|-------------------|-----------|------------------|
| Host | Heavy | Constant | Every guest welcomed smoothly |
| Reservationist | Heavy | Daily (pre-service) | Set up great guest experiences |
| Expeditor | Medium | Per service | Bridge kitchen timing and server delivery |
| Server | Medium (active service) | Per shift | Make every guest feel attended to |
| Busser | Light | Per shift | Keep tables turning for smooth flow |
| Kitchen | Light-Medium | Daily | Deliver quality at the right pace |
| GM | Medium | Daily | Build a venue guests come back to |
| Operator | Light | Weekly | Consistent experience across venues |
| Guest: First-time | Single | Per booking | Book with confidence |
| Guest: Group Organizer | Single-repeat | Per booking | Make it work for the group |
| Guest: Returning | Repeat | Per booking | Rebook easily, feel known |

**Note on Server/Kitchen interaction:** Interaction levels vary by service phase. Servers are "Light" pre-service but "Medium-Heavy" during active service. Kitchen interaction depth varies by tech stack (venues with KDS have higher system interaction).

---

## Principles

These principles guide product decisions. When trade-offs arise, use them as the lens.

| # | Principle | The test |
|---|-----------|----------|
| 1 | We serve the guest through the staff | "How does this help the guest have a better time?" |
| 2 | Win the Host first | "Does this work at 7pm Saturday, double-booked table, angry guest at the stand?" |
| 3 | Assume imperfect sync | "Does this still work with stale data, incomplete updates, or missing input?" |
| 4 | Deliver information, not just store it | "Who creates this? Who needs it? How do we ensure it arrives?" |
| 5 | Interrupt cascades early | "Where does this problem start? Can we catch it before it reaches the guest?" |
| 6 | Build for recovery | "When this fails, can staff recover? What do they need to save the moment?" |
| 7 | Recognition is delivery, not storage | "Does the right person see the right context at the right moment?" |

---

### 1. We serve the guest through the staff

> *"We build tools for staff. The guest is who they serve."*

Every internal role exists in service of the guest experience. Staff friction = guest experience friction. We optimise tools to reduce friction, not for its own sake, but because smooth operations create great experiences.

**The test:** Every feature should answer: "How does this help the guest have a better time?"

**The chain:**
- Reservationist builds a balanced book → Guest gets seated on time
- Host has real-time clarity → Guest isn't left waiting at the stand
- Server knows what's coming → Guest feels attended to, not rushed
- Kitchen has visibility → Guest gets quality food, paced well

---

### 2. Win the Host first

> *"If you win over the host, you win the account."*

The Host is the highest-frequency, highest-friction user. They experience every edge case, every failure, every moment of pressure. When they struggle, guests feel it immediately.

**The test:** Does this work at 7pm Saturday, double-booked table, angry guest at the stand?

**Priority stack (2-tier model):**

Research shows Server experience directly shapes guest satisfaction — "friendly service ranks first before taste in positive reviews." This warrants elevating Server priority alongside Host for guest-facing moments.

| Tier | Roles | Why | Guest Impact |
|------|-------|-----|--------------|
| **Tier 1: Guest-facing moment** | Host, Server | These roles shape immediate guest perception | First impression, ongoing attention, final impression |
| **Tier 2: Setup & support** | Reservationist, GM, Kitchen, Expeditor | These roles create conditions for Tier 1 success | Guests feel impact indirectly |

Within Tier 1, Host remains the primary focus for product design (highest friction, broadest responsibility), but Server needs are not subordinate — they're parallel for different moments in the guest journey.

---

### 3. Assume imperfect sync

> *"The system assumes perfect information. Reality doesn't sync."*

Most reservation systems assume staff will keep information perfectly updated in real-time. They won't. The Host is juggling a queue, the Server is mid-service, the Reservationist has gone home. Information degrades.

**The failure mode:** Information exists but doesn't travel.
- Guest notes written but not surfaced at the right moment
- VIP status known but Host wasn't told
- Party size changed but update lost between systems
- Table cleared but status not updated

**The test:** Does this feature still work with stale data, incomplete updates, or missing input?

---

### 4. Deliver information, not just store it

> *"Most systems store guest data. Few surface it at the right moment to the right person."*

The product isn't a "reservation system" — it's an **information delivery system** that happens to manage bookings. Data has no value unless it reaches the right person at the right moment.

**The test:** Who creates this information? Who needs it? How do we ensure it arrives?

**Information flow:**

| Role | Creates | Needs | If it breaks → Guest impact |
|------|---------|-------|----------------------------|
| Reservationist | Notes, book structure, VIP flags, special requests | Historical patterns, server schedules, table inventory | Notes not seen → requests ignored, occasions missed |
| Host | Table status, wait times, arrival confirmations | Guest notes, party details, VIP flags, server sections, kitchen capacity | Missing context → wrong table, no recognition, awkward seating |
| Expeditor | Food ready signals, quality checkpoints | Ticket status, server availability, table timing | Dishes sit in window → cold food, courses mis-timed |
| Server | (via POS) Cover timing, table progress | Who's coming, occasions, preferences, allergies | Blindsided → can't personalise, misses moments that matter |
| Busser | Table cleared signals | Host seating needs, server section load | Slow turns → guests wait for tables visibly empty |
| Kitchen | Capacity signals, pacing alerts | Cover counts, large party timing, dietary flags | No warning → quality suffers, courses mis-timed |
| Guest | Booking details, special requests, preferences | Confirmation, expectations, trust signals | Requests lost → "they didn't listen", won't return |

**Information Chain of Custody:**

Research shows information degrades through multiple handoffs, not just one. A guest's allergy noted at booking may be lost at any of 3-4 subsequent handoffs. Design must trace chain-of-custody, not just initial surfacing.

| Information | Origin | Handoffs | Final User | Failure Mode |
|-------------|--------|----------|------------|--------------|
| Dietary restriction | Guest (booking) | Reservationist → Host → Server → Kitchen | Kitchen | Any break = safety risk |
| VIP status | Reservationist | Host → Server | Server | Missed recognition |
| Table status | Server/Busser | Host | Host | Bad seating decisions |
| Kitchen capacity | Kitchen | Expo → Host | Host | Over-seating, guest waits |
| Occasion (birthday) | Guest (booking) | Reservationist → Host → Server | Server | Missed celebration moment |

**Internal Coordination Flows (role-to-role):**

| Flow | From | To | Purpose | If Missing |
|------|------|----|---------|------------|
| Shift handoff | Outgoing Host/Server | Incoming Host/Server | Context continuity | Guest history lost mid-service |
| Kitchen capacity signal | Kitchen | Host (via Expo) | Pace seating to kitchen | Kitchen overwhelmed, quality drops |
| Food ready alert | Expo | Server | Prompt pickup | Food sits, gets cold |
| Section capacity | Server | Host | Prevent triple-seating | Server overwhelmed, guests neglected |
| Table turn signal | Busser | Host | Enable timely seating | Guests wait for "unavailable" tables |

---

### 5. Interrupt cascades early

> *"Problems don't stay contained. They cascade through roles until they reach the guest."*

A small failure upstream becomes a big failure downstream. Don't just solve the struggling moment — trace the cascade and interrupt it earlier.

**The test:** Where does this problem start? Can we catch it before it reaches the guest?

**Example cascades:**

```
Reservationist writes VIP note
    → Host doesn't see it (sync problem)
        → Seats VIP at a bad table
            → Server unaware, treats as regular
                → Guest doesn't feel recognised
                    → Lost regular, negative review
```

```
Large party books for 8, shows up as 11
    → Host scrambles to reconfigure
        → Triple-seats a server to make room
            → Server can't greet new tables promptly
                → Kitchen gets ticket spike
                    → Multiple tables wait too long
                        → Everyone's experience suffers
```

```
No-show not marked until 30 mins late
    → Table sits empty during peak
        → Walk-ins turned away ("fully booked")
            → Revenue lost + guests disappointed
                → Meanwhile, empty table visible from the door
```

---

### 6. Build for recovery

> *"Things will go wrong. The question is whether staff can recover gracefully."*

A great save can turn a failure into a loyalty moment. Design for recovery, not just prevention. Surface information that enables saves. Give staff authority to make it right.

**The test:** When this fails, can staff recover? What do they need to save the moment?

**Recovery patterns:**

| Role | Failure | Recovery | What enables it |
|------|---------|----------|-----------------|
| Host | Guest arrives, no table ready | "Let me get you a drink at the bar while we prepare your table" | Real-time view of actual wait, comp authority |
| Host | Reservation not found | Quick lookup, manual add, apologise smoothly | Fast search, easy manual entry, no blame |
| Server | Missed birthday note | "I just noticed — happy birthday! Dessert's on us" | Occasion flags visible mid-service, comp authority |
| Server | Wrong dish sent | Genuine apology, replacement rushed, course comped | Kitchen communication, comp authority |
| Server | Slow checkout | "So sorry for the wait — let me process this right now" | Mobile payment, authority to expedite |
| GM | Regular not recognised at door | Steps in personally, "Great to see you back" | Regular alerts, GM visibility into arrivals |
| Kitchen | Ticket spike, quality at risk | Alert FOH to slow seating, communicate wait | Two-way capacity signalling |

**Recovery timing windows:**

Research shows immediate recovery is significantly more effective than delayed compensation. Staff empowered to resolve complaints in the moment resolve issues 74% faster.

| Timing | Window | Action Required | Example |
|--------|--------|-----------------|---------|
| Immediate | 0-2 min | Acknowledge and take action | "I see there's an issue — let me fix this right now" |
| Fast | 2-5 min | Resolution delivered | Replacement dish arrives, comp applied |
| Follow-up | Within 24hr | Post-visit communication | Manager call/email if issue was significant |

**Key insight:** Recoveries that offer a solution in the future (e.g., coupon for next visit) are less effective than actions that provide immediate recovery. A small gesture now beats a bigger one later.

---

### 7. Recognition is delivery, not storage

> *"Feel known" appears across every role — it's not a feature, it's a strategic capability.*

Recognition isn't a CRM feature — it's an information delivery problem. The data exists; the challenge is getting it to the Host at 7pm Saturday when they're slammed.

**The test:** Does the right person see the right context at the right moment — without having to look for it?

**Recognition touchpoints:**

| Moment | Recognition signal | Who delivers | What's needed |
|--------|-------------------|--------------|---------------|
| Booking | "Welcome back" or pre-filled details | System | Guest history, preference memory |
| Arrival | "Good to see you again, Ms. Chen" | Host | Name, visit history surfaced at check-in |
| Seating | Favourite table, or "we remembered you prefer quiet corners" | Host | Preference flags, table notes |
| Service | "Still no onions, right?" / "Your usual Negroni?" | Server | Dietary flags, past orders surfaced |
| Occasion | "Happy anniversary — we've set aside something special" | Server/GM | Occasion flags, staff briefing |
| Departure | "See you next time" + genuine warmth | Host/Server | — |
| Post-visit | Personalised follow-up, not generic marketing | System | Visit data, segmentation |

---

## Internal Roles

---

### Host

**Role context:**  
The tactical operator. First face guests see, last line of defence when the floor gets chaotic. Manages the door, the waitlist, and the seating puzzle in real-time. Often younger/earlier career. High turnover role. Also referred to as front-of-house (FOH) in some venues.

**Relationship to Reservationist:**  
Reservationist builds the book. Host executes it. Quality of the handoff determines how smooth the night runs.

**Core job:**  
When service is running, I want to seat the right guests at the right tables at the right time, so every guest feels welcomed and the floor flows smoothly.

**Guest experience impact:**  
Host is the first and last impression. A stressed host = an anxious guest. A calm, confident host = a guest who feels welcomed and in good hands.

**Motivations:**
- Every guest greeted warmly, even when it's chaos
- Feel in control so guests feel taken care of
- Prove I can handle the pressure
- Go home knowing guests had a great start to their night

**Jobs:**
- Greet and seat guests promptly — first impression matters
- Keep wait times accurate so guests can trust us (note: guests perceive waits as 20-50% longer than reality — proactive communication matters more than speed)
- Balance reservations, walk-ins, and no-shows without guests feeling the friction
- Communicate table status with servers so guests aren't left waiting
- Monitor kitchen capacity signals to pace seating appropriately — don't over-seat when kitchen is in the weeds
- Provide warm farewell at departure — the final impression guests take home
- Handle problems before guests notice them

**Struggling moments:**
- Reservation says 4, party of 6 shows up — no table fits
- 7:15pm, three reservations arrive simultaneously, only one table ready
- Guest at the stand is angry, line forming behind them, phone ringing
- Server hasn't updated table status — is it clear or not?
- Double-booked table discovered when guest is standing in front of me
- No-show cascade: table sits empty during peak → walk-ins turned away ("fully booked") → guests see empty table from the door → server scheduled for covers that don't arrive earns less → multiple people affected by one no-show

**Key moments:**
- 6:45pm Saturday — the crush begins
- Large party arrives early/late and throws off the plan
- Shift handoff — inheriting someone else's mess (or handing off cleanly)
- Angry guest at the stand with a line behind them

**Recovery moments:**
- Table not ready → Offer bar seating, buy first drink, give accurate wait
- Reservation not found → Quick manual add, apologise warmly, seat promptly
- Double-booked → Acknowledge the error, offer upgrade or comp, make it right
- Long wait → Proactive update, don't make them ask, small gesture of goodwill

**Design principles:**
- One-hand operation (other hand holds phone/menus)
- Glanceable status (no drilling into details during rush)
- Instant recovery from errors (wrong tap = easy undo)
- Works when internet is flaky

---

### Reservationist

**Role context:**  
The planner. Builds the book before service happens. Handles inbound requests, vets large parties, coordinates special occasions, and sets the host up for success. Works days/pre-service. Often more senior or specialised than hosts. In smaller venues, may be GM or manager wearing this hat.

**Relationship to Host:**  
Reservationist builds the puzzle. Host solves it in real-time. Handoff happens before service — quality of that handoff determines how smooth the night runs.

**Core job:**  
When I'm building the book, I want to balance demand across the night and capture what matters about each guest, so every reservation gets the experience they're expecting.

**Guest experience impact:**  
Reservationist sets the conditions for success. A well-built book = guests seated on time, special requests honoured, celebrations acknowledged. A rushed or unbalanced book = chaos that guests feel.

**Motivations:**
- Every guest's needs captured and communicated to the team
- Set the team up for a great service
- Maximise covers without compromising guest experience
- Build relationships with regulars and group bookers

**Jobs:**
- Build a balanced book — spread demand so no guest waits too long
- Vet and accommodate large party requests — make group organisers feel confident
- Negotiate timing with guests when preferred slots are full — find a solution that works
- Write notes that ensure guest needs are met during service
- Block tables strategically for walk-in buffer or VIPs
- Apply overbooking strategy based on historical no-show patterns — strategic overbooking can offset no-show impact without overcommitting
- Forecast demand to ensure adequate staffing for guest experience

**Struggling moments:**
- Large party request with vague details ("somewhere between 8-14 people")
- Guest books online then calls to add requests — now it's in two places
- No visibility into what Saturdays usually look like — flying blind
- Notes written carefully but host never sees them — guest's request missed
- Online booking auto-confirmed a party that doesn't actually fit
- Can't see server schedules when building the book

**Key moments:**
- Monday: planning the week's book
- Large party inquiry: can we do 14 at 7pm Saturday?
- Day-before review: is tomorrow set up well?
- Handoff to host: "heads up on table 12, birthday, they're picky"

**Recovery moments:**
- Overbooked slot discovered day-before → Proactive call to guest, offer alternative time, small incentive
- Large party inquiry can't fit → Offer creative solution (two adjacent tables, earlier/later slot, partial outdoor)
- Special request missed in booking → Call guest to confirm details, add to notes, alert team
- Double-booking caught pre-service → Contact one party, apologise, upgrade or incentive to move

**Handoff quality — what should transfer to Host:**
- VIP and regular flags (who matters tonight)
- Special occasions (birthdays, anniversaries, celebrations)
- Party notes (dietary, accessibility, preferences)
- Potential problems (large party with vague size, first-time VIP)
- Pacing alerts (clustered bookings, expected busy windows)

---

### Server

**Role context:**  
Table-level owner. The person guests interact with most during their meal. Needs to know what's coming, not manage reservations directly. Cares about pacing, party size, and heads-up on special requests.

**Core job:**  
When I'm working my section, I want to know what's coming and what matters about each table, so I can make every guest feel attended to.

**Guest experience impact:**  
Server knowledge directly shapes guest experience. A blindsided server = a neglected guest. A prepared server = a guest who feels attended to.

**Motivations:**
- Make every guest feel well taken care of
- Know enough to personalise the experience — birthday, anniversary, regular
- Stay in control of my section so no one waits too long
- Not get blindsided in ways that hurt guest experience

**Jobs:**
- Greet every table within 2 minutes of seating — first impression after being seated
- Know what's coming — big parties, celebrations, VIPs — so I can deliver
- Communicate section capacity back to Host — two-way communication prevents triple-seating
- Pace the meal well — guests shouldn't feel rushed or forgotten
- Deliver on special requests and occasions — the details that matter
- Process payment promptly when guest signals readiness — checkout is part of the experience
- Turn tables efficiently without guests feeling pushed out

**Struggling moments:**
- Triple-sat — three tables at once, impossible to greet properly
- VIP in section with no warning — missed the chance to make them feel special
- Guest complains about something a note should have flagged
- Previous table overstaying, next reservation waiting — awkward for everyone
- No idea a 10-top was about to land in my section
- Guest ready to pay but stuck waiting — bad last impression

**Key moments:**
- Pre-shift: scanning what's coming for my section, alerting Host to capacity concerns
- Mid-service: steady flow vs. getting slammed
- Guest's reaction: did they feel taken care of?
- Checkout: smooth payment, warm farewell

**Recovery moments:**
- Missed a birthday/occasion → "I just saw it's a special night — dessert's on us, happy birthday!"
- Wrong order delivered → Genuine apology, rush replacement, comp the item
- Long wait for food → Proactive check-in, communicate with kitchen, manage expectations
- Guest complaint about seating → Acknowledge, offer to move if possible, small gesture
- Forgot a request (no onions, allergy) → Apologise sincerely, fix immediately, alert manager if serious
- Slow checkout → "So sorry for the wait — let me get this done right now", expedite payment

**Design principle:**
Server interaction varies by service phase: "Light" pre-service (scanning section), "Medium-Heavy" during active service (checking status, updating). Infer what you can from POS; surface info proactively, but enable two-way communication with Host for section capacity.

---

### Expeditor

**Role context:**
The bridge between kitchen timing and server delivery. Functions as "the quarterback of the restaurant" — the single most critical coordination point in full-service restaurants. May be a dedicated role or absorbed by a sous chef, lead server, or manager. When this role is absent or ineffective, service quality degrades rapidly.

**Note:** In venues without a dedicated expeditor, these functions are typically absorbed by the Kitchen (chef de cuisine, sous chef) or a lead Server. The jobs still need to happen — the question is who owns them.

**Core job:**
When I'm running expo, I want to ensure every dish leaves the pass at the right temperature, to the right server, at the right time, so every guest gets their food in perfect condition and properly paced.

**Guest experience impact:**
Expeditor controls the critical handoff that determines whether food arrives hot and courses land together. A buried expo = cold food, staggered courses, frustrated servers. A smooth expo = seamless dining experience.

**Motivations:**
- Every dish leaves the pass at peak quality
- Courses land together at each table — no one eats while others wait
- Kitchen and FOH stay coordinated under pressure
- Catch errors before they reach the guest

**Jobs:**
- Quality control every dish before it leaves the pass
- Coordinate timing so courses for a table complete together
- Alert servers when food is ready — minimise window time
- Signal kitchen capacity to FOH — enable pacing decisions at the stand
- Catch plating errors, dietary violations, timing issues before handoff
- Communicate realistic wait times to servers for guest management

**Struggling moments:**
- Kitchen falling behind, dishes stacking in window, getting cold
- Server MIA when their food is ready — dishes dying in the window
- Multiple large party orders completing simultaneously
- Dietary restriction flagged wrong — caught at expo, need urgent remake
- No visibility into which server is available to run food
- Kitchen and FOH out of sync — seating pace doesn't match kitchen capacity

**Key moments:**
- 7pm push: managing the flow between kitchen output and server pickup
- Large party: coordinating 10+ dishes to land simultaneously
- Recovery: catching an error before it reaches the table

**Recovery moments:**
- Dish quality not up to standard → Reject, communicate to kitchen, track remake
- Cold food at pass → Rush runner, communicate to server, consider remake if too long
- Courses landing out of sync → Hold completed dishes, communicate timing to guests via server
- Dietary error caught → Stop dish, alert kitchen priority remake, communicate delay to server

**Design principle:**
Push food ready alerts to servers. Surface kitchen capacity to Host. KDS integration (where present) can reduce expo coordination overhead by 90% in error reduction, 20-30% in wait time reduction.

---

### Busser

**Role context:**
Table reset specialist. Critical to table turnover economics — directly impacts how quickly guests can be seated. Often overlooked but creates the conditions for smooth seating flow. May be a dedicated role or absorbed by servers in smaller venues.

**Note:** In venues without dedicated bussers, these functions are absorbed by Servers. This increases server workload during turns and can slow seating pace.

**Core job:**
When I'm bussing, I want to reset tables quickly and thoroughly, so the next guest walks into a clean, welcoming table and the Host can keep seating smoothly.

**Guest experience impact:**
Busser pace directly affects wait times. A slow busser = guests waiting for "unavailable" tables that are actually just dirty. A fast busser = smooth seating flow, shorter waits, guests feel the restaurant runs well.

**Motivations:**
- Every table reset quickly and properly
- Help the team keep the floor flowing
- Support servers so they can focus on guests
- Keep the restaurant looking good throughout service

**Jobs:**
- Clear and reset tables in 1-2 minutes — directly impacts seating pace
- Signal Host when tables are ready — close the communication loop
- Support servers during busy periods — water refills, plate clearing
- Maintain dining room appearance throughout service

**Struggling moments:**
- Multiple tables turn at once — can't clear them all fast enough
- Server section slammed, pulling me to help with their tables
- Host seating tables I haven't gotten to yet
- Running out of clean glassware/flatware mid-service
- No communication with Host about which tables to prioritise

**Key moments:**
- Peak turn window: 8:30-9pm when first seating finishes and second arrives
- Large party departure: complex reset under time pressure
- Walk-in surge: need to turn tables faster than usual

**Recovery moments:**
- Table not ready when guest arrives → Communicate to Host, offer to seat at ready table, accelerate current reset
- Forgot item on table → Quick correction, apologise if guest notices
- Behind on resets → Signal Host to slow seating, focus on priority tables

**Design principle:**
Simple communication channel to Host: "Table X ready." Enable Host to see busser progress in real-time for seating decisions.

---

### Kitchen

**Role context:**  
Production. Includes bar in venues with significant drink programs. Needs to know volume and timing, not guest details. Cares about pacing so they can deliver quality consistently.

**Core job:**  
When I'm running the line, I want to know what's coming and when, so I can deliver quality food at the right pace for every guest.

**Guest experience impact:**  
Kitchen pace = guest experience pace. A buried kitchen = long waits, rushed plates, inconsistent quality. A kitchen with visibility = well-timed courses, quality maintained.

**Motivations:**
- Every plate leaves the pass at the quality it should
- Pace the meal well — guests shouldn't wait too long between courses
- Stay ahead of the rush so quality doesn't suffer
- Finish service cleanly

**Jobs:**
- Prep based on expected covers — ready to deliver
- Maintain steady ticket flow so guests are paced well
- Handle large party orders without quality dropping
- Communicate when they're in the weeds — so FOH can manage guest expectations

**Struggling moments:**
- 12-top sat without warning — tickets stack up, quality at risk
- Uneven seating creates unpredictable spikes — some guests wait too long
- Walk-in surge with no heads-up
- No visibility into what's coming next hour
- Prepped for 80 covers, 120 walked in — can't deliver at usual standard

**Key moments:**
- Pre-service: how many covers tonight? Any big parties?
- 7pm push: tickets stacking, quality on the line
- Large party lands: can we deliver for them?

**Recovery moments:**
- Ticket spike overwhelming → Signal FOH to slow seating, communicate realistic wait times
- Dish sent wrong → Rush remake, prioritise over new tickets, communicate to server
- Running low on prep → Alert FOH to 86 item before guests order it, avoid disappointment
- Quality slipping under pressure → Call for support, slow down, better to wait than serve bad food

**Design principle:**
Push a "tonight's pace" view to kitchen display. Large party alerts. Interaction level varies by tech stack:
- **Venues with KDS:** Light-Medium interaction. KDS supports expo coordination, reducing errors by 90%, wait times by 20-30%, efficiency up 15-25%.
- **Venues without KDS:** Light interaction. Kitchen capacity signals should still flow to FOH, but via verbal/expo communication.

Integration opportunity: Kitchen visibility into upcoming covers and large party timing enables better prep decisions. Don't assume "minimal" interaction — modern kitchens benefit from real-time information.

---

### GM

**Role context:**  
Venue-level leader. General Manager in larger venues; owner-operator in smaller ones. Owns the P&L, the team, the guest experience. Balances short-term operations with longer-term business health. On the floor during peak, in the back office otherwise.

**Core job:**  
When I'm running this venue, I want to create consistent, great guest experiences, so guests become regulars and the business thrives.

**Guest experience impact:**  
GM sets the tone and standards. Their decisions on staffing, systems, and processes ripple through every guest interaction. A GM with visibility = proactive improvements. A GM flying blind = reactive firefighting that guests eventually feel.

**Motivations:**
- Build a reputation guests talk about and come back for
- Create regulars, not one-time visitors
- Build a team that delivers great experiences without constant oversight
- Hit targets by getting guest experience right, not by cutting corners

**Jobs:**
- **Be visible on floor during peak service** — primary job during 7pm Saturday, not back office. Manager table visits improve satisfaction; manager farewells create loyalty moments
- Review reservations daily — are we set up for a good guest experience tonight?
- Monitor no-show rates, turn times, utilisation — these all affect guest experience
- Recognise and cultivate regulars — make them feel known
- Step in for recovery escalation — when things go wrong, GM ownership makes the difference
- Analyse trends — what's driving guests back (or away)?
- Staff appropriately — understaffing hurts guest experience

**Struggling moments:**
- No-shows hurt revenue unpredictably — can't plan around them
- Hard to forecast demand — understaffed = poor guest experience
- No data on who guests are or what drives them back
- Can't easily see what's working vs. not
- Staff churn means constant retraining — inconsistent guest experience
- Regulars not recognised — missed opportunity to make them feel valued

**Key moments:**
- Monday morning: reviewing last week, planning this week
- Friday afternoon: final check before the weekend — are we ready to deliver?
- Recognising a regular and making them feel known
- Noticing a trend — reviews mention wait times, need to investigate

**Recovery moments:**
- Regular not recognised at door → Step in personally, greet by name, find them a great table
- Service breakdown escalating → Get on the floor, take ownership, comp and apologise personally
- Bad review posted → Respond thoughtfully, reach out privately, invite them back
- Staff overwhelmed → Jump in to help, visible leadership, protect team and guest experience
- VIP complaint → Personal call or table visit, make it right, ensure they return

---

### Operator

**Role context:**  
Multi-unit operator. Owns or manages multiple venues. Doesn't run day-to-day but needs visibility across the portfolio. Focused on performance patterns, consistency, and strategic decisions. Often has ops managers or GMs reporting up.

**Core job:**  
When I'm overseeing my venues, I want to ensure consistent guest experience across all locations, so the brand delivers on its promise wherever guests visit.

**Guest experience impact:**  
Operator ensures consistency across venues. A guest visiting multiple locations expects the same standard. Operator visibility = consistent experience. Blind spots = inconsistent quality that erodes brand trust.

**Motivations:**
- Guests get the same great experience at any location
- Spot where guest experience is slipping before reviews tell us
- Hold GMs accountable for guest outcomes, not just numbers
- Grow the portfolio without diluting quality

**Jobs:**
- Review venue performance — where is guest experience strong/weak?
- Compare venues — why do guests love venue A more than venue B?
- Spot anomalies early — declining reviews, rising no-shows
- Spread successful practices — what's working at one venue should work at others
- Decide where to invest — staffing, training, systems that improve guest experience

**Struggling moments:**
- Data lives in different systems per venue — no single view of guest experience
- Hard to get apples-to-apples comparison
- Relies on GMs to flag issues — sometimes guests feel it before we know
- Sees problems after the fact, not leading indicators
- No way to know if one venue's "good night" is another's "bad night"
- Successful practices at one venue don't spread to others

**Key moments:**
- Monthly business review: which venues are delivering for guests?
- Noticing one venue slipping before it becomes a crisis
- Guest feedback pattern emerges across venues — systemic issue?
- Evaluating GM performance against guest outcomes

**Recovery moments:**
- Venue experience slipping → Intervene early, support GM, add resources before guests notice pattern
- Negative review trend → Investigate root cause, don't just pressure GM — fix the system
- Staff crisis at one venue → Redeploy from other venues, maintain guest experience
- Systemic issue identified → Roll out fix across portfolio, turn one failure into fleet-wide improvement

---

## Role Tensions

Understanding structural conflicts between roles helps explain why information handoffs fail and why coordination is difficult. Product design should accommodate these tensions, not exacerbate them.

| Tension | Roles | Root Cause | Design Implication |
|---------|-------|------------|-------------------|
| **FOH-BOH pay gap** | Servers vs. Kitchen | Servers earn $25.34/hour median vs. line cooks at $13/hour (US). Creates adversarial dynamics across the pass. | Don't design systems that expose or emphasise this divide. Enable coordination without requiring visibility into each other's workload/earnings. |
| **Table turn vs. tips** | Server vs. Restaurant | Restaurant wants fast turns for revenue; servers may prefer longer tables for relationship-building and higher tips. | Design for "efficient hospitality" — help servers deliver great experience in less time, not pressure for faster turns. |
| **Seating pace vs. kitchen capacity** | Host vs. Kitchen | Host incentive: fill seats. Kitchen reality: production capacity is fixed. Disconnect creates cascade failures. | Make kitchen capacity visible to Host. Don't assume seating and production can be managed independently. |
| **Shift handoff** | Outgoing vs. Incoming staff | Outgoing staff want to leave; incoming staff need context. Handoff quality often suffers. | Design handoffs that transfer context automatically (persist in system, not just verbal). |
| **Section fairness** | Server vs. Server | Sections assigned create unequal earning potential. Triple-seating one server while another is empty creates resentment. | Surface section load to Host; enable more balanced seating decisions. |

---

## Segment Variations

Role responsibilities and priorities vary by restaurant segment. A single role definition applied uniformly misses segment-specific needs.

### Host Variations by Segment

| Segment | Primary Focus | Secondary Focus | System Need |
|---------|---------------|-----------------|-------------|
| **Fine Dining** | VIP recognition, preference memory | Occasion management | Deep CRM integration, guest history at fingertips |
| **Polished Casual** | Balance of recognition and efficiency | Large party management | Flexible table configuration, smart waitlist |
| **Casual Dining** | Waitlist management, turn optimisation | Group booking handling | Real-time capacity visibility, fast turns |
| **Bars & Pubs** | Walk-in flow, bar vs. dining allocation | Event/private booking | Hybrid walk-in/reservation management |

### Server Variations by Segment

| Segment | Recognition Depth | Table Turn Pressure | Information Need |
|---------|------------------|--------------------|--------------------|
| **Fine Dining** | Deep — remember preferences across visits | Low — 2-3 hour seatings | Full guest profile, dietary details, occasion context |
| **Polished Casual** | Moderate — recognise regulars | Medium | Key preferences, occasion flags |
| **Casual Dining** | Light — warmth without deep personalisation | High — 60-90 min turns | Party size, special requests only |
| **Bars & Pubs** | Varies by venue | Variable | Minimal — mostly verbal |

### Integration Requirements by Segment

| Segment | Critical Integrations | Nice-to-Have |
|---------|----------------------|--------------|
| **Fine Dining** | POS (guest history), CRM, event management | Wine inventory, kitchen pacing |
| **Polished Casual** | POS (table status), waitlist | Guest recognition, feedback |
| **Casual Dining** | POS (table status), waitlist, SMS/messaging | Basic CRM |
| **Bars & Pubs** | POS (bar tabs), event booking | Table management for dining areas |

---

## External Roles

---

### Guest: First-time

**Role context:**  
Booking for the first time. Has already discovered the restaurant elsewhere (Google, Instagram, word-of-mouth, walking by) and landed on the website. No prior relationship — trust is unbuilt. Evaluating whether to commit.

**Core job:**  
When I've found a restaurant I want to try, I want to book quickly and know it's confirmed, so I can stop thinking about it and look forward to going.

**Motivations:**
- Secure a spot for the occasion
- Feel confident the booking is real
- Understand what to expect
- Not waste time on a clunky process

**Jobs:**
- Find availability that works for party and time
- Complete booking quickly
- Get clear confirmation
- Communicate any special needs
- Know what to expect on arrival

**Struggling moments:**
- Can't find availability for party size — do I call? Give up?
- Booking flow asks for account creation before showing times
- Submitted but no confirmation — did it work?
- Special request field but no idea if anyone reads it
- Show up and they can't find the reservation

**Key moments:**
- Deciding to book (conversion moment)
- Receiving confirmation (trust signal)
- Reminder before visit (reduces anxiety)
- Arrival — does reality match expectation?
- End of meal — would I come back?

---

### Guest: Group Organizer

**Role context:**  
Booking on behalf of others. Often for birthday, work dinner, reunion, or casual gathering. Bears the social burden if something goes wrong. May or may not attend themselves.

**Core job:**  
When I'm organising a group dinner, I want to find a place that fits everyone and lock it in, so I can tell the group it's sorted and not stress about it falling apart.

**Motivations:**
- Be the hero who made it happen
- Not look bad if something goes wrong
- Get it done without endless back-and-forth
- Make the occasion feel special

**Jobs:**
- Find availability for larger party size
- Book with confidence the group will be accommodated
- Share details with the group easily
- Handle changes as people drop in/out
- Communicate special requests (occasion, dietary, seating)

**Struggling moments:**
- Party size limit doesn't fit — 10 max but we're 12
- Can't share confirmation easily — have to screenshot and text
- Party size changed — modification requires starting over
- Unclear if my "birthday, window seat please" note will be seen
- I can't make it but the group still wants to go — now what?
- Friends show up and it's not what I promised

**Key moments:**
- Finding availability for larger party (make-or-break)
- Sending confirmation to the group ("I booked it!")
- Modifying party size as RSVPs change
- Arrival — is the table actually ready and right?

---

### Guest: Returning

**Role context:**  
Has been before. Knows the restaurant, has expectations. Wants the booking process to be easy and, ideally, wants to feel recognised. May range from occasional repeat to true regular.

**Core job:**  
When I want to go back to a place I like, I want to rebook quickly and have them remember me, so I feel valued and get the experience I came back for.

**Motivations:**
- Get the experience that made them return
- Feel recognised and valued
- Minimal effort to rebook
- Confidence their preferences will be honoured

**Jobs:**
- Rebook quickly without re-entering everything
- Have preferences remembered (table, dietary, occasions)
- Get accommodated even on busy nights
- Refer friends with confidence

**Struggling moments:**
- Have to re-enter info every time — "don't you know me?"
- Been here 10 times, treated like a stranger
- Preference noted last time but not honoured this time
- Busy night, no flexibility for a loyal guest
- Referred a friend, they had a bad experience — reflects on me

**Key moments:**
- Rebooking: is it faster/easier than last time?
- Arrival: do they recognise me?
- During meal: are my preferences honoured without asking?
- Referring a friend: will they have the same experience I did?

---

**Document version:** 8.0
**Status:** Updated based on strategic insights research review. Key additions: Expeditor and Busser roles, Information Chain of Custody, recovery timing windows, 2-tier priority model, Role Tensions, Segment Variations. Server and Kitchen interaction levels corrected. Departure/payment touchpoints added throughout.