import AdditionalProjects from "@/components/AdditionalProjects";
import Banner from "@/components/Banner";
import Education from "@/components/Education";
import Experiences from "@/components/Experiences";
import MobileAppProjects from "@/components/MobileAppProjects";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="container mx-auto">
      <Banner />
      <Skills />
      <Projects />
      <MobileAppProjects />
      <Experiences />
      <AdditionalProjects />
      <Education />
    </main>
  );
}
