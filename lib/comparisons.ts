export interface ComparisonDefinition {
  slug: string;
  title: string;
  description: string;
  leftPlatformSlug: string;
  rightPlatformSlug: string;
  recommendedFor: string[];
}

export const comparisons: ComparisonDefinition[] = [
  {
    slug: "educative-vs-exponent",
    title: "Educative vs Exponent",
    description: "Text + interactive engineering content vs role-based interview prep and coaching.",
    leftPlatformSlug: "educative",
    rightPlatformSlug: "exponent",
    recommendedFor: ["engineering upskilling", "system design"],
  },
  {
    slug: "educative-vs-datacamp",
    title: "Educative vs DataCamp",
    description: "Text-first engineering learning vs interactive data-focused tracks.",
    leftPlatformSlug: "educative",
    rightPlatformSlug: "datacamp",
    recommendedFor: ["engineering upskilling", "data skills"],
  },
  {
    slug: "datacamp-vs-exponent",
    title: "DataCamp vs Exponent",
    description: "Interactive data learning tracks vs role-based interview prep and coaching.",
    leftPlatformSlug: "datacamp",
    rightPlatformSlug: "exponent",
    recommendedFor: ["data science", "interview prep"],
  },
];

export function getComparisonBySlug(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs() {
  return comparisons.map((c) => ({ slug: c.slug }));
}
