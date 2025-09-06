"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import TextPlugin from "gsap/TextPlugin";
import { Instrument_Serif, Pixelify_Sans } from "next/font/google";
import { useRef } from "react";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  weight: ["400"],
  subsets: ["latin"],
});

gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);

export default function NavTypewriter({ className = "" }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(".typewriter", {
        delay: 2,
        text: {
          value: "random([fjaldpo,faodklas,lkfjasd])",
        },
      })
      .to(".typewriter", {
        text: {
          value: "digital",
        },
      }).to(".typewriter", {
        delay: 2,
        text: {
          value: "random([fjaldpo,faodklas,lkfjasd])",
        },
      }).to(".typewriter", {
        text: {
          value: "creative",
        },
      })


    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className={`${instrumentSerif.className} hidden sm:inline text-4xl leading-none tracking-tight text-amber-50`}
    >
      <span>Award winning</span>
      <span className={`text-3xl font-extralight ${pixelifySans.className}`}>
        {" "}
        (<span className="typewriter">creative</span>){" "}
      </span>
      <span>agency</span>
    </div>
  );
}
