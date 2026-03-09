import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "default";
  const slug = searchParams.get("slug") || "";

  // Dynamic content based on type
  let mainTitle = "SkillPerks";
  let subtitle = "Verified coupons & honest reviews for tech courses";
  let badge = "";

  switch (type) {
    case "coupon":
      mainTitle = `${slug.toUpperCase()} Coupon`;
      subtitle = "Verified discount codes - updated daily";
      badge = "40% OFF";
      break;
    case "review":
      mainTitle = `${slug} Review 2026`;
      subtitle = "Honest review from actual users";
      badge = "⭐ 4.8";
      break;
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage: `linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(34, 211, 238, 0.1) 100%)`,
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#a855f7",
            marginBottom: "20px",
            letterSpacing: "-0.02em",
          }}
        >
          SkillPerks
        </div>

        {badge && (
          <div
            style={{
              backgroundColor: "rgba(168, 85, 247, 0.2)",
              color: "#a855f7",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "24px",
              border: "2px solid rgba(168, 85, 247, 0.3)",
            }}
          >
            {badge}
          </div>
        )}

        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "20px",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          {mainTitle}
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            textAlign: "center",
            marginBottom: "40px",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            backgroundColor: "#a855f7",
            color: "#ffffff",
            padding: "16px 32px",
            borderRadius: "12px",
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          → skillperks.org
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "16px",
            color: "#64748b",
            textAlign: "center",
          }}
        >
          Stop overpaying for tech courses
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
