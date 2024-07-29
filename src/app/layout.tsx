import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nadim Chowdhury",
  description: "Full/Mern Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="min-h-screen bg-gradient-to-tr from-teal-50 via-transparent to-teal-50 text-slate-700">
          <Header />
          {children}
          <Footer />
        </section>
      </body>
    </html>
  );
}
