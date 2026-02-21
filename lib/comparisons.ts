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
    slug: "educative-vs-pluralsight",
    title: "Educative vs Pluralsight",
    description: "Text + interactive engineering content vs broad catalog and skill assessments.",
    leftPlatformSlug: "educative",
    rightPlatformSlug: "pluralsight",
    recommendedFor: ["engineering upskilling", "system design"],
  },
  {
    slug: "datacamp-vs-dataquest",
    title: "DataCamp vs DataQuest",
    description: "Interactive exercises and tracks vs project-based, portfolio-first learning.",
    leftPlatformSlug: "datacamp",
    rightPlatformSlug: "dataquest",
    recommendedFor: ["data science", "portfolio projects"],
  },
  {
    slug: "coursera-vs-udemy",
    title: "Coursera vs Udemy",
    description: "Degree-style programs and certificates vs marketplace courses and frequent deals.",
    leftPlatformSlug: "coursera",
    rightPlatformSlug: "udemy",
    recommendedFor: ["certificates", "budget courses", "career switch"],
  },
  {
    slug: "bytebytego-vs-frontend-masters",
    title: "ByteByteGo vs Frontend Masters",
    description: "Diagram-first system design learning vs deep-dive expert frontend instruction.",
    leftPlatformSlug: "bytebytego",
    rightPlatformSlug: "frontend-masters",
    recommendedFor: ["system design", "frontend", "interview prep"],
  },
  {
    slug: "leetcode-vs-algoexpert",
    title: "LeetCode vs AlgoExpert",
    description: "Huge question bank and study plans vs curated interview prep with guided explanations.",
    leftPlatformSlug: "leetcode",
    rightPlatformSlug: "algoexpert",
    recommendedFor: ["coding interviews", "daily practice"],
  },
  {
    slug: "educative-vs-coursera",
    title: "Educative vs Coursera",
    description: "Interactive, text-first engineering learning vs university-style certificates and programs.",
    leftPlatformSlug: "educative",
    rightPlatformSlug: "coursera",
    recommendedFor: ["system design", "career switch", "certificates"],
  },
  {
    slug: "educative-vs-udemy",
    title: "Educative vs Udemy",
    description: "Structured interactive practice vs marketplace courses and one-time purchases.",
    leftPlatformSlug: "educative",
    rightPlatformSlug: "udemy",
    recommendedFor: ["coding patterns", "system design", "budget courses"],
  },
  {
    slug: "pluralsight-vs-frontend-masters",
    title: "Pluralsight vs Frontend Masters",
    description: "Broad engineering/IT catalog vs premium deep-dive frontend courses.",
    leftPlatformSlug: "pluralsight",
    rightPlatformSlug: "frontend-masters",
    recommendedFor: ["frontend", "engineering upskilling"],
  },
  {
    slug: "datacamp-vs-coursera",
    title: "DataCamp vs Coursera",
    description: "Hands-on data skill tracks vs credential-focused programs and specializations.",
    leftPlatformSlug: "datacamp",
    rightPlatformSlug: "coursera",
    recommendedFor: ["data science", "certificates", "career switch"],
  },
  {
    slug: "leetcode-vs-udemy",
    title: "LeetCode vs Udemy",
    description: "Focused daily practice for coding interviews vs broad marketplace courses.",
    leftPlatformSlug: "leetcode",
    rightPlatformSlug: "udemy",
    recommendedFor: ["coding interviews", "self-paced learning"],
  },
];

export function getComparisonBySlug(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs() {
  return comparisons.map((c) => ({ slug: c.slug }));
}
