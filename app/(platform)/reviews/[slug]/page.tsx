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

    return (
        <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
            <JsonLd data={[breadcrumbJsonLd, reviewJsonLd]} />
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

                    {/* Detailed Verdict */}
                    <div className="rounded-xl bg-muted p-8">
                        <h2 className="text-2xl font-bold mb-4">Our Verdict</h2>
                        <p className="text-lg text-muted-foreground mb-4">
                            {platform.name} is best suited for <strong className="text-foreground">{platform.bestFor}</strong>.
                            With a rating of {platform.rating}/5, it stands out for its quality content and practical approach.
                        </p>
                        <Button size="lg" className="w-full sm:w-auto">
                            Visit {platform.name} Official Site <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
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
