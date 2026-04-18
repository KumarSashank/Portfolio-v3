# Portfolio Narrative Plan

> Source of truth for the *story* of the site — what a visitor feels, what they learn, in what order, and why.
> Written after absorbing `Raw info.md`, the hero-line discussion, and the confirmed decisions (AI Product Engineer tagline · Founding Engineer at EONVERSE · LeetWrap as lead · no WiFi hacking).
> Next doc after this: `MEDIA.md` — mapping imagery, video, and 3D to each beat. Then `MOTION.md` — scroll, transitions, and micro-interactions that animate it.

---

## 1. The Thesis

**Kumar is a builder whose curiosity is load-bearing.**
He picks problems he doesn't fully understand, ships them anyway, and the proof is public:
a Spotify-Wrapped for LeetCode with 400+ users in 23 countries, a research agent that beat GPT Deep Research 12× on time, a certificate system that has signed 12,000+ documents in production, and a startup he's founding-engineering on the side while finishing his Masters.

The portfolio's one job is to make a Canadian recruiter or hiring engineer think:
> *"This person starts before they're ready and finishes anyway — and I want that on my team."*

Everything below serves that line.

---

## 2. The Visitor

Three real people will open this site. The narrative has to work for all three without pandering to any of them.

### A. The 90-second recruiter
- Reads on phone, between candidates.
- Scans: name, role, location, availability, "have they shipped," "can I call them."
- Leaves if the first screen doesn't answer *what* and *where*.
- **Win condition:** they save the tab.

### B. The hiring engineer / eng lead (10–15 min)
- Reads on laptop. Wants range *and* depth.
- Checks: case study, stack, one thing that broke, one outcome.
- Skeptical of "full-stack engineer" unless there's a receipt.
- **Win condition:** they send the Loom to a teammate.

### C. The awards / design-director visitor
- Came from an Awwwards site-of-the-day feed.
- Wants a *feeling*. Wants craft in motion, typography, pacing.
- Will scroll slowly just to see how the site responds.
- **Win condition:** they submit it, screenshot it, or steal an idea from it.

**Primary target: B.** A + C are served by making B excellent.

---

## 3. The Feel

Three words. These are the design constraints.

1. **Deliberate.** Nothing is loud by accident. Every pause is placed.
2. **Curious.** The site rewards poking. There's always another layer.
3. **Unbothered.** Confidence without chest-beating. No exclamation marks.

If a decision violates one of these three, cut it.

---

## 4. The Through-Line

> *"Curiosity is the stack I keep coming back to. I build software so I can be lazy about the parts that matter less."*

That's the hero line. Every section after it is either **proof** of the first sentence, or **evidence** of the second. The whole site is two questions being answered in sequence:

- **"What does curiosity look like when you let it run?"** → projects, research, range.
- **"What did being lazy on purpose let you build?"** → automations, shipped products, tools.

Every page, every transition, every microcopy line should be provable against one of those two questions.

---

## 5. The Arc — Section-by-Section

The reader travels through seven beats. Each beat has a **purpose**, a **feel**, a **thesis in one line**, and a **hand-off** to the next section. If a section doesn't have all four, it doesn't belong on the site.

### Beat 0 — Preloader (≤ 2s)
- **Purpose:** Set the tempo. Convince them this is not a normal portfolio.
- **Feel:** Quiet. A held breath.
- **Thesis:** *"Something considered is about to happen."*
- **Copy:** "K.S" + counter. That's it.
- **Hand-off:** Circle reveal opens the hero. The cursor arrives early.

### Beat 1 — Hero ("The Masthead")
- **Purpose:** Answer three questions in ≤ 4 seconds: who, what, where.
- **Feel:** Still. An editorial cover, not a homepage.
- **Thesis:** *"I am an AI Product Engineer in Ontario, and curiosity is my stack."*
- **Copy anchor:** Name + hero line + spec sheet (Role / Focus / Based / Available).
- **Stats ticker:** 5+ internships · 4× hackathons · 4× research papers. Proof, understated.
- **Hand-off:** The masthead ends with a scroll cue and a thin rule. Everything below is the magazine.

### Beat 2 — Marquee Strip ("Range")
- **Purpose:** Show breadth before depth. Pre-emptively answer "is this person one-dimensional?"
- **Feel:** A ticker at a trading desk. Fast, confident, informational.
- **Thesis:** *"This one person does all of this."*
- **Content:** AI Product · Backend Systems · Agentic Pipelines · Motion Design · Blockchain Research · Founding Engineer · GenAI · UI/UX · IEEE · Hyderabad → Ontario → everywhere.
- **Hand-off:** Strip decelerates, the first section title fades up below it.

