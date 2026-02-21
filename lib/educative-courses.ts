export interface EducativeCourse {
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

export const educativeCourses: EducativeCourse[] = [
    {
        id: "grokking-system-design",
        slug: "grokking-the-system-design-interview",
        title: "Grokking the System Design Interview",
        subtitle: "A structured way to think through real-world system design problems",
        category: "System Design",
        difficulty: "Intermediate",
        estimatedHours: 12,
        rating: 4.8,
        reviewCount: 9000,
        keyOutcomes: [
            "Learn a repeatable system design framework",
            "Practice common interview problems (URL shortener, news feed, chat)",
            "Understand trade-offs (latency, consistency, cost, scalability)",
        ],
        highlights: [
            "Text-first explanations that are easy to skim",
            "Diagrams and design walkthroughs",
            "Covers both high-level and deep-dive components",
        ],
        prerequisites: ["Basic backend knowledge", "Comfort with APIs and databases"],
        bestFor: ["System design interviews", "Backend engineers", "Full-stack engineers"],
        faq: [
            {
                question: "Is this course good for beginners?",
                answer: "It’s best if you already understand basic web concepts (APIs, DBs, caching). If you’re brand new, start with a fundamentals course and come back to this one.",
            },
            {
                question: "How long does it take to finish?",
                answer: "Most people finish in 1–2 weeks by doing 45–60 minutes per day, depending on how many problems you work through.",
            },
            {
                question: "Do I need Educative Unlimited?",
                answer: "You can buy the course individually, but Unlimited is usually better value if you plan to take multiple Grokking courses.",
            },
        ],
        affiliateLink: "https://www.educative.io/unlimited?aff=xy8B",
    },
    {
        id: "grokking-coding-patterns",
        slug: "grokking-the-coding-interview-patterns",
        title: "Grokking the Coding Interview: Patterns for Coding Questions",
        subtitle: "Master the most common patterns behind LeetCode-style problems",
        category: "Coding Interviews",
        difficulty: "Intermediate",
        estimatedHours: 20,
        rating: 4.7,
        reviewCount: 11000,
        keyOutcomes: [
            "Recognize patterns to solve problems faster",
            "Build confidence for timed interview rounds",
            "Practice curated question sets with explanations",
        ],
        highlights: ["Pattern-based learning", "Curated problem list", "Step-by-step solutions"],
        prerequisites: ["Basic data structures", "Comfort with one programming language"],
        bestFor: ["Software engineering interviews", "FAANG-style rounds", "DSA refresh"],
        faq: [
            {
                question: "Is this better than doing random LeetCode?",
                answer: "Yes, because it teaches a structure. You can then apply the patterns to a broader set of LeetCode problems.",
            },
            {
                question: "Which language is used?",
                answer: "Explanations are language-agnostic. You can implement solutions in your preferred language.",
            },
        ],
        affiliateLink: "https://www.educative.io/unlimited?aff=xy8B",
    },
    {
        id: "grokking-ml",
        slug: "grokking-machine-learning-interview",
        title: "Grokking the Machine Learning Interview",
        subtitle: "Prepare for ML interviews with concepts, case studies, and practice",
        category: "Machine Learning",
        difficulty: "Advanced",
        estimatedHours: 18,
        rating: 4.6,
        reviewCount: 3200,
        keyOutcomes: [
            "Cover ML interview topics (bias/variance, metrics, feature engineering)",
            "Practice ML system design and product thinking",
            "Build explanations for model trade-offs",
        ],
        highlights: ["Interview-focused curriculum", "ML system design", "Practical examples"],
        prerequisites: ["Basic ML concepts", "Some Python experience"],
        bestFor: ["ML engineer interviews", "Applied ML roles", "DS to ML transition"],
        faq: [
            {
                question: "Is this course enough to pass an ML interview?",
                answer: "It’s a strong structured foundation. You’ll still want hands-on practice with projects and reviewing core math basics depending on the role.",
            },
            {
                question: "Does it include ML system design?",
                answer: "Yes, it introduces ML system design concepts and how to communicate design choices.",
            },
        ],
        affiliateLink: "https://www.educative.io/unlimited?aff=xy8B",
    },
    {
        id: "patterns-for-system-design",
        slug: "software-architecture-patterns",
        title: "Software Architecture Patterns",
        subtitle: "Learn practical patterns used in modern backend systems",
        category: "Architecture",
        difficulty: "Intermediate",
        estimatedHours: 10,
        rating: 4.7,
        reviewCount: 2100,
        keyOutcomes: [
            "Understand architectural patterns (CQRS, event-driven, microservices)",
            "Know when to use each pattern",
            "Avoid common pitfalls in real systems",
        ],
        highlights: ["Practical trade-offs", "Architecture decision guidance", "Real-world examples"],
        prerequisites: ["Backend fundamentals"],
        bestFor: ["Backend engineers", "Tech leads", "System design depth"],
        faq: [
            {
                question: "Is this the same as system design interview prep?",
                answer: "It overlaps, but it’s more about patterns used in production architecture than interview-style problem walkthroughs.",
            },
        ],
        affiliateLink: "https://www.educative.io/unlimited?aff=xy8B",
    },
];

export function getEducativeCourseBySlug(slug: string) {
    return educativeCourses.find((c) => c.slug === slug);
}

export function getAllEducativeCourseSlugs() {
    return educativeCourses.map((c) => ({ slug: c.slug }));
}
