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
            This is a simple placeholder Terms page for the MVP. Replace with your final terms before production.
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
      </div>
    </div>
  );
}