### Beat 3 — About ("The Method")
- **Purpose:** Reveal the person behind the range. The "why."
- **Feel:** Intimate. A conversation, not a pitch.
- **Thesis:** *"I start before I'm ready, and I finish anyway."*
- **Structure:**
  - **Opening line (big serif):** *"I build the things I can't stop thinking about — usually at 3 AM, usually before I know how hard they'll be."*
  - **Body (smaller, direct):** the one paragraph on EONVERSE + LeetWrap + 12K certificates + Masters — proof that the opening line is not a slogan.
  - **Three pillars:** Ship first, polish with intent · Automate the repeatable · Learn the depth on the way down.
- **Hand-off:** "Here's what curiosity has built so far." → Projects.

### Beat 4 — Selected Work ("The Receipts")
- **Purpose:** The section that closes the deal. Everything before was setup.
- **Feel:** A gallery. Each piece has space.
- **Thesis:** *"These are shipped. Six of them. In production or in 23 countries."*
- **Order matters.** The order is the argument:
  1. **LeetWrap** — public, shipped, measurable, solo. *Proves he ships to strangers.*
  2. **AI Co-Investigator** — beat GPT Deep Research 12×. *Proves he beats baselines.*
  3. **Multi-Agent GenAI Pipeline (EONVERSE)** — agent orchestration + a custom output-consistency engine. *Proves the founding-engineer claim without revealing the product.*
  4. **AI Notetaker with Longitudinal Context** — full-stack agent system. *Proves depth + scope.*
  5. **Certificate Issuance Platform** — 12,000+ certs in production. *Proves reliability at scale.*
  6. **iCho — Head-Motion Spatial Audio** — a creative receipt. *Proves the curiosity claim is real.*
- Each card answers: *what, why it's interesting, what the outcome was, what the stack was.*
- **Hand-off:** "Want the whole story?" → case study page on the top three.

### Beat 5 — Case Studies (`/work/[slug]`)
- **Purpose:** For visitors who stayed. The long-form proof.
- **Feel:** A documentary. Not a slideshow.
- **Thesis per page:** *"Here is exactly how this was built, and what broke."*
- **Structure (per case):** Problem → Constraint → What I built → What broke → What it did (metrics).
- **Top three cases (in priority order):**
  1. **LeetWrap** — architectural blog port, 400+ users, 23 countries, analytics screenshots.
  2. **AI Co-Investigator** — the GPT-DR comparison, the BigQuery orchestration diagram.
  3. **AI Notetaker with Longitudinal Context** — the memory architecture, the recording-fallback diagram, the RAG-citation flow. Safe to show publicly, deep enough to prove full-stack ownership.
- **Why not the EONVERSE pipeline?** That work is under NDA. It stays as a *project card* only — architecture language, no product idea. Deeper discussion happens in interviews, not on the site.
- **Hand-off:** "Next case →" with a magnetic tile. Or: back to home.

### Beat 6 — Research & Journey
- **Purpose:** The academic spine and the career path. Quiet credibility.
- **Feel:** A CV, but composed.
- **Thesis:** *"This has been going for a while. The depth is earned."*
- **Two columns (or two sub-sections):**
  - **Research** — IEEE publication (food supply chain), *Do Prompt Personas Matter?* (AI + security), PGP vs S/MIME, Inter-Blockchain Medical Records.
  - **Experience** — EONVERSE (Founding Engineer) → Dock → SPOCSQ → Fidelity → KISSS → Jayaho. Reverse chronological, one-line descriptors, focus chips.
- **Hand-off:** Achievement strip fades in — a confident period at the end of a sentence.

### Beat 7 — Achievements (mini-strip)
- **Purpose:** A closing exhibit, not a headline section.
- **Feel:** A footnote row. Small, sharp.
- **Content:** 1st Smacathon · 1st WebMobDevthon · 3rd Designex · 9Hacks 2× · Hacktoberfest 2022 (4 PRs) · IEEE-published · UI/UX workshop led.
- **Hand-off:** A pause. Then the closing statement.

### Beat 8 — Contact ("The Invitation")
- **Purpose:** Convert the scroll into a conversation.
- **Feel:** Warm. Quiet. Final.
- **Thesis:** *"Got an idea? Let's build it."* (already the headline — it earns its place here).
- **Layout:** Centered, oversized serif, italic-outline `it.` — the visual exhale of the site.
- **CTAs:** Email (primary), LinkedIn, GitHub. Ontario, Canada · new-grad role in Canada · always open to AI conversations.
- **Hand-off:** Footer. That's the door closing behind the visitor, not a goodbye.

