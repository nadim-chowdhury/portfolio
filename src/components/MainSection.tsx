"use client";

import { routeData } from "@/utils/routeData";
import LetterGlitch from "./LetterGlitch";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function MainSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div className="bg-gray-950 text-green-400 font-mono relative">
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
        {/* <CustomCursor /> */}
        {/* <CursorTrail /> */}
      </div>

      <div className="z-50 absolute top-0 right-0 h-full">
        <div className="flex flex-col gap-2 p-4 text-gray-200 opacity-60">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center gap-3 px-3 py-3 rounded-full bg-gray-900 hover:bg-gray-800 hover:text-white transition-colors border border-gray-500"
          >
            {menuOpen ? (
              <X className="w-5 h-5 mx-auto" />
            ) : (
              <Menu className="w-5 h-5 mx-auto" />
            )}
          </button>

          {menuOpen &&
            routeData.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.route}
                  className="flex items-center justify-center gap-3 px-3 py-3 rounded-full bg-gray-900 hover:bg-gray-800 hover:text-white transition-colors border border-gray-500"
                >
                  <Icon className="w-5 h-5 mx-auto" />
                  {/* <span className="text-sm font-medium">{item.label}</span> */}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
