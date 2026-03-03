import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlatformBySlug } from "@/lib/data";
import { absoluteUrl, buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Educative Student Discount (2026) — Eligibility, Plans & How to Claim",
  description:
    "Learn how Educative’s student discount works, who’s eligible, and which plan to choose. Updated guide with verified steps and FAQs.",
};

export default async function EducativeStudentDiscountPage() {
  const platform = getPlatformBySlug("educative");

  const canonicalPath = "/coupons/educative/student-discount";
  const canonicalUrl = absoluteUrl(canonicalPath);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Coupons", url: absoluteUrl("/coupons") },
    { name: "Educative", url: absoluteUrl("/coupons/educative") },
    { name: "Student Discount", url: canonicalUrl },
  ]);

  const articleJsonLd = buildArticleJsonLd({
    headline: "Educative Student Discount (2026)",
    description:
      "Eligibility rules, plan differences, renewal rules, and step-by-step instructions to claim the Educative student discount.",
    url: canonicalUrl,
  });

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <JsonLd data={[breadcrumbJsonLd, articleJsonLd]} />

      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <Badge className="w-fit">Student Discount</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Educative Student Discount (2026)
          </h1>
          <p className="text-xl text-muted-foreground">
            Eligibility, plan choices, and simple steps to claim the student offer — plus a fast fallback if you’re not
            eligible.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild>
              <Link href="/coupons/educative">See best Educative coupon</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/reviews/educative">Read Educative review</Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Who is eligible?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Students who sign up with a verified school email (e.g. a .edu address).</div>
            <div>- If you already have an active subscription, student pricing may apply to renewal or upgrades.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Which plan should you pick?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <div>
              - If you qualify for student pricing, choose the subscription option that matches your goals (hands-on courses, projects, cloud labs, interview prep tools).
            </div>
            <div>
              - If you’re unsure, prioritize what you’ll actually use (e.g., projects and AI Mock Interviews vs. cloud labs).
            </div>
            <div>
              - Confirm the exact inclusions/pricing on Educative during checkout (plans and packaging can change).
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to claim the discount</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Step 1: Go to Educative student pricing and sign up with your student email.</div>
            <div>- Step 2: Choose the subscription option based on what you want to learn (courses, projects, cloud labs, mock interviews).</div>
            <div>- Step 3: Complete checkout and verify your email if prompted.</div>
            <div>
              - Step 4: If you’re not eligible, use the main Educative coupon page to get the best available deal.
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">FAQs</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Can I apply the student discount if I already have a subscription?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                In many cases you can apply it to renewal, or to an upgrade if you move to a higher plan.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Can I stack the student discount with other coupon codes?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Typically only one discount applies per purchase. If student pricing doesn’t work for you, use the best
                public coupon instead.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Does it work worldwide?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Student eligibility depends on verification (school email). For non-student deals, see our main Educative
                coupons page.
              </p>
            </div>
          </div>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Best fallback deal (no student email)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <div>
              If you don’t have a verified student email, your best option is usually the main subscription discount on
              annual plans.
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/coupons/educative">Get Educative coupons</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/courses/educative/">Browse Educative courses</Link>
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
