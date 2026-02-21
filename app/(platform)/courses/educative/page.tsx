import Link from "next/link";

import { educativeCourses } from "@/lib/educative-courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function EducativeCoursesPage() {
    return (
        <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
            <div className="space-y-10">
                <div className="space-y-4">
                    <Badge className="w-fit">Educative</Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Best Individual Educative Courses (2026)
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                        Hand-picked Educative courses that convert well because they solve a very specific job-to-be-done.
                        Each page highlights who the course is for, what you’ll learn, and the fastest path to getting results.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild size="lg">
                            <Link href="/coupons/educative-coupon-code/">Get Educative Coupon Code</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/reviews/educative">Read Educative Review</Link>
                        </Button>
                    </div>
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {educativeCourses.map((course) => (
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
                                    Est. {course.estimatedHours} hours • {course.rating}/5 ({course.reviewCount.toLocaleString()} reviews)
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
                                        <Link href={`/courses/educative/${course.slug}`}>View Course Page</Link>
                                    </Button>
                                    <Button asChild variant="outline">
                                        <a href={course.affiliateLink} target="_blank" rel="noreferrer">
                                            Visit on Educative
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
