import { myProjects } from "@/utls/demoData";
import Heading from "./Heading";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaGithub } from "react-icons/fa";

export default function Projects() {
  return (
    <section className="">
      <Heading title="My Projects" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {myProjects.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-lg p-6 flex flex-col justify-between"
          >
            <Image
              src={item.img}
              alt={item.title}
              width={1280}
              height={720}
              className="w-full h-36 object-cover rounded-md"
            />

            <div className="mt-6 flex flex-col justify-between grow">
              <h4 className="w-full text-center text-lg bg-gradient-to-tr from-teal-600 to-cyan-600 inline-block text-transparent bg-clip-text font-bold">
                {item.title}
              </h4>

              <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
                {item.technologyUsed.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs text-white rounded-full bg-gradient-to-tr from-teal-600 to-cyan-600"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between w-full mt-4">
                <Link
                  href={item.live.link}
                  className="flex items-center gap-2 transition-all duration-300 hover:text-teal-600"
                >
                  <span className="font-bold">Live</span>
                  <FaArrowRight className="-rotate-45" />
                </Link>
                <Link
                  href={item.github.link}
                  className="transition-all duration-300 hover:text-teal-600"
                >
                  <FaGithub className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
