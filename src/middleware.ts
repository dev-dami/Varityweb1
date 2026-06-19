import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLink } from "./lib/getLink";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.varityweb.com, demo.localhost:3000)
  const hostname = req.headers.get("host")!;

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  const sessionToken =
    req.cookies.get("better-auth.session_token")?.value ||
    req.cookies.get("__Secure-better-auth.session_token")?.value ||
    req.cookies.get("__secure-better-auth.session_token")?.value;

  const isAuthPage = path === "/login" || path === "/signup";

  // Determine the base domain for matching
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "varityweb.com";
  const isLocalhost = hostname.includes("localhost");
  const baseDomain = isLocalhost ? "localhost:3000" : rootDomain;

  // Redirect www.baseDomain to baseDomain for SEO canonicalization and to prevent 404
  if (hostname === `www.${baseDomain}`) {
    return NextResponse.redirect(new URL(`${url.protocol}//${baseDomain}${path}${url.search}`));
  }

  // Handle editor subdomain
  if (hostname === `editor.${baseDomain}`) {
    if (!sessionToken && !isAuthPage) {
      return NextResponse.redirect(getLink({ subdomain: "app", pathName: "login" }));
    }
    return NextResponse.rewrite(
      new URL(`/editor${path === "/" ? "" : path}`, req.url),
    );
  }

  // Only allow app.varityweb.com for dashboard page, sounds better, more concise
  if (hostname === `app.${baseDomain}`) {
    if (!sessionToken && !isAuthPage) {
      return NextResponse.redirect(getLink({ subdomain: "app", pathName: "login" }));
    }
    // If it is an auth page and they have a session, redirect to home/dashboard
    if (sessionToken && isAuthPage) {
      return NextResponse.redirect(getLink({ subdomain: "app" }));
    }
    return NextResponse.rewrite(
      new URL(`/dashboard${path === "/" ? "" : path}`, req.url),
    );
  }

  if (hostname === `dashboard.${baseDomain}`) {
    return NextResponse.redirect(getLink({ subdomain: "app" }));
  }

  if (hostname === baseDomain) {
    if (path === "/") {
      return NextResponse.rewrite(new URL("/dashboard/landing", req.url));
    }
    return NextResponse.rewrite(new URL(`/dashboard${path}`, req.url));
  }

  // Handle custom subdomains / domains
  let subdomain = hostname;
  if (hostname.endsWith(`.${baseDomain}`)) {
    subdomain = hostname.replace(`.${baseDomain}`, "");
  } else {
    subdomain = hostname.split(".")[0];
  }

  return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
}
