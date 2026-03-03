import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlatformBySlug } from "@/lib/data";
import { absoluteUrl, buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "DataCamp Student Discount (2026) — Premium Student Plan + Eligibility",
  description:
    "Get the DataCamp student discount with the Premium Student Plan. See eligibility, what’s included, and the best way to save on annual plans.",
};

export default async function DataCampStudentDiscountPage() {
  const platform = getPlatformBySlug("datacamp");

  const canonicalPath = "/coupons/datacamp/student-discount";
  const canonicalUrl = absoluteUrl(canonicalPath);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Coupons", url: absoluteUrl("/coupons") },
    { name: "DataCamp", url: absoluteUrl("/coupons/datacamp") },
    { name: "Student Discount", url: canonicalUrl },
  ]);

  const articleJsonLd = buildArticleJsonLd({
    headline: "DataCamp Student Discount (2026)",
    description:
      "Eligibility rules, what the Premium Student Plan includes, and how to claim the DataCamp student discount.",
    url: canonicalUrl,
  });

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <JsonLd data={[breadcrumbJsonLd, articleJsonLd]} />

      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <Badge className="w-fit">Student Discount</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">DataCamp Student Discount (2026)</h1>
          <p className="text-xl text-muted-foreground">
            DataCamp offers a student discount via its Premium Student Plan (available year-round). This page summarizes
            eligibility and the simplest way to claim it.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild>
              <Link href="/coupons/datacamp">See best DataCamp deal</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/reviews/datacamp">Read DataCamp review</Link>
            </Button>
          </div>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Who is eligible?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Students enrolled in degree-granting universities, colleges, and schools.</div>
            <div>- You’ll typically need to verify student status during signup or purchase.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What you get with the Premium Student Plan</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Unlimited access to DataCamp Premium.</div>
            <div>- Interactive, in-browser learning (good for beginners and busy schedules).</div>
            <div>- Access to career tracks and structured learning paths.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to claim the student discount</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Step 1: Open DataCamp student pricing.</div>
            <div>- Step 2: Verify your student eligibility.</div>
            <div>- Step 3: Choose annual billing if available for the best overall value.</div>
            <div>
              - Step 4: If you’re not eligible, use the main DataCamp coupon page to find the best active promo.
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">FAQs</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Is the student discount available worldwide?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Eligibility is based on enrollment verification (not country). Availability can change, so check the
                official student pricing page.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Do I need coding experience?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No. DataCamp has beginner-friendly courses and interactive practice.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">What if I’m not eligible?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Use our main DataCamp coupons page to find the best current annual discount.
                <span> </span>
                <Link href="/coupons/datacamp/annual-discount" className="underline">See annual discount</Link>
              </p>
            </div>
          </div>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Best fallback (non-student)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <div>
              If you don’t qualify for student pricing, the best savings are often on annual Premium promos.
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/coupons/datacamp">Get DataCamp coupons</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/coupons/datacamp/annual-discount">Annual discount page</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {platform ? (
          <div className="text-xs text-muted-foreground">
            Current highlighted deal: <span className="text-foreground">{platform.activeCoupon.discount}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
