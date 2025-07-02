// app/sitemap.js
import { SEO_KEYWORDS, createSlug } from "../utils/seoData";

export default function sitemap() {
  const baseUrl = "https://tutorswala.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic SEO pages
  const seoPages = SEO_KEYWORDS.map((keyword) => ({
    url: `${baseUrl}/tuition/${createSlug(keyword)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...seoPages];
}
