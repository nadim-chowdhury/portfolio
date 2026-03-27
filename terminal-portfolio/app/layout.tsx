import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";
import StoreProvider from "@/components/providers/store-provider";
// import { Home } from "lucide-react";
// import NavMenu from "@/components/common/nav-menu";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Nadim Chowdhury | Software Developer",
  description: "Portfolio of Nadim Chowdhury - Full Stack Developer",
};

// const navMenu = [
//   {
//     id: 1,
//     label: "Home",
//     icon: <Home />,
//     route: "/",
//   },
//   {
//     id: 2,
//     label: "V2",
//     icon: <Home />,
//     route: "/v2",
//   },
//   {
//     id: 3,
//     label: "V3",
//     icon: <Home />,
//     route: "/v3",
//   },
//   {
//     id: 4,
//     label: "Danger",
//     icon: <Home />,
//     route: "/x",
//   },
// ];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>

      {/* <nav className="absolute left-4 top-1/2 z-50">
        {navMenu.map((item, i) => (
          <NavMenu key={i} data={item} />
        ))}
      </nav> */}
    </html>
  );
}
