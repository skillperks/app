import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { comparisons } from "@/lib/comparisons";

export default function ComparisonsIndexPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Comparisons</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Platform Comparisons (2026)</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Side-by-side comparisons to help you choose faster—based on outcomes, learning format, and value.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {comparisons.map((c) => (
            <Link key={c.slug} href={`/comparisons/${c.slug}`} className="min-w-0">
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
