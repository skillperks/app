export interface Coupon {
    code?: string;
    discount: string;
    description: string;
    type?: "code" | "link";
    link?: string;
}

export interface Platform {
    id: string;
    name: string;
    slug: string;
    couponSlug: string;
    logo: string;
    logoColor: string;
    rating: number;
    reviewCount: number;
    description: string;
    longDescription: string;
    features: string[];
    pricing: {
        monthly?: number;
        annual: number;
        lifetime?: number;
        currency: string;
    };
    pros: string[];
    cons: string[];
    bestFor: string;
    activeCoupon: Coupon;
    alternatives: { name: string; slug: string; }[];
}

export const platforms: Platform[] = [
    {
        id: "educative",
        name: "Educative",
        slug: "educative",
        couponSlug: "educative-coupon-code",
        logo: "/logos/educative.png", // Placeholder
        logoColor: "bg-blue-600",
        rating: 4.8,
        reviewCount: 1240,
        description: "Hands-on, text-based learning for developers with AI-powered practice.",
        longDescription: "Educative Unlimited offers hands-on, text-based courses you can complete right in the browser. It includes a large library of courses, real-world projects, and AWS Cloud Labs, plus personalized learning tools like AI Mock Interviews for coding and system design.",
        features: ["Text-Based Hands-on Learning", "AI Mock Interviews", "Real-World Projects", "AWS Cloud Labs", "Skill Paths", "Assessments"],
        pricing: {
            monthly: 59,
            annual: 199,
            currency: "USD",
        },
        pros: [
            "No setup required, code in browser",
            "Faster to skim than video courses",
            "Great for interview prep with AI Mock Interviews",
        ],
        cons: [
            "No video content (for visual learners)",
            "Subscription can be pricey without a discount",
        ],
        bestFor: "Intermediate to Advanced Developers",
        activeCoupon: {
            code: "",
            discount: "40% OFF",
            description: "Get 40% off annual plans",
            type: "link",
            link: "https://www.educative.io/unlimited?aff=xy8B",
        },
        alternatives: [
            { name: "Udemy", slug: "udemy" },
            { name: "Pluralsight", slug: "pluralsight" }
        ]
    },
    {
        id: "bytebytego",
        name: "ByteByteGo",
        slug: "bytebytego",
        couponSlug: "bytebytego-coupon-code",
        logo: "/logos/bytebytego.png",
        logoColor: "bg-purple-600",
        rating: 4.9,
        reviewCount: 850,
        description: "Diagram-first system design learning for interview prep.",
        longDescription: "Created by Alex Xu, ByteByteGo is the digital version of the System Design Interview books, with high-quality diagrams and structured explanations to help you build strong intuition for real-world systems.",
        features: ["High-Quality Diagrams", "System Design Patterns", "Clear Explanations", "Regular Updates"],
        pricing: {
            annual: 50,
            lifetime: 99,
            currency: "USD",
        },
        pros: [
            "Visual-first approach makes complex systems easier",
            "Great for revising before interviews",
            "Strong value with lifetime access option",
        ],
        cons: [
            "Primarily focused on system design",
            "Less hands-on coding practice",
        ],
        bestFor: "System Design Interview Prep",
        activeCoupon: {
            code: "SYSTEM10",
            discount: "$10 OFF",
            description: "Save on lifetime access",
            type: "code",
            link: "https://bytebytego.com?aff=skillperks",
        },
        alternatives: [
            { name: "Exponent", slug: "exponent" },
            { name: "Educative", slug: "educative" },
        ],
    },
    {
        id: "exponent",
        name: "Exponent",
        slug: "exponent",
        couponSlug: "exponent-promo-code",
        logo: "/logos/exponent.png",
        logoColor: "bg-indigo-600",
        rating: 4.8,
        reviewCount: 950,
        description: "Role-based interview prep: courses, questions, practice, coaching, and perks.",
        longDescription: "Exponent is an interview preparation platform with role-specific courses (PM, system design, software engineering, data, and more), a large question bank, and structured practice. It also offers coaching services (mock interviews, resume reviews, salary negotiation), plus member resources like company guides, interview experiences, job referrals, and perks.",
        features: ["Interview Courses by Role", "Question Bank", "Practice", "Mock Interviews & Coaching", "Company Guides", "Job Referrals", "Member Perks"],
        pricing: {
            monthly: 79,
            annual: 199,
            currency: "USD",
        },
        pros: [
            "Strong role-based course catalog (PM, system design, software engineering, data roles)",
            "Practice + questions make it easy to drill interview formats",
            "Coaching options for mock interviews, resume review, and negotiation",
        ],
        cons: [
            "Monthly plan is expensive",
            "If you only need algorithm practice, LeetCode may be a better fit",
        ],
        bestFor: "PM & System Design Interviews",
        activeCoupon: {
            code: "",
            discount: "10% OFF",
            description: "Save on your first year",
            type: "link",
            link: "https://www.tryexponent.com/?ref=sp20",
        },
        alternatives: [
            { name: "Educative", slug: "educative" },
            { name: "DataCamp", slug: "datacamp" }
        ]
    },
    {
        id: "datacamp",
        name: "DataCamp",
        slug: "datacamp",
        couponSlug: "datacamp-coupon-code",
        logo: "/logos/datacamp.png",
        logoColor: "bg-green-600",
        rating: 4.7,
        reviewCount: 3200,
        description: "Learn data skills with Premium, Basic, and Teams plans.",
        longDescription: "DataCamp’s pricing centers around Premium (full content library + projects + certificates/certifications), Basic (free account with first chapters), and Teams (Premium plus team management and progress tracking). Lessons and exercises run in the browser—no special software required—and eligible students can access a discounted Premium Student Plan.",
        features: ["Premium / Basic / Teams Plans", "Projects", "Certificates & Certifications", "Browser-Based Exercises", "Skill & Career Tracks"],
        pricing: {
            monthly: 25,
            annual: 149,
            currency: "USD",
        },
        pros: [
            "Premium includes projects plus certificates/certifications",
            "Learn directly in the browser (no installs)",
            "Good progression with skill/career tracks",
        ],
        cons: [
            "Free Basic plan is limited to first chapters",
            "Some projects can feel guided depending on track",
        ],
        bestFor: "Aspiring Data Scientists",
        activeCoupon: {
            code: "", // No code needed
            discount: "60% OFF",
            description: "Huge savings on annual plan",
            type: "link",
            link: "https://datacamp.pxf.io/skillup",
        },
        alternatives: [
            { name: "DataQuest", slug: "dataquest" },
            { name: "Coursera", slug: "coursera" }
        ]
    },
    {
        id: "coursera",
        name: "Coursera",
        slug: "coursera",
        couponSlug: "coursera-deals",
        logo: "/logos/coursera.png",
        logoColor: "bg-blue-500",
        rating: 4.6,
        reviewCount: 5000,
        description: "University-backed courses and professional certificates.",
        longDescription: "Coursera offers courses and professional certificates from universities and leading companies. It's best when you want structured programs and recognized credentials.",
        features: ["Professional Certificates", "University Courses", "Projects", "Financial Aid"],
        pricing: {
            monthly: 49,
            annual: 399,
            currency: "USD",
        },
        pros: [
            "Strong credential options (certificates, specializations)",
            "Wide catalog across tech and business",
            "Good for structured learning paths",
        ],
        cons: [
            "Quality varies across courses",
            "Some content is more academic than practical",
        ],
        bestFor: "Structured learning paths & certifications",
        activeCoupon: {
            code: "",
            discount: "Free Trial",
            description: "Start with a free trial where available",
            type: "link",
            link: "https://www.coursera.org?aff=skillperks",
        },
        alternatives: [
            { name: "Udemy", slug: "udemy" },
            { name: "Pluralsight", slug: "pluralsight" },
        ],
    },
    {
        id: "udemy",
        name: "Udemy",
        slug: "udemy",
        couponSlug: "udemy-coupons",
        logo: "/logos/udemy.png",
        logoColor: "bg-red-600",
        rating: 4.5,
        reviewCount: 15000,
        description: "Huge marketplace of courses across every tech skill.",
        longDescription: "Udemy is a marketplace with a massive catalog. It's great for targeted topics when you can find a highly-rated instructor and a well-reviewed course.",
        features: ["Massive Catalog", "Frequent Discounts", "Lifetime Access", "Mobile Learning"],
        pricing: {
            monthly: 0,
            annual: 0,
            currency: "USD",
        },
        pros: [
            "Excellent value during frequent sales",
            "Great for niche topics",
            "Lifetime access for many purchases",
        ],
        cons: [
            "Quality varies a lot",
            "Not as structured as subscription platforms",
        ],
        bestFor: "Affordable, targeted courses",
        activeCoupon: {
            code: "",
            discount: "Courses from $9.99",
            description: "Marketplace deals change frequently",
            type: "link",
            link: "https://www.udemy.com?aff=skillperks",
        },
        alternatives: [
            { name: "Coursera", slug: "coursera" },
            { name: "Pluralsight", slug: "pluralsight" },
        ],
    },
    {
        id: "pluralsight",
        name: "Pluralsight",
        slug: "pluralsight",
        couponSlug: "pluralsight-coupon-code",
        logo: "/logos/pluralsight.png",
        logoColor: "bg-orange-500",
        rating: 4.6,
        reviewCount: 4100,
        description: "Skill-based tech learning with assessments and paths.",
        longDescription: "Pluralsight offers structured paths across software engineering and IT, with skill assessments to help you benchmark and pick the right starting point.",
        features: ["Skill Assessments", "Role Paths", "Hands-on Labs", "Wide Catalog"],
        pricing: {
            monthly: 29,
            annual: 299,
            currency: "USD",
        },
        pros: [
            "Good breadth for engineering + IT",
            "Assessments help you place your level",
            "Solid curated paths",
        ],
        cons: [
            "Hands-on depth varies",
            "Some courses feel dated",
        ],
        bestFor: "Broad upskilling across engineering + IT",
        activeCoupon: {
            code: "",
            discount: "Limited-time savings",
            description: "Discounts vary by campaign",
            type: "link",
            link: "https://www.pluralsight.com?aff=skillperks",
        },
        alternatives: [
            { name: "Udemy", slug: "udemy" },
            { name: "Coursera", slug: "coursera" },
        ],
    },
    {
        id: "frontendmasters",
        name: "Frontend Masters",
        slug: "frontend-masters",
        couponSlug: "frontend-masters-coupon-code",
        logo: "/logos/frontendmasters.png",
        logoColor: "bg-purple-600",
        rating: 4.8,
        reviewCount: 2100,
        description: "Deep-dive frontend and full-stack courses taught by industry experts.",
        longDescription: "Frontend Masters focuses on high-quality, deep-dive courses taught by experienced engineers. Best when you want depth and modern best practices.",
        features: ["Expert Instructors", "Deep Dives", "Workshops", "Modern Frontend"],
        pricing: {
            monthly: 39,
            annual: 390,
            currency: "USD",
        },
        pros: [
            "High-quality instructors",
            "Great for leveling up beyond basics",
            "Strong frontend focus",
        ],
        cons: [
            "Not as beginner-friendly as some platforms",
            "Subscription cost is higher than marketplace courses",
        ],
        bestFor: "Intermediate+ frontend engineers",
        activeCoupon: {
            code: "",
            discount: "Free Trial",
            description: "Try it and cancel anytime",
            type: "link",
            link: "https://frontendmasters.com?aff=skillperks",
        },
        alternatives: [
            { name: "Udemy", slug: "udemy" },
            { name: "Educative", slug: "educative" },
        ],
    },
    {
        id: "algoexpert",
        name: "AlgoExpert",
        slug: "algoexpert",
        couponSlug: "algoexpert-coupon-code",
        logo: "/logos/algoexpert.png",
        logoColor: "bg-indigo-600",
        rating: 4.7,
        reviewCount: 1800,
        description: "Curated coding interview questions with video explanations.",
        longDescription: "AlgoExpert is a focused interview-prep platform with curated questions and detailed explanations. It's useful when you want a guided set of problems rather than a huge question bank.",
        features: ["Curated Questions", "Video Explanations", "Mock Interviews", "Progress Tracking"],
        pricing: {
            annual: 0,
            lifetime: 0,
            currency: "USD",
        },
        pros: [
            "Focused and curated",
            "Clear explanations",
            "Good for structured prep",
        ],
        cons: [
            "Less breadth than massive question banks",
            "Pricing changes by product bundle",
        ],
        bestFor: "Structured coding interview prep",
        activeCoupon: {
            code: "",
            discount: "Limited-time savings",
            description: "Discounts vary by campaign",
            type: "link",
            link: "https://www.algoexpert.io?aff=skillperks",
        },
        alternatives: [
            { name: "LeetCode", slug: "leetcode" },
            { name: "Educative", slug: "educative" },
        ],
    },
    {
        id: "leetcode",
        name: "LeetCode",
        slug: "leetcode",
        couponSlug: "leetcode-deals",
        logo: "/logos/leetcode.png",
        logoColor: "bg-yellow-500",
        rating: 4.7,
        reviewCount: 25000,
        description: "The most popular coding interview practice platform.",
        longDescription: "LeetCode is the go-to for practicing coding interview problems. Best when you want a large question bank and consistent daily practice.",
        features: ["Huge Question Bank", "Company Tags", "Contests", "Study Plans"],
        pricing: {
            monthly: 35,
            annual: 159,
            currency: "USD",
        },
        pros: [
            "Best-in-class breadth",
            "Study plans help structure practice",
            "Widely used (easy to find discussions)",
        ],
        cons: [
            "Can become grindy without a plan",
            "Not designed for system design",
        ],
        bestFor: "Daily coding interview practice",
        activeCoupon: {
            code: "",
            discount: "Seasonal deals",
            description: "Premium discounts vary",
            type: "link",
            link: "https://leetcode.com?aff=skillperks",
        },
        alternatives: [
            { name: "AlgoExpert", slug: "algoexpert" },
            { name: "Educative", slug: "educative" },
        ],
    },
    {
        id: "dataquest",
        name: "DataQuest",
        slug: "dataquest",
        couponSlug: "dataquest-coupon-code",
        logo: "/logos/dataquest.png",
        logoColor: "bg-green-500",
        rating: 4.6,
        reviewCount: 1200,
        description: "Project-based data science learning paths.",
        longDescription: "DataQuest focuses on project-based learning paths for data skills. It's a good fit if you prefer building practical projects rather than only short exercises.",
        features: ["Project-Based", "Learning Paths", "Python/SQL", "Portfolio Focus"],
        pricing: {
            monthly: 49,
            annual: 399,
            currency: "USD",
        },
        pros: [
            "Project-based approach",
            "Good for building a portfolio",
            "Structured paths",
        ],
        cons: [
            "Smaller catalog than big platforms",
            "Some topics feel less interactive than competitors",
        ],
        bestFor: "Project-based data learning",
        activeCoupon: {
            code: "",
            discount: "Limited-time savings",
            description: "Discounts vary",
            type: "link",
            link: "https://www.dataquest.io?aff=skillperks",
        },
        alternatives: [
            { name: "DataCamp", slug: "datacamp" },
            { name: "Coursera", slug: "coursera" },
        ],
    },
];

export function getPlatformBySlug(slug: string) {
    return platforms.find((p) => p.slug === slug);
}

export function getPlatformByCouponSlug(couponSlug: string) {
    return platforms.find((p) => p.couponSlug === couponSlug);
}

export function getAllPlatformSlugs() {
    return platforms.map((p) => ({ slug: p.slug }));
}

export function getAllCouponSlugs() {
    return platforms.map((p) => ({ slug: p.couponSlug }));
}
