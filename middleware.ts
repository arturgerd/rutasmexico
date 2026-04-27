import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

// /fr/* → /es/* lives in next.config.mjs redirects() — Vercel runs those at the
// edge BEFORE static serving and middleware, which is the only layer that
// actually catches the pre-rendered /fr HTML in the edge cache. Don't add the
// /fr block back here.
export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(es|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
