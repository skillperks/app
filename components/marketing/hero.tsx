import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
    return (
        <section className="relative pt-24 pb-16 md:pt-28 lg:pt-32 lg:pb-24">
            <div className="pointer-events-none absolute inset-[-30%] opacity-30">
                <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-purple-600/40 blur-[140px]" />
                <div className="absolute -bottom-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-cyan-600/40 blur-[140px]" />
            </div>
            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-10 inline-flex items-center rounded-full border border-slate-700 bg-slate-800/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
                        <span className="mr-2.5 inline-flex h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                        Now Analyzing Learning Ecosystems
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl">
                        Stop Overpaying for{" "}
                        <span className="text-accent-gradient">Tech Courses</span>
                        <br />
                        Find Working Coupons
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                        Verified coupons, expert reviews, and honest comparisons — so you don’t waste money on courses that don’t deliver.
                    </p>
                    <div className="mt-8 mx-auto max-w-3xl">
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                className="btn-accent-gradient w-full rounded-2xl px-10 py-5 font-bold shadow-xl shadow-purple-500/15 hover:brightness-110 active:scale-[0.98] sm:w-auto"
                                asChild
                            >
                                <Link href="/tools/course-finder">
                                    Take the Course Finder Quiz
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">Hot Topics:</span>
                            {[
                                "System Design",
                                "Kubernetes",
                                "Rust Core",
                                "Backend Infrastructure",
                            ].map((label) => (
                                <Badge
                                    key={label}
                                    variant="secondary"
                                    className="rounded-full border border-slate-700 bg-slate-800/50 px-5 py-2 text-sm font-semibold text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-300"
                                >
                                    {label}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
