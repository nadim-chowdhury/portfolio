import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import CursorTrail from "@/components/CursorTrail";
// import CustomCursor from "@/components/CustomCursor";
// import MatrixCount from "@/components/MatrixCount";
// import LightRays from "@/components/LightRays";
import LetterGlitch from "@/components/LetterGlitch";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import { routeData } from "@/utils/routeData";
import Link from "next/link";
import MainSection from "@/components/MainSection";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nadim Chowdhury",
  description: "Software Developer | Cybersecurity Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatePresence>
            {/* <section className="min-h-screen bg-gradient-to-tr from-teal-50 via-transparent to-teal-50 text-slate-700"> */}
            <MainSection>{children}</MainSection>

            {/* <MatrixCount matrixCount={50} /> */}
          </AnimatePresence>
        </ThemeProvider>
      </body>
    </html>
  );
}