---

## 6. Signature Moments (where the "wow" lives)

A site needs three moments that get screenshotted. Pick them deliberately — don't let them show up everywhere.

1. **The hero masthead holding still.** Full-bleed name, one serif line, the spec sheet reading like film credits. The fact that nothing is moving is itself the moment. Visitors who expected motion will pause.

2. **The scroll-driven workspace → dissolve.** Between Hero and About: the SvgConnections atmosphere + kinetic name resolve, and the About section rises through them like a page turn. One moment of actual 3D-adjacent motion, tied to content, not decoration.

3. **Project 01 — LeetWrap — opening.** The first project card gets the entrance. Magnetic hover, accent ink fills the "01," stats count up (400+, 23, ▲). This is the moment where range becomes *product*. It has to land.

*Rule: do not add a fourth "wow." Every additional WebGL flourish dilutes these three.*

---

## 7. What Stays Out (cut list)

Being deliberate means saying no in writing.

- **WiFi hacking.** Removed. (user decision.)
- **LSB Steganography as a project card.** Demote to a mention inside the About security-skills line. It's a school project — not a receipt.
- **Full-Stack Blog Platform.** Cut. Every engineer's second-year project.
- **Decentralized File Sharing.** Cut from projects. The honest version (Raw info: "we use existing decentralised system and connected to our app by api") doesn't survive an interview question. Mention it in experience copy if needed.
- **Freelance Builds as a card.** Roll into SPOCSQ / Dock. Don't dilute the project slots.
- **Every "Creative Engineer" string.** Replaced with "AI Product Engineer." (done.)
- **The illustrated workspace SVG in the hero.** It fights the name for attention. Keep `SvgConnections` only — that's the one atmospheric layer.
- **The EONVERSE product idea itself.** Under NDA. The site talks architecture, not product — the specific domain, the media format, and the consistency mechanism stay out of every surface. Deeper conversations happen in interviews.
- **Adjective stacking.** No "passionate," no "cinematic," no "creative builder." If a sentence has more than one adjective, cut one.

---

## 8. Voice Rules (microcopy contract)

- **First person, but sparingly.** "I shipped" > "I am passionate about shipping."
- **Metrics before modifiers.** "400+ users across 23 countries" > "popular side project."
- **One specific noun beats two vague ones.** "Hyperledger Cactus" > "blockchain tooling."
- **Prefer past tense for work, present tense for philosophy.** "I built" / "I start before I'm ready."
- **No em-dash in a row.** One per paragraph max. The rhythm matters.
- **Sentence fragments are allowed.** "Shipped. Then shipped the next one." But only where the break has intent.
- **Never apologize for range.** "I do X, Y, and Z" — no "and also, a bit of."

---

## 9. Reading Paths (the three audiences, mapped)

The arc is one path, but the site has to support three.

### Path A — The Recruiter (90s)
Preloader → Hero → Marquee → Experience → Contact.
*They never scroll into projects. The hero + marquee + experience alone have to answer: "Is this person worth a 15-minute screen?"*

### Path B — The Hiring Engineer (10–15 min)
Everything in order, with a detour into **one case study** (probably LeetWrap or AI Co-Investigator).
*They want the receipts. The "View Case Study" CTA on project 01 is the single most important link on the site.*

### Path C — The Design / Awards Judge (3–5 min)
They'll scroll slowly through the whole thing, reading nothing deeply, watching how the page breathes.
*What they remember is pacing, typography, and the three signature moments. Copy is not their primary concern.*

**Each section must work at three depths:**
glance (1s), skim (5s), read (30s). If a section fails at any depth, it needs rework.

---

## 10. What Happens Next (doc sequence)

This narrative doc is the spec. From here, two more docs are written before any more code ships:

### `MEDIA.md` (next)
For each beat (0 → 8), answer:
- What image, video, diagram, or 3D object serves this beat?
- What must Kumar capture or generate? (screenshot, 15s screen recording, architecture diagram, headshot, etc.)
- What's the fallback if the asset isn't ready?

### `MOTION.md` (after media)
For each beat, answer:
- Entrance animation (on-scroll reveal).
- Ambient motion (idle loops).
- Interaction motion (hover, click, magnetic, cursor).
- Transition motion (how this beat hands off to the next).
- Reduced-motion fallback.

**After both docs exist, the hero goes back on the chopping block — but this time the edits are in service of a specified story, not our taste.**

---

## 11. One Line to Remember

> The whole portfolio is Kumar answering one question:
> **"What does curiosity look like when you let it run?"**
> Every pixel either answers it, or gets cut.
