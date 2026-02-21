import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const guides = [
  {
    title: "Interview Prep Roadmap (2026)",
    href: "/guides/interview-prep-roadmap",
    description: "A practical 4-week plan for coding + system design + behavioral prep.",
  },
  {
    title: "Best Interview Prep Courses (2026)",
    href: "/guides/best-interview-prep-courses-2026",
    description: "Top picks depending on whether you need coding, system design, or mocks.",
  },
  {
    title: "Best System Design Courses (2026)",
    href: "/guides/best-system-design-courses-2026",
    description: "Top picks for system design interviews and architecture fundamentals.",
  },
  {
    title: "Best Data Science Courses (2026)",
    href: "/guides/best-data-science-courses-2026",
    description: "Recommended paths for Python/SQL, projects, and certifications.",
  },
  {
    title: "Learning Path: Software Engineer",
    href: "/guides/learning-path-software-engineer",
    description: "Fundamentals → projects → interview readiness.",
  },
  {
    title: "Learning Path: Data Scientist",
    href: "/guides/learning-path-data-scientist",
    description: "Analytics → modeling → portfolio → interviewing.",
  },
  {
    title: "Learning Path: ML Engineer",
    href: "/guides/learning-path-ml-engineer",
    description: "Foundations → applied projects → production ML skills.",
  },
  {
    title: "Learning Path: Frontend Engineer",
    href: "/guides/learning-path-frontend-engineer",
    description: "JS/CSS → React/TypeScript → production frontend skills.",
  },
  {
    title: "Learning Path: Cloud Engineer",
    href: "/guides/learning-path-cloud-engineer",
    description: "Networking → cloud services → deployment → operations.",
  },
];

export default function GuidesIndexPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Guides</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Guides & Roadmaps</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Actionable learning plans and career roadmaps. Built for busy engineers who want an outcome, not just a playlist.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((g) => (
            <Link key={g.href} href={g.href} className="min-w-0">
              <Card className="h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle>{g.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{g.description}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
