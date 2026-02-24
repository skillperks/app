type Ga4EventParams = Record<string, string | number | boolean | null | undefined>;

function sanitizeParams(params: Ga4EventParams) {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v === null || v === undefined) continue;
    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
      out[k] = v;
    } else {
      out[k] = String(v);
    }
  }
  return out;
}

export async function sendGa4Event({
  clientId,
  name,
  params,
}: {
  clientId: string;
  name: string;
  params?: Ga4EventParams;
}) {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId || !apiSecret) {
    return;
  }

  const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
    measurementId
  )}&api_secret=${encodeURIComponent(apiSecret)}`;

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        events: [
          {
            name,
            params: sanitizeParams(params ?? {}),
          },
        ],
      }),
    });
  } catch {
    return;
  }
}

export async function trackAffiliateClick({
  clientId,
  merchant,
  destination,
  sourcePath,
  placement,
}: {
  clientId: string;
  merchant: string;
  destination: string;
  sourcePath?: string;
  placement?: string;
}) {
  return sendGa4Event({
    clientId,
    name: "affiliate_click",
    params: {
      merchant,
      destination,
      source_path: sourcePath,
      placement,
    },
  });
}
