# Portfolio Media Plan

> Follows `NARRATIVE.md`. Precedes `MOTION.md`.
> For each beat, this doc answers: what media serves it, what Kumar captures, what the fallback is, and where the file lives.
> If a beat isn't listed, it needs no media.

---

## 1. Philosophy

Three rules for every asset.

1. **Evidence over decoration.** A screenshot of LeetWrap beats a stock gradient every time. If an image isn't proof, it probably isn't on the site.
2. **Quiet tone, loud content.** The media should feel like plates in a magazine — low-saturation, deliberate crop, never trying too hard. The *thing shown* does the work, not the styling.
3. **Type is media too.** Oversized serifs, numeric stats, and monospace specimens count as visuals. If the section can be carried by typography, don't add an image just because there's space.

---

## 2. Asset Tiers

Kumar's actual time budget for capture matters. Prioritize accordingly.

### Tier 1 — **Must-have** (site is broken without these)
| # | Asset | Used in |
|---|-------|---------|
| T1.1 | 3 LeetWrap screenshots (wrap result, analytics, architecture blog header) | Hero of Project 01 · Case study |
| T1.2 | 3 architecture diagrams (AI Co-Investigator, Multi-Agent Pipeline, AI Notetaker) | Project cards 02 · 03 · 04 + case studies 02 · 03 |
| T1.3 | iCho demo clip OR 3-axis diagram | Project 06 |
| T1.4 | One portrait photo | About beat · Contact beat |

### Tier 2 — **Should-have** (case studies land weakly without these)
| # | Asset | Used in |
|---|-------|---------|
| T2.1 | 3 screen recordings (15–30s each): LeetWrap · AI Co-Investigator · AI Notetaker | Case study hero loops |
| T2.2 | 3–5 static screenshots per case (so ~9 total) | Case study body |
| T2.3 | Certificate template screenshot (redacted) | Project 05 |
| T2.4 | AI Notetaker screenshot (meeting data redacted) | Project 04 |

### Tier 3 — **Nice-to-have** (won't block launch)
| # | Asset | Used in |
|---|-------|---------|
| T3.1 | Environmental photo (workspace at night, screen glow) | About beat ambient |
| T3.2 | IEEE paper first-page thumbnail | Research section |
| T3.3 | Handwritten signature scan ("— Kumar") | Contact close |
| T3.4 | 1–3 testimonial quotes (professor, client, or LeetWrap user) | Case study pull-quotes |

---

## 3. Beat-by-Beat Media Spec

### Beat 0 — Preloader
- **Media:** None photographic. A "K.S" monogram built from SVG path geometry, drawn on via `stroke-dashoffset`.
- **Capture needed:** None. Built in code.
- **Fallback:** Three-dot loader in accent color. Less memorable, still works.

### Beat 1 — Hero / Masthead
- **Media:** The hero is **intentionally image-free.** The Kinetic Name + SvgConnections atmosphere + editorial spec sheet carry the whole section. This is Signature Moment #1 — its power comes from restraint.
- **Capture needed:** None. The only optional asset is a single small dot or glyph near the "Available" spec line — handled in code.
- **Fallback:** N/A. If the hero ever feels empty, we move the solution to MOTION (micro-movement on the spec sheet), not MEDIA.

### Beat 2 — Marquee Strip
- **Media:** Text-only ticker. Optional tiny SVG separators between terms (◆ / ● / ⟡).
- **Capture needed:** None.
- **Fallback:** N/A.

### Beat 3 — About
- **Media:**
  - **Primary:** One portrait photo (T1.4) — used at the start of the About block. Quiet, slightly shadowed, looking off-frame. Not smiling for the camera. Not a LinkedIn headshot.
  - **Optional:** One environmental photo (T3.1) — a crop of Kumar's actual desk at night. Screen glow, coffee cup, no face. Reinforces the "3 AM builder" line without being literal.
- **Capture needed:**
  - **Portrait (T1.4):** Near a window, 30–60 min before sunset. Phone camera in 4K is fine. 3–5 frames. Plain background (wall, not bedroom). Looking 15° off-camera. B&W or low-saturation.
  - **Environmental (T3.1):** Shot after dark. Monitor clearly running code/terminal. Slight motion blur is fine — it's atmosphere, not product. Landscape orientation, 3:2 crop.
- **Fallback:** Skip the environmental photo. Replace with a single oversized serif pull-quote of the opening line. Still works.

### Beat 4 — Selected Work (Project Cards)

Per-card treatment. **This is the heaviest capture lift.**

