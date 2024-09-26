"use client";

import AdditionalProjects from "@/components/AdditionalProjects";
import Banner from "@/components/Banner";
import Education from "@/components/Education";
import Experiences from "@/components/Experiences";
import Heading from "@/components/Heading";
import MobileAppProjects from "@/components/MobileAppProjects";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <main className="container mx-auto">
      <Banner />
      <Skills />

      <div className="pt-16">
        <Heading title="Top Projects" />
        <AnimatePresence>
          <Tabs defaultValue="full-stack" className="">
            <div className="w-full flex items-center justify-center">
              <TabsList className="bg-gradient-to-r from-cyan-100 to-teal-100 h-11 px-2">
                <TabsTrigger value="full-stack" className="">
                  Full Stack Projects
                </TabsTrigger>
                <TabsTrigger value="mobile-app">
                  Mobile App Projects
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="full-stack">
              <Projects />
            </TabsContent>
            <TabsContent value="mobile-app">
              <MobileAppProjects />
            </TabsContent>
          </Tabs>
        </AnimatePresence>
      </div>

      <Experiences />
      <AdditionalProjects />
      <Education />
    </main>
  );
}
