import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use environment variable for BASE_URL if available, otherwise fallback
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://imboniapplicationhub.vercel.app';
  
  // Base core pages that never fail
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/opportunities`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/success-stories`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Dynamic Scholarship Pages
  let dynamicPages: MetadataRoute.Sitemap = [];
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl && apiUrl.startsWith('http')) {
    try {
      // Add a short timeout to prevent sitemap from timing out the whole build
      const res = await fetch(`${apiUrl}/api/opportunities`, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (res.ok) {
        const opportunities = await res.json();
        if (Array.isArray(opportunities)) {
          dynamicPages = opportunities.map((op: any) => ({
            url: `${baseUrl}/opportunities/${op.id}`,
            lastModified: new Date(op.updatedAt || op.createdAt || new Date()),
            changeFrequency: 'weekly',
            priority: 0.6,
          }));
        }
      }
    } catch (err) {
      console.warn("Sitemap: Falling back to static pages only due to API fetch error.");
    }
  }

  return [...staticPages, ...dynamicPages];
}
