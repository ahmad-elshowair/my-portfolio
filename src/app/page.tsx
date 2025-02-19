import Experience from "@/components/Experiences";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col bg-[#2c3531] text-white p-4">
      <Hero />
      <Experience />
    </main>
  );
}
