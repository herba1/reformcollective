// import { Instrument_Serif } from "next/font/google";
import Hero from "./components/Hero";
import Button from "./components/Button";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "./components/ProjectCard";
import Projects, { ProjectTransition } from "./components/Projects";
import Awards from "./components/Awards";
import Experience from "./components/Experience";
import Clients from "./components/Clients";
import Story from "./components/Story";
import ReformNovaLogo from "./components/ReformNovaLogo";
import ReformNova from "./components/ReformNova";
import Footer from "./components/Footer";

// const instrumentSerif = Instrument_Serif({
//   weight: ["400"],
//   subsets: ["latin"],
// });

export default function Home() {
  return (
    <main
      id="main__container"
      className="main__container relative isolate z-10 col-span-full origin-top overflow-hidden bg-black"
    >
      <div
        id="main__content"
        className={`main__content grid origin-bottom overflow-clip bg-amber-50 font-sans`}
      >
        <Hero className="mb-12 md:mb-24" />
        <Projects />
        <ProjectTransition />
        <Awards />
        <Clients />
        <Story />
        <ReformNova/>
        <Footer/>
      </div>
    </main>
  );
}
