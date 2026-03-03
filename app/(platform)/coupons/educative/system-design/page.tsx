import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlatformBySlug } from "@/lib/data";
import { absoluteUrl, buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Educative System Design Coupon (2026) — Best Discount + Course Picks",
  description:
    "Get the best Educative discount for System Design courses and interview prep. See the best deal, how to redeem, and what to study first.",
};

export default async function EducativeSystemDesignCouponPage() {
  const platform = getPlatformBySlug("educative");

  const canonicalPath = "/coupons/educative/system-design";
  const canonicalUrl = absoluteUrl(canonicalPath);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Coupons", url: absoluteUrl("/coupons") },
    { name: "Educative", url: absoluteUrl("/coupons/educative") },
    { name: "System Design", url: canonicalUrl },
  ]);

  const articleJsonLd = buildArticleJsonLd({
    headline: "Educative System Design Coupon (2026)",
    description:
      "Best Educative discount for System Design, how to redeem it, and what to learn first for interviews.",
    url: canonicalUrl,
  });

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <JsonLd data={[breadcrumbJsonLd, articleJsonLd]} />

      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <Badge className="w-fit">System Design</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Educative System Design Coupon (2026)</h1>
          <p className="text-xl text-muted-foreground">
            If you’re preparing for system design interviews, this page points you to the best Educative deal and a simple
            path to start learning.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild>
              <Link href="/coupons/educative">Get the best Educative deal</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/courses/educative/">Browse Educative courses</Link>
            </Button>
          </div>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Best deal for System Design (quick answer)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- For most learners, the best value comes from annual (or longer) plans.</div>
            <div>- If you’re a student, also check: <Link className="underline" href="/coupons/educative/student-discount">student discount</Link>.</div>
            {platform ? (
              <div>
                - Current highlighted deal on SkillPerks: <span className="text-foreground">{platform.activeCoupon.discount}</span>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to redeem</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Step 1: Open the Educative deal page from SkillPerks.</div>
            <div>- Step 2: Choose your plan (annual plans usually have the best discount).</div>
            <div>- Step 3: Verify discount application at checkout.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What to learn first (System Design)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Start with fundamentals: scalability, caching, databases, queues.</div>
            <div>- Practice common interview prompts: URL shortener, news feed, rate limiter.</div>
            <div>- Use Educative’s hands-on approach to build confidence with diagrams + tradeoffs.</div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/reviews/educative">Read Educative review</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/coupons/educative/coding-interview">Need coding interview prep too?</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
