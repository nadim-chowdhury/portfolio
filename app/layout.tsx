import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nadim Chowdhury — Full Stack Developer",
  description:
    "Portfolio of Nadim Chowdhury — Full Stack Developer specializing in React, Next.js, NestJS, and PostgreSQL. 3+ years building SaaS platforms, ERP systems, and interactive web applications.",
  keywords: [
    "Nadim Chowdhury",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "NestJS Developer",
    "Software Engineer",
    "Web Developer",
    "Bangladesh",
    "Portfolio",
  ],
  authors: [{ name: "Nadim Chowdhury" }],
  creator: "Nadim Chowdhury",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Nadim Chowdhury — Full Stack Developer",
    description:
      "3+ years building production-grade SaaS platforms, ERP systems, and interactive web applications.",
    siteName: "Nadim Chowdhury Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadim Chowdhury — Full Stack Developer",
    description:
      "3+ years building production-grade SaaS platforms, ERP systems, and interactive web applications.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="noise-overlay">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
