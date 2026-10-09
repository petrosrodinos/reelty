import { ImageResponse } from "next/og";

export const alt = "Reelty — turn listing photos into cinematic walkthrough videos";
export const size = { width: 1200, height: 630 };
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
          padding: 80,
          background: "#faf9f5",
          color: "#141413",
        }}
      >
        <div style={{ fontSize: 40, letterSpacing: -1, color: "#a9583e" }}>Reelty</div>
        <div style={{ fontSize: 84, lineHeight: 1.05, marginTop: 24, letterSpacing: -2 }}>
          Listing photos in. Cinematic walkthrough video out.
        </div>
        <div style={{ fontSize: 32, marginTop: 32, color: "#5e5d59" }}>
          Paste a listing link or upload photos. Get a 1080p MP4.
        </div>
      </div>
    ),
    size,
  );
}
