import { cookies } from "next/headers";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin", "cyrillic"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: "Delta Green Character Editor",
  description: "Editor/Generator for Delta Green Character",
  manifest: "manifest.json",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme =
    cookieStore.get("color-theme")?.value === "dark"
      ? "dark"
      : "light";

  return (
    <html lang="en" className={theme}>
      <body className={`${jost.variable}`}>
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
