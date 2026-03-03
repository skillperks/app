import Link from "next/link";
import { ArrowUpRight, Tag, Star, Terminal, MessagesSquare, Workflow } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const deals = [
    {
        id: 1,
        platform: "Educative",
        couponSlug: "educative-coupon-code",
        offer:
            "Text-first interactive learning designed for modern developers. Gain deep technical skills with cloud-hosted practice environments.",
        rating: 4.8,
        badge: "Verified Premium",
        badgeTone: "green",
        icon: "terminal",
        iconTone: "cyan",
        tags: [
            { label: "INTERACTIVE", tone: "purple" },
            { label: "BROWSER_IDE", tone: "cyan" },
        ],
    },
    {
        id: 2,
        platform: "DataCamp",
        couponSlug: "datacamp-coupon-code",
        offer:
            "Master large-scale system design through visual architecture. The definitive resource for scaling services to millions of users.",
        rating: 4.9,
        badge: "Trending Now",
        badgeTone: "orange",
        icon: "workflow",
        iconTone: "purple",
        tags: [
            { label: "ARCHITECTURE", tone: "pink" },
            { label: "SCALABILITY", tone: "orange" },
        ],
    },
    {
        id: 3,
        platform: "Exponent",
        couponSlug: "exponent-promo-code",
        offer:
            "Land your dream role with specialized interview prep. Featuring mock interviews and real-world scenarios from top tech companies.",
        rating: 4.8,
        badge: "High Value",
        badgeTone: "cyan",
        icon: "messages",
        iconTone: "pink",
        tags: [
            { label: "INTERVIEW_PREP", tone: "green" },
            { label: "MOCK_TESTS", tone: "purple" },
        ],
    },
];

function toneClasses(tone: string) {
    switch (tone) {
        case "green":
            return {
                badge: "border-green-500/30 bg-green-500/10 text-green-400",
                text: "text-green-400",
            };
        case "orange":
            return {
                badge: "border-orange-500/30 bg-orange-500/10 text-orange-400",
                text: "text-orange-400",
            };
        case "cyan":
            return {
                badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
                text: "text-cyan-300",
            };
        case "purple":
            return {
                badge: "border-purple-500/30 bg-purple-500/10 text-purple-300",
                text: "text-purple-300",
            };
        case "pink":
            return {
                badge: "border-pink-500/30 bg-pink-500/10 text-pink-300",
                text: "text-pink-300",
            };
        default:
            return {
                badge: "border-slate-700 bg-slate-800/80 text-slate-300",
                text: "text-slate-300",
            };
    }
}

function PlatformIcon({ name, tone }: { name: string; tone: string }) {
    const iconClass = `h-7 w-7 ${toneClasses(tone).text}`;
    if (name === "terminal") return <Terminal className={iconClass} />;
    if (name === "workflow") return <Workflow className={iconClass} />;
    return <MessagesSquare className={iconClass} />;
}

export function FeaturedDeals() {
    return (
        <section className="py-20 lg:py-24">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row mb-16">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-4xl">
                            Top Rated Platforms
                        </h2>
                        <p className="mt-2 text-muted-foreground text-lg">
                            Industry-leading benchmarks for technical excellence.
                        </p>
                    </div>
                    <Link
                        href="/reviews"
                        className="hidden md:inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/5 px-6 py-3 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                    >
                        Explore All Reviews <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {deals.map((deal) => {
                        const badge = toneClasses(deal.badgeTone);
                        return (
                            <Card key={deal.id} className="group glass-card hover-glow rounded-3xl p-10 transition-all duration-500">
                                <CardHeader className="p-0">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-slate-700">
                                            <PlatformIcon name={deal.icon} tone={deal.iconTone} />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className={`mb-3 rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest ${badge.badge}`}>
                                                {deal.badge}
                                            </span>
                                            <div className="flex items-center rounded-lg bg-yellow-500/5 px-2.5 py-1 text-yellow-500">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span className="ml-1.5 text-sm font-extrabold text-white">{deal.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-extrabold mb-4">{deal.platform}</h3>
                                </CardHeader>

                                <CardContent className="p-0">
                                    <p className="text-slate-400 text-md leading-relaxed mb-8">{deal.offer}</p>
                                    <div className="flex flex-wrap gap-2.5 mb-10">
                                        {deal.tags.map((t) => (
                                            <span
                                                key={t.label}
                                                className={`rounded-lg border bg-slate-800/80 px-3 py-1 text-[11px] font-semibold border-slate-700 ${toneClasses(t.tone).text}`}
                                            >
                                                {t.label}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <Button className="flex-1 rounded-xl bg-cyan-600 text-white text-sm font-bold hover:bg-cyan-500" asChild>
                                            <Link href={`/coupons/${deal.couponSlug}`}>View Details</Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="rounded-xl border-slate-700 bg-transparent px-4 text-slate-300 hover:bg-slate-800"
                                            size="icon"
                                        >
                                            <Tag className="h-5 w-5" />
                                            <span className="sr-only">Offers</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/reviews"
                        className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/5 px-6 py-3 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                    >
                        Explore All Reviews <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
