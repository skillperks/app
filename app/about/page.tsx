import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Company</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">About SkillPerks</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            SkillPerks helps developers and tech professionals choose learning platforms with confidence—by combining verified deals, honest
            reviews, and practical comparisons.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Why we exist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              I built SkillPerks after paying full price for courses more times than I’d like to admit—then realizing the “real price” is
              often hidden behind seasonal sales, student plans, bundles, and coupons.
            </p>
            <p>
              The problem wasn’t just saving money. It was the time cost: digging through outdated promo codes, marketing-heavy reviews,
              and vague “best course” lists.
            </p>
            <p>
              SkillPerks exists to make the trade-offs clear so you can pick the right platform faster and pay a fair price.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What we optimize for</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              We focus on the job-to-be-done: picking the right course for a specific outcome (e.g., “pass system design interviews”, “learn
              SQL for analytics”, “build production React apps”).
            </p>
            <p>
              When we recommend a platform, we try to make the trade-offs obvious: best-for, pricing, key features, and where it falls short.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transparency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              SkillPerks may earn commissions from affiliate links. This never changes the price you pay, and it helps us keep the site running.
            </p>
            <div>
              <Button asChild variant="outline">
                <Link href="/disclosure">Read Affiliate Disclosure</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
