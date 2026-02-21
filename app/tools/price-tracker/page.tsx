import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PriceTrackerToolPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Tool</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Price Tracker</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Track price changes and get alerted when a course subscription drops.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming soon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div>
              This tool is planned for Phase 3. For now, browse current deals and set a reminder for seasonal sales.
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link href="/coupons">Browse coupons</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/comparisons">Compare platforms</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <Button asChild variant="ghost">
            <Link href="/tools">← Back to tools</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
