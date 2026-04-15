'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="px-5 pb-8 pt-4 md:px-6">
      <div className="section-shell flex flex-col gap-4 rounded-[28px] border border-[rgba(245,239,229,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
            Crafted in Next.js, GSAP, and far too much curiosity
          </div>
          <div className="mt-1 text-sm text-[rgba(245,239,229,0.78)]">
            Kumar Sashank, Ontario, Canada
          </div>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          &copy; {year} Kumar Sashank
        </div>
      </div>
    </footer>
  )
}
