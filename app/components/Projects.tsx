import { Instrument_Serif, Pixelify_Sans } from "next/font/google";
import { PROJECTS } from "../lib/DATA";
import ProjectCard from "./ProjectCard";
import Button from "./Button";
import { ArrowUpRight } from "lucide-react";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const pixelifySans = Pixelify_Sans({
  weight: "variable",
  subsets: ["latin"],
});

export default function Projects({ className = "" }) {
  return (
    <section
      className={`mx-6 flex grid-cols-12 flex-col gap-6 md:grid md:items-stretch ${className}`}
    >
      <div className="col-span-full mb-4 flex w-fit flex-col">
        <p className="flex flex-col text-7xl tracking-tighter sm:flex-row sm:items-center sm:gap-3 lg:text-8xl">
          <span>Our</span>
          <span
            className={`text-8xl italic lg:text-9xl ${instrumentSerif.className}`}
          >
            featured
          </span>
          <span>Work</span>
        </p>
        <p
          className={`text-center text-sm font-light tracking-tight md:text-lg ${pixelifySans.className}`}
        >
          GIVING STARTUPS THE UNFAIR ADVANTAGE
        </p>
      </div>
      <ProjectCard
        className="col-span-full"
        imgClassName=" h-[95vw] md:h-[55vw]"
        title={PROJECTS[0].title}
        href={PROJECTS[0].href}
        src={PROJECTS[0].src}
        subtitle={PROJECTS[0].subtitle}
        tags={PROJECTS[0].tags}
      />
      <ProjectCard
        variant="compact"
        className="col-span-5"
        imgClassName=" h-[95vw] md:h-[45vw]"
        title={PROJECTS[1].title}
        href={PROJECTS[1].href}
        src={PROJECTS[1].src}
        subtitle={PROJECTS[1].subtitle}
        tags={PROJECTS[1].tags}
      />
      <ProjectCard
        variant="compact"
        className="col-span-7"
        imgClassName=" h-[95vw] md:h-[45vw]"
        title={PROJECTS[2].title}
        href={PROJECTS[2].href}
        src={PROJECTS[2].src}
        subtitle={PROJECTS[2].subtitle}
        tags={PROJECTS[2].tags}
      />
      <ProjectCard
        variant="compact"
        className="col-span-7"
        imgClassName=" h-[95vw] md:h-[35vw]"
        title={PROJECTS[3].title}
        href={PROJECTS[3].href}
        src={PROJECTS[3].src}
        subtitle={PROJECTS[3].subtitle}
        tags={PROJECTS[3].tags}
      />
      <ProjectCard
        variant="compact"
        className="col-span-5"
        imgClassName=" h-[95vw] md:h-[35vw]"
        title={PROJECTS[4].title}
        href={PROJECTS[4].href}
        src={PROJECTS[4].src}
        subtitle={PROJECTS[4].subtitle}
        tags={PROJECTS[4].tags}
      />
    </section>
  );
}

export function ProjectTransition() {
  return (
    <div className="mx-4 my-32">
      <p className={`flex text-nowrap flex-col md:gap-[2vw] md:justify-center md:items-start md:flex-row md:text-[7.85vw] text-6xl tracking-tight `}>
        <span className={`${instrumentSerif.className}`}>We do many </span>
        <Button className="hidden w-fit md:inline-block" btnClassName="lg:py-[4vw] lg:px-[5.5vw]">
          <span className="flex w-full items-center justify-between text-xl tracking-tighter">
            <span></span>
            <span>SEE ALL WORK</span>
            <ArrowUpRight />
          </span>
        </Button>
        <span className={`ml-auto md:ml-0 ${instrumentSerif.className}`}>
          things very well.
        </span>
      </p>
      <Button className="mt-16 md:hidden w-full" >
        <span className="flex w-full items-center justify-between text-2xl tracking-tighter">
          <span></span>
          <span>SEE ALL WORK</span>
          <ArrowUpRight />
        </span>
      </Button>
    </div>
  );
}
