/**
 * Motion design tokens.
 *
 * Treat these like color tokens — every animation in the app references one.
 * If you find yourself writing a raw duration or easing string in a component,
 * it probably belongs here first.
 *
 * Source of truth: MOTION.md §3 (Global Motion Tokens).
 */

// ─────────────────────────────────────────────── timings (in seconds for GSAP)
export const T = {
  /** 150ms — hover, press, focus state changes */
  micro: 0.15,
  /** 250ms — color/border transitions, cursor morphs */
  quick: 0.25,
  /** 600ms — standard fade/slide entrance */
  base: 0.6,
  /** 900ms — body content entrance after eyebrow */
  grand: 0.9,
  /** 1.4s — hero name, preloader, signature reveals */
  signature: 1.4,
  /** 3s — short ambient yoyo (float, breathe) */
  loopShort: 3,
  /** 8s — atmospheric pulse, color drift */
  loopLong: 8,
} as const

/** Same scale as `T` but in milliseconds — for Framer Motion / CSS contexts. */
export const Tms = {
  micro: T.micro * 1000,
  quick: T.quick * 1000,
  base: T.base * 1000,
  grand: T.grand * 1000,
  signature: T.signature * 1000,
  loopShort: T.loopShort * 1000,
  loopLong: T.loopLong * 1000,
} as const

// ─────────────────────────────────────────────── easing (GSAP string + cubic-bezier)
/**
 * Easings as GSAP string names. Use these in `gsap.to(...)` calls.
 * See `Bez` for Framer Motion / CSS cubic-bezier equivalents.
 */
export const Ease = {
  /** power2.out — default for almost everything */
  outSoft: 'power2.out',
  /** power3.out — body content, primary entrances */
  outSnap: 'power3.out',
  /** expo.out — signature reveals only (name, preloader) */
  outExpo: 'expo.out',
  /** expo.inOut — page transitions */
  inOutExpo: 'expo.inOut',
  /** elastic.out(1, 0.3) — magnetic return-to-rest */
  elasticSoft: 'elastic.out(1, 0.3)',
  /** linear — marquee, slow rotations */
  linear: 'none',
} as const

/**
 * Cubic-bezier equivalents for Framer Motion `transition.ease` and CSS
 * `transition-timing-function`. Numeric tuples mirror the GSAP names above.
 */
export const Bez = {
  /** [0.33, 1, 0.68, 1] — soft deceleration, equivalent to power2.out */
  outSoft: [0.33, 1, 0.68, 1] as const,
  /** [0.22, 1, 0.36, 1] — snappier deceleration, equivalent to power3.out */
  outSnap: [0.22, 1, 0.36, 1] as const,
  /** [0.16, 1, 0.3, 1] — exponential deceleration, equivalent to expo.out */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** [0.83, 0, 0.17, 1] — exponential ease-in-out, for page transitions */
  inOutExpo: [0.83, 0, 0.17, 1] as const,
} as const

// ─────────────────────────────────────────────── stagger
/**
 * Default stagger amounts for grouped reveals.
 * Pair with `gsap.timeline(...).from(els, { ..., stagger: Stag.char })`.
 */
export const Stag = {
  /** 0.025s — character-level reveal (SplitText) */
  char: 0.025,
  /** 0.06s — word-level reveal */
  word: 0.06,
  /** 0.10s — line-level reveal */
  line: 0.1,
  /** 0.11s — card / row reveal */
  card: 0.11,
} as const

// ─────────────────────────────────────────────── distances
/**
 * Default translate distances for entrance animations.
 * Use the right one for the element type — text and cards have different visual mass.
 */
export const Dist = {
  /** 22px — text entrance translate (paragraphs, headlines) */
  text: 22,
  /** 40px — card / image entrance translate */
  card: 40,
  /** 30px — horizontal timeline-row entrance */
  row: 30,
  /** 4px — hover lift */
  hoverLift: 4,
  /** 12px — magnetic max deviation */
  magnetic: 12,
} as const

// ─────────────────────────────────────────────── reduced-motion ceilings
/**
 * Hard maximums when `prefers-reduced-motion: reduce` is on.
 * Anything that exceeds these limits MUST be disabled or rewritten under reduced motion.
 */
export const ReducedMotion = {
  /** 0.3s — max duration for any opacity fade under reduced motion */
  maxFadeMs: 300,
  /** 0.2s — max duration for any color/border transition under reduced motion */
  maxTransitionMs: 200,
} as const

// ─────────────────────────────────────────────── helpers

/**
 * Apply reduced-motion clamping to a duration.
 * If `reduced` is true, returns the smaller of `value` and `ReducedMotion.maxFadeMs / 1000`.
 *
 * @example
 *   gsap.to(el, { opacity: 1, duration: clampDuration(T.signature, prefs.reducedMotion) })
 */
export function clampDuration(seconds: number, reduced: boolean): number {
  if (!reduced) return seconds
  return Math.min(seconds, ReducedMotion.maxFadeMs / 1000)
}

/**
 * Pick a different value depending on reduced-motion preference.
 * Convenience wrapper for the common pattern of "do this normally, do that under reduce".
 */
export function pickMotion<T>(reduced: boolean, normal: T, reducedValue: T): T {
  return reduced ? reducedValue : normal
}
