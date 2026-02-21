import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LearningPathFrontendEngineer() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Learning Path</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Learning Path: Frontend Engineer</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A practical path: HTML/CSS/JS → React + TypeScript → performance & accessibility → interview readiness.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step 1: Fundamentals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- JavaScript fundamentals + DOM basics.</div>
            <div>- CSS layout, responsive design, and accessibility.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 2: Modern frontend stack</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- React + TypeScript + state management basics.</div>
            <div>- Build 2 projects and deploy them.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 3: Production skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- Performance, caching, and component design patterns.</div>
            <div>- Testing basics and debugging discipline.</div>
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild>
            <Link href="/coupons/frontend-masters-coupon-code">Frontend Masters Deals</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tools/course-finder">Take Course Finder Quiz</Link>
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
