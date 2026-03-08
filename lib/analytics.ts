type AnalyticsEventParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sanitizeParams(params: AnalyticsEventParams) {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      out[key] = value;
    } else {
      out[key] = String(value);
    }
  }
  return out;
}

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") return;

  const gtag = window.gtag;
  if (typeof gtag !== "function") return;

  gtag("event", name, sanitizeParams(params));
}
