import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "ru"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  let acceptLang = request.headers.get("accept-language") ?? "en-US,en;q=0.5";
  let languages = new Negotiator({
    headers: { "accept-language": acceptLang },
  }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Only empty or with lang code url's
    "/([a-z]{2}$)",
    "/"
  ],
};
