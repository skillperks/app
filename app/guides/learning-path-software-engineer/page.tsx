import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LearningPathSoftwareEngineer() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Learning Path</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Learning Path: Software Engineer</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A practical path to go from fundamentals → projects → interview readiness.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step 1: Fundamentals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- Programming + data structures basics.</div>
            <div>- Build small projects to learn debugging and development workflow.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 2: Build production habits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- APIs, databases, authentication basics.</div>
            <div>- Deploy 1-2 projects publicly.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 3: Interview readiness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>- Coding patterns + system design reps.</div>
            <div>- Behavioral story bank.</div>
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild>
            <Link href="/guides/interview-prep-roadmap">Interview Prep Roadmap</Link>
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
