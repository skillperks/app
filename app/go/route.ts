import { NextResponse } from "next/server";
import { trackAffiliateClick } from "@/lib/ga4";

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function isAllowedDestination(url: URL) {
  return url.protocol === "https:" || url.protocol === "http:";
}

export async function GET(req: Request) {
  const incoming = new URL(req.url);

  const to = incoming.searchParams.get("to");
  if (!to) {
    return NextResponse.json({ error: "Missing 'to' query param" }, { status: 400 });
  }

  let destination: URL;
  try {
    destination = new URL(safeDecode(to));
  } catch {
    return NextResponse.json({ error: "Invalid 'to' query param" }, { status: 400 });
  }

  if (!isAllowedDestination(destination)) {
    return NextResponse.json({ error: "Destination protocol not allowed" }, { status: 400 });
  }

  if (!destination.searchParams.has("utm_source")) {
    destination.searchParams.set("utm_source", "skillperks");
  }
  if (!destination.searchParams.has("utm_medium")) {
    destination.searchParams.set("utm_medium", "affiliate");
  }

  const src = incoming.searchParams.get("src");
  if (src && !destination.searchParams.has("src")) {
    destination.searchParams.set("src", src);
  }

  const merchant = incoming.searchParams.get("m") ?? destination.hostname;
  const sourcePath = incoming.searchParams.get("sp") ?? undefined;
  const placement = incoming.searchParams.get("p") ?? undefined;

  const clientId = crypto.randomUUID();

  await trackAffiliateClick({
    clientId,
    merchant,
    destination: destination.toString(),
    sourcePath,
    placement,
  });

  return NextResponse.redirect(destination.toString(), 302);
}
