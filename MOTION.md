# Portfolio Motion Plan

> Follows `NARRATIVE.md` and `MEDIA.md`. Final planning doc before code resumes.
> Stack: **GSAP + ScrollTrigger + SplitText**, **Framer Motion**, **Lenis** (smooth scroll foundation).
> Goal: motion serves the story. Anything that doesn't earn a beat in the narrative gets cut.

---

## 1. Principles

Four rules. Every animation has to pass all four.

1. **Motion is content.** It should reveal something — hierarchy, sequence, feedback. Decoration without information gets cut.
2. **Slower than you think.** This is editorial pacing, not TikTok. Default entrance is ~0.8s, not 0.3s. Restraint is the brand.
3. **One thing at a time.** No two large elements move simultaneously. Stagger or sequence them. Concurrent motion is visual noise.
4. **Reduced-motion is not an afterthought.** Every animation has a `prefers-reduced-motion` fallback specified at design time, not bolted on later.

---

## 2. Tool Boundary (so we never argue with ourselves)

Three libraries. Clear ownership lines.

| Tool | Owns | Why |
|------|------|-----|
| **Lenis** | Smooth scroll foundation, scroll position source of truth | One scroll system. ScrollTrigger and `useScroll` both read from it. |
| **GSAP + ScrollTrigger + SplitText** | Anything time-based: SVG stroke-draw, scroll-pinned timelines, character/word reveals, preloader, marquee, count-up, diagram draw-on, name reveal | Imperative, frame-perfect, tight stagger control |
| **Framer Motion** | Anything React-state-based: hover/press states, magnetic CTAs, `AnimatePresence` page transitions, drag/gesture, layout animations | Declarative, integrates with React lifecycle |

**The rule:** If the animation is about **time**, use GSAP. If it's about **React state or component lifecycle**, use Framer Motion. If it's about both — write a small hook that composes them, never duplicate.

---

## 3. Global Motion Tokens

Treat these like color tokens. Every animation references one.

### Timing scale
| Token | Value | Use |
|-------|-------|-----|
| `t-micro` | 150ms | Hover, press, focus state changes |
| `t-quick` | 250ms | Color/border transitions, cursor morphs |
| `t-base` | 600ms | Standard fade/slide entrance |
| `t-grand` | 900ms | Body content entrance (after eyebrow) |
| `t-signature` | 1.4s | Hero name reveal, preloader, big moments |
| `t-loop-short` | 3s | Ambient yoyo (float, breathe) |
| `t-loop-long` | 8s | Atmospheric pulse, color drift |

### Easing
| Token | Equivalent | Use |
|-------|-----------|-----|
| `ease-out-soft` | `power2.out` / `[0.22, 1, 0.36, 1]` | Default for almost everything |
| `ease-out-snap` | `power3.out` | Body content, primary entrances |
| `ease-out-expo` | `expo.out` | Signature reveals only (name, preloader exit) |
| `ease-in-out-expo` | `expo.inOut` | Page transitions |
| `ease-elastic-soft` | `elastic.out(1, 0.3)` | Magnetic return-to-rest |
| `ease-linear` | `none` / `linear` | Marquee, slow rotations |

### Stagger defaults
| Granularity | Stagger |
|-------------|---------|
| Character (SplitText) | 0.02–0.03s |
| Word | 0.05–0.06s |
| Line | 0.10s |
| Card / row | 0.10–0.12s |

### Distance defaults
- Y-translate entrance: **22px** (text), **40px** (cards/images)
- X-translate entrance (timeline rows): **30px**
- Hover lift: **2–4px**
- Magnetic deviation: **8–14px** max

---

## 4. Beat-by-Beat Motion Spec

Each beat lists: **Entrance** (first reveal), **Ambient** (idle loops), **Interaction** (hover/click), **Handoff** (transition to next beat).

### Beat 0 — Preloader
- **Entrance:**
  - K.S monogram SVG: stroke-draw via GSAP `stroke-dashoffset` from total length → 0. **1.2s**, `ease-out-soft`.
  - Counter 0 → 100, driven by `useProgress` from Drei (or a manual asset-load hook). Decelerating ease.
- **Ambient:** Cursor blink on the trailing line of the counter only. 500ms yoyo.
- **Interaction:** None.
- **Exit (handoff):** Circle-expand `clip-path` from center, GSAP **1.0s**, `ease-in-out-expo`. Fades into hero with no flash.
- **Floor:** 2.0s minimum display, even if assets load instantly.
- **Reduced-motion:** Show monogram + counter as static. Skip stroke-draw and clip-path. 800ms hold then unmount.

