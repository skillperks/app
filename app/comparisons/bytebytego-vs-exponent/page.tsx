import Link from "next/link";

import { getPlatformBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function EducativeVsExponentPage() {
  const a = getPlatformBySlug("educative");
  const b = getPlatformBySlug("exponent");

  if (!a || !b) {
    return null;
  }

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Comparison</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Educative vs Exponent (2026)</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Two strong options for interview prep. Educative is text-first and interactive, while Exponent adds structured prep
            plus coaching and peer mock interviews.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {[a, b].map((p) => (
            <Card key={p.slug} className="overflow-hidden">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl">{p.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Rating</div>
                    <div className="font-semibold">{p.rating}/5</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Best deal</div>
                    <div className="font-semibold text-primary">{p.activeCoupon.discount}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold">Best for</div>
                  <div className="text-sm text-muted-foreground">{p.bestFor}</div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button asChild>
                    <Link href={`/reviews/${p.slug}`}>Read Review</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/coupons/${p.couponSlug}`}>Get Coupons</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick recommendation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Choose <strong className="text-foreground">Educative</strong> if you prefer hands-on, text + interactive learning you can move through quickly.
              </p>
              <p>
                Choose <strong className="text-foreground">Exponent</strong> if you want a more guided plan + peer mock interviews (especially useful for PM & system design loops).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What to do next</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/tools/course-finder">Take the Course Finder Quiz</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/guides/interview-prep-roadmap">Read Interview Prep Roadmap</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
