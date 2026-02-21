import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DisclosurePage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Legal</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Affiliate Disclosure</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            SkillPerks is an affiliate learning platform. Some links on this site are affiliate links.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What this means</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              If you click an affiliate link and make a purchase, SkillPerks may earn a commission at no additional cost to you.
            </p>
            <p>
              We use commissions to fund testing, content creation, and ongoing maintenance. We aim to keep our reviews and comparisons
              honest and outcome-driven.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Editorial independence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              A platform paying commission does not guarantee a positive review. We highlight pros, cons, and ideal use cases so you can decide.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
