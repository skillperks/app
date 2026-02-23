import Link from "next/link";
import { ArrowRight, CheckCircle2, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const comparisons = [
  { label: "Educative vs. DataCamp", href: "/comparisons/educative-vs-datacamp" },
  { label: "Educative vs. Exponent", href: "/comparisons/educative-vs-exponent" },
  { label: "DataCamp vs. Exponent", href: "/comparisons/datacamp-vs-exponent" },
];

export function LearningRoadmap() {
  return (
    <section className="relative py-28 lg:py-28">
      <div className="pointer-events-none absolute inset-[-30%] opacity-30">
        <div className="absolute -top-[25%] -left-[10%] h-[55%] w-[55%] rounded-full bg-purple-600/35 blur-[160px]" />
        <div className="absolute -bottom-[25%] -right-[10%] h-[55%] w-[55%] rounded-full bg-cyan-600/30 blur-[160px]" />
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl leading-[1.15]">Optimize Your Learning Roadmap</h2>
            <p className="mt-6 text-lg text-slate-400 md:text-xl leading-relaxed font-normal">
              Stop wasting time on redundant courses. Our engine analyzes curricula to ensure you&apos;re learning the right skills in the right order.
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-cyan-500/10 p-1.5 text-cyan-300">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">Daily Updated Discounts</div>
                  <div className="mt-1 text-sm text-slate-500">Automatically discover and verify the best deals available.</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/15 p-1.5 text-primary">
                  <Shuffle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">Feature Comparison Engine</div>
                  <div className="mt-1 text-sm text-slate-500">Direct head-to-head analysis of pricing, ROI, and curriculum depth.</div>
                </div>
              </div>
            </div>

            <div className="mt-14">
              <Button
                size="lg"
                className="group rounded-2xl bg-white px-10 py-5 text-slate-950 shadow-xl shadow-white/5 hover:bg-cyan-50"
                asChild
              >
                <Link href="/tools/course-comparator">
                  Compare Courses
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full" />
            <Card className="relative glass-card rounded-[2.5rem] border border-slate-700/50 p-0 shadow-2xl">
              <CardHeader className="gap-0 px-10 pb-6 pt-10">
                <div className="flex items-center gap-3 border-b border-slate-700/50 pb-6">
                  <div className="flex gap-2">
                    <div className="h-3.5 w-3.5 rounded-full bg-slate-700" />
                    <div className="h-3.5 w-3.5 rounded-full bg-slate-700" />
                    <div className="h-3.5 w-3.5 rounded-full bg-slate-700" />
                  </div>
                  <div className="ml-4 text-xs font-bold uppercase tracking-widest text-slate-500">Popular Head-to-Head Comparisons</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 px-10 pb-10">
                {comparisons.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center justify-between rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 transition-all hover:border-cyan-500/50 hover:bg-slate-800/80"
                  >
                    <span className="text-sm font-semibold text-foreground">{item.label}</span>
                    <ArrowRight className="h-4 w-4 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
