import Link from "next/link";

export function AffiliateDisclosureBar() {
  return (
    <div className="border-b bg-muted/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="py-2 text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>
            SkillPerks may earn a commission when you purchase through links on this site.
          </span>
          <Link href="/disclosure" className="underline underline-offset-2 hover:text-foreground">
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}
