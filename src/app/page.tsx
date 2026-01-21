import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";

// Lazy load below-the-fold components
const TechStack = dynamic(() => import("@/components/tech-stack").then(mod => ({ default: mod.TechStack })));
const Projects = dynamic(() => import("@/components/projects").then(mod => ({ default: mod.Projects })));
const About = dynamic(() => import("@/components/about").then(mod => ({ default: mod.About })));

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
