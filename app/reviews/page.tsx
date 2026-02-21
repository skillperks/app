import Link from "next/link";

import { platforms } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReviewsIndexPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Reviews</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Platform Reviews (2026)
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Honest, developer-first reviews that focus on outcomes: what you’ll learn, who it’s best for, and when it’s worth paying.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {platforms.map((platform) => (
            <Card key={platform.slug} className="overflow-hidden">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{platform.name}</CardTitle>
                  <Badge variant="secondary">{platform.rating}/5</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{platform.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {platform.reviewCount.toLocaleString()} user ratings
                </div>
                <div className="flex flex-col gap-2">
                  <Button asChild>
                    <Link href={`/reviews/${platform.slug}`}>Read {platform.name} Review</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/coupons/${platform.couponSlug}`}>View Coupons</Link>
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
