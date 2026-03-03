import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function BestInterviewPrepCourses2026() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Guide</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Best Interview Prep Courses (2026)</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The best pick depends on your weakest link: coding patterns, system design, or behavioral + mock interviews.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1) Educative</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Best for coding patterns + system design fundamentals in a text + interactive format.
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
            <CardTitle>2) Exponent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Best if you want video + a plan + peer mock interviews (especially helpful for system design / PM loops).
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

        <Card>
          <CardHeader>
            <CardTitle>3) DataCamp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Best if you’re interviewing for data roles and want extra reps on SQL/Python fundamentals via interactive exercises.
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

        <Separator />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link href="/guides/interview-prep-roadmap">Interview Prep Roadmap</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tools/course-finder">Take the Course Finder Quiz</Link>
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
