import Link from "next/link";
import { ArrowUpRight, Check, Clock } from "lucide-react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const deals = [
    {
        id: 1,
        platform: "Educative",
        couponSlug: "educative-coupon-code",
        offer: "40% OFF Annual Plan",
        code: "SKILLPERKS40",
        expires: "2 Days",
        rating: 4.8,
        reviews: 1240,
        logoColor: "bg-blue-600",
    },
    {
        id: 2,
        platform: "DataCamp",
        couponSlug: "datacamp-coupon-code",
        offer: "60% OFF Premium",
        code: "DATA60",
        expires: "Ends Soon",
        rating: 4.7,
        reviews: 3200,
        logoColor: "bg-green-600",
    },
    {
        id: 3,
        platform: "Exponent",
        couponSlug: "exponent-promo-code",
        offer: "10% OFF Interview Prep",
        code: "LINK ONLY",
        expires: "Ongoing",
        rating: 4.8,
        reviews: 950,
        logoColor: "bg-indigo-600",
    },
    {
        id: 4,
        platform: "Udemy",
        couponSlug: "udemy-coupons",
        offer: "Courses from $9.99",
        code: "AUTO-APPLIED",
        expires: "24 Hours",
        rating: 4.5,
        reviews: 15000,
        logoColor: "bg-red-600",
    },
    {
        id: 5,
        platform: "Coursera",
        couponSlug: "coursera-deals",
        offer: "7-Day Free Trial",
        code: "LINK ONLY",
        expires: "Ongoing",
        rating: 4.6,
        reviews: 5000,
        logoColor: "bg-blue-500",
    },
];

export function FeaturedDeals() {
    return (
        <section className="bg-muted/30 py-16 lg:py-24">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                            Featured Deals
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Hand-picked discounts verified daily by our team.
                        </p>
                    </div>
                    <Button variant="ghost" className="hidden md:inline-flex" asChild>
                        <Link href="/coupons">
                            View all 50+ coupons <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {deals.map((deal) => (
                            <CarouselItem key={deal.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                <Card className="h-full border-muted-foreground/10 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-lg ${deal.logoColor} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                                                {deal.platform[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{deal.platform}</h3>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <span className="flex items-center text-amber-500 mr-1">★ {deal.rating}</span>
                                                    <span>({deal.reviews})</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="font-mono text-xs uppercase tracking-wider">
                                            Verified
                                        </Badge>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide text-[10px] mb-1">
                                                Exclusive Offer
                                            </p>
                                            <p className="text-2xl font-bold text-primary">
                                                {deal.offer}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="flex items-center gap-2 rounded-md bg-muted/50 p-2 text-muted-foreground">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-xs font-medium">{deal.expires}</span>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-md bg-green-500/10 p-2 text-green-600 dark:text-green-400">
                                                <Check className="h-4 w-4" />
                                                <span className="text-xs font-medium">Active Code</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-2">
                                        <Button className="w-full gap-2 font-semibold overflow-hidden group" asChild>
                                            <Link href={`/coupons/${deal.couponSlug}`}>
                                                <span className="relative">Get Deal</span>
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-8 gap-2">
                        <CarouselPrevious className="static translate-y-0" />
                        <CarouselNext className="static translate-y-0" />
                    </div>
                </Carousel>

                <div className="mt-8 text-center md:hidden">
                    <Button variant="ghost" asChild>
                        <Link href="/coupons">
                            View all coupons
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
