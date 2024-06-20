import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin", "cyrillic"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: "Delta Green Character Editor",
  description: "Editor/Generator for Delta Green Character",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jost.variable}`}>{children}</body>
    </html>
  );
}
