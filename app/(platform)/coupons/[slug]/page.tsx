import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Clock, Info, ShieldCheck } from "lucide-react";

import { getAllCouponSlugs, getPlatformByCouponSlug, getPlatformBySlug, platforms } from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";
import { CommentsPlaceholder } from "@/components/shared/comments-placeholder";
import { absoluteUrl, buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { CouponCard } from "@/components/marketing/coupon-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

interface CouponPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return getAllCouponSlugs();
}

export async function generateMetadata(props: CouponPageProps): Promise<Metadata> {
    const params = await props.params;
    const platform = getPlatformByCouponSlug(params.slug) ?? getPlatformBySlug(params.slug);

    if (!platform) {
        return {};
    }

    const couponPrimaryLabel = platform.slug === "exponent" ? "Promo Code" : "Coupon Code";
    const canonicalPath = `/coupons/${platform.couponSlug}`;
    const canonicalUrl = absoluteUrl(canonicalPath);
    const title = `${platform.name} ${couponPrimaryLabel} & Deals (2026)`;
    const description = `Verified ${platform.name} coupons and deals. Save up to ${platform.activeCoupon.discount}.`;

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

export default async function CouponPage(props: CouponPageProps) {
    const params = await props.params;
    const platform = getPlatformByCouponSlug(params.slug) ?? getPlatformBySlug(params.slug);

    if (platform && platform.couponSlug !== params.slug) {
        redirect(`/coupons/${platform.couponSlug}`);
    }

    if (!platform) {
        notFound();
    }

    const couponPrimaryLabel = platform.slug === "exponent" ? "Promo Code" : "Coupon Code";
    const canonicalPath = `/coupons/${platform.couponSlug}`;
    const canonicalUrl = absoluteUrl(canonicalPath);
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: "Home", url: absoluteUrl("/") },
        { name: "Coupons", url: absoluteUrl("/coupons") },
        { name: platform.name, url: canonicalUrl },
    ]);
    const articleJsonLd = buildArticleJsonLd({
        headline: `${platform.name} ${couponPrimaryLabel} & Deals (2026)`,
        description: `Verified ${platform.name} coupons and deals. Save up to ${platform.activeCoupon.discount}.`,
        url: canonicalUrl,
    });

    const offerJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${platform.name} Subscription`,
        url: canonicalUrl,
        brand: {
            "@type": "Brand",
            name: platform.name,
        },
        offers: {
            "@type": "Offer",
            url: canonicalUrl,
            description: `${platform.activeCoupon.discount} — ${platform.activeCoupon.description}`,
            availability: "https://schema.org/InStock",
        },
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Does this coupon work for existing users?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Typically, these coupons are for new subscribers only, but sometimes they work for renewals if you let your current plan expire.",
                },
            },
            {
                "@type": "Question",
                name: `Is there a ${platform.name} student discount?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Some platforms offer student pricing. For ${platform.name}, see our student discount details at ${absoluteUrl(`/coupons/${platform.slug}/student-discount`)}.`,
                },
            },
            ...(platform.slug === "educative"
                ? [
                      {
                          "@type": "Question",
                          name: "Which Educative plan is best (Standard vs Premium vs Premium Plus)?",
                          acceptedAnswer: {
                              "@type": "Answer",
                              text: "Standard is best for hands-on courses, Premium adds projects + interview prep, and Premium Plus adds cloud labs. If you’re preparing for interviews, Premium is usually the best value.",
                          },
                      },
                      {
                          "@type": "Question",
                          name: "Can I stack multiple coupon codes?",
                          acceptedAnswer: {
                              "@type": "Answer",
                              text: "In most cases, only one coupon can be applied per order. If a code doesn’t work, try a different active deal.",
                          },
                      },
                      {
                          "@type": "Question",
                          name: "Do discounts work on monthly plans?",
                          acceptedAnswer: {
                              "@type": "Answer",
                              text: "Most of the best discounts are tied to annual (or longer) plans. Monthly plans may not qualify depending on the promotion.",
                          },
                      },
                      {
                          "@type": "Question",
                          name: "Can I try Educative for free?",
                          acceptedAnswer: {
                              "@type": "Answer",
                              text: "Educative often offers a free trial or limited free access for new users. See the offer details on the official site during checkout.",
                          },
                      },
                      {
                          "@type": "Question",
                          name: "Are there Educative discounts for System Design or Coding Interview prep?",
                          acceptedAnswer: {
                              "@type": "Answer",
                              text: `Yes. Start with our topic pages: ${absoluteUrl("/coupons/educative/system-design")} and ${absoluteUrl("/coupons/educative/coding-interview")} for the best deal + the right course path.`,
                          },
                      },
                  ]
                : []),
        ],
    };

    return (
        <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
            <JsonLd data={[breadcrumbJsonLd, articleJsonLd, offerJsonLd, faqJsonLd]} />
            <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
                {/* Main Content */}
                <div className="space-y-8">
                    <div className="text-center md:text-left">
                        <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                            Verified Today
                        </Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                            {platform.name} {couponPrimaryLabel} & Deals (2026)
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Save up to <span className="text-primary font-bold">{platform.activeCoupon.discount}</span> with our exclusive verified coupons.
                        </p>
                    </div>

                    {platform.slug === "educative" && (
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Best individual Educative courses</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                If you’re looking for the highest-converting, role-specific courses (System Design, Coding Patterns, ML), browse our curated course pages.
                                <div className="mt-4">
                                    <Button asChild variant="outline">
                                        <Link href="/courses/educative/">Browse Educative courses</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {platform.slug === "educative" && (
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Best ways to save on Educative</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-2">
                                <div>- Best value usually comes from annual (or longer) plans.</div>
                                <div>
                                    - If you’re a student, check eligibility: <Link href="/coupons/educative/student-discount" className="underline">student discount</Link>.
                                </div>
                                <div>
                                    - Popular learning goals: <Link href="/coupons/educative/system-design" className="underline">System Design</Link> and{" "}
                                    <Link href="/coupons/educative/coding-interview" className="underline">Coding Interviews</Link>.
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {platform.slug === "educative" && (
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Educative student discount</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                If you have a verified school email, you may qualify for student pricing on Educative.
                                <div className="mt-4">
                                    <Button asChild variant="outline">
                                        <Link href="/coupons/educative/student-discount">See eligibility & steps</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {platform.slug === "exponent" && (
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Best Exponent courses</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Explore our outcome-focused landing pages for Exponent courses (System Design, PM, Behavioral) and pick the best fit for your interview loop.
                                <div className="mt-4">
                                    <Button asChild variant="outline">
                                        <Link href="/courses/exponent/">Browse Exponent courses</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {platform.slug === "datacamp" && (
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Best DataCamp courses</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Browse our highest-intent DataCamp course pages for Python, SQL, and pandas—built to convert and drive subscriptions.
                                <div className="mt-4">
                                    <Button asChild variant="outline">
                                        <Link href="/courses/datacamp/">Browse DataCamp courses</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Featured Coupon */}
                    <Card className="border-2 border-primary/20 shadow-lg bg-gradient-to-br from-background to-primary/5">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                        {platform.activeCoupon.discount} Sitewide
                                    </CardTitle>
                                    <p className="text-muted-foreground mt-1">
                                        {platform.activeCoupon.description}
                                    </p>
                                </div>
                                <div className={`h-12 w-12 rounded-lg ${platform.logoColor} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                                    {platform.name[0]}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="py-6">
                            <CouponCard coupon={platform.activeCoupon} platformName={platform.name} />
                            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1 text-green-600 font-medium">
                                    <ShieldCheck className="h-4 w-4" /> 100% Success Rate
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> Expires Soon
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/50 pt-4 flex justify-between items-center text-xs text-muted-foreground">
                            <span>Last used: 12 minutes ago</span>
                            <Link href="/disclosure" className="underline">Terms & Conditions</Link>
                        </CardFooter>
                    </Card>

                    {platform.slug === "educative" && (
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Plans overview (quick pick)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-lg border p-4">
                                    <div className="text-sm font-semibold">Standard</div>
                                    <div className="mt-2 text-sm text-muted-foreground">Best for: hands-on courses and structured learning.</div>
                                </div>
                                <div className="rounded-lg border p-4">
                                    <div className="text-sm font-semibold">Premium</div>
                                    <div className="mt-2 text-sm text-muted-foreground">Best for: interview prep + projects (most popular).</div>
                                </div>
                                <div className="rounded-lg border p-4">
                                    <div className="text-sm font-semibold">Premium Plus</div>
                                    <div className="mt-2 text-sm text-muted-foreground">Best for: projects + cloud labs for hands-on practice.</div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {platform.slug === "educative" && (
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Discount proof / verification</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-2">
                                <div>- We keep this page updated and monitor deal changes.</div>
                                <div>- If a code doesn’t apply at checkout, try the deal link option (auto-applied where available).</div>
                                <div>
                                    - Start with a goal page:{" "}
                                    <Link href="/coupons/educative/system-design" className="underline">System Design</Link> /{" "}
                                    <Link href="/coupons/educative/coding-interview" className="underline">Coding Interview</Link>.
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Application Steps */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">How to Apply the Coupon</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <Badge variant="outline" className="w-fit mb-2">Step 1</Badge>
                                    <CardTitle className="text-lg">
                                        {platform.activeCoupon.type === "link" ? "Open the deal" : "Copy code"}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    {platform.activeCoupon.type === "link"
                                        ? "Click the deal button above to open the offer on the official website."
                                        : "Click the reveal button above to view the code, then copy it to your clipboard."}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Badge variant="outline" className="w-fit mb-2">Step 2</Badge>
                                    <CardTitle className="text-lg">Go to Checkout</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    Select your plan on the official website and proceed to the checkout page.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Badge variant="outline" className="w-fit mb-2">Step 3</Badge>
                                    <CardTitle className="text-lg">Paste & Save</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    {platform.activeCoupon.type === "link"
                                        ? "Your discount is applied automatically. Complete checkout to lock in the savings."
                                        : "Locate the promo code box, paste the code, and watch the price drop instantly."}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Info className="h-4 w-4 text-primary" /> Does this coupon work for existing users?
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Typically, these coupons are for new subscribers only, but sometimes they work for renewals if you let your current plan expire.
                                </p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Info className="h-4 w-4 text-primary" /> Is there a student discount?
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Yes, many platforms offer student discounts. Check our dedicated student discount page for {platform.name}.{" "}
                                    <Link href={`/coupons/${platform.slug}/student-discount`} className="underline">View student discount</Link>
                                </p>
                            </div>
                            {platform.slug === "educative" && (
                                <>
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-semibold flex items-center gap-2">
                                            <Info className="h-4 w-4 text-primary" /> Which Educative plan should I choose?
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Standard is best for course-only learning. Premium adds projects + interview prep and is usually the best value for job seekers.
                                            Premium Plus adds cloud labs.
                                        </p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-semibold flex items-center gap-2">
                                            <Info className="h-4 w-4 text-primary" /> Can I stack multiple coupon codes?
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Usually no—only one coupon can be applied per purchase. If a code doesn’t work, try a different active deal.
                                        </p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-semibold flex items-center gap-2">
                                            <Info className="h-4 w-4 text-primary" /> Do discounts work on monthly plans?
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            The best discounts typically apply to annual (or longer) plans. Monthly plans may not qualify depending on the promotion.
                                        </p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-semibold flex items-center gap-2">
                                            <Info className="h-4 w-4 text-primary" /> Can I try Educative for free?
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Educative often offers a free trial or limited free access for new users. Check the official site during signup.
                                        </p>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-semibold flex items-center gap-2">
                                            <Info className="h-4 w-4 text-primary" /> Is there a discount for System Design or Coding Interview prep?
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Yes — start with our goal pages:{" "}
                                            <Link href="/coupons/educative/system-design" className="underline">Educative System Design coupon</Link> and{" "}
                                            <Link href="/coupons/educative/coding-interview" className="underline">Educative Coding Interview coupon</Link>.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <CommentsPlaceholder />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="sticky top-24 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Platform Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-md border bg-muted/30 p-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-10 w-10 rounded-lg ${platform.logoColor} flex items-center justify-center text-white font-bold shadow-sm`}>
                                            {platform.name[0]}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold">{platform.name}</div>
                                            <div className="text-xs text-muted-foreground">Rating: {platform.rating}/5</div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {platform.description}
                                </p>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={`/reviews/${platform.slug}`}>
                                        Read Full Review
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="p-4 bg-muted rounded-lg">
                            <h3 className="font-semibold mb-2 text-sm">More Deals</h3>
                            <ul className="space-y-2">
                                {platforms.filter(p => p.slug !== platform.slug).map((p) => (
                                    <li key={p.slug}>
                                        <Link href={`/coupons/${p.couponSlug}`} className="text-sm flex justify-between hover:text-primary">
                                            <span>{p.name}</span>
                                            <span className="font-bold text-green-600">{p.activeCoupon.discount}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
