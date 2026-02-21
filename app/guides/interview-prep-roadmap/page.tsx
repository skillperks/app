import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function InterviewPrepRoadmapGuide() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Guide</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Interview Prep Roadmap (2026)</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A practical roadmap you can follow in 4 weeks. Adapt the time box based on your timeline.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Week 1: Foundation + fast feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- Pick a target role + level (L3/L4, SWE/DS/PM).</div>
            <div>- Do 20-30 core coding pattern problems (arrays, strings, stacks/queues).</div>
            <div>- Start 1 system design topic: caching, load balancing, basic scalability.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Week 2: Coding patterns + system design reps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- Move to graphs/trees + dynamic programming basics.</div>
            <div>- Do 2-3 full system design mocks (even with a friend).</div>
            <div>- Write down reusable frameworks (requirements → API → data model → scaling).</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Week 3: Behavioral + company targeting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- Build your story bank: 6-8 STAR stories.</div>
            <div>- Practice 2 behavioral mocks and iterate on clarity.</div>
            <div>- Review common pitfalls (overexplaining, missing trade-offs, weak assumptions).</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Week 4: Full loops + polishing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- Run 2 full interview loops (coding + system design + behavioral).</div>
            <div>- Track mistakes and fix the root cause (speed, accuracy, communication).</div>
            <div>- Keep the last 2 days light to stay fresh.</div>
          </CardContent>
        </Card>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2">
          <Button asChild size="lg">
            <Link href="/coupons/educative-coupon-code">Get Educative Coupon</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/comparisons">Browse Comparisons</Link>
          </Button>
        </div>

        <div>
          <Button asChild variant="ghost">
            <Link href="/guides">← Back to guides</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
