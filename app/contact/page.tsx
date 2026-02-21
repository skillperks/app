import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Company</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Contact</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            For feedback, corrections, or partnership inquiries, reach out and we’ll get back to you.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Replace this with your support email (e.g. support@skillperks.org).
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
