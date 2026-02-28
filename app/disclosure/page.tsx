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
            SkillPerks may earn commissions from some links on this site. This helps fund research, testing, and ongoing maintenance.
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
              We try to make it clear when a page includes affiliate links (for example, “Activate” buttons on coupon pages).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How affiliate links work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              When you use a link on SkillPerks, you may be redirected through a tracking URL so the merchant can attribute the purchase
              to SkillPerks.
            </p>
            <p>
              Merchants may use cookies or similar technologies for attribution. The price you pay is typically unchanged.
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
            <p>
              Where possible, we base claims on hands-on testing, publicly available product documentation, and user feedback.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deal and pricing notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Coupons, promotions, and prices can change. We aim to keep deal information up to date, but we cannot guarantee availability.
            </p>
            <p>
              If you notice an expired offer or incorrect pricing, please contact us so we can fix it.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last updated</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">February 28, 2026</CardContent>
        </Card>
      </div>
    </div>
  );
}
