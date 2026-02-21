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
    title: "Interview Prep",
    slug: "interview-prep",
    description: "Coding patterns, system design prep, and behavioral frameworks.",
  },
  {
    title: "Cloud Computing",
    slug: "cloud-computing",
    description: "AWS/GCP/Azure fundamentals, infra, containers, and deployment.",
  },
  {
    title: "AI / ML",
    slug: "ai-ml",
    description: "ML foundations, practical projects, and applied AI learning paths.",
  },
  {
    title: "Web Development",
    slug: "web-development",
    description: "Frontend + backend skills for building modern web apps.",
  },
];

export default function BrowseByCategoryPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Browse</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Browse by Category</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Pick a category and jump to the platforms that best match the outcomes you want.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} href={`/browse/by-category/${c.slug}`} className="min-w-0">
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
