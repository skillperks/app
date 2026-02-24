import { buildGoLink } from "@/lib/affiliate-links";

export interface DataCampCourse {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    estimatedHours: number;
    rating: number;
    reviewCount: number;
    keyOutcomes: string[];
    highlights: string[];
    prerequisites: string[];
    bestFor: string[];
    faq: { question: string; answer: string }[];
    affiliateLink: string;
}

export const datacampCourses: DataCampCourse[] = [
    {
        id: "introduction-to-python",
        slug: "introduction-to-python",
        title: "Introduction to Python",
        subtitle: "A fast, beginner-friendly path to Python fundamentals for data work",
        category: "Python",
        difficulty: "Beginner",
        estimatedHours: 4,
        rating: 4.7,
        reviewCount: 45000,
        keyOutcomes: [
            "Write Python code with confidence",
            "Understand variables, functions, and control flow",
            "Build the foundation for pandas and data analysis",
        ],
        highlights: ["Interactive exercises", "Beginner-friendly pacing", "Immediate hands-on practice"],
        prerequisites: ["None"],
        bestFor: ["Complete beginners", "Career switchers", "Data science starters"],
        faq: [
            {
                question: "Is this course good if I’ve never coded?",
                answer: "Yes—this is one of DataCamp’s most beginner-friendly courses and assumes no prior programming background.",
            },
        ],
        affiliateLink: buildGoLink({
            to: "https://datacamp.pxf.io/skillup",
            merchant: "datacamp",
            placement: "course",
        }),
    },
    {
        id: "sql-fundamentals",
        slug: "introduction-to-sql",
        title: "Introduction to SQL",
        subtitle: "Learn SQL quickly for analytics, reporting, and data roles",
        category: "SQL",
        difficulty: "Beginner",
        estimatedHours: 3,
        rating: 4.7,
        reviewCount: 30000,
        keyOutcomes: [
            "Write SELECT queries with filters and sorting",
            "Use GROUP BY for aggregation",
            "Build a core skill for analyst and DS roles",
        ],
        highlights: ["Practical query drills", "Clear progression", "Highly transferable skill"],
        prerequisites: ["None"],
        bestFor: ["Aspiring analysts", "Data science beginners", "Business intelligence"],
        faq: [
            {
                question: "Do I need a database setup?",
                answer: "No—DataCamp runs everything in the browser, so you can practice immediately.",
            },
        ],
        affiliateLink: buildGoLink({
            to: "https://datacamp.pxf.io/skillup",
            merchant: "datacamp",
            placement: "course",
        }),
    },
    {
        id: "pandas",
        slug: "data-manipulation-with-pandas",
        title: "Data Manipulation with pandas",
        subtitle: "Get productive with pandas for real-world analysis workflows",
        category: "Python",
        difficulty: "Intermediate",
        estimatedHours: 4,
        rating: 4.6,
        reviewCount: 16000,
        keyOutcomes: [
            "Clean and transform datasets",
            "Group, aggregate, and join tables",
            "Build repeatable analysis pipelines",
        ],
        highlights: ["Hands-on datasets", "Workplace-relevant tasks", "Solid pandas fundamentals"],
        prerequisites: ["Basic Python"],
        bestFor: ["Analysts", "Data scientists", "Anyone using pandas at work"],
        faq: [
            {
                question: "Is this enough to use pandas at work?",
                answer: "It’s a strong foundation. You’ll be able to clean/join/aggregate most common datasets after finishing and practicing.",
            },
        ],
        affiliateLink: buildGoLink({
            to: "https://datacamp.pxf.io/skillup",
            merchant: "datacamp",
            placement: "course",
        }),
    },
];

export function getDataCampCourseBySlug(slug: string) {
    return datacampCourses.find((c) => c.slug === slug);
}

export function getAllDataCampCourseSlugs() {
    return datacampCourses.map((c) => ({ slug: c.slug }));
}
