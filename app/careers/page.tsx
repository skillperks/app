import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CareersPage() {
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10 max-w-3xl">
        <div className="space-y-4">
          <Badge className="w-fit">Company</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Careers</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            MVP placeholder careers page.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Open roles</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            No roles posted yet.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