#### Project 01 — LeetWrap *(lead card, signature moment #3)*
- **Media:**
  - **Card hero:** Screenshot of the wrap result page on leetwrap.com (T1.1 · wrap-page.png)
  - **Secondary:** Analytics dashboard crop showing the country breakdown (T1.1 · analytics-countries.png)
  - **Tertiary:** Architecture blog header (T1.1 · blog-header.png)
- **Capture:** Visit leetwrap.com, log in, screenshot wrap output. Open Vercel/Plausible analytics, screenshot the countries view with the "23 countries" visible. Screenshot the blog post's lead image.
- **File names:**
  - `public/media/projects/leetwrap/wrap-page.png`
  - `public/media/projects/leetwrap/analytics-countries.png`
  - `public/media/projects/leetwrap/blog-header.png`
- **Fallback:** Use the abstract gradient tile that's already in `Projects.tsx`. Severely weakens the lead project — do not skip.

#### Project 02 — AI Co-Investigator
- **Media:** Architecture diagram. No product screenshots (research agent, nothing visual to show).
- **Diagram content:** User prompt → planner agent → BigQuery job composer → result interpreter → RAG-cited insights. Side box: "GPT Deep Research: 24 min" vs "This system: 2 min."
- **Tool:** Excalidraw (hand-drawn feel matches site). Export as SVG.
- **File:** `public/media/projects/ai-co-investigator/architecture.svg`
- **Fallback:** Text-only card with metric-heavy microcopy. Weak but not broken.

#### Project 03 — Multi-Agent GenAI Pipeline (EONVERSE) *[NDA-safe]*
- **Media:** Architecture diagram only. **No product UI. No domain words on the diagram.**
- **Diagram content:** Agent A → shared state layer → Agent B → consistency engine → Agent C. Label nodes abstractly ("Model Node 1," "State," "Consistency Engine," "Output Refiner"). No film, no script, no storyboard, no character references.
- **Redaction rule:** Have one other person look at the diagram cold — if they can guess the product category, redact more.
- **File:** `public/media/projects/multi-agent-pipeline/architecture.svg`
- **Fallback:** Pure-text card emphasizing the architectural claims. Acceptable for this card since the NDA already means we're showing less than we could.

#### Project 04 — AI Notetaker with Longitudinal Context
- **Media:**
  - **Card hero:** Screenshot of the app's meeting-memory view. Redact all meeting titles, attendee names, and transcripts. Use placeholder text like "Standup · 14 Mar 2026" and "[discussion summary]."
  - **Secondary:** Memory-architecture diagram (nodes: meetings table, RAG index, task tracker, citation resolver).
- **Capture:** Run the app in dev. Feed a dummy meeting. Screenshot. Open Figma, rectangle-overlay every name/title. Save.
- **Files:**
  - `public/media/projects/ai-notetaker/meeting-view.png`
  - `public/media/projects/ai-notetaker/memory-architecture.svg`
- **Fallback:** Diagram-only (skip the screenshot). Still strong.

#### Project 05 — Certificate Issuance Platform
- **Media:** One certificate screenshot with the student name redacted to "[Student Name]" and the cert ID redacted to a dummy. Shows the real template — that's the proof.
- **Capture:** Generate a test cert in the system. Figma-redact the dynamic fields. Export PNG.
- **File:** `public/media/projects/certificate-platform/sample-cert.png`
- **Fallback:** Text card with the "12,000+ certs issued" stat. Loses the "this is real production infrastructure" feel.

#### Project 06 — iCho — Head-Motion Spatial Audio
- **Media:** 10–15s looping clip, muted, showing Kumar's face in a webcam feed with a visual indicator (arrow or waveform) tracking his head movement. Audio track is *not* required — the site plays silent by default.
- **Capture:** Run iCho. Screen-record with CleanShot or QuickTime. Include the webcam feed + whatever UI shows the head-tracking axis. Export as MP4, then convert to WebM + MP4 (dual source for browser support).
- **Files:**
  - `public/media/projects/icho/demo.mp4`
  - `public/media/projects/icho/demo.webm`
  - `public/media/projects/icho/demo-poster.png` (first-frame still for `<video poster>`)
- **Fallback:** Use the existing `IchoVisual` 3-axis SVG in `Projects.tsx`. Works, but the video is 10× more memorable.

### Beat 5 — Case Studies (top 3)

**Three deep-dive pages:** LeetWrap · AI Co-Investigator · AI Notetaker.
Each page needs: **hero visual** (loop or image), **3–5 body visuals**, **one results visual.**

#### Case 01 — LeetWrap
- **Hero:** 15–25s screen recording of the wrap animation playing out end-to-end. Capture in 1440p, export MP4+WebM.
- **Body visuals:**
  - Mobile + desktop layout comparison (2 crops)
  - Analytics screenshot: users over time line chart
  - Analytics screenshot: country breakdown showing 23 (T1.1 reuse)
  - One crop from the architecture blog showing the diagram
