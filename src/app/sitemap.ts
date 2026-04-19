import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/case-studies'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://portfolio-v3-eta-ten.vercel.app' // Hardcode the production URL for sitemap consistency or use process.env if you set a custom domain later

  const routes = [
    '',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const caseStudies = getAllSlugs().map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...caseStudies]
}
