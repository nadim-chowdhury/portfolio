import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nadim.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      images: ["https://nadim.vercel.app/nadim_profile.jpg"],
    },
    {
      url: "https://nadim.vercel.app/terminal",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
