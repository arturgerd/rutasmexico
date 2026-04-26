import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

// FR translations are not at parity (~20% covered) so /fr/* was serving Spanish
// copy under <html lang="es"> — duplicate content that hurts ranking. Catch /fr*
// here BEFORE next-intl resolves it and 308 to the equivalent /es URL. Reverse
// this when FR translations reach parity.
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/fr" ? "/es" : pathname.replace(/^\/fr/, "/es");
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(es|en|fr)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
