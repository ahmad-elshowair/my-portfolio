import Contact from "@/components/Contact";
import Experience from "@/components/Experiences";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-clip bg-bgGreen p-4">
      <Hero />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
