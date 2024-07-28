import Banner from "@/components/Banner";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="container mx-auto">
      <Banner />
      <Skills />
      <Projects />
    </main>
  );
}
