import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1f1b38, #0b1120)",
          color: "#ffffff",
          fontSize: 64,
          fontWeight: 700,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(124,58,237,0.6), transparent 45%), radial-gradient(circle at bottom right, rgba(37,99,235,0.6), transparent 45%)",
          }}
        />
        <div style={{ position: "relative", textAlign: "center" }}>
          <div>Victor Ebube Okoroji</div>
          <div style={{ fontSize: 32, fontWeight: 500, marginTop: 12 }}>
            Frontend Engineer • React • Next.js • TypeScript
          </div>
        </div>
      </div>
    ),
    size
  );
}
