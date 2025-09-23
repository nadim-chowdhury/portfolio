import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";
import CustomCursor from "@/components/CustomCursor";
import MatrixCount from "@/components/MatrixCount";
import LightRays from "@/components/LightRays";
import LetterGlitch from "@/components/LetterGlitch";

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
        <section className="bg-gray-950 text-green-400 font-mono relative">
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
          {/* <CustomCursor /> */}
          {/* <CursorTrail /> */}

          <div className="absolute top-0 left-0 right-0 w-full h-full opacity-40">
            {/* <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
            /> */}
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={false}
              smooth={true}
            />
          </div>
        </section>

        {/* <MatrixCount matrixCount={50} /> */}
      </body>
    </html>
  );
}
