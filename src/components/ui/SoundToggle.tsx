'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const SOUNDS = {
  hover: '/sounds/hover.mp3',
  click: '/sounds/click.mp3',
}

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const buffersRef = useRef<Map<string, AudioBuffer>>(new Map())

  useEffect(() => {
    if (!enabled) return

    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    // Load sounds
    Object.entries(SOUNDS).forEach(async ([key, url]) => {
      try {
        const res = await fetch(url)
        const buf = await res.arrayBuffer()
        const audioBuf = await ctx.decodeAudioData(buf)
        buffersRef.current.set(key, audioBuf)
      } catch {
        // Sound file not found — degrade silently
      }
    })

    return () => {
      ctx.close()
      audioCtxRef.current = null
    }
  }, [enabled])

  const playSound = useCallback(
    (name: string, volume = 0.1) => {
      if (!enabled || !audioCtxRef.current) return
      const buffer = buffersRef.current.get(name)
      if (!buffer) return

      const source = audioCtxRef.current.createBufferSource()
      const gain = audioCtxRef.current.createGain()
      source.buffer = buffer
      gain.gain.value = volume
      source.connect(gain)
      gain.connect(audioCtxRef.current.destination)
      source.start(0)
    },
    [enabled]
  )

  // Attach hover/click sounds globally
  useEffect(() => {
    if (!enabled) return

    const handleHover = () => playSound('hover', 0.06)
    const handleClick = () => playSound('click', 0.1)

    const links = document.querySelectorAll('a, button, [data-cursor]')
    links.forEach((el) => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('click', handleClick)
    })

    return () => {
      links.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('click', handleClick)
      })
    }
  }, [enabled, playSound])

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="fixed bottom-6 right-6 z-[100] w-10 h-10 flex items-center justify-center border border-[rgba(244,240,232,0.15)] bg-[rgba(10,10,15,0.8)] backdrop-blur-md transition-all hover:border-accent group"
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
      data-cursor="Sound"
    >
      {enabled ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-paper group-hover:text-accent transition-colors">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted group-hover:text-accent transition-colors">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  )
}
