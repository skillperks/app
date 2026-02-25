import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
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
                        Master Your{" "}
                        <span className="text-accent-gradient">Tech Stack</span>
                        <br />
                        Through Data
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                        Premium reviews and verified discounts for the tools used by world-class engineering teams. No fluff, just insights.
                    </p>
                    <div className="mt-8 mx-auto max-w-3xl">
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                            <div className="relative w-full flex-1">
                                <Search className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                                <input
                                    placeholder="Find your next course at best price..."
                                    className="block w-full rounded-2xl border border-slate-700 bg-slate-900/60 py-5 pl-16 pr-8 text-lg outline-none transition-all placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                            <Button
                                className="btn-accent-gradient w-full rounded-2xl px-10 py-5 font-bold shadow-xl shadow-purple-500/15 hover:brightness-110 active:scale-[0.98] sm:w-auto"
                                asChild
                            >
                                <Link href="/browse">
                                    Search Courses
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
        </section>
    );
}