### Beat 1 — Hero / Masthead — *Signature Moment #1*
- **Entrance** (single GSAP timeline, delay 1.1s after preloader):
  1. Masthead strip: `y +12 → 0`, `opacity 0 → 1`, **0.7s**, `ease-out-soft`
  2. KineticName: per-char `yPercent 120 → 0`, `rotateX -20 → 0`, **1.4s**, `ease-out-expo`, stagger amount 0.8
  3. SvgConnections: each line stroke-draw via `stroke-dashoffset`, **1.6s**, stagger 0.03 from start
  4. Pull-quote: `y 22 → 0`, `opacity 0 → 1`, **0.8s**, `ease-out-snap`, +0.9 after name
  5. Spec sheet: same shape, +0.1 offset
  6. Ticker stats: same shape, +0.15 offset
  7. CountUp on stats: 1.4s deceleration, fires when ticker enters position
- **Ambient:**
  - SvgConnections: a slow path "glow" walks across the network — opacity pulse 0.4 → 0.6 → 0.4, **8s** linear loop
  - KineticName: subtle float — `y -4`, **3.0–3.5s** sine yoyo per char, offset 0.1s each
  - Availability dot: ping (Tailwind `animate-ping` already in place)
- **Interaction:**
  - KineticName per-char magnetic hover (already built — keep current GSAP impl)
  - "See selected work" CTA: gap-widens on hover (Tailwind), Framer Motion magnetic translate ±10px
  - Spec sheet rows: opacity 0.88 → 1.0 + 1px left-translate on hover, **150ms**
- **Handoff (on scroll-out):**
  - SvgConnections fades to 30% opacity as user scrolls past
  - Pull-quote parallax 0.6× scroll speed
  - Masthead strip pins for the first 200px then unpins
- **Reduced-motion:** Static layout. KineticName renders in final position. SvgConnections drawn but no glow loop. CountUp shows final values immediately.

### Beat 2 — Marquee
- **Entrance:** Strip fades + scales from 0.96 → 1.0, **0.6s**, `ease-out-soft`. Triggered when 60% visible.
- **Ambient:** Continuous horizontal scroll via GSAP `xPercent` linear loop, **40s** per cycle. Two duplicate strips for seamless wrap.
- **Interaction:**
  - Hover anywhere on strip: scroll decelerates to 0 over 400ms (`ease-out-soft`)
  - Mouse leave: ramps back to full speed over 600ms
- **Scroll-reactive:**
  - Scroll velocity multiplier: scroll fast → strip moves up to 2.5× speed
  - Scroll-up: strip reverses direction (sign flip on `xPercent` rate)
- **Handoff:** Strip decelerates from full speed to 0.4× as the next section title enters viewport. Strip itself never disappears.
- **Reduced-motion:** Static strip, no scroll, no velocity reaction. Just type.

### Beat 3 — About
- **Entrance** (ScrollTrigger, fires at 70% in-view):
  - Section label (mono "— ABOUT"): typewriter via SplitText chars, **0.02s** stagger
  - Opening serif line: SplitText by **word**, `y 22 → 0`, `opacity 0 → 1`, **0.06s** stagger, `ease-out-snap`
  - Body paragraph: line-by-line wipe-up — wrap each line in `overflow-hidden`, translate inner `y 100% → 0`, **0.7s**, **0.08s** stagger
  - Portrait: `scale 1.08 → 1.0` + `opacity 0 → 1`, **1.2s**, `ease-out-soft`
  - Three pillar cards: `y 24 → 0`, **0.8s**, **0.10s** stagger
- **Ambient:**
  - Portrait: very subtle Ken Burns — `scale 1.0 → 1.03`, **18s** sine yoyo
  - Optional environmental photo (if shipped): parallax 0.2× scroll
- **Interaction:**
  - Pillar cards: border opacity 0.1 → 0.2 + lift `y -2`, **200ms** (Framer Motion)
  - Portrait: gentle 3D tilt based on cursor position, max 4°, spring back on leave (Framer Motion `useSpring`)
- **Handoff:** Section number for "Work" fades up at 30% before About fully exits.
- **Reduced-motion:** Word/line stagger replaced with single fade-in at 0.3s. Portrait static. No Ken Burns. No tilt.

