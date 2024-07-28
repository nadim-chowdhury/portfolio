import { mySkills } from "@/utls/demoData";
import Heading from "./Heading";
import Image from "next/image";

export default function Skills() {
  return (
    <section className="">
      <Heading title="My Skills" />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
        {mySkills?.map((item) => (
          <div
            key={item.id}
            className="py-2 px-4 bg-white border rounded-lg flex items-center gap-2 lg:gap-4"
          >
            <Image
              src={item.img}
              alt={item.title}
              width={360}
              height={360}
              className="w-6 h-6 lg:w-10 lg:h-10 object-cover rounded-full"
            />
            <h3 className="text-sm lg:text-base font-medium tracking-wide">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
