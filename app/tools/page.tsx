import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tools = [
  {
    title: "Course Finder Quiz",
    href: "/tools/course-finder",
    description: "Answer a couple of questions and get recommended platforms.",
  },
  {
    title: "Course Comparator",
    href: "/tools/course-comparator",
    description: "Pick up to 5 courses and compare pricing, format, and SkillPerks insights.",
  },
  {
    title: "Price Tracker",
    href: "/tools/price-tracker",
    description: "Track price changes and get alerts when subscriptions drop.",
  },
  {
    title: "Learning Calculator",
    href: "/tools/learning-calculator",
    description: "Estimate time-to-goal based on weekly hours and target outcomes.",
  },
  {
    title: "Skill Assessor",
    href: "/tools/skill-assessor",
    description: "Identify gaps and get the next best resource recommendation.",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Tools</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Tools</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Quick utilities to help you pick the right platform, plan your learning, and save money.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((t) => (
            <Link key={t.href} href={t.href} className="min-w-0">
              <Card className="h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle>{t.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{t.description}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
