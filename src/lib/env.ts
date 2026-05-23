import { z } from "zod";

/**
 * Runtime environment validation.
 *
 * We split client + server schemas because anything prefixed with NEXT_PUBLIC_
 * is inlined at build time and exposed to the browser. Server-only secrets
 * (FORMSPREE_ID, etc.) must NEVER carry the NEXT_PUBLIC_ prefix.
 *
 * All vars are marked .optional() because the site degrades gracefully when
 * they're missing (no analytics, no contact form posting), but we surface a
 * single warning on cold start so missing config doesn't fail silently in prod.
 */

const ClientEnvSchema = z.object({
  // Google Analytics measurement id, e.g. "G-XXXXXXXXXX"
  NEXT_PUBLIC_GA_ID: z.string().regex(/^G-[A-Z0-9]+$/, "GA_ID must look like G-XXXXXXXXXX").optional(),
  // Supabase is configured but currently unused; kept optional for future use
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20).optional(),
});

const ServerEnvSchema = z.object({
  // Formspree project id (server-only — never expose to the client)
  FORMSPREE_ID: z.string().min(4).optional(),
});

export const clientEnv = ClientEnvSchema.parse({
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

// Server env is only validated when running on the server. During the browser
// bundle pass, `process.env.FORMSPREE_ID` is undefined (correctly) and we
// don't want to throw — so we just skip parsing client-side.
export const serverEnv =
  typeof window === "undefined"
    ? ServerEnvSchema.parse({ FORMSPREE_ID: process.env.FORMSPREE_ID })
    : ({} as z.infer<typeof ServerEnvSchema>);

// Loud-but-non-fatal warning when an expected var is missing in production.
// Run-once guard so we don't spam logs during dev hot reload.
declare global {
  // eslint-disable-next-line no-var
  var __envWarned: boolean | undefined;
}

if (process.env.NODE_ENV === "production" && !globalThis.__envWarned) {
  globalThis.__envWarned = true;
  const missing: string[] = [];
  if (!clientEnv.NEXT_PUBLIC_GA_ID) missing.push("NEXT_PUBLIC_GA_ID");
  if (typeof window === "undefined" && !serverEnv.FORMSPREE_ID) missing.push("FORMSPREE_ID");
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.warn(`[env] Missing optional env vars: ${missing.join(", ")}. Affected features will be disabled.`);
  }
}
