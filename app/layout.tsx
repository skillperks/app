import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { Ga4PageView } from "@/components/seo/ga4-pageview";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "SkillPerks — Smarter Savings on Tech Skills",
  description: "Verified coupons, expert reviews, and smart comparisons for developers & tech professionals.",
  metadataBase: new URL("https://skillperks.org"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "SkillPerks — Smarter Savings on Tech Skills",
    description: "Verified coupons, expert reviews, and smart comparisons for developers & tech professionals.",
    url: "https://skillperks.org",
    siteName: "SkillPerks",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillPerks — Smarter Savings on Tech Skills",
    description: "Verified coupons, expert reviews, and smart comparisons for developers & tech professionals.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NODE_ENV === "production";
  const gaMeasurementId = isProd
    ? (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-ZZGK95Z0KD")
    : "G-0000000000";

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${outfit.variable} antialiased`}
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}', ${isProd ? "{}" : "{ send_page_view: false }"});`}
        </Script>
        <Ga4PageView measurementId={gaMeasurementId} />
        <div className="flex min-h-screen flex-col">
          <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
          <Navbar />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-screen-2xl">
              <div className="flex w-full">
                <aside className="hidden xl:block w-[180px] shrink-0">
                  <div className="sticky top-20 px-2">
                    <div id="ad-slot-left" className="min-h-[600px] w-full" />
                  </div>
                </aside>
                <div className="min-w-0 flex-1">{children}</div>
                <aside className="hidden xl:block w-[180px] shrink-0">
                  <div className="sticky top-20 px-2">
                    <div id="ad-slot-right" className="min-h-[600px] w-full" />
                  </div>
                </aside>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
