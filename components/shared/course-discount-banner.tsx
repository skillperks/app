import { getPlatformBySlug } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function CourseDiscountBanner({
  platformSlug,
}: {
  platformSlug: string;
}) {
  const platform = getPlatformBySlug(platformSlug);

  if (!platform?.activeCoupon?.discount) {
    return null;
  }

  const dealHref = platform.activeCoupon.link;

  return (
    <div className="w-full border-b border-blue-200/10 bg-blue-600/85 shadow-[0_10px_30px_-18px_rgba(37,99,235,0.95)] backdrop-blur-xl">
      <div className="container mx-auto flex h-10 items-center px-3 md:px-6">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-0 hidden md:block bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.10)_0,rgba(255,255,255,0.10)_10px,rgba(255,255,255,0.04)_10px,rgba(255,255,255,0.04)_20px)] opacity-30" />

          <div className="relative flex items-center">
            <div className="flex-1 text-center text-xs font-medium text-white md:text-sm">
              <span className="font-semibold text-yellow-300">{platform.activeCoupon.discount}</span>
              <span className="text-white/90"> on </span>
              <span className="font-semibold">{platform.name}</span>
              <span className="text-white/85"> — {platform.activeCoupon.description}</span>
            </div>

            {dealHref ? (
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Button
                  asChild
                  size="sm"
                  className="h-7 rounded-full bg-white/15 px-3 text-white ring-1 ring-white/25 hover:bg-white/20"
                >
                  <a href={dealHref} target="_blank" rel="noreferrer">Activate</a>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