### Beat 4 — Selected Work (Project Cards)

**Per featured card** (top 3, full-width layout):
- **Entrance** (each card on enter-viewport):
  - Card panel: `y 40 → 0`, `opacity 0 → 1`, **0.9s**, `ease-out-snap`
  - Project number "01"/"02"/"03": SVG path stroke-draw, **0.6s**, fires at +0.1
  - Image/screenshot: `scale 1.10 → 1.00` + `opacity 0 → 1`, **1.0s**, `ease-out-soft`
  - Outcome block (right column): `opacity 0 → 1`, **0.6s**, +0.2 after card
  - Metric chips: `y 12 → 0` cascade, **0.4s** each, **0.08s** stagger, +0.4 after card
- **Ambient:** Accent dot in card header pulses opacity 0.7 → 1.0, **2s** yoyo.
- **Interaction:**
  - Card hover: subtle 3D tilt based on mouse (max 3°, Framer Motion `useSpring`)
  - "View case study" CTA: magnetic, ±12px (Framer Motion)
  - Image hover (Phase 2 polish): WebGL displacement shader ripples from cursor (R3F + custom GLSL) — **fallback:** `scale 1.02` + `brightness 1.05`, 250ms
  - Tags: border color fade to accent on hover, **150ms**

**Project 01 — LeetWrap — *Signature Moment #3***
On top of the standard card motion:
- The "01" SVG path doesn't just draw — accent ink **fills** it as the line completes (clip-path reveal, 0.4s after stroke completes)
- Stats "400+" / "23" / "▲" count up **in sequence** (not parallel): 0.6s + 0.6s + 0.4s
- Card surface gets a one-time accent-edge sweep (a 1px line travels along the card border on first reveal, 1.2s linear)

**Archive cards** (bottom 3, smaller grid):
- Entrance: `y 24 → 0` + `opacity 0 → 1`, **0.7s**, **0.10s** stagger between cards
- Hover: lift `y -3`, accent dot grows 12px → 16px, **200ms**
- No 3D tilt. No image distortion. Quieter by design.

- **Handoff:** Last archive card finishes entering, then a subtle horizontal rule above the next section draws on (width 0 → 100%, 0.6s).
- **Reduced-motion:** All cards fade in (0.3s). No tilt, no scale-from-1.10. CountUp shows final values. Image distortion disabled.

### Beat 5 — Case Studies (`/work/[slug]`)
- **Page transition in:** Full-screen accent-color rect wipes from bottom → top via `AnimatePresence` (Framer Motion). **0.8s**, `ease-in-out-expo`. URL changes mid-wipe so the destination is mounted under the rect.
- **Hero loop video:** Autoplay + muted + loop + playsinline. Poster image shown until ready. **No** crossfade — just snap to playing.
- **Section entrances** (ScrollTrigger):
  - Title: SplitText word reveal, same as About
  - Body paragraphs: line-by-line wipe-up
  - Architecture diagrams: SVG stroke-draw via GSAP, scroll-scrubbed (diagram completes drawing as user scrolls past it). **2.0s** range mapped to 30% of viewport scroll
- **Metrics bar (AI Co-Investigator):** Bars grow from 0 → final width on enter-viewport, **1.2s** stagger 0.15s. Numbers count up.
- **"Next case" link** (bottom of every case page):
  - Magnetic CTA, ±14px (Framer Motion)
  - Hover: arrow gap widens, contextual cursor text "→ Next case"
- **Page transition out:** Same accent wipe, top → bottom this time, **0.7s**, `ease-in-out-expo`.
- **Reduced-motion:** No wipe transitions (instant route change). Diagrams pre-drawn. Bars at final width. Word reveals replaced with single fade.

### Beat 6 — Research & Experience
- **Entrance** (ScrollTrigger):
  - Vertical timeline line on left edge: SVG `stroke-dashoffset` scrubbed by scroll position. Line reveals as you scroll through the section.
  - Each experience row: `x -30 → 0`, `opacity 0 → 1`, **0.7s**, `ease-out-snap`. Stagger 0.10s between rows.
  - Research cards: alternating `x -30` / `x +30` based on row parity, same shape.
- **Ambient:** None. This section breathes. Every other section earns its motion; this one earns its silence.
- **Interaction:**
  - Row hover: left-border accent line expands from 1px → 3px, **200ms**. Focus chips lift `y -2`.
  - "Read publication" link (IEEE row): text underline draws from left to right on hover, **300ms**.
