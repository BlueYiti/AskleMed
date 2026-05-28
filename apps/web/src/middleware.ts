import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔐 Better Auth session cookie (support multiple possible names)
  const sessionCookie =
    req.cookies.get("better-auth.session_token")?.value ||
    req.cookies.get("__Secure-better-auth.session_token")?.value ||
    req.cookies.get("better-auth.session")?.value;

  // 🚫 Not logged in → redirect to login
  if (!sessionCookie) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 🔒 Route protection (ONLY gating access, no role checks here)

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/doctor") ||
    pathname.startsWith("/patient")
  ) {
    return NextResponse.next();
  }

  // 🌐 allow everything else
  return NextResponse.next();
}

// 📌 Apply middleware only to protected routes
export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/patient/:path*"],
};