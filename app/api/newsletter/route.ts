import { NextResponse } from "next/server";

const GOOGLE_SHEETS_NEWSLETTER_URL =
  "https://script.google.com/macros/s/AKfycbx6B3mgnxY7-MNSTF2hou1AXGEck5DEJdT_Q8mbudmd7Honfu_jbGY4RK_DeNPBo07D/exec";

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const sourceFromBody = typeof body?.source === "string" ? body.source.trim() : "";
  const referer = req.headers.get("referer") ?? "";
  const source = sourceFromBody || referer || "unknown";

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

    const data = await res.json().catch(() => null);
    const success = Boolean(data && typeof data === "object" && "success" in data && (data as any).success);

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