- **Handoff:** Achievement strip fades in below the last experience row.
- **Reduced-motion:** Timeline line fully drawn at start. Rows fade in only.

### Beat 7 — Achievements
- **Entrance:** Each achievement: `opacity 0 → 1` + `y 8 → 0`, **0.4s**, **0.05s** stagger between items.
- **Ambient:** None.
- **Interaction:** Hover: number/icon scale 1.0 → 1.06, **150ms**. That's it. This is a footnote.
- **Handoff:** A 2px accent rule draws across the section bottom (width 0 → 100%, **0.8s**) as visual punctuation before Contact.
- **Reduced-motion:** Static row.

### Beat 8 — Contact
- **Entrance** (ScrollTrigger, fires at 60% in-view):
  - "Got an idea?" line: word-by-word fade-up, **0.10s** stagger, **0.9s** duration each, `ease-out-snap`
  - "Let's build" line: same, +0.4s offset
  - "it." (italic outline): outline draws via SVG `stroke-dashoffset` (1.0s), then accent ink fills via clip-path mask (0.6s). Total 1.6s.
  - CTAs (Email / LinkedIn / GitHub): `y 16 → 0`, `opacity 0 → 1`, **0.6s**, **0.08s** stagger
  - Footer line: delayed 0.3s after CTAs
- **Ambient:**
  - Subtle accent background pulse: opacity 0.15 → 0.22, **4s** sine yoyo
  - Optional handwritten signature (if shipped): hand-drawn stroke loops every 12s on idle
- **Interaction:**
  - Three CTAs: magnetic (Framer Motion, ±10px)
  - Hover on "it." re-triggers the outline ink fill (caps at 1× per 2s to prevent spam)
  - Email button: on click, brief "copied" feedback if user holds option/alt (or always — TBD)
- **Handoff:** None. End of page. Footer is the final exhale.
- **Reduced-motion:** Word stagger replaced with single fade. "it." renders fully filled. No background pulse. No hover re-draw.

---

## 5. The Three Signature Moments — fully specified

These are the screenshots the site lives or dies by. Specify them once, defend them everywhere.

### #1 — Hero Masthead Holding Still
- **What you see:** Full-bleed name. One serif line. Spec sheet. SvgConnections breathing softly behind.
- **What's animating:** Almost nothing. Per-char float on the name (4px, 3s yoyo). One slow path-glow walking across SvgConnections (8s loop). Availability dot ping.
- **Why it's a signature:** Visitors expect a homepage to throw motion at them. The restraint is the moment.
- **Defend by cutting:** Anything that makes this section feel busy. No video bg. No hero illustration. No floating glyphs.

### #2 — Hero → About Transition
- **What you see:** As you scroll out of the hero, the SvgConnections atmosphere doesn't just fade — its lines retract toward a single anchor point on the right while the About section's serif opening line types up through them.
- **How it works:** GSAP timeline scrubbed by scroll position over a 100vh range. SvgConnections paths animate `strokeDashoffset` back toward their start point. About section content rises with `y 60 → 0` mapped to the same scroll range.
- **Why it's a signature:** It's the only moment in the site where two beats actively *braid*. Everywhere else, beats hand off cleanly. Here, they overlap.
- **Defend by cutting:** Don't add a third element to this transition. The retraction + the type rise — that's it.

### #3 — Project 01 (LeetWrap) Opening
- **What you see:** When the LeetWrap card enters the viewport, the "01" draws and fills with accent ink in sequence, three stats count up *one after another* (not parallel), and a 1px accent-edge sweep travels around the card border once.
- **Why it's a signature:** This is the moment range becomes *product*. The transition from "about a person" → "this person ships." It has to land.
- **Defend by cutting:** Don't repeat the accent-edge sweep on other cards. It's the LeetWrap signature, not a pattern.

---

## 5b. Showcase Pieces — five demonstrations of craft

Five animations built specifically to *demonstrate ability*. Each one is technically non-trivial, has a clear architectural reason it's hard, and serves a specific beat in the narrative — never decorative. Each is also designed to be self-contained and pointable-at in interviews.

