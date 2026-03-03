import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlatformBySlug } from "@/lib/data";
import { absoluteUrl, buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "DataCamp Annual Discount (2026) — Best Deal on Premium",
  description:
    "Find the best DataCamp annual discount for Premium in 2026. Learn how to redeem, which plan to pick, and whether student pricing is better for you.",
};

export default async function DataCampAnnualDiscountPage() {
  const platform = getPlatformBySlug("datacamp");

  const canonicalPath = "/coupons/datacamp/annual-discount";
  const canonicalUrl = absoluteUrl(canonicalPath);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Coupons", url: absoluteUrl("/coupons") },
    { name: "DataCamp", url: absoluteUrl("/coupons/datacamp") },
    { name: "Annual Discount", url: canonicalUrl },
  ]);

  const articleJsonLd = buildArticleJsonLd({
    headline: "DataCamp Annual Discount (2026)",
    description:
      "Best DataCamp annual deal for Premium, how to redeem it, and which plan is worth it.",
    url: canonicalUrl,
  });

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <JsonLd data={[breadcrumbJsonLd, articleJsonLd]} />

      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <Badge className="w-fit">Annual Deal</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">DataCamp Annual Discount (2026)</h1>
          <p className="text-xl text-muted-foreground">
            If you want the best price-to-value on DataCamp Premium, annual promos are usually where the biggest savings
            are.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild>
              <Link href="/coupons/datacamp">Get the best DataCamp deal</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/coupons/datacamp/student-discount">Student discount</Link>
            </Button>
          </div>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Best deal (quick answer)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Look for annual Premium promos (often the biggest discount).</div>
            <div>- If you’re eligible, student pricing may beat the public promo.</div>
            {platform ? (
              <div>
                - Current highlighted deal on SkillPerks: <span className="text-foreground">{platform.activeCoupon.discount}</span>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Which plan should you pick?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Premium: best for most learners (full library + projects + tracks).</div>
            <div>- Teams/Business: best if you’re buying for 2+ users or need admin controls.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to redeem</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>- Step 1: Open DataCamp pricing or promo page.</div>
            <div>- Step 2: Choose annual billing for Premium.</div>
            <div>- Step 3: Confirm the discount is applied at checkout (many promos are auto-applied).</div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">FAQs</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Is annual worth it vs monthly?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                If you plan to learn consistently for 2–3 months or more, annual usually wins on total cost—especially
                during promos.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Do I need a coupon code?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Many DataCamp promos are auto-applied via a deal link. If a code exists, you’ll see it during checkout.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">I’m a student—should I use student pricing instead?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Usually yes. Student pricing is often the best long-term deal.
                <span> </span>
                <Link href="/coupons/datacamp/student-discount" className="underline">See student discount</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/reviews/datacamp">Read DataCamp review</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/coupons/datacamp">Back to all DataCamp coupons</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
