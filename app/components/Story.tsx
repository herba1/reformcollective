"use client";
import { Instrument_Serif, Pixelify_Sans } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

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

      tl.set('.line__middle',{display:'none'})
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
          { rotate: 90, display:'block' },
          {
            display:'block',
            rotate: 160,
            duration: 1,
            ease: "power3.out",
          },
          "<+=0.7"
        )
        .fromTo(
          ".line__lb",
          { rotate: 90, scaleX: 1, display:'block' },
          {
            display:'block',
            rotate: 130,
            duration: 1,
            ease: "power3.out",
          },
          "<+=0.1"
        )
        .fromTo(
          ".line__rb",
          { rotate: 90, scaleX: 1, display:'block' },
          {
            display:'block',
            rotate: 50,
            duration: 1,
            ease: "power3.out",
          },
          "<+=0.1"
        )
        .fromTo(
          ".line__rt",
          { rotate: 90, display:'block',},
          {
            display:'block',
            rotate: 20,
            duration: 1,
            ease: "power3.out",
          },
          "<+=0.1"
        )
        .from(
          ".line__text",
          {
            yPercent: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          "-=0.4"
        );
    },
    { scope: container, dependencies: [] }
  );

  return (
    <section ref={container} className="mx-5 mt-32 md:mx-auto md:w-[45vw]">
      <div className="decoration">
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
      <div className="lines relative mt-5">
        <div className="line line__main h-0.5 origin-center bg-black"></div>
        <div className="line line__middle line__rt absolute top-0 left-1/2 h-0.5 w-4/10 origin-left rotate-20 bg-black"></div>
        <div className="line line__middle line__rb absolute top-0 left-1/2 h-0.5 w-4/10 origin-left rotate-50 bg-black"></div>
        <div className="line line__down absolute top-0 left-1/2 h-0.5 w-4/10 origin-left rotate-90 bg-black"></div>
        <div className="line line__middle line__lb absolute top-0 left-1/2 h-0.5 w-4/10 origin-left rotate-130 bg-black"></div>
        <div className="line line__middle line__lt absolute top-0 left-1/2 h-0.5 w-4/10 origin-left rotate-160 bg-black"></div>
        <p className="flex justify-between text-sm">
          <span className={`line__text ${pixelify.className}`}>PINKIES UP</span>
          <span className={`line__text ${pixelify.className}`}>EST. 2015</span>
        </p>
      </div>
    </section>
  );
}
