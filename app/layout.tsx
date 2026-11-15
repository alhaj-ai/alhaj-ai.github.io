import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.role} (LLMs, Agent Harnesses & Fine-Tuning)`,
  description:
    "AI Engineer specializing in LLM engineering, model fine-tuning, deterministic agent harnesses, hybrid RAG, and production software systems.",
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
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
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
