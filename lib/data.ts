import { buildGoLink } from "@/lib/affiliate-links";

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
        longDescription: "Educative Unlimited is a hands-on, text-based learning platform for developers. You learn by reading and practicing directly in the browser, with access to Educative’s course library, projects, cloud labs, and personalized learning tools including AI Mock Interviews.",
        features: ["Text-Based Hands-on Learning", "AI Mock Interviews", "Hands-on Courses", "Real-World Projects", "AWS Cloud Labs", "Skill Paths", "Assessments"],
        pricing: {
            monthly: 59,
            annual: 199,
            currency: "USD",
        },
        pros: [
            "Text-based, hands-on lessons that are easy to skim and revisit",
            "Practice coding directly in the browser (good for learning by doing)",
            "Strong fit for interview prep workflows (e.g., Coding Interview and System Design practice)",
            "Includes projects and cloud labs for more applied, real-world practice",
            "AI Mock Interviews can add structure and feedback to your prep routine",
            "Good for busy learners who prefer reading + interactive exercises over long videos",
        ],
        cons: [
            "Not ideal if you strongly prefer video-first courses",
            "A subscription model may feel expensive if you only need one or two courses",
            "Hands-on content varies by topic—some areas may be deeper than others",
            "Interactive, in-browser learning can be less convenient for fully offline study",
        ],
        bestFor: "Intermediate to Advanced Developers",
        activeCoupon: {
            code: "",
            discount: "69% OFF",
            description: "Get 69% off",
            type: "link",
            link: "/go/educative?src=coupon",
        },
        alternatives: [
            { name: "Exponent", slug: "exponent" },
            { name: "DataCamp", slug: "datacamp" }
        ]
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
            annual: 144,
            currency: "USD",
        },
        pros: [
            "Strong role-based course catalog (PM, system design, software engineering, data roles)",
            "Practice + questions make it easy to drill interview formats",
            "Coaching options for mock interviews, resume review, and negotiation",
        ],
        cons: [
            "Monthly plan is expensive",
            "Not ideal if you only want algorithm drills",
        ],
        bestFor: "PM & System Design Interviews",
        activeCoupon: {
            code: "",
            discount: "70% OFF",
            description: "$12/month billed annually",
            type: "link",
            link: "/go/exponent?src=coupon",
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
            link: buildGoLink({
                to: "https://datacamp.pxf.io/skillup",
                merchant: "datacamp",
                placement: "coupon",
            }),
        },
        alternatives: [
            { name: "Educative", slug: "educative" },
            { name: "Exponent", slug: "exponent" }
        ]
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
