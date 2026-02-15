import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
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
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at top left, rgba(124,58,237,0.6), transparent 45%), radial-gradient(circle at bottom right, rgba(37,99,235,0.6), transparent 45%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, position: "relative" }}>
          <img
            src="https://raw.githubusercontent.com/victorokoroji/my-nextjs-portfolio/main/public/profile-picture.jpg"
            alt="Victor Okoroji"
            width="240"
            height="240"
            style={{
              borderRadius: 16,
              border: "4px solid rgba(124,58,237,0.5)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 56, fontWeight: 700, color: "#ffffff", display: "flex" }}>
              Victor Ebube Okoroji
            </div>
            <div style={{ fontSize: 28, fontWeight: 500, color: "#a78bfa", display: "flex" }}>
              Frontend Engineer • React • Next.js • TypeScript
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
