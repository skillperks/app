"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const navigation = [
    { name: "Categories", href: "/browse" },
    { name: "Reviews", href: "/reviews" },
    { name: "Comparisons", href: "/comparisons" },
    { name: "Coupons", href: "/coupons" },
    { name: "Guides", href: "/guides" },
];

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [query, setQuery] = useState("");

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const q = query.trim();
        router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center mx-auto px-4 md:px-6">
                <div className="mr-8 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight">SkillPerks</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`transition-colors hover:text-foreground/80 ${pathname?.startsWith(item.href)
                                    ? "text-foreground"
                                    : "text-foreground/60"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <form onSubmit={onSearch}>
                                <Input
                                    type="search"
                                    placeholder="Search platforms, guides..."
                                    className="h-9 w-[200px] lg:w-[300px] pl-8"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>


                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <SheetHeader>
                                <SheetTitle className="text-left font-bold text-xl">
                                    SkillPerks
                                </SheetTitle>
                            </SheetHeader>
                            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 text-left">
                                <div className="flex flex-col space-y-3">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="text-base font-medium text-foreground hover:text-foreground/80"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>

                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
