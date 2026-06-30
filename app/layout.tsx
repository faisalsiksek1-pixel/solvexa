import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";
import "katex/dist/katex.min.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Solvexa — AI-Powered Math Learning",
    template: "%s | Solvexa",
  },
  description:
    "Master high school mathematics with AI-powered step-by-step solutions, curriculum-aligned practice, and intelligent progress tracking.",
  keywords: ["math tutor", "AI math", "high school math", "step by step solutions"],
  authors: [{ name: "Solvexa" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Solvexa — AI-Powered Math Learning",
    description: "Master high school mathematics with AI-powered step-by-step solutions.",
    siteName: "Solvexa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solvexa — AI-Powered Math Learning",
    description: "Master high school mathematics with AI-powered step-by-step solutions.",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-white antialiased">
          <SessionProvider>{children}</SessionProvider>
        </body>
    </html>
  );
}
