import { Suspense } from "react";

import coursesData from "@/data/courses/index.json";
import platformsData from "@/data/platforms/index.json";

import type { Course, PlatformMeta } from "@/lib/course-comparator-types";

import { CourseComparatorClient } from "@/components/course-comparator/course-comparator-client";

export function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (async () => {
    const resolved = (await searchParams) ?? {};
    const hasUserComparison = Boolean(resolved?.c);

    return {
      title: "Course Comparator | SkillPerks",
      description: "Pick up to 5 courses and compare pricing, format, and SkillPerks insights. Share comparisons with a link.",
      robots: hasUserComparison ? { index: false, follow: true } : { index: true, follow: true },
    };
  })();
}

export default function CourseComparatorPage() {
  return (
    <Suspense fallback={null}>
      <CourseComparatorClient
        courses={coursesData as unknown as Course[]}
        platforms={platformsData as unknown as PlatformMeta[]}
      />
    </Suspense>
  );
}
