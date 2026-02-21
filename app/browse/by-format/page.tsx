import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formats = [
  {
    title: "Interactive Courses",
    slug: "interactive-courses",
    description: "Learn by doing: in-browser exercises, quizzes, and hands-on practice.",
  },
  {
    title: "Video Courses",
    slug: "video-courses",
    description: "Watch and follow along. Best for visual learners and guided demos.",
  },
  {
    title: "Bootcamps",
    slug: "bootcamps",
    description: "Structured programs with a curriculum and outcomes-driven pacing.",
  },
  {
    title: "Certifications",
    slug: "certifications",
    description: "Programs focused on proof-of-skill and credentialing.",
  },
];

export default function BrowseByFormatPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Browse</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Browse by Format</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Choose a learning format and we’ll suggest platforms that tend to fit it well.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {formats.map((f) => (
            <Link key={f.slug} href={`/browse/by-format/${f.slug}`} className="min-w-0">
              <Card className="h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle>{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{f.description}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
