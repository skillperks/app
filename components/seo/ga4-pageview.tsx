"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function Ga4PageView({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId) return;
    if (typeof window === "undefined") return;

    const gtag = window.gtag;
    if (typeof gtag !== "function") return;

    const qs = searchParams?.toString();
    const pagePath = `${pathname ?? ""}${qs ? `?${qs}` : ""}`;

    gtag("config", measurementId, {
      page_path: pagePath,
      page_location: window.location.href,
    });
  }, [measurementId, pathname, searchParams]);

  return null;
}
