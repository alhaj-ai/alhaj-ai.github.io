import type { Metadata } from "next";
import { Caveat, Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PROFILE } from "@/lib/portfolio-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alhaj-ai.github.io"),
  alternates: {
    canonical: "/",
  },
  title: `${PROFILE.name} | ${PROFILE.role}`,
  description:
    "AI Engineer working on local model fine-tuning, deterministic agent harnesses, hybrid RAG, and production APIs.",
  openGraph: {
    title: `${PROFILE.name} | ${PROFILE.role}`,
    description: PROFILE.tagline,
    url: "https://alhaj-ai.github.io",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border-2 focus:border-[var(--ink)] focus:bg-[#e8bd5e] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-[#29384a]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
