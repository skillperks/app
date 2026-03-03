import { NextResponse } from "next/server";

const GOOGLE_SHEETS_NEWSLETTER_URL = process.env.GOOGLE_SHEETS_NEWSLETTER_URL;

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const sourceFromBody = typeof body?.source === "string" ? body.source.trim() : "";
  const referer = req.headers.get("referer") ?? "";
  const source = sourceFromBody || referer || "unknown";

  if (!GOOGLE_SHEETS_NEWSLETTER_URL) {
    return NextResponse.json(
      { ok: false, error: "GOOGLE_SHEETS_NEWSLETTER_URL is not configured" },
      { status: 500 }
    );
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const url = new URL(GOOGLE_SHEETS_NEWSLETTER_URL);
    url.searchParams.set("source", source);

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({ email, source }),
      cache: "no-store",
    });

    const data: unknown = await res.json().catch(() => null);
    const success =
      Boolean(
        data &&
          typeof data === "object" &&
          "success" in data &&
          typeof (data as { success?: unknown }).success === "boolean" &&
          (data as { success: boolean }).success
      );

    if (!res.ok || !success) {
      return NextResponse.json(
        { ok: false, upstream: data && typeof data === "object" ? data : null },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, upstream: data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
