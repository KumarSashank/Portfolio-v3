'use client'

/**
 * Motion preferences — single source of truth for "how much motion can we do?"
 *
 * Combines three signals into one provider:
 *   1. `prefers-reduced-motion` (accessibility — never override)
 *   2. GPU tier (via detect-gpu — gates WebGL / shader-heavy animations)
 *   3. Pointer capability (touch vs fine — gates custom cursor + hover effects)
 *
 * Reads once on mount, exposes via `useMotionPrefs()` everywhere.
 *
 * Why a provider instead of a per-component hook?
 *   - GPU detection is expensive (one-time async benchmark)
 *   - matchMedia listeners shouldn't be duplicated 50x across the tree
 *   - Cursor + reduced-motion + WebGL gating all read the same data; one read wins
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getGPUTier, type TierResult } from 'detect-gpu'

// ─────────────────────────────────────────────── types

/** GPU performance tier (0 = blacklisted/fallback, 1 = low, 2 = mid, 3 = high). */
export type GpuTier = 0 | 1 | 2 | 3

export interface MotionPrefs {
  /** User has `prefers-reduced-motion: reduce`. NEVER ignore this. */
  reducedMotion: boolean
  /** GPU tier from detect-gpu. Use to gate WebGL / shader-heavy animations. */
  gpuTier: GpuTier
  /** True on touch-only devices (no fine pointer). Hide custom cursor here. */
  isTouch: boolean
  /** Convenience: can we render custom cursor? (fine pointer + not reduced motion) */
  canShowCursor: boolean
  /** Convenience: can we render shader-heavy effects? (gpu tier ≥ 2 + not reduced motion) */
  canRenderHeavyGl: boolean
  /** True until the first detection has resolved. */
  isLoading: boolean
}

const DEFAULT_PREFS: MotionPrefs = {
  reducedMotion: false,
  gpuTier: 2, // assume mid-tier until detection resolves
  isTouch: false,
  canShowCursor: true,
  canRenderHeavyGl: true,
  isLoading: true,
}

// ─────────────────────────────────────────────── context

const MotionPrefsContext = createContext<MotionPrefs>(DEFAULT_PREFS)

/**
 * Read motion preferences anywhere in the tree.
 *
 * @example
 *   const { reducedMotion, canRenderHeavyGl } = useMotionPrefs()
 *   if (!canRenderHeavyGl) return <CssFallback />
 */
export function useMotionPrefs(): MotionPrefs {
  return useContext(MotionPrefsContext)
}

// ─────────────────────────────────────────────── provider

/**
 * Detects motion capabilities once on mount and provides them down the tree.
 * Mount this once at the root of the app (in `layout.tsx`, inside `<body>`).
 */
export function MotionPrefsProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(DEFAULT_PREFS.reducedMotion)
  const [gpuTier, setGpuTier] = useState<GpuTier>(DEFAULT_PREFS.gpuTier)
  const [isTouch, setIsTouch] = useState(DEFAULT_PREFS.isTouch)
  const [isLoading, setIsLoading] = useState(true)

  // ── prefers-reduced-motion (with live updates if user toggles it)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // ── pointer capability
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    setIsTouch(mq.matches)

    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // ── GPU tier (one-time async benchmark via detect-gpu)
  useEffect(() => {
    let cancelled = false
    getGPUTier()
      .then((res: TierResult) => {
        if (cancelled) return
        // detect-gpu returns tier 0..3; clamp to our type
        const tier = Math.max(0, Math.min(3, res.tier ?? 2)) as GpuTier
        setGpuTier(tier)
        setIsLoading(false)
      })
      .catch(() => {
        // If detection fails, assume mid-tier and proceed
        if (!cancelled) {
          setGpuTier(2)
          setIsLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo<MotionPrefs>(
    () => ({
      reducedMotion,
      gpuTier,
      isTouch,
      canShowCursor: !isTouch && !reducedMotion,
      canRenderHeavyGl: gpuTier >= 2 && !reducedMotion,
      isLoading,
    }),
    [reducedMotion, gpuTier, isTouch, isLoading]
  )

  return (
    <MotionPrefsContext.Provider value={value}>{children}</MotionPrefsContext.Provider>
  )
}
