import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "radial-gradient(circle at 20% 20%, #7c3aed 0%, rgba(124,58,237,0) 40%), radial-gradient(circle at 80% 20%, #06b6d4 0%, rgba(6,182,212,0) 40%), #050816",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            SP
          </div>
          <div style={{ color: "white", fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>
            SkillPerks
          </div>
        </div>

        <div style={{ color: "white", fontSize: 64, fontWeight: 900, lineHeight: 1.05, letterSpacing: -1.2 }}>
          Verified tech course coupons
          <br />
          and honest reviews
        </div>

        <div style={{ marginTop: 22, color: "rgba(255,255,255,0.78)", fontSize: 28, fontWeight: 600 }}>
          Educative • DataCamp • Exponent
        </div>

        <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Coupons", "Reviews", "Comparisons"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.9)",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
