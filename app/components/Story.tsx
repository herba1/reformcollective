"use client";
import { Instrument_Serif, Pixelify_Sans } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "./Button";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

const pixelify = Pixelify_Sans({
  weight: "variable",
  subsets: ["latin"],
});

export default function Story() {
  const container = useRef<HTMLStyleElement>(null);

  useGSAP(
    () => {
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top-=50% bottom",
          end: "center center",
          scrub: 2,
        },
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".lines",
          start: "top bottom",
          end: "top bottom",
          toggleActions: "play none none reset",
        },
      });

      textTl
        .from(".text__l", {
          xPercent: -150,
        })
        .from(
          ".text__center",
          {
            yPercent: -150,
          },
          "<"
        )
        .from(
          ".text__r",
          {
            xPercent: 150,
          },
          "<"
        );

      tl.set(".line__middle", { display: "none" })
        .from(".line__main", {
          scaleX: 0,
          duration: 1,
          ease: "power3.out",
        })
        .fromTo(
          ".line__down",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.out",
          },
          "<+=0.3"
        )
        // .set(".line__middle", { scale: 1 })
        .fromTo(
          ".line__lt",
          { rotate: 90, display: "block" },
          {
            display: "block",
            rotate: 160,
            duration: 1,
            ease: "power3.out",
          },
          "<+=0.7"
        )
        .fromTo(
          ".line__lb",
          { rotate: 90, scaleX: 1, display: "block" },
          {
            display: "block",
            rotate: 130,
            duration: 1,
            ease: "power3.out",
          },
          "<+=0.1"
        )
        .fromTo(
          ".line__rt",
          { rotate: 90, display: "block" },
          {
            display: "block",
            rotate: 20,
            duration: 1,
            ease: "power3.out",
          },
          "<+=0.1"
        )
        .fromTo(
          ".line__rb",
          { rotate: 90, scaleX: 1, display: "block" },
          {
            display: "block",
            rotate: 50,
            duration: 1,
            ease: "power3.out",
          },
          "<+=0.1"
        )
        .from(
          ".line__text",
          {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          "-=0.4"
        );

      const articleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".articles",
          start: "top bottom",
          end: "top bottom",
          toggleActions: "play none none reset",
        },
        delay: 0.2,
      });

      articleTl
        .from([".article", ".button"], {
          delay:0.5,
          yPercent: 35,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.Out",
        })
        .from(".arrow", {
          scaleX: 0,
          opacity: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power4.out",
        });
    },
    { scope: container, dependencies: [] }
  );

  return (
    <section ref={container} className="mx-5 mt-64">
      <div className="decoration md:mx-auto md:w-[45vw]">
        <p className="flex items-end justify-between tracking-tighter">
          <span className="text__l md:text-[3vw]">THE</span>
          <span
            className={`text__center -mb-3 text-8xl leading-none md:text-[10vw] ${instrumentSerif.className}`}
          >
            Details
          </span>
          <span className="text__r md:text-[3vw]">CLUB</span>
        </p>
      </div>
      <div className="lines relative mt-5 md:mx-auto md:w-[45vw]">
        <div className="line line__main h-0.5 origin-center bg-black"></div>
        <div className="line line__middle line__rt absolute top-0 left-1/2 h-0.5 w-4/10 origin-left rotate-20 bg-black"></div>
        <div className="line line__middle line__rb absolute top-0 left-1/2 h-0.5 w-4/10 origin-left rotate-50 bg-black"></div>
        <div className="line line__down absolute top-0 left-1/2 h-0.5 w-4/10 origin-left rotate-90 bg-black"></div>
        <div className="line line__middle line__lb absolute top-0 left-1/2 h-0.5 w-4/10 origin-left rotate-130 bg-black"></div>
        <div className="line line__middle line__lt absolute top-0 left-1/2 h-0.5 w-4/10 origin-left rotate-160 bg-black"></div>
        <p className="mt-2 flex justify-between text-sm">
          <span className={`line__text ${pixelify.className}`}>PINKIES UP</span>
          <span className={`line__text ${pixelify.className}`}>EST. 2015</span>
        </p>
      </div>
      <div className="articles relative mt-64 grid-cols-2 items-start md:mt-[25vw] md:grid md:gap-10 xl:mx-auto xl:max-w-[1670px] xl:grid-cols-8 xl:gap-5">
        <div
          aria-hidden
          className="arrow absolute left-1/2 mt-5 hidden h-0.5 w-12 -translate-x-full bg-black md:block "
        >
          <div className="relative w-full">
            <ChevronRight className="absolute top-0 left-full -translate-x-11/20 -translate-y-9/20 scale-70" />
            <ChevronLeft className="absolute top-0 left-0 -translate-x-9/20 -translate-y-9/20 scale-70" />
          </div>
        </div>
        <div aria-hidden className="absolute h-full w-0.5 bg-black md:hidden">
          <div className="relative h-full -translate-x-0">
            <ChevronDown className="absolute bottom-0 left-0 -translate-x-9/20 translate-y-4/10 scale-70" />
            <ChevronUp className="absolute top-0 left-0 -translate-x-9/20 -translate-y-4/10 scale-70" />
          </div>
        </div>
        <Article
          className="article ml-5 md:ml-0 xl:col-span-3 xl:col-start-2"
          title={DATA[0].title}
          text={DATA[0].text}
        ></Article>
        <Article
          className="article mt-16 ml-5 md:mt-0 md:ml-0 xl:col-span-3 xl:col-start-5"
          title={DATA[1].title}
          text={DATA[1].text}
        ></Article>
      </div>
      <div className="button mt-12 w-full grid-cols-8 gap-5 xl:mx-auto xl:mt-18 xl:grid xl:max-w-[1670px]">
        <Button
          btnClassName="md:py-12"
          className="col-span-3 col-start-2 w-full md:max-w-sm"
        >
          <span className="flex w-full items-center justify-around text-xl">
            LEARN MORE ABOUT US <ArrowUpRight />
          </span>
        </Button>
      </div>
    </section>
  );
}

type ArticleProps = {
  className?: string;
  title: string;
  text: string;
};

function Article({ className, title, text }: ArticleProps) {
  return (
    <article className={` ${className}`}>
      <h1
        className={`tracking-tight ${instrumentSerif.className} text-5xl lg:text-[clamp(42px,3.8vw,68px)]`}
      >
        {title}
      </h1>
      <p
        className={`mt-5 text-lg tracking-tighter md:mt-15 lg:max-w-8/10 lg:text-xl`}
      >
        {text}
      </p>
    </article>
  );
}

const DATA = [
  {
    title: "Your business has a story.",
    text: "Not just a pitch, not just a product...there’s a reason you do what you do. It’s the late nights, the wild ideas, the belief that this thing you’re building actually matters. That’s the story people will connect with. That’s the story worth telling. It’s the story we can craft for you.",
  },
  {
    title: "We design and build to tell it.",
    text: "A great story deserves more than a place to live. A story needs a way to move. We design brands, craft interfaces, and build digital experiences that don’t just inform but pull people in. Every detail, every interaction, every pixel works to make your story impossible to ignore.",
  },
];
