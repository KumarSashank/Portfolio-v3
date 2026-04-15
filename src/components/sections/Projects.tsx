'use client'

import Link from 'next/link'
import { projects, type Project } from '@/lib/data'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const featuredProjects = projects.slice(0, 3)
const archiveProjects = projects.slice(3)

export default function Projects() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} id="projects">
      <div className="section-shell">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-label" data-reveal="">
              Work
            </div>
            <h2
              data-reveal=""
              data-reveal-delay="1"
              className="max-w-4xl text-balance text-[clamp(42px,6vw,88px)] font-bold leading-[0.94] tracking-[-0.05em]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Selected projects where technical depth meets presentation, speed, and product sense.
            </h2>
          </div>
          <a
            href="https://github.com/KumarSashank"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent no-underline"
            data-reveal=""
            data-reveal-delay="2"
          >
            Browse code on GitHub
          </a>
        </div>

        <div className="space-y-10">
          {featuredProjects.map((project, index) => (
            <article
              key={project.num}
              className="panel overflow-hidden rounded-[34px] p-6 md:p-8"
              data-reveal=""
              data-reveal-delay={Math.min(index + 1, 4)}
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div style={{ order: index % 2 === 1 ? 2 : 1 }}>
                  <ProjectVisual project={project} />
                </div>
                <div
                  className="flex flex-col justify-between rounded-[28px] border border-[rgba(245,239,229,0.1)] bg-[rgba(255,255,255,0.03)] p-6 md:p-8"
                  style={{ order: index % 2 === 1 ? 1 : 2 }}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
                        {project.num}
                      </span>
                      <span className="rounded-full border border-[rgba(245,239,229,0.1)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        {project.year}
                      </span>
                      <span
                        className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]"
                        style={{
                          borderColor: `${project.accent}55`,
                          color: project.accent,
                        }}
                      >
                        {project.type}
                      </span>
                    </div>

                    <h3
                      className="mt-5 text-[clamp(34px,4vw,54px)] leading-[0.96] tracking-[-0.05em]"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-5 text-base leading-8 text-[rgba(245,239,229,0.68)]">
                      {project.description}
                    </p>

                    <div className="mt-6 rounded-[24px] border border-[rgba(245,239,229,0.1)] bg-[rgba(5,7,11,0.3)] p-5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
                        Outcome
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[rgba(245,239,229,0.76)]">
                        {project.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
                      Role + stack
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[rgba(245,239,229,0.12)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-paper">
                        {project.role}
                      </span>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[rgba(245,239,229,0.12)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric}
                          className="rounded-[20px] border border-[rgba(245,239,229,0.1)] bg-[rgba(255,255,255,0.02)] p-4"
                        >
                          <div className="text-sm leading-6 text-[rgba(245,239,229,0.76)]">{metric}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-7">
                      {project.slug ? (
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,92,53,0.35)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent no-underline transition-colors hover:bg-[rgba(255,92,53,0.08)]"
                          data-cursor="View Case"
                        >
                          View case study
                        </Link>
                      ) : (
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,239,229,0.14)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper no-underline transition-colors hover:border-[rgba(245,239,229,0.24)]"
                        >
                          Ask about this work
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {archiveProjects.map((project, index) => (
            <article
              key={project.num}
              className="panel-soft surface-glow rounded-[28px] p-6"
              data-reveal=""
              data-reveal-delay={Math.min(index + 1, 3)}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(245,239,229,0.42)]">
                  {project.num}
                </span>
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: project.accent }}
                  aria-hidden
                />
              </div>
              <h3
                className="mt-5 text-[30px] leading-[1.02] tracking-[-0.04em]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[rgba(245,239,229,0.66)]">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[rgba(245,239,229,0.12)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-[rgba(245,239,229,0.1)] bg-[rgba(5,7,11,0.45)] p-5 md:min-h-[460px] md:p-7"
      style={{
        backgroundImage: `radial-gradient(circle at top left, ${project.accent}30, transparent 30%), radial-gradient(circle at bottom right, rgba(255,255,255,0.08), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))`,
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(245,239,229,0.3),transparent)]" />
      <div className="absolute left-5 top-5 rounded-full border border-[rgba(245,239,229,0.12)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(245,239,229,0.48)]">
        {project.type}
      </div>
      <div className="absolute right-5 top-5 rounded-full border border-[rgba(245,239,229,0.12)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(245,239,229,0.48)]">
        {project.year}
      </div>

      {project.slug === 'ai-exam-portal' && <ExamPortalVisual accent={project.accent} />}
      {project.slug === 'icho' && <IchoVisual accent={project.accent} />}
      {project.slug === 'decentralized-file-sharing' && <FileSharingVisual accent={project.accent} />}
    </div>
  )
}

function ExamPortalVisual({ accent }: { accent: string }) {
  return (
    <>
      <div className="absolute inset-8 rounded-[30px] border border-[rgba(245,239,229,0.1)] bg-[rgba(10,14,22,0.86)] shadow-[0_30px_100px_rgba(0,0,0,0.45)]" />
      <div className="absolute left-14 top-16 h-3 w-24 rounded-full bg-[rgba(245,239,229,0.08)]" />
      <div className="absolute left-14 top-28 h-[220px] w-[45%] rounded-[22px] border border-[rgba(245,239,229,0.08)] bg-[rgba(255,255,255,0.03)]" />
      <div className="absolute right-14 top-28 flex h-[220px] w-[34%] flex-col gap-4">
        <div className="rounded-[20px] border border-[rgba(245,239,229,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
          <div className="mb-3 h-2 w-16 rounded-full bg-[rgba(245,239,229,0.12)]" />
          <div className="grid gap-2">
            {[70, 48, 82].map((size) => (
              <div key={size} className="h-2 rounded-full bg-[rgba(245,239,229,0.08)]">
                <div className="h-full rounded-full" style={{ width: `${size}%`, background: accent }} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[20px] border border-[rgba(245,239,229,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
          <div className="mb-3 h-2 w-20 rounded-full bg-[rgba(245,239,229,0.12)]" />
          <div className="grid grid-cols-4 gap-2">
            {[45, 72, 58, 88].map((height) => (
              <div key={height} className="flex h-20 items-end rounded-[14px] bg-[rgba(245,239,229,0.04)] p-2">
                <div className="w-full rounded-full" style={{ height: `${height}%`, background: accent }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 left-14 right-14 grid grid-cols-3 gap-4">
        {['Question engine', 'AI grading', 'Live analytics'].map((label) => (
          <div
            key={label}
            className="rounded-[18px] border border-[rgba(245,239,229,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[rgba(245,239,229,0.58)]"
          >
            {label}
          </div>
        ))}
      </div>
    </>
  )
}

function IchoVisual({ accent }: { accent: string }) {
  return (
    <>
      <div className="absolute inset-10 rounded-full border border-[rgba(245,239,229,0.08)]" />
      <div className="absolute inset-[70px] rounded-full border border-[rgba(245,239,229,0.1)]" />
      <div className="absolute inset-[120px] rounded-full border border-[rgba(245,239,229,0.12)]" />
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(245,239,229,0.16)] bg-[rgba(255,255,255,0.04)] shadow-[0_0_80px_rgba(211,178,108,0.22)]" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(245,239,229,0.18)]" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(245,239,229,0.26),transparent)]" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(245,239,229,0.2),transparent)]" />
      <div
        className="absolute left-1/2 top-[22%] h-3 w-3 -translate-x-1/2 rounded-full shadow-[0_0_28px_rgba(255,255,255,0.32)]"
        style={{ background: accent }}
      />
      <div
        className="absolute left-[26%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full shadow-[0_0_28px_rgba(255,255,255,0.32)]"
        style={{ background: accent }}
      />
      <div
        className="absolute bottom-[22%] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full shadow-[0_0_28px_rgba(255,255,255,0.32)]"
        style={{ background: accent }}
      />
      <div className="absolute bottom-10 left-10 right-10 grid gap-3 sm:grid-cols-3">
        {['Pitch', 'Yaw', 'Roll'].map((label, index) => (
          <div key={label} className="rounded-[18px] border border-[rgba(245,239,229,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(245,239,229,0.42)]">
              {label}
            </div>
            <div
              className="mt-3 h-1.5 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accent} ${55 + index * 12}%, rgba(245,239,229,0.1) 0)`,
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

function FileSharingVisual({ accent }: { accent: string }) {
  return (
    <>
      <div className="absolute inset-10 rounded-[30px] border border-[rgba(245,239,229,0.08)]" />
      <div className="absolute left-[16%] top-[24%] h-24 w-24 rounded-[28px] border border-[rgba(245,239,229,0.12)] bg-[rgba(255,255,255,0.05)]" />
      <div className="absolute right-[18%] top-[20%] h-16 w-16 rounded-full border border-[rgba(245,239,229,0.12)] bg-[rgba(255,255,255,0.04)]" />
      <div className="absolute bottom-[18%] left-[26%] h-20 w-20 rounded-full border border-[rgba(245,239,229,0.12)] bg-[rgba(255,255,255,0.04)]" />
      <div className="absolute bottom-[24%] right-[20%] h-24 w-24 rounded-[22px] border border-[rgba(245,239,229,0.12)] bg-[rgba(255,255,255,0.04)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 420" fill="none" aria-hidden>
        <path d="M150 120L450 95" stroke="rgba(245,239,229,0.25)" strokeDasharray="6 10" />
        <path d="M150 120L210 300" stroke="rgba(245,239,229,0.25)" strokeDasharray="6 10" />
        <path d="M450 95L390 310" stroke="rgba(245,239,229,0.25)" strokeDasharray="6 10" />
        <path d="M210 300L390 310" stroke="rgba(245,239,229,0.25)" strokeDasharray="6 10" />
        <circle cx="150" cy="120" r="8" fill={accent} />
        <circle cx="450" cy="95" r="8" fill={accent} />
        <circle cx="210" cy="300" r="8" fill={accent} />
        <circle cx="390" cy="310" r="8" fill={accent} />
      </svg>
      <div className="absolute bottom-10 left-10 right-10 rounded-[22px] border border-[rgba(245,239,229,0.08)] bg-[rgba(10,14,22,0.72)] p-5">
        <div className="flex flex-wrap gap-3">
          {['IPFS', 'CIDs', 'Encryption', 'Gateway proxy'].map((label) => (
            <span
              key={label}
              className="rounded-full border border-[rgba(245,239,229,0.12)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[rgba(245,239,229,0.62)]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
