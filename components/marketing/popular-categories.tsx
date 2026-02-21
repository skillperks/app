import Link from "next/link";
import {
    Database,
    Layout,
    Server,
    Code,
    Terminal,
    Cloud
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
    {
        name: "System Design",
        icon: Server,
        count: "12 Courses",
        href: "/browse/by-category/system-design",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        name: "Data Science",
        icon: Database,
        count: "24 Courses",
        href: "/browse/by-category/data-science",
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    {
        name: "Frontend Dev",
        icon: Layout,
        count: "18 Courses",
        href: "/browse/by-category/web-development",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        name: "Backend Dev",
        icon: Terminal,
        count: "15 Courses",
        href: "/browse/by-category/web-development",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        name: "Cloud Computing",
        icon: Cloud,
        count: "10 Courses",
        href: "/browse/by-category/cloud-computing",
        color: "text-sky-500",
        bg: "bg-sky-500/10",
    },
    {
        name: "Interview Prep",
        icon: Code,
        count: "20 Courses",
        href: "/browse/by-category/interview-prep",
        color: "text-rose-500",
        bg: "bg-rose-500/10",
    },
];

export function PopularCategories() {
    return (
        <section className="py-16 lg:py-24">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
                        Explore by Category
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Find the best resources for your specific career path. From system design to machine learning, we&apos;ve got you covered.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {categories.map((category) => (
                        <Link key={category.name} href={category.href} className="group min-w-0">
                            <Card className="h-full border-muted hover:border-primary/50 transition-colors">
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                                    <div className={`p-3 rounded-full mb-4 ${category.bg} ${category.color} group-hover:scale-110 transition-transform`}>
                                        <category.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                    <span className="text-xs text-muted-foreground mt-1">
                                        {category.count}
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
