import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function BestSystemDesignCourses2026() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Guide</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Best System Design Courses (2026)
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            If your goal is to pass system design interviews (or get better at real-world architecture), these are the top picks to start with.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1) Educative (Grokking series)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Best for engineers who prefer text + interactive learning and want a structured approach to fundamentals and patterns.
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
            <CardTitle>2) ByteByteGo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Best for diagram-first learners who want a strong visual reference for common systems and design patterns.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild>
                <Link href="/coupons/bytebytego-coupon-code">Get Coupon</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/reviews/bytebytego">Read Review</Link>
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
              Best if you want a more guided plan + peer mock interviews (especially helpful for system design + PM loops).
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
            <Link href="/guides/interview-prep-roadmap">Interview Prep Roadmap</Link>
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
