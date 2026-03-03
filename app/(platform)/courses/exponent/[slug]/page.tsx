import { notFound } from "next/navigation";
import Link from "next/link";

import { getExponentCourseBySlug, getAllExponentCourseSlugs } from "@/lib/exponent-courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ExponentCoursePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return getAllExponentCourseSlugs();
}

export default async function ExponentCoursePage(props: ExponentCoursePageProps) {
    const params = await props.params;
    const course = getExponentCourseBySlug(params.slug);

    if (!course) {
        notFound();
    }

    return (
        <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
                <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
                    <div className="space-y-10">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <Badge>Exponent</Badge>
                            <Badge variant="secondary">{course.category}</Badge>
                            <Badge variant="outline">{course.difficulty}</Badge>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            {course.title} (2026)
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">{course.subtitle}</p>
                        <div className="text-sm text-muted-foreground">
                            Est. {course.estimatedHours} hours • {course.rating}/5 ({course.reviewCount.toLocaleString()} reviews)
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button asChild size="lg">
                                <a href={course.affiliateLink} target="_blank" rel="noreferrer">Visit on Exponent</a>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link href="/coupons/exponent-promo-code/">Get Exponent Promo Code</Link>
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h2 className="text-2xl font-bold mb-4">What you’ll learn</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {course.keyOutcomes.map((o) => (
                                <div key={o} className="flex items-center gap-3 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                                    <span className="h-2 w-2 rounded-full bg-primary" />
                                    <span className="font-medium">{o}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">Course highlights</h2>
                        <ul className="space-y-2">
                            {course.highlights.map((h) => (
                                <li key={h} className="text-sm flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    <span>{h}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Prerequisites</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {course.prerequisites.map((p) => (
                                        <li key={p} className="text-sm flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/60 shrink-0" />
                                            <span>{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Best for</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {course.bestFor.map((b) => (
                                        <li key={b} className="text-sm flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/60 shrink-0" />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="rounded-xl bg-muted p-8">
                        <h2 className="text-2xl font-bold mb-2">Want the best price?</h2>
                        <p className="text-muted-foreground mb-4">
                            Before you enroll, check the latest verified Exponent promo codes and discounts.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button asChild>
                                <Link href="/coupons/exponent-promo-code/">View Exponent Promo Code Page</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/courses/exponent/">Browse more Exponent courses</Link>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">FAQ</h2>
                        <div className="space-y-4">
                            {course.faq.map((item) => (
                                <Card key={item.question}>
                                    <CardHeader>
                                        <CardTitle className="text-base">{item.question}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground">{item.answer}</CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                    <div className="space-y-6">
                        <Card className="sticky top-24 overflow-hidden border-primary/20 shadow-lg">
                            <CardContent className="p-6 space-y-4">
                            <div>
                                <div className="text-sm text-muted-foreground">Category</div>
                                <div className="font-semibold">{course.category}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Difficulty</div>
                                <div className="font-semibold">{course.difficulty}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Estimated time</div>
                                <div className="font-semibold">{course.estimatedHours} hours</div>
                            </div>
                            <Separator />
                            <Button asChild size="lg" className="w-full">
                                <a href={course.affiliateLink} target="_blank" rel="noreferrer">Start this course</a>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/coupons/exponent-promo-code/">Use promo code</Link>
                            </Button>
                            <div className="text-xs text-muted-foreground">
                                <Link href="/courses/exponent/" className="hover:underline">← Back to Exponent courses</Link>
                            </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
    );
}
