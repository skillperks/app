import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LearningPathCloudEngineer() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Learning Path</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Learning Path: Cloud Engineer</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A practical path: networking basics → cloud services → containers → infrastructure-as-code → reliability.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step 1: Core foundations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- Linux basics, networking, DNS, HTTP.</div>
            <div>- Understand compute/storage/database primitives.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 2: Cloud services + deployment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- Learn IAM, VPC, load balancing, autoscaling.</div>
            <div>- Deploy 1 app end-to-end.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 3: Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- Monitoring, logging, alerting, incident basics.</div>
            <div>- Cost awareness and reliability trade-offs.</div>
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild>
            <Link href="/coupons/educative-coupon-code">Educative Cloud Deals</Link>
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
