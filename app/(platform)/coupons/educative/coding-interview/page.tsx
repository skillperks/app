import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlatformBySlug } from "@/lib/data";
import { absoluteUrl, buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Educative Coding Interview Coupon (2026) — Best Discount + Study Plan",
  description:
    "Get the best Educative discount for coding interview prep. See the best deal, how to redeem, and a practical study plan for DSA and patterns.",
};

export default async function EducativeCodingInterviewCouponPage() {
  const platform = getPlatformBySlug("educative");

  const canonicalPath = "/coupons/educative/coding-interview";
  const canonicalUrl = absoluteUrl(canonicalPath);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Coupons", url: absoluteUrl("/coupons") },
    { name: "Educative", url: absoluteUrl("/coupons/educative") },
    { name: "Coding Interview", url: canonicalUrl },
  ]);

  const articleJsonLd = buildArticleJsonLd({
    headline: "Educative Coding Interview Coupon (2026)",
    description:
      "Best Educative discount for coding interview prep, how to redeem it, and what to study first for FAANG-style interviews.",
    url: canonicalUrl,
  });

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <JsonLd data={[breadcrumbJsonLd, articleJsonLd]} />

      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <Badge className="w-fit">Coding Interview</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Educative Coding Interview Coupon (2026)</h1>
          <p className="text-xl text-muted-foreground">
            This page helps you save on Educative and start the highest-signal interview prep first: patterns, DSA, and
            timed practice.
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
            <CardTitle>Best deal for coding interview prep</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Best value is usually on annual (or longer) plans.</div>
            <div>- If you qualify, check: <Link className="underline" href="/coupons/educative/student-discount">student discount</Link>.</div>
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
            <div>- Step 2: Pick your plan (annual plans often have the best discount).</div>
            <div>- Step 3: Confirm the final price at checkout.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study plan (simple + effective)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Week 1: Arrays/strings + hashing + two pointers</div>
            <div>- Week 2: Sliding window + stacks/queues + binary search</div>
            <div>- Week 3–4: Trees/graphs + DP basics + mixed practice</div>
            <div>- Keep a mistake log and redo weak patterns weekly.</div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/reviews/educative">Read Educative review</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/coupons/educative/system-design">Also doing System Design?</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
