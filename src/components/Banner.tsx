import Link from "next/link";
import { FaCode, FaDev, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Banner() {
  return (
    <section className="py-20 lg:py-40">
      <div className="font-bold text-center">
        <h3 className="text-4xl lg:text-6xl">Hello World!</h3>
        <h1 className="text-3xl lg:text-7xl my-6 lg:my-10">
          It&apos;s Me{" "}
          <span className="bg-gradient-to-tr from-teal-600 to-cyan-600 inline-block text-transparent bg-clip-text">
            Nadim Chowdhury
          </span>
        </h1>
        <h4 className="text-xl lg:text-3xl">
          As a{" "}
          <span className="bg-gradient-to-tr from-teal-600 to-cyan-600 inline-block text-transparent bg-clip-text">
            MERN/FULL
          </span>{" "}
          Stack Developer
        </h4>
      </div>

      <p className="text-center mt-10 text-slate-600">
        As a self learned creative and passionate programmer/developer I like to
        build and develop software for any platform. Learning, improving skills,
        solving problems, and adapting to new technologies are my hobbies. I can
        give my total effort and perform teamwork with responsibility.
      </p>

      <div className="flex items-center justify-center gap-4 mt-10">
        <Link
          href="https://www.linkedin.com/in/nadim-chowdhury"
          className="text-slate-600 hover:text-teal-600 transition-all duration-300"
        >
          <FaLinkedin className="w-5 h-5 lg:w-6 lg:h-6" />
        </Link>
        <Link
          href="https://github.com/nadim-chowdhury"
          className="text-slate-600 hover:text-teal-600 transition-all duration-300"
        >
          <FaGithub className="w-5 h-5 lg:w-6 lg:h-6" />
        </Link>
        <Link
          href="https://www.twitter.com/nadim_ch0wdhury"
          className="text-slate-600 hover:text-teal-600 transition-all duration-300"
        >
          <FaTwitter className="w-5 h-5 lg:w-6 lg:h-6" />
        </Link>
        <Link
          href="https://leetcode.com/u/nadim-chowdhury"
          className="text-slate-600 hover:text-teal-600 transition-all duration-300"
        >
          <FaCode className="w-5 h-5 lg:w-6 lg:h-6" />
        </Link>
        <Link
          href="https://dev.to/nadim_ch0wdhury"
          className="text-slate-600 hover:text-teal-600 transition-all duration-300"
        >
          <FaDev className="w-5 h-5 lg:w-6 lg:h-6" />
        </Link>
      </div>
    </section>
  );
}
