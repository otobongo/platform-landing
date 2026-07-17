import { createSupabaseServiceClient } from "@/lib/supabase";

export type PlatformApp = {
  slug: string;
  name: string;
  description: string | null;
  url: string;
};

// Every app on this VPS is reachable at <slug>.<PLATFORM_ROOT_DOMAIN>, matching
// its Coolify domain (see project memory: "Always set a friendly short domain
// during setup"). There's no separate URL column on core_apps — the slug IS
// the subdomain by convention, so keep the two in sync when naming new apps.
const PLATFORM_ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_PLATFORM_ROOT_DOMAIN ?? "65.109.12.203.sslip.io";

export async function listActivePlatformApps(): Promise<PlatformApp[]> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("core_apps")
    .select("slug, name, description")
    .eq("status", "active")
    .order("name");

  if (error) throw error;

  return (data ?? []).map((app) => ({
    ...app,
    url: `http://${app.slug}.${PLATFORM_ROOT_DOMAIN}`,
  }));
}
