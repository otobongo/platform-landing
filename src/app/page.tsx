import Link from "next/link";
import { listActivePlatformApps } from "@/lib/apps";

// This page is the fallback landing spot for the whole platform (Supabase's
// shared Auth "Site URL"). A magic-link email can land here with a stray
// ?code= if the sender app's own emailRedirectTo wasn't honored — the code
// is tied to whichever app/tenant subdomain actually requested it, so it
// can't be usefully exchanged for a session on this bare domain. We just
// tell the visitor that plainly and point them back to sign in again from
// the right app, rather than pretending to complete the login.
export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const apps = await listActivePlatformApps();

  return (
    <main
      style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: "64px 24px",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Platform</h1>

      {code ? (
        <div
          style={{
            background: "#2a1f12",
            border: "1px solid #6b4a12",
            borderRadius: 8,
            padding: 16,
            marginBottom: 24,
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          This sign-in link couldn&apos;t be completed here. Go back to the app you
          were signing in to and request a new magic link from its own login page.
        </div>
      ) : (
        <p style={{ color: "#9a9aa0", marginBottom: 24 }}>Pick an app to continue.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {apps.map((app) => (
          <li key={app.slug}>
            <Link
              href={app.url}
              style={{
                display: "block",
                padding: "16px 20px",
                borderRadius: 8,
                border: "1px solid #2a2a2e",
                background: "#151517",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 16 }}>{app.name}</div>
              {app.description ? (
                <div style={{ color: "#9a9aa0", fontSize: 13, marginTop: 4 }}>
                  {app.description}
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>

      {apps.length === 0 ? (
        <p style={{ color: "#9a9aa0" }}>No apps are available right now.</p>
      ) : null}
    </main>
  );
}
