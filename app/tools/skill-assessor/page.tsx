import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SkillAssessorToolPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Tool</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Skill Assessor</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A quick self-assessment to identify gaps and recommend the next best resource.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming soon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div>
              Planned for Phase 3. For now, start with a goal and use the course finder quiz to get a short list.
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link href="/tools/course-finder">Course Finder Quiz</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/browse">Browse by category</Link>
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
