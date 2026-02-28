import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Legal</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Terms of Service</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            By using SkillPerks, you agree to these Terms of Service. If you do not agree, please do not use the site.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>No guarantees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              SkillPerks provides informational content only. We do not guarantee outcomes (job offers, certifications, or performance).
            </p>
            <p>
              Deals, pricing, and product details may change. Always confirm details on the merchant’s website before purchasing.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Affiliate links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Some links are affiliate links. We may earn a commission if you purchase through them. See the disclosure page for details.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Third-party websites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              SkillPerks may link to third-party sites. We do not control their content or policies, and we are not responsible for their actions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acceptable use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              You agree not to misuse the site, attempt to disrupt it, or use automated means to scrape content in a way that harms performance
              or violates applicable law.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Questions about these terms? Email skillperks@gmail.com.
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
