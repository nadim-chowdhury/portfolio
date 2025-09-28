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
      <body className={`${inter.className} relative min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatePresence>
            {/* <section className="min-h-screen bg-gradient-to-tr from-teal-50 via-transparent to-teal-50 text-slate-700"> */}
            <section className="bg-gray-950 text-green-400 font-mono relative">
              {/* <Header /> */}
              {children}
              {/* <Footer /> */}
              {/* <CustomCursor /> */}
              {/* <CursorTrail /> */}

              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-40">
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
          </AnimatePresence>

          <div className="z-50 absolute top-0 right-0 bottom-0 h-full flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 p-4 text-gray-200 opacity-60">
              {routeData.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.route}
                    className="flex items-center gap-3 px-3 py-3 rounded-full bg-gray-900 hover:bg-gray-800 hover:text-white transition-colors border border-gray-500"
                  >
                    <Icon className="w-5 h-5" />
                    {/* <span className="text-sm font-medium">{item.label}</span> */}
                  </Link>
                );
              })}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
