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
            This is a simple placeholder privacy policy for the MVP. Replace with your final policy before production.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What we collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              We may collect basic usage analytics (pages visited, approximate location, device information) to improve the site.
            </p>
            <p>
              If you contact us, we collect the information you send (such as your email address and message).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Affiliate links may set cookies to attribute commissions. This does not change the price you pay.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
