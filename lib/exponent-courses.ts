import { buildGoLink } from "@/lib/affiliate-links";

export interface ExponentCourse {
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

export const exponentCourses: ExponentCourse[] = [
    {
        id: "system-design-interview-course",
        slug: "system-design-interview-course",
        title: "System Design Interview Course",
        subtitle: "A practical system design prep course built for real interview performance",
        category: "System Design",
        difficulty: "Intermediate",
        estimatedHours: 10,
        rating: 4.8,
        reviewCount: 2500,
        keyOutcomes: [
            "Communicate structured system design answers",
            "Cover common prompts (feed, marketplace, chat, storage)",
            "Learn trade-offs and how to defend decisions",
        ],
        highlights: [
            "Interview-style walkthroughs",
            "Frameworks you can reuse in any round",
            "Focus on clarity, trade-offs, and scope control",
        ],
        prerequisites: ["Basic web/backend knowledge"],
        bestFor: ["System design interviews", "Senior SWE interviews", "Backend & full-stack roles"],
        faq: [
            {
                question: "Is this better than random YouTube videos?",
                answer: "It’s more structured and closer to real interview expectations, with a repeatable framework and curated examples.",
            },
            {
                question: "Do I need to code?",
                answer: "No. This course is focused on design, communication, and trade-offs rather than implementation.",
            },
        ],
        affiliateLink: buildGoLink({
            to: "https://www.tryexponent.com/?ref=sp20",
            merchant: "exponent",
            placement: "course",
        }),
    },
    {
        id: "pm-interview-course",
        slug: "product-management-interview-course",
        title: "Product Management Interview Course",
        subtitle: "PM interview prep with frameworks, case studies, and realistic prompts",
        category: "Product Management",
        difficulty: "Beginner",
        estimatedHours: 8,
        rating: 4.7,
        reviewCount: 1900,
        keyOutcomes: [
            "Answer product sense questions confidently",
            "Structure execution and prioritization problems",
            "Improve behavioral storytelling (STAR)",
        ],
        highlights: ["PM frameworks", "Practice prompts", "Behavioral prep"],
        prerequisites: ["None"],
        bestFor: ["Aspiring PMs", "PM interviews", "Career switchers"],
        faq: [
            {
                question: "Is this course useful for non-PMs?",
                answer: "Yes—many roles benefit from product thinking, but it’s optimized for PM interview loops.",
            },
        ],
        affiliateLink: buildGoLink({
            to: "https://www.tryexponent.com/?ref=sp20",
            merchant: "exponent",
            placement: "course",
        }),
    },
    {
        id: "behavioral-interview-course",
        slug: "behavioral-interview-course",
        title: "Behavioral Interview Course",
        subtitle: "Turn messy experiences into crisp stories that land offers",
        category: "Behavioral",
        difficulty: "Beginner",
        estimatedHours: 4,
        rating: 4.6,
        reviewCount: 1200,
        keyOutcomes: [
            "Build a reusable story bank",
            "Master STAR / CARL formatting",
            "Handle follow-ups with strong signal",
        ],
        highlights: ["Story templates", "Common question bank", "Actionable drills"],
        prerequisites: ["None"],
        bestFor: ["All tech interviews", "PM/SWE/DS roles", "Leveling up communication"],
        faq: [
            {
                question: "How fast can I see results?",
                answer: "Most people improve within 2–3 sessions by drafting stories and practicing out loud with feedback.",
            },
        ],
        affiliateLink: buildGoLink({
            to: "https://www.tryexponent.com/?ref=sp20",
            merchant: "exponent",
            placement: "course",
        }),
    },
];

export function getExponentCourseBySlug(slug: string) {
    return exponentCourses.find((c) => c.slug === slug);
}

export function getAllExponentCourseSlugs() {
    return exponentCourses.map((c) => ({ slug: c.slug }));
}
