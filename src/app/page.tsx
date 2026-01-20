import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TechStack } from "@/components/tech-stack";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  );
}
