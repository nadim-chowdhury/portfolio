import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";
import CustomCursor from "@/components/CustomCursor";
import MatrixCount from "@/components/MatrixCount";

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
      <body className={inter.className}>
        {/* <section className="min-h-screen bg-gradient-to-tr from-teal-50 via-transparent to-teal-50 text-slate-700"> */}
        <section className="bg-black text-green-400 font-mono">
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
          {/* <CustomCursor /> */}
          {/* <CursorTrail /> */}
        </section>
        <MatrixCount matrixCount={420} />
      </body>
    </html>
  );
}
