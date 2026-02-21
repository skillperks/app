import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background py-20 pb-12 md:pb-20 lg:py-32">
            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
                        <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-foreground">New:</span> 2026 Tech Course Deals Updated Daily
                        </span>
                    </div>
                    <h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                        Find Your Perfect Tech Course <br className="hidden sm:inline" />
                        in <span className="text-primary">60 Seconds</span>
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                        Verified coupons, expert reviews, and smart comparisons for 50+ learning platforms. Stop overpaying for your career growth.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button size="lg" className="h-12 w-full px-8 text-base sm:w-auto" asChild>
                            <Link href="/tools/course-finder">
                                Take the Course Finder Quiz
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 w-full px-8 text-base sm:w-auto" asChild>
                            <Link href="/coupons">
                                Browse All Deals
                            </Link>
                        </Button>
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <p><span className="font-semibold text-foreground">10,000+</span> developers saved this month</p>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl" aria-hidden="true">
                <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-30" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>
        </section>
    );
}
