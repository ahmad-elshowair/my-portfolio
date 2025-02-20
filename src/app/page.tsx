import Experience from "@/components/Experiences";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="flex flex-col bg-bgGreen p-4">
      <Hero />
      <Experience />
      <Projects />
    </main>
  );
}
