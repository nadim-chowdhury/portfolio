import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Developer Terminal",
  description:
    "Interactive developer CLI terminal portfolio of Nadim Chowdhury. Type help to explore commands, skills, career experience, and projects.",
  alternates: {
    canonical: "https://nadim.vercel.app/terminal",
  },
  openGraph: {
    title: "Nadim Chowdhury - Interactive Terminal",
    description:
      "Explore Nadim Chowdhury's portfolio through an interactive Linux terminal interface.",
    url: "https://nadim.vercel.app/terminal",
    images: [
      {
        url: "/nadim_profile.jpg",
        width: 1200,
        height: 630,
        alt: "Nadim Chowdhury Interactive Terminal",
      },
    ],
  },
};

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
