import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LearningPathDataScientist() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Learning Path</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Learning Path: Data Scientist</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A practical path: analytics foundations → modeling → portfolio projects → interviewing.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step 1: Analytics foundation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- SQL + data wrangling + basic stats.</div>
            <div>- Build dashboards or simple analyses.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 2: Modeling & evaluation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- Supervised learning basics, metrics, validation.</div>
            <div>- Practice on real datasets.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 3: Portfolio + interview prep</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- 2-3 solid projects (end-to-end).</div>
            <div>- SQL + case studies + ML basics for interviews.</div>
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild>
            <Link href="/coupons/datacamp-coupon-code">Get DataCamp Deal</Link>
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
