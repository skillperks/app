import Link from "next/link";

import { exponentCourses } from "@/lib/exponent-courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ExponentCoursesPage() {
    return (
        <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
            <div className="space-y-10">
                <div className="space-y-4">
                    <Badge className="w-fit">Exponent</Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Best Exponent Courses (2026)
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                        High-intent Exponent courses for interview prep: System Design, PM, and Behavioral.
                        Each landing page focuses on outcomes and who it’s best for.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild size="lg">
                            <Link href="/coupons/exponent-promo-code/">Get Exponent Promo Code</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/reviews/exponent">Read Exponent Review</Link>
                        </Button>
                    </div>
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {exponentCourses.map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                            <CardHeader className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">{course.category}</Badge>
                                    <Badge variant="outline">{course.difficulty}</Badge>
                                </div>
                                <CardTitle className="text-xl leading-snug">{course.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">{course.subtitle}</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-sm text-muted-foreground">
                                    Est. {course.estimatedHours} hours • {course.rating}/5
                                </div>
                                <ul className="space-y-2">
                                    {course.keyOutcomes.slice(0, 3).map((o) => (
                                        <li key={o} className="text-sm flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                            <span>{o}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-col gap-2">
                                    <Button asChild>
                                        <Link href={`/courses/exponent/${course.slug}`}>View Course Page</Link>
                                    </Button>
                                    <Button asChild variant="outline">
                                        <a href={course.affiliateLink} target="_blank" rel="noreferrer">
                                            Visit on Exponent
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
