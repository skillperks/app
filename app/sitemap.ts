import type { MetadataRoute } from "next";

import { platforms } from "@/lib/data";
import { comparisons } from "@/lib/comparisons";
import { guides } from "@/lib/guides";

const SITE_URL = "https://skillperks.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/browse`, lastModified: now },
    { url: `${SITE_URL}/coupons`, lastModified: now },
    { url: `${SITE_URL}/reviews`, lastModified: now },
    { url: `${SITE_URL}/comparisons`, lastModified: now },
    { url: `${SITE_URL}/guides`, lastModified: now },
    { url: `${SITE_URL}/tools`, lastModified: now },
    { url: `${SITE_URL}/tools/course-comparator`, lastModified: now },
    { url: `${SITE_URL}/search`, lastModified: now },
    { url: `${SITE_URL}/coupons/educative/student-discount`, lastModified: now },
    { url: `${SITE_URL}/about`, lastModified: now },
    { url: `${SITE_URL}/contact`, lastModified: now },
    { url: `${SITE_URL}/privacy`, lastModified: now },
    { url: `${SITE_URL}/terms`, lastModified: now },
    { url: `${SITE_URL}/disclosure`, lastModified: now },
  ];

  const reviewRoutes: MetadataRoute.Sitemap = platforms.map((p) => ({
    url: `${SITE_URL}/reviews/${p.slug}`,
    lastModified: now,
  }));

  const couponRoutes: MetadataRoute.Sitemap = platforms.map((p) => ({
    url: `${SITE_URL}/coupons/${p.couponSlug}`,
    lastModified: now,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${SITE_URL}/comparisons/${c.slug}`,
    lastModified: now,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${SITE_URL}${g.href}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...reviewRoutes, ...couponRoutes, ...comparisonRoutes, ...guideRoutes];
}
