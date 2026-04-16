import { MetadataRoute } from 'next';

import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://imbonihub.com';
  
  // Base core pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/opportunities`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/success-stories`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Dynamic Scholarship Pages
  let dynamicPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/opportunities`, {
      next: { revalidate: 3600 } // Check for new scholarships every hour for indexing
    });
    
    if (res.ok) {
      const opportunities = await res.json();
      dynamicPages = opportunities.map((op: any) => ({
        url: `${baseUrl}/opportunities/${op.id}`,
        lastModified: new Date(op.updatedAt || op.createdAt),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));
    }
  } catch (err) {
    console.error("Sitemap Dynamic Fetch Error", err);
  }

  return [...staticPages, ...dynamicPages];
}
