import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const posts = [
  {
    title: "Interview Prep Roadmap (2026)",
    href: "/guides/interview-prep-roadmap",
    description: "A practical plan you can follow in 4 weeks.",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Blog</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            MVP placeholder blog index. For now, guides live under /guides.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <Link key={p.href} href={p.href} className="min-w-0">
              <Card className="h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{p.description}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
