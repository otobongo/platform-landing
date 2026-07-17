import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform",
  description: "Pick an app to continue.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#0b0b0d",
          color: "#f2f2f3",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
