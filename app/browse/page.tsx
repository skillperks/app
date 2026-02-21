import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  {
    title: "System Design",
    slug: "system-design",
    description: "Distributed systems, scalability, and architecture for interviews and real-world design.",
  },
  {
    title: "Data Science",
    slug: "data-science",
    description: "Python, SQL, statistics, and applied ML foundations for job-ready skills.",
  },
  {
    title: "Frontend",
    slug: "frontend",
    description: "React, TypeScript, UI fundamentals, and modern web tooling.",
  },
  {
    title: "Backend",
    slug: "backend",
    description: "APIs, databases, performance, and production-grade engineering.",
  },
  {
    title: "Cloud",
    slug: "cloud",
    description: "AWS/GCP/Azure fundamentals, infra, containers, and deployment.",
  },
  {
    title: "Interview Prep",
    slug: "interview-prep",
    description: "Coding patterns, system design prep, and behavioral frameworks.",
  },
];

export default function BrowseIndexPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Browse</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Browse</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Explore by category, level, or format — then jump to high-intent platform pages, reviews, and coupon deals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/browse/by-category" className="min-w-0">
            <Card className="h-full hover:border-primary/40 transition-colors">
              <CardHeader>
                <CardTitle>By Category</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                System Design, Data Science, Interview Prep, Cloud, AI/ML, Web Development.
              </CardContent>
            </Card>
          </Link>
          <Link href="/browse/by-level" className="min-w-0">
            <Card className="h-full hover:border-primary/40 transition-colors">
              <CardHeader>
                <CardTitle>By Level</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Beginner, Intermediate, Advanced — pick what matches your current stage.
              </CardContent>
            </Card>
          </Link>
          <Link href="/browse/by-format" className="min-w-0">
            <Card className="h-full hover:border-primary/40 transition-colors">
              <CardHeader>
                <CardTitle>By Format</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Interactive, video courses, bootcamps, certifications.
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Quick category shortcuts</h2>
          <p className="text-muted-foreground">
            These routes are still supported for compatibility.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} href={`/browse/${c.slug}`} className="min-w-0">
              <Card className="h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle>{c.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{c.description}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
