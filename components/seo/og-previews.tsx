import type { Metadata } from "next";

interface OGPreviewProps {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  type?: "website" | "article";
  siteName?: string;
  twitterCard?: "summary" | "summary_large_image";
}

export function generateOGMetadata({
  title,
  description,
  imageUrl = "/opengraph-image",
  url,
  type = "website",
  siteName = "SkillPerks",
  twitterCard = "summary_large_image",
}: OGPreviewProps): Metadata {
  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [imageUrl],
    },
  };

  return metadata;
}

// Dynamic OG image generation for specific pages
export function generateOGImagePath(
  type: "coupon" | "review" | "comparison",
  slug: string,
  title?: string
): string {
  const baseUrl = "/api/og";
  const params = new URLSearchParams({
    type,
    slug,
    ...(title && { title }),
  });
  
  return `${baseUrl}?${params.toString()}`;
}
