import Link from "next/link";
import { notFound } from "next/navigation";

import { getComparisonBySlug, getAllComparisonSlugs } from "@/lib/comparisons";
import { getPlatformBySlug } from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";
import { CommentsPlaceholder } from "@/components/shared/comments-placeholder";
import { absoluteUrl, buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ComparisonPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllComparisonSlugs();
}

export default async function ComparisonSlugPage(props: ComparisonPageProps) {
  const params = await props.params;
  const comparison = getComparisonBySlug(params.slug);

  if (!comparison) {
    notFound();
  }

  const left = getPlatformBySlug(comparison.leftPlatformSlug);
  const right = getPlatformBySlug(comparison.rightPlatformSlug);

  if (!left || !right) {
    notFound();
  }

  const canonicalPath = `/comparisons/${comparison.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Comparisons", url: absoluteUrl("/comparisons") },
    { name: comparison.title, url: canonicalUrl },
  ]);
  const articleJsonLd = buildArticleJsonLd({
    headline: `${comparison.title} (2026)`,
    description: comparison.description,
    url: canonicalUrl,
  });

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <JsonLd data={[breadcrumbJsonLd, articleJsonLd]} />
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Comparison</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{comparison.title} (2026)</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">{comparison.description}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {[left, right].map((p) => (
            <Card key={p.slug} className="overflow-hidden">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl">{p.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Rating</div>
                    <div className="font-semibold">{p.rating}/5</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Best deal</div>
                    <div className="font-semibold text-primary">{p.activeCoupon.discount}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold">Best for</div>
                  <div className="text-sm text-muted-foreground">{p.bestFor}</div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button asChild>
                    <Link href={`/reviews/${p.slug}`}>Read Review</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/coupons/${p.couponSlug}`}>Get Coupons</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Who this comparison is for</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              {comparison.recommendedFor.map((t) => (
                <div key={t}>- {t}</div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/tools/course-finder">Take the Course Finder Quiz</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/comparisons">Browse all comparisons</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl">
          <CommentsPlaceholder />
        </div>
      </div>
    </div>
  );
}
