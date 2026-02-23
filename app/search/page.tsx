"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { platforms } from "@/lib/data";
import { comparisons } from "@/lib/comparisons";
import { guides } from "@/lib/guides";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SearchItem = {
  type: "Platform" | "Comparison" | "Guide";
  title: string;
  description: string;
  href: string;
};

function normalize(s: string) {
  return s.toLowerCase().trim();
}

function SearchPageClient() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);

  const items = useMemo<SearchItem[]>(() => {
    const platformItems: SearchItem[] = platforms.map((p) => ({
      type: "Platform",
      title: p.name,
      description: p.description,
      href: `/reviews/${p.slug}`,
    }));

    const comparisonItems: SearchItem[] = comparisons.map((c) => ({
      type: "Comparison",
      title: c.title,
      description: c.description,
      href: `/comparisons/${c.slug}`,
    }));

    const guideItems: SearchItem[] = guides.map((g) => ({
      type: "Guide",
      title: g.title,
      description: g.description,
      href: g.href,
    }));

    return [...platformItems, ...comparisonItems, ...guideItems];
  }, []);

  const results = useMemo(() => {
    const query = normalize(q);
    if (!query) return items;

    return items.filter((i) => {
      const hay = normalize(`${i.title} ${i.description} ${i.type}`);
      return hay.includes(query);
    });
  }, [items, q]);

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Search</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Search</h1>
          <div className="max-w-xl">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search platforms, guides, comparisons" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {results.map((r) => (
            <Link key={`${r.type}-${r.href}`} href={r.href} className="min-w-0">
              <Card className="h-full hover:border-primary/40 transition-colors">
                <CardHeader className="space-y-1">
                  <div className="text-xs text-muted-foreground">{r.type}</div>
                  <CardTitle>{r.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{r.description}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container px-4 py-10 md:px-6 md:py-16 mx-auto" />}>
      <SearchPageClient />
    </Suspense>
  );
}
