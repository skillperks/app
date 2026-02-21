import Link from "next/link";
import { notFound } from "next/navigation";

import { platforms } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categoryConfig: Record<
  string,
  { title: string; description: string; recommendedPlatformSlugs: string[] }
> = {
  "system-design": {
    title: "System Design",
    description: "Interview-focused and practical resources for designing scalable systems.",
    recommendedPlatformSlugs: ["educative", "bytebytego", "exponent"],
  },
  "data-science": {
    title: "Data Science",
    description: "Interactive practice for Python, SQL, and machine learning foundations.",
    recommendedPlatformSlugs: ["datacamp"],
  },
  "interview-prep": {
    title: "Interview Prep",
    description: "Coding patterns, mock interviews, and structured prep.",
    recommendedPlatformSlugs: ["educative", "exponent", "bytebytego"],
  },
  "cloud-computing": {
    title: "Cloud Computing",
    description: "Cloud fundamentals, DevOps, and building production-ready systems.",
    recommendedPlatformSlugs: ["educative"],
  },
  "ai-ml": {
    title: "AI / ML",
    description: "Machine learning foundations and practical applied AI learning.",
    recommendedPlatformSlugs: ["datacamp", "educative"],
  },
  "web-development": {
    title: "Web Development",
    description: "Frontend and backend learning resources for building modern web apps.",
    recommendedPlatformSlugs: ["educative"],
  },
};

interface BrowseByCategorySlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BrowseByCategorySlugPage(props: BrowseByCategorySlugPageProps) {
  const params = await props.params;
  const cfg = categoryConfig[params.slug];

  if (!cfg) {
    notFound();
  }

  const recommended = platforms.filter((p) => cfg.recommendedPlatformSlugs.includes(p.slug));

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4">
          <Badge className="w-fit">Browse</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{cfg.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">{cfg.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recommended.map((platform) => (
            <Card key={platform.slug} className="overflow-hidden">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl">{platform.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{platform.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Best deal</span>
                  <span className="font-semibold text-primary">{platform.activeCoupon.discount}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Button asChild>
                    <Link href={`/reviews/${platform.slug}`}>Read Review</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/coupons/${platform.couponSlug}`}>View Coupons</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Button asChild variant="ghost">
            <Link href="/browse/by-category">← Back to categories</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
