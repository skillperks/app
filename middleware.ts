import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "skillperks.org";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const host = request.headers.get("host") ?? "";
  const proto = request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");

  // Skip redirects in development
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const needsWwwRedirect = host.toLowerCase().startsWith("www.");
  const needsHttpsRedirect = proto === "http";

  if (!needsWwwRedirect && !needsHttpsRedirect) {
    return NextResponse.next();
  }

  const destination = new URL(url);
  destination.protocol = "https:";
  destination.host = CANONICAL_HOST;

  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
