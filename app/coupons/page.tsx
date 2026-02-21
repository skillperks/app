import Link from "next/link";

import { platforms } from "@/lib/data";
import { CouponCard } from "@/components/marketing/coupon-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CouponsIndexPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Coupons</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Verified Coupon Codes & Deals (2026)
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Browse today’s best verified discounts for the most popular developer and data learning platforms.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {platforms.map((platform) => (
            <Card key={platform.slug} className="overflow-hidden">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{platform.name}</CardTitle>
                  <Badge variant="secondary">Verified</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{platform.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-muted/20 p-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Best Deal</div>
                  <div className="text-2xl font-bold text-primary">{platform.activeCoupon.discount}</div>
                  <div className="text-sm text-muted-foreground">{platform.activeCoupon.description}</div>
                </div>

                <CouponCard coupon={platform.activeCoupon} platformName={platform.name} />

                <div className="flex flex-col gap-2">
                  <Button asChild variant="outline">
                    <Link href={`/coupons/${platform.couponSlug}`}>Coupon details</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/reviews/${platform.slug}`}>Read Review</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