### Showcase 01 — Particle field morph: K.S logo → SvgConnections
- **Where:** Preloader → Hero (bridges Beat 0 and Beat 1).
- **What it does:** ~1,200 particles render on a single full-screen `<canvas>`. They converge from random scatter positions into the "K.S" letterform during the preloader. On preloader exit, they morph into the anchor positions of the SvgConnections network — the preloader and hero atmosphere are *the same particles*, repositioned.
- **Why it impresses:**
  - Letterform sampling: parse SVG paths → uniform-distance point sampling → deterministic anchor positions
  - One canvas, 1,200 particles, 60fps — proves you understand `requestAnimationFrame` budgeting
  - GSAP timeline with three keyed positions per particle (random → letter → connection node) and per-particle easing offsets
  - Continuity beat: the user never sees "loading screen" → "homepage." They see one continuous transformation. That's a hard architectural choice.
- **Fallback:** Static SVG K.S monogram on preloader, SvgConnections fades in on hero (no continuity).
- **Implementation note:** Build the letterform sampler as a pure utility (`sampleSvgPath(d, count)`). Reusable for "hire me" easter eggs later.

### Showcase 02 — WebGL displacement shader on LeetWrap card hover
- **Where:** Beat 4, Project 01 card image (Signature Moment #3 enhancement).
- **What it does:** The LeetWrap screenshot is rendered as a WebGL texture inside an `<R3F Canvas>`. A custom GLSL fragment shader displaces the texture's UV coordinates based on the cursor's distance from each pixel, with chromatic aberration sampling RGB channels at slightly offset positions. Cursor movement creates a real-time ripple distortion across the image.
- **Why it impresses:**
  - Pure GLSL — Kumar wrote a shader. Few new-grad portfolios show that.
  - Three-channel RGB offset proves the dev understands light wavelength dispersion as a stylistic choice
  - GPU-tier gating via `useMotionPrefs` — degrades gracefully to CSS scale on low GPUs. Demonstrates engineering pragmatism.
- **Fallback (auto):** Detected via `gpuTier < 2`. Shows CSS `scale(1.02)` + `brightness(1.05)` instead.
- **Implementation note:** Single `.glsl` file imported via `glslify` or inline template literal. Clean, copy-pasteable in interviews.

### Showcase 03 — Hero name kinetic with per-char 3D physics
- **Where:** Beat 1 (upgrades the existing `KineticName.tsx`).
- **What it does:** Each character of the name gets individual `rotateX` / `rotateY` / `translateZ` based on the angle and distance from the cursor to the character's center. As the cursor moves, characters tilt to "face" the cursor in 3D space — like a row of small mirrors catching light. Spring physics on the return-to-rest.
- **Why it impresses:**
  - 3D CSS transforms with `perspective` — proves comfort with non-trivial CSS
  - Per-element transform math computed every frame for ~10–15 chars without dropping frames
  - Spring physics composition (Framer Motion `useSpring` with carefully tuned stiffness + damping)
  - The current `KineticName` already has a basic per-char hover; this upgrade makes it *system-wide* — a single mousemove listener drives all chars.
- **Fallback:** Existing per-char hover behavior (already shipping).

### Showcase 04 — Cursor with proximity attractor field
- **Where:** Globally (Beat 6 of `MOTION.md` — Cursor + Magnetic System).
- **What it does:** Every frame, the cursor reads the positions of all `[data-magnetic]` elements within a 100px radius. It computes a single attraction vector and bends the ring toward the strongest pull. The element itself *also* translates toward the cursor (max ±12px). They meet in the middle, not just one or the other.
- **Why it impresses:**
  - GSAP `quickTo` for sub-frame ring positioning (hits 120fps on supported displays)
  - Spatial query optimization: build a quadtree once on mount, only re-query nearest neighbors on cursor move (not naive O(n) scan every frame)
  - Mutual magnetism is conceptually subtle — most magnetic implementations move only one side. Doing both makes the interaction feel *intentional*.
- **Fallback:** Default cursor (no magnetic) on touch devices and under reduced motion. Both gated by `useMotionPrefs.canShowCursor`.

### Showcase 05 — Page transition with cursor-position radial reveal
- **Where:** Home ↔ Case Study transitions (Beat 5).
- **What it does:** A custom `<TransitionLink>` component captures the user's mouse coordinates on click. On route change, an `AnimatePresence`-managed full-screen `<motion.div>` wipes in with `clip-path: circle(0px at X Y)` and animates to `circle(200vmax at X Y)`. The transition originates from where the user clicked — the visual feels causal, not arbitrary.
- **Why it impresses:**
  - The transition has *intent* — it knows where the user looked and starts there
  - SVG `clip-path` animation with viewport-relative units (`vmax`) handles all aspect ratios
  - Coordination across React lifecycle (capture event → store coords → trigger AnimatePresence → unmount old route mid-wipe → mount new route)
  - Subtle but extremely memorable. The kind of detail that makes a design judge stop scrolling.
- **Fallback:** Instant route change with no wipe (under reduced motion).

---

### Showcase pieces — at-a-glance tier matrix

| # | Piece | Beat | Library | GPU gated | Reduced-motion gated |
|---|-------|------|---------|-----------|----------------------|
| 01 | Particle field K.S → SvgConnections | 0 → 1 | GSAP + Canvas | No | Yes |
| 02 | WebGL displacement shader | 4 (LeetWrap) | R3F + GLSL | Yes | Yes |
| 03 | 3D per-char name physics | 1 | Framer Motion | No | Yes |
| 04 | Cursor proximity field | Global | GSAP `quickTo` | No | Yes |
| 05 | Cursor-origin page wipe | 5 | Framer Motion | No | Yes |

**Build order: 04 → 03 → 05 → 01 → 02.** Cursor first because every other showcase composes against it. Particle field and shader last because they're the most isolated and lowest-risk to defer.

---

## 6. Cursor + Magnetic System

A custom cursor is one of the highest-value motion details. Specifications:

### Default cursor
- 6px solid dot at exact cursor position (no lag)
- 40px ring trailing behind, lerp 0.12 (~0.1s lag feeling)
- Ring uses `mix-blend-mode: difference` so it inverts whatever's underneath
- Hidden on touch devices and when `prefers-reduced-motion: reduce`

### Hover states
| Over | Behavior |
|------|----------|
| Plain link | Ring expands 40 → 56px, **200ms** |
| Project card | Ring morphs to a 90×30px rounded pill containing "View Case" text, **300ms** |
| Email CTA | Ring shows "✉ Copy", same morph |
| Image (project) | Ring becomes a 70px circle with a "+" inside |
| Body text | No change (default cursor is fine over text) |

### Magnetic behavior
- Ring gravitates toward the nearest interactive element within a **100px** radius
- Pull strength scales linearly with proximity (0 at 100px, max at 0px)
- Magnetic *return* on mouse leave uses `ease-elastic-soft` over 700ms
- Element itself also translates toward cursor (max ±12px) — the element and the cursor meet in the middle

### Implementation
- Built with GSAP `quickTo` for sub-frame responsiveness
- One global `<CustomCursor />` component subscribed to `mousemove` once
- Element-level magnetic via Framer Motion `useSpring` with a stiffness of 200, damping of 25

### Reduced-motion fallback
- Native cursor restored. No magnetic. No ring. No contextual text.

---

## 7. Page Transitions

Two routes: home and `/work/[slug]`. Transitions only happen between them.

### Home → Case Study
1. User clicks "View case study" CTA
2. Framer Motion `AnimatePresence` triggers exit
3. Accent-color full-screen rect wipes from bottom → top, **0.8s**, `ease-in-out-expo`
4. URL changes when the rect fully covers the screen (mid-transition)
5. New page mounts under the rect
6. Rect wipes top → bottom to reveal new page, **0.7s**

### Case Study → Home (back)
- Same shape, reversed: top → bottom on exit, bottom → top on enter
- Browser back-button uses the same animation (intercept via Next.js routing)

### Case Study → Next Case
- Single horizontal slide: outgoing page wipes left, incoming wipes in from right
- **0.9s** total, `ease-in-out-expo`

### Reduced-motion
- All transitions become instant. No wipe, no fade. URL changes, new page renders. Done.

---

## 8. Reduced-Motion Contract

`prefers-reduced-motion: reduce` is **detected once on mount** and stored in a context. Every motion component reads from it.

### Globally disabled when reduced-motion
- All scroll-pinned animations
- All stroke-draw / SVG path animations
- All character/word stagger reveals (replaced with single 200ms fade)
- All ambient loops (float, glow, pulse, Ken Burns)
- All page transition wipes (instant route change)
- All magnetic behavior
- Custom cursor (native cursor restored)
- Image distortion shaders
- Marquee scroll (static strip)
- CountUp animation (final values shown immediately)

### Globally allowed under reduced-motion
- Opacity fades, max **300ms**
- Color/border transitions (hover feedback), max **200ms**
- Layout shifts caused by responsive design (not animation)

### Test command
- macOS: System Settings → Accessibility → Display → Reduce motion
- Chrome DevTools: Rendering panel → Emulate CSS media feature → `prefers-reduced-motion: reduce`

---

## 9. Performance Budget

### Targets
- **60fps** sustained on every animation, every device tier
- **No** dropped frames during signature moments (#1, #2, #3)
- **Lenis lerp:** 0.10 (smooth but responsive)
- Scroll position read at most **once per frame** (everything subscribes to one rAF tick)

### GPU vs CPU
- Animate **only** `transform` and `opacity` for high-frequency animations
- Never animate `width`, `height`, `top`, `left`, `box-shadow` directly — use `transform: scale/translate` + a baked shadow
- `will-change: transform, opacity` applied **only** to elements actively animating, removed after the animation completes
- Use `xPercent` / `yPercent` (GSAP) instead of pixel values for transform performance

### Heavy work boundaries
- WebGL image distortion (Project hover, Phase 2): only on `prefers-reduced-motion: no-preference` AND GPU tier ≥ 2 (detect-gpu)
- 3D atmospheric layer in hero (if added later): same gating
- Total JS budget for motion: **<100KB** (gzipped) across GSAP + Framer Motion + Lenis combined. Tree-shake aggressively.

### Profiling
- Lighthouse run after each beat is wired up — INP <100ms, CLS <0.05
- Real-device test: iPhone 12 (mid-tier), test that ambient loops don't drain battery noticeably (<10% over 5 min)

---

## 10. What Ships First (MVP vs Polish)

**MVP — required for launch:**
- Lenis smooth scroll active
- Preloader with stroke-draw + clip-path exit
- Hero entrance timeline (already built — keep)
- KineticName per-char reveal + magnetic hover (already built — keep)
- SvgConnections stroke-draw + ambient glow (already built — keep)
- All section entrance reveals via ScrollTrigger (Beats 2–8)
- Marquee continuous scroll (no scroll-velocity reaction yet)
- CountUp on stats (already built)
- Magnetic CTAs on Hero + Contact (Framer Motion)
- Custom cursor — basic dot + ring + link expansion
- Page wipe between home ↔ case study
- Reduced-motion behavior on **every** beat

**Polish — post-launch if time-crunched:**
- Hero → About braided transition (Signature #2 — defer if needed but try to ship)
- LeetWrap card signature treatment (Signature #3 — same)
- WebGL image distortion on project hovers
- Cursor contextual text ("View Case", "Copy")
- Magnetic gravitation (100px proximity pull on cursor)
- Marquee scroll-velocity reaction
- Case study scroll-scrubbed diagram draw-on
- Optional sound design (toggle in nav, default off)

**Cut entirely (don't even prototype):**
- Hero 3D scene (workspace) — `IllustratedWorkspace.tsx` is already in the codebase. Stop using it. SvgConnections is the only atmospheric layer in the hero.
- Floating decorative glyphs in the hero
- Anything that uses `IntersectionObserver` directly — ScrollTrigger handles all of it
- Parallax on text (parallax is for atmosphere, not content)

---

## 11. Implementation Order

When code resumes, build in this order. Each step is independently shippable.

1. **Foundation:** Lenis + ScrollTrigger bridge, motion-token constants file, `useReducedMotion` context, `<CustomCursor />` component shell
2. **Beat 1 polish:** Audit existing hero motion against this spec, fix any drift
3. **Beats 2–4 entrances:** ScrollTrigger reveals on Marquee, About, Projects (in that order, top-down)
4. **Beat 4 special:** LeetWrap signature treatment (Signature #3)
5. **Beats 5–8 entrances:** Case study transition system, Research/Experience timeline, Achievements, Contact
6. **Cursor:** Default + link expansion, then contextual text
7. **Magnetic system:** CTAs first, then proximity gravitation
8. **Signature #2:** Hero → About braided transition (last, because it touches two completed beats)
9. **Polish layer:** WebGL distortion, marquee velocity, scroll-scrubbed diagrams
10. **Reduced-motion audit:** Walk every beat with reduce-motion on, fix any leaks

---

## 12. One Line to Remember

> Motion is the punctuation of the narrative.
> If it isn't telling you where the sentence ends, it's typo.
