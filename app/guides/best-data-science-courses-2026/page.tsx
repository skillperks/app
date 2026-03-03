import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function BestDataScienceCourses2026() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Guide</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Best Data Science Courses (2026)
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The best picks depend on whether you want interactive practice, project-based learning, or credentialed programs.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1) DataCamp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Best for interactive Python/SQL practice with structured tracks.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild>
                <Link href="/coupons/datacamp-coupon-code">Get Deal</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/reviews/datacamp">Read Review</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2) Educative</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Best if you want to add engineering fundamentals (Python, CS topics) with text + interactive lessons.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild>
                <Link href="/coupons/educative-coupon-code">Get Coupon</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/reviews/educative">Read Review</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3) Exponent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Best if your goal is interviewing for data roles and you want structured prep plus coaching options.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild>
                <Link href="/coupons/exponent-promo-code">Get Promo</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/reviews/exponent">Read Review</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link href="/tools/course-finder">Take the Course Finder Quiz</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/coupons">Browse all deals</Link>
          </Button>
        </div>

        <div>
          <Button asChild variant="ghost">
            <Link href="/guides">← Back to guides</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
