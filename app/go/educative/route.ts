import { NextResponse } from "next/server";

const EDUCATIVE_AFFILIATE_URL = "https://www.educative.io/unlimited?aff=xy8B";

export async function GET(req: Request) {
  const incoming = new URL(req.url);
  const target = new URL(EDUCATIVE_AFFILIATE_URL);

  incoming.searchParams.forEach((value, key) => {
    if (!target.searchParams.has(key)) {
      target.searchParams.set(key, value);
    }
  });

  if (!target.searchParams.has("utm_source")) {
    target.searchParams.set("utm_source", "skillperks");
  }
  if (!target.searchParams.has("utm_medium")) {
    target.searchParams.set("utm_medium", "affiliate");
  }

  return NextResponse.redirect(target.toString(), 302);
}
