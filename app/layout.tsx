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
  metadataBase: new URL("https://nadim.vercel.app"),
  title: {
    default:
      "Nadim Chowdhury - Software Developer | React, Node.js & React Native",
    template: "%s | Nadim Chowdhury",
  },
  description:
    "Portfolio of Nadim Chowdhury - Software Developer based in Dhaka, Bangladesh with 4 years of experience specializing in React, Next.js, Node.js, NestJS, and React Native. Experienced in developing ERP, POS, SaaS, and booking platforms.",
  alternates: {
    canonical: "https://nadim.vercel.app",
  },
  keywords: [
    "Nadim Chowdhury",
    "Nadim Chowdhury Software Developer",
    "Nadim Chowdhury Portfolio",
    "Nadim Chowdhury Developer",
    "Nadim Chowdhury GitHub",
    "Nadim Chowdhury LinkedIn",
    "Software Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "React Native Developer",
    "Node.js Developer",
    "NestJS Developer",
    "TypeScript Engineer",
    "Software Developer Dhaka",
    "Software Developer Bangladesh",
    "Web Developer Dhaka",
    "ERP Developer",
    "POS System Developer",
    "SaaS Developer",
  ],
  authors: [{ name: "Nadim Chowdhury", url: "https://nadim.vercel.app" }],
  creator: "Nadim Chowdhury",
  publisher: "Nadim Chowdhury",
  category: "technology",
  classification: "Software Development Portfolio",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://nadim.vercel.app",
    title:
      "Nadim Chowdhury - Software Developer | React, Node.js & React Native",
    description:
      "Portfolio of Nadim Chowdhury - Software Developer specializing in React, Next.js, Node.js, and React Native with 4 years of experience building ERP, POS, and SaaS platforms.",
    siteName: "Nadim Chowdhury",
    images: [
      {
        url: "/nadim_profile.jpg",
        width: 1200,
        height: 630,
        alt: "Nadim Chowdhury - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Nadim Chowdhury - Software Developer | React, Node.js & React Native",
    description:
      "Portfolio of Nadim Chowdhury - Software Developer specializing in React, Next.js, Node.js, and React Native with 4 years of experience building ERP, POS, and SaaS platforms.",
    images: ["/nadim_profile.jpg"],
    creator: "@nadim_chowdhury",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://nadim.vercel.app/#person",
      name: "Nadim Chowdhury",
      givenName: "Nadim",
      familyName: "Chowdhury",
      jobTitle: "Software Developer",
      description:
        "Software Developer specializing in React, Next.js, Node.js, NestJS, and React Native with 4 years of experience building ERP, POS, and SaaS platforms.",
      url: "https://nadim.vercel.app",
      image: "https://nadim.vercel.app/nadim_profile.jpg",
      email: "mailto:nadim-chowdhury@outlook.com",
      telephone: "+8801971258803",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "Bangladesh",
      },
      sameAs: [
        "https://github.com/nadim-chowdhury",
        "https://www.linkedin.com/in/nadim-chowdhury",
      ],
      knowsAbout: [
        "React.js",
        "Next.js",
        "React Native",
        "Node.js",
        "NestJS",
        "TypeScript",
        "JavaScript",
        "PostgreSQL",
        "MongoDB",
        "Tailwind CSS",
        "GraphQL",
        "REST APIs",
        "Docker",
      ],
      worksFor: [
        {
          "@type": "Organization",
          name: "Akij iBos",
        },
        {
          "@type": "Organization",
          name: "Mediusware Ltd.",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://nadim.vercel.app/#website",
      url: "https://nadim.vercel.app",
      name: "Nadim Chowdhury Portfolio",
      description:
        "Official portfolio of Nadim Chowdhury - Software Developer.",
      publisher: {
        "@id": "https://nadim.vercel.app/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://nadim.vercel.app/#webpage",
      url: "https://nadim.vercel.app",
      name: "Nadim Chowdhury - Software Developer",
      isPartOf: {
        "@id": "https://nadim.vercel.app/#website",
      },
      about: {
        "@id": "https://nadim.vercel.app/#person",
      },
      mainEntity: {
        "@id": "https://nadim.vercel.app/#person",
      },
    },
  ],
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
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="noise-overlay" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
