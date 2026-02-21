import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, Star, ExternalLink, ShieldCheck } from "lucide-react";

import { getPlatformBySlug, platforms } from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";
import { CommentsPlaceholder } from "@/components/shared/comments-placeholder";
import { absoluteUrl, buildBreadcrumbJsonLd, buildReviewJsonLd } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { CouponCard } from "@/components/marketing/coupon-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ReviewPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return platforms.map((platform) => ({
        slug: platform.slug,
    }));
}

export async function generateMetadata(props: ReviewPageProps): Promise<Metadata> {
    const params = await props.params;
    const platform = getPlatformBySlug(params.slug);

    if (!platform) {
        return {};
    }

    const canonicalPath = `/reviews/${platform.slug}`;
    const canonicalUrl = absoluteUrl(canonicalPath);
    const title = `${platform.name} Review (2026)`;
    const description = platform.longDescription;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function ReviewPage(props: ReviewPageProps) {
    const params = await props.params;
    const platform = getPlatformBySlug(params.slug);

    if (!platform) {
        notFound();
    }

    const canonicalPath = `/reviews/${platform.slug}`;
    const canonicalUrl = absoluteUrl(canonicalPath);
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: "Home", url: absoluteUrl("/") },
        { name: "Reviews", url: absoluteUrl("/reviews") },
        { name: platform.name, url: canonicalUrl },
    ]);
    const reviewJsonLd = buildReviewJsonLd({
        itemName: `${platform.name} Review`,
        url: canonicalUrl,
        ratingValue: platform.rating,
        ratingCount: platform.reviewCount,
    });

    const educativeFaqJsonLd =
        platform.slug === "educative"
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: [
                      {
                          "@type": "Question",
                          name: "Is Educative good for System Design?",
                          acceptedAnswer: {
                              "@type": "Answer",
                              text: "Yes. Educative is well known for system design prep and structured explanations, and it works well if you prefer learning by reading + practicing.",
                          },
                      },
                      {
                          "@type": "Question",
                          name: "Is Educative good for coding interview prep?",
                          acceptedAnswer: {
                              "@type": "Answer",
                              text: "Yes—especially for patterns-based prep. It’s best if you follow a consistent routine and practice deliberately.",
                          },
                      },
                      {
                          "@type": "Question",
                          name: "Which Educative plan is worth it?",
                          acceptedAnswer: {
                              "@type": "Answer",
                              text: "Premium is the best starting point for most job seekers. Premium Plus is only worth it if you’ll use Cloud Labs.",
                          },
                      },
                      {
                          "@type": "Question",
                          name: "How can I get the best Educative discount?",
                          acceptedAnswer: {
                              "@type": "Answer",
                              text: `See the latest verified deal on ${absoluteUrl("/coupons/educative")} and compare annual vs monthly value.`,
                          },
                      },
                  ],
              }
            : null;

    return (
        <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
            <JsonLd data={educativeFaqJsonLd ? [breadcrumbJsonLd, reviewJsonLd, educativeFaqJsonLd] : [breadcrumbJsonLd, reviewJsonLd]} />
            <div className="grid gap-10 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_350px]">

                {/* Main Content */}
                <div className="space-y-10">

                    {/* Hero Section */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            {platform.name} Review (2026)
                        </h1>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <div className="flex items-center gap-1 text-amber-500">
                                <Star className="h-5 w-5 fill-current" />
                                <span className="font-bold text-lg text-foreground">{platform.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{platform.reviewCount} user ratings</span>
                            <span>•</span>
                            <span className="text-green-600 font-medium flex items-center gap-1">
                                <ShieldCheck className="h-4 w-4" /> Editorial Verified
                            </span>
                        </div>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {platform.longDescription}
                        </p>
                    </div>

                    <Separator />

                    {/* Pros & Cons */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="border-green-500/20 bg-green-500/5">
                            <CardHeader>
                                <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
                                    <Check className="h-5 w-5" /> Pros
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {platform.pros.map((pro, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                                            {pro}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="border-red-500/20 bg-red-500/5">
                            <CardHeader>
                                <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
                                    <X className="h-5 w-5" /> Cons
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {platform.cons.map((con, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                                            {con}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Features */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {platform.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                                    <Check className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {platform.slug === "educative" && (
                        <>
                            <Separator />

                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">Educative Unlimited: what you get</h2>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Why Educative works</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground space-y-2">
                                        <div>
                                            - Educative is built around interactive, text-based lessons (great if you prefer reading + practicing over long videos).
                                        </div>
                                        <div>
                                            - The subscription is designed for hands-on learning: courses, projects, assessments, and optional Cloud Labs.
                                        </div>
                                        <div>
                                            - If you’re preparing for interviews, Educative is strongest for System Design and Coding Interview patterns.
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-primary/20">
                                    <CardHeader>
                                        <CardTitle>Best deal (most users)</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground space-y-3">
                                        <div>- Annual (or longer) plans typically have the best discounts.</div>
                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            <Button asChild>
                                                <Link href="/coupons/educative">Get Educative coupons</Link>
                                            </Button>
                                            <Button asChild variant="outline">
                                                <Link href="/coupons/educative/student-discount">Student discount</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">Plans breakdown (Standard vs Premium vs Premium Plus)</h2>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Standard</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground space-y-2">
                                            <div>- Unlimited access to Educative courses.</div>
                                            <div>- Best for: self-paced learners who only need courses.</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Premium</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground space-y-2">
                                            <div>- Everything in Standard.</div>
                                            <div>- Adds: projects and personalized learning tools.</div>
                                            <div>- Best for: interview prep + practical learning.</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Premium Plus</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground space-y-2">
                                            <div>- Everything in Premium.</div>
                                            <div>- Adds: Cloud Labs (hands-on cloud practice).</div>
                                            <div>- Best for: learners who will actually use labs.</div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Shortcut: which plan should you buy?</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground space-y-2">
                                        <div>- If you want the best balance, start with Premium.</div>
                                        <div>- If you’re cloud-focused, consider Premium Plus.</div>
                                        <div>- If you only want reading + practice lessons, Standard can be enough.</div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">Free trial (important)</h2>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Try before you buy</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground space-y-2">
                                        <div>- Educative offers a free trial experience for many courses and hands-on features.</div>
                                        <div>- Interview prep courses may be excluded from the free trial.</div>
                                        <div>
                                            - Recommendation: try the platform style first, then use a coupon for the plan you want.
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">Best Educative courses (high intent)</h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">System Design</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground space-y-3">
                                            <div>Best for: engineers preparing for mid/senior interviews.</div>
                                            <Button asChild variant="outline">
                                                <Link href="/coupons/educative/system-design">System Design coupon page</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Coding Interviews</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-muted-foreground space-y-3">
                                            <div>Best for: patterns-based prep and structured practice.</div>
                                            <Button asChild variant="outline">
                                                <Link href="/coupons/educative/coding-interview">Coding Interview coupon page</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">FAQs</h2>
                                <div className="space-y-4">
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-semibold">Is Educative good for System Design?</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Yes. Educative is well known for system design prep and structured explanations, and it works well if you prefer learning by reading + practicing.
                                        </p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-semibold">Is Educative good for coding interview prep?</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Yes—especially for patterns-based prep. It’s best if you follow a consistent routine and practice deliberately.
                                        </p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-semibold">Which plan is worth it?</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Premium is the best starting point for most job seekers. Premium Plus is only worth it if you’ll use Cloud Labs.
                                        </p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-semibold">How can I get the best discount?</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Use our Educative coupon page to find the best live deal and compare annual vs monthly value.
                                            <span> </span>
                                            <Link href="/coupons/educative" className="underline">See Educative coupons</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Detailed Verdict */}
                    <div className="rounded-xl bg-muted p-8">
                        <h2 className="text-2xl font-bold mb-4">Our Verdict</h2>
                        <p className="text-lg text-muted-foreground mb-4">
                            {platform.name} is best suited for <strong className="text-foreground">{platform.bestFor}</strong>.
                            With a rating of {platform.rating}/5, it stands out for its quality content and practical approach.
                        </p>
                        {platform.slug === "educative" ? (
                            <Button size="lg" className="w-full sm:w-auto" asChild>
                                <a href="/go/educative?src=review" target="_blank" rel="noopener noreferrer">
                                    Visit {platform.name} Official Site <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        ) : (
                            <Button size="lg" className="w-full sm:w-auto" asChild>
                                <Link href={`/coupons/${platform.couponSlug}`}>Get {platform.name} coupons</Link>
                            </Button>
                        )}
                    </div>

                    <CommentsPlaceholder />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="sticky top-24 overflow-hidden border-primary/20 shadow-lg">
                        <div className={`${platform.logoColor} h-24 flex items-center justify-center`}>
                            <span className="text-4xl font-bold text-white drop-shadow-md">{platform.name[0]}</span>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-1">
                                    {platform.activeCoupon.discount}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {platform.activeCoupon.description}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm py-2 border-b">
                                    <span className="text-muted-foreground">Monthly Plan</span>
                                    <span className="font-medium">${platform.pricing.monthly || '?'}</span>
                                </div>
                                <div className="flex justify-between text-sm py-2 border-b">
                                    <span className="text-muted-foreground">Annual Plan</span>
                                    <span className="font-medium text-green-600">${platform.pricing.annual}</span>
                                </div>
                            </div>

                            <CouponCard coupon={platform.activeCoupon} platformName={platform.name} />
                        </CardContent>
                    </Card>

                    <div className="text-sm text-muted-foreground">
                        <h4 className="font-semibold text-foreground mb-2">Compare Alternatives</h4>
                        <ul className="space-y-2">
                            {platform.alternatives.map((alt) => (
                                <li key={alt.slug}>
                                    <Link href={`/reviews/${alt.slug}`} className="hover:underline hover:text-primary flex justify-between">
                                        <span>{alt.name}</span>
                                        <span className="text-xs">Read Review →</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