- **Results:** "400+ users · 23 countries · Written about by users on X/Reddit" — pull one real tweet screenshot if one exists. Redact the user's handle if they didn't opt in.
- **Files:** `public/media/cases/leetwrap/*`

#### Case 02 — AI Co-Investigator
- **Hero:** Architecture diagram animated on scroll (draw-on via stroke-dashoffset — handled in MOTION).
- **Body visuals:**
  - Prompt structure code snippet (formatted code block, not a screenshot)
  - BigQuery job composer diagram (could be part of the architecture SVG, layered)
  - Insights output screenshot (redact domain-specific content if this was for a real research team)
- **Results:** Side-by-side bar: "GPT Deep Research: 24 min" vs "This: 2 min." Accent-color for the 2-min bar. Build as SVG, not image.
- **Files:** `public/media/cases/ai-co-investigator/*`

#### Case 03 — AI Notetaker with Longitudinal Context
- **Hero:** 20s screen recording of the app: upload a meeting → see it parse → open the longitudinal memory view → click a citation.
- **Body visuals:**
  - Recording-fallback flow diagram (bot join / extension capture / audio upload / transcripts — four paths)
  - Transcript-to-structured-data extraction (before/after side-by-side)
  - Obsidian export mock (if WIP, show a design spec rather than a screenshot)
- **Results:** "Longitudinal context across N recurring meetings — closes open threads that otherwise get dropped."
- **Files:** `public/media/cases/ai-notetaker/*`

### Beat 6 — Research & Experience
- **Media:**
  - **IEEE paper (T3.2):** First-page thumbnail of the published paper PDF. Hangs next to the Food Supply Chain entry.
  - **Company logos:** Optional — small wordmarks for Fidelity, EONVERSE (if the EONVERSE mark is already public-safe), etc. Grayscale, low opacity.
- **Capture:**
  - Open the IEEE paper PDF, export page 1 as PNG, crop to the top 60% (title + abstract + first column).
  - For logos: use official brand guidelines / press kits. Do not rebuild them.
- **Files:**
  - `public/media/research/ieee-food-supply-chain-p1.png`
  - `public/media/brand/fidelity.svg`, `public/media/brand/eonverse.svg` (if safe)
- **Fallback:** Skip all imagery — timeline typography alone is clean.

### Beat 7 — Achievements
- **Media:** None.
- **Capture needed:** None.
- **Fallback:** N/A.

### Beat 8 — Contact
- **Media:** Optional handwritten signature (T3.3). Scan of "— Kumar" in black ink on white paper. Placed below the email/LinkedIn/GitHub row.
- **Capture:** Write the signature 5–10 times on paper, pick the best one, scan at 600 DPI, convert to transparent PNG with levels crushed to pure black.
- **File:** `public/media/brand/signature.png`
- **Fallback:** Skip entirely. Typography carries it.

### OG / Social Share Image
- **Media:** Already handled dynamically by `src/app/opengraph-image.tsx`.
- **Capture needed:** None unless the dynamic OG ever breaks, in which case a static 1200×630 PNG.
- **File (fallback only):** `public/og-image.png`

---

## 4. Capture Kit

**Tools Kumar should install or confirm:**
- **CleanShot X** (screenshots + screen recording) — MP4 output, no watermarks, scroll capture.
- **Excalidraw** (architecture diagrams) — hand-drawn aesthetic matches the site. Export as SVG.
- **Figma** (redaction overlays) — always use a solid rectangle over sensitive text. **Never use blur** — it can be un-blurred with enough effort.
- **HandBrake or FFmpeg** (video conversion MP4 → WebM).
- Phone camera (4K) is sufficient for portrait + environmental.

