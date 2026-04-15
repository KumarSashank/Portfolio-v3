import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CaseStudyExperience from '@/components/work/CaseStudyExperience'
import { getAllSlugs, getCaseStudy } from '@/lib/case-studies'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    return {
      title: 'Project not found',
    }
  }

  return {
    title: `${study.title} — Kumar Sashank`,
    description: study.subtitle,
    openGraph: {
      title: `${study.title} — Kumar Sashank`,
      description: study.subtitle,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${study.title} — Kumar Sashank`,
      description: study.subtitle,
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    notFound()
  }

  return <CaseStudyExperience study={study} />
}
