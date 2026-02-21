export type BreadcrumbItem = {
  name: string;
  url: string;
};

const SITE_URL = "https://skillperks.org";

export function absoluteUrl(path: string) {
  if (!path.startsWith("/")) {
    return `${SITE_URL}/${path}`;
  }
  return `${SITE_URL}${path}`;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SkillPerks",
    url: SITE_URL,
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SkillPerks",
    url: SITE_URL,
  };
}

export function buildArticleJsonLd(params: {
  headline: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    mainEntityOfPage: params.url,
    url: params.url,
    publisher: {
      "@type": "Organization",
      name: "SkillPerks",
      url: SITE_URL,
    },
  };
}

export function buildReviewJsonLd(params: {
  itemName: string;
  url: string;
  ratingValue: number;
  ratingCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: params.itemName,
      url: params.url,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: params.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    ...(params.ratingCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: params.ratingValue,
            ratingCount: params.ratingCount,
          },
        }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "SkillPerks",
      url: SITE_URL,
    },
  };
}