**Screen recording settings:**
- 1440p minimum capture, 1080p for export.
- 30fps is fine. 60fps only if the subject moves fast (it won't).
- MP4 (H.264) + WebM (VP9) dual-source for browser support.
- No audio track (playback muted by default on the site).
- Max length on the site: 30s. Beyond that, viewers drop off.

**Screenshot settings:**
- PNG for UI (needs sharp edges).
- Dark-mode where the product supports it — the site is dark.
- Browser chrome cropped out unless it adds context.
- 2× pixel density (Retina) captures.

**Portrait settings:**
- 3:4 portrait crop or 4:5 (Instagram-size).
- Natural light within 30 min of sunset. Not overhead office light.
- Plain background — wall, corner, or a blurred interior.
- Not smiling for the camera. Looking off-frame or reading something.
- Low-saturation / desaturated in post is acceptable (use Photos → edit → saturation -30).

---

## 5. Redaction Rules

Before any asset ships, check:

1. **No real people's names** — students, clients, teammates, meeting attendees. Rectangle them. Not blur.
2. **No API keys, tokens, or URLs containing tokens** — open dev tools, clear localStorage, re-screenshot.
3. **No client company names** (SPOCSQ is fine — already on CV; client *of* SPOCSQ is not).
4. **No EONVERSE product words** — diagram labels must not include "script," "storyboard," "film," "video," "movie," "character," "consistency" (on anything customer-facing — internal slots are okay in code only).
5. **No personal email, phone, or address** other than `kumarsashank2003@gmail.com`.
6. **IEEE paper** — the publication itself is public. No redaction needed.

**Test:** show the redacted image to someone who doesn't know the project. If they can reverse-engineer sensitive data, redact more.

---

## 6. Storage Convention

All media lives under `public/media/`:

```
public/
  media/
    projects/
      leetwrap/
      ai-co-investigator/
      multi-agent-pipeline/
      ai-notetaker/
      certificate-platform/
      icho/
    cases/
      leetwrap/
      ai-co-investigator/
      ai-notetaker/
    portrait/
      portrait-primary.jpg
      environmental-desk.jpg     # optional
    research/
      ieee-food-supply-chain-p1.png
    brand/
      signature.png              # optional
      fidelity.svg               # optional
      eonverse.svg               # optional if safe
  og-image.png                   # fallback only
```

**File-name rules:** kebab-case, descriptive, no dates. `wrap-page.png` not `leetwrap_2026_final_v3.png`.

---

## 7. Fallback Contract

If an asset isn't ready on launch day, the site must not break. For each Tier 1 asset, we commit to a fallback *now* so there's no scramble later.

| Missing | Fallback |
|---------|----------|
| LeetWrap screenshots | Current abstract gradient tile (Projects.tsx). **Severely** weakens lead — avoid. |
| AI Co-Investigator diagram | Text-only card with stats-heavy copy. Acceptable. |
| Multi-Agent Pipeline diagram | Text-only card. Already the plan given NDA. |
| iCho demo video | Existing `IchoVisual` SVG. Acceptable. |
| Portrait photo | Initial "K" glyph in accent circle (code). Site works without ever showing a face. |

For Tier 2/3 assets: skip silently. The narrative was written so the site stands on typography alone if every photo + recording is missing.

---

## 8. Work Sequence (one weekend)

Batch these so nothing gets recaptured.

### Saturday morning (90 min) — **LeetWrap batch**
- Log into leetwrap.com, capture wrap page + analytics + blog header. (T1.1)
- Start a 25s screen recording of the wrap animation. Do 2–3 takes; keep the best. (T2.1 · leetwrap)
- Write-up: none, but note down any interesting metric that surfaces in analytics.

### Saturday afternoon (2 hrs) — **Diagrams batch**
- Open Excalidraw. Draw all three architecture diagrams (T1.2): AI Co-Investigator · Multi-Agent Pipeline · AI Notetaker memory.
- Export each as SVG + PNG. Store in respective project folders.
- Do the redaction check on Multi-Agent Pipeline — show to one friend, confirm they can't guess the product.

### Saturday evening (45 min) — **Recordings batch**
- Screen-record AI Co-Investigator in a real query session (20s). (T2.1)
- Screen-record AI Notetaker with a dummy meeting (20s). (T2.1)
- Run iCho with webcam; capture 15s demo. (T1.3)
- Convert all to MP4+WebM overnight via HandBrake batch queue.

### Sunday morning (30 min) — **Portrait**
- Near a window, golden hour. 20 frames total. Pick 1. (T1.4)

### Sunday afternoon (1 hr) — **Remainder + redaction**
- Certificate screenshot (T2.3).
- AI Notetaker UI screenshot (T2.4).
- All Figma redaction overlays on files that need them.
- Optional: IEEE thumbnail, signature scan, environmental desk photo.

**Total budget:** ~6 hrs spread across one weekend. Every Tier 1 asset exists by Sunday night.

---

## 9. What's Next

After this doc is approved, `MOTION.md` defines:
- Entrance animations per beat (scroll-triggered)
- Ambient motion (idle loops)
- Interaction motion (hover, cursor, magnetic, micro-feedback)
- Transition motion (how each beat hands off to the next)
- Reduced-motion behavior per beat

**Then, and only then,** we start rebuilding sections — with narrative, media, and motion specified first, so edits are in service of a plan, not iteration on taste.

---

## 10. One Line to Remember

> Every asset on the site is either **proof** or **atmosphere.** If it's neither, it doesn't ship.
