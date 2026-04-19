import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
        404
      </span>
      <h1
        className="text-[clamp(48px,8vw,96px)] font-bold leading-[0.95] tracking-[-0.05em] text-paper"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        Page not found
      </h1>
      <p className="mt-6 max-w-md text-[17px] leading-[1.7] text-[rgba(245,239,229,0.6)]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-[rgba(255,92,53,0.4)] px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent no-underline transition-all hover:bg-[rgba(255,92,53,0.1)] hover:gap-4"
      >
        ← Back to portfolio
      </Link>
    </main>
  )
}
