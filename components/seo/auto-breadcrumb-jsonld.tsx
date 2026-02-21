"use client";

import { usePathname } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, buildBreadcrumbJsonLd } from "@/lib/seo";

function toTitleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function AutoBreadcrumbJsonLd() {
  const pathname = usePathname() ?? "/";

  const parts = pathname.split("/").filter(Boolean);
  const items = [{ name: "Home", url: absoluteUrl("/") }];

  let current = "";
  for (const part of parts) {
    current += `/${part}`;
    items.push({ name: toTitleCaseFromSlug(part), url: absoluteUrl(current) });
  }

  return <JsonLd data={buildBreadcrumbJsonLd(items)} />;
}
