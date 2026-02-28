import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Legal</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            This policy describes what information SkillPerks collects, how it’s used, and the choices you may have.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What we collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              We may collect basic usage analytics (such as pages visited, referrers, and device/browser information) to understand how the
              site is used and to improve content.
            </p>
            <p>
              If you contact us, we collect the information you choose to provide (such as your email address and message content).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Affiliate links may set cookies or similar identifiers to attribute commissions. This does not typically change the price you pay.
            </p>
            <p>
              You can control cookies through your browser settings. Disabling cookies may impact certain functionality or attribution.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How we use information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              We use information to operate the site, analyze performance, prevent abuse, and improve content quality.
            </p>
            <p>
              We do not sell your personal information.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Third-party services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              We may use third-party analytics and affiliate partners. These services may process information according to their own privacy
              policies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            If you have questions about this policy, contact us at skillperks@gmail.com.
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
