import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CommentsPlaceholder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div>
          Comments are coming soon. If you found an issue or have a suggestion, please use the contact page.
        </div>
      </CardContent>
    </Card>
  );
}
