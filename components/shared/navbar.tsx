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
    { name: "Resources", href: "/guides" },
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
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/35 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center gap-6 px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-cyan-500/15" />
                    <span className="text-sm font-semibold tracking-tight">SkillPerks</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`transition-colors hover:text-foreground ${pathname?.startsWith(item.href)
                                ? "text-foreground"
                                : "text-slate-400"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex-1" />

                <div className="hidden lg:block">
                    <form onSubmit={onSearch} className="relative">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <Input
                            type="search"
                            placeholder="Search platforms..."
                            className="h-9 w-[340px] rounded-full border border-white/10 bg-slate-950/20 pl-10 text-sm placeholder:text-slate-500 focus-visible:ring-cyan-500"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                    <Button variant="ghost" className="h-9 rounded-full px-4 text-slate-300 hover:text-foreground">
                        Sign in
                    </Button>
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
                            <SheetTitle className="text-left font-bold text-xl">SkillPerks</SheetTitle>
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
        </header>
    );
}
