import { MetadataRoute } from 'next'

// ⚠️  TODO: Set NEXT_PUBLIC_BASE_URL in your production environment.
// Example: 'https://nexusforum.upes.ac.in' or your Vercel/hosting URL.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://nexus-forum.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}

