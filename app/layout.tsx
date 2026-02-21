import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "SkillPerks — Smarter Savings on Tech Skills",
  description: "Verified coupons, expert reviews, and smart comparisons for developers & tech professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased`}
      >
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
