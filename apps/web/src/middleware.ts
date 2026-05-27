import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(
  req: NextRequest
) {
  const cookie = req.headers.get("cookie");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
    {
      headers: {
        cookie: cookie || "",
      },
    }
  );

  // request failed
  if (!response.ok) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  const session = await response.json();

  // no session
  if (!session?.user) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  const pathname = req.nextUrl.pathname;

  // PATIENT
  if (
    pathname.startsWith("/patient") &&
    session.user.role !== "patient"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", req.url)
    );
  }

  // DOCTOR
  if (
    pathname.startsWith("/doctor") &&
    session.user.role !== "doctor"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", req.url)
    );
  }

  // ADMIN
  if (
    pathname.startsWith("/admin") &&
    session.user.role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/unauthorized", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/patient/:path*",
    "/doctor/:path*",
    "/admin/:path*",
  ],
};