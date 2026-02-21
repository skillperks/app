export type GuideDefinition = {
  title: string;
  href: string;
  description: string;
};

export const guides: GuideDefinition[] = [
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
