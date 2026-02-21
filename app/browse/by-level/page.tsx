import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const levels = [
  {
    title: "Beginner",
    slug: "beginner",
    description: "New to the topic. Start with fundamentals and guided practice.",
  },
  {
    title: "Intermediate",
    slug: "intermediate",
    description: "You know the basics. Focus on depth, patterns, and projects.",
  },
  {
    title: "Advanced",
    slug: "advanced",
    description: "You want specialization and high-leverage interview or career outcomes.",
  },
];

export default function BrowseByLevelPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Browse</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Browse by Level</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Choose a level and we’ll recommend platforms that tend to work well for that stage.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {levels.map((l) => (
            <Link key={l.slug} href={`/browse/by-level/${l.slug}`} className="min-w-0">
              <Card className="h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle>{l.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{l.description}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
