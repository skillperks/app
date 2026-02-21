import Link from "next/link";
import { notFound } from "next/navigation";

import { platforms } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const levelConfig: Record<
  string,
  { title: string; description: string; recommendedPlatformSlugs: string[] }
> = {
  beginner: {
    title: "Beginner",
    description: "Start with structured content and lots of guided practice.",
    recommendedPlatformSlugs: ["datacamp", "educative"],
  },
  intermediate: {
    title: "Intermediate",
    description: "Build depth and patterns; focus on outcomes and projects.",
    recommendedPlatformSlugs: ["educative", "exponent"],
  },
  advanced: {
    title: "Advanced",
    description: "Specialize and optimize for interview performance and high-leverage skills.",
    recommendedPlatformSlugs: ["bytebytego", "educative", "exponent"],
  },
};

interface BrowseByLevelSlugPageProps {
  params: Promise<{ level: string }>;
}

export default async function BrowseByLevelSlugPage(props: BrowseByLevelSlugPageProps) {
  const params = await props.params;
  const cfg = levelConfig[params.level];

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
            <Link href="/browse/by-level">← Back to levels</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
