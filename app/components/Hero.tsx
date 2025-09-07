"use client";
import { SquareChevronDown } from "lucide-react";
import { Inter, Pixelify_Sans } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const inter = Inter({
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
});

export default function Hero({ className = "" }) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scrollSplit0 = SplitText.create(".scrollSplit0", {
        type: "lines",
        mask: "lines",
      });
      const scrollSplit1 = SplitText.create(".scrollSplit1", {
        type: "lines,chars",
      });
      const scrollSplit2 = SplitText.create(".scrollSplit2", {
        type: "lines,chars",
      });
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(scrollSplit1.chars, {
        yPercent: 100,
        stagger: 0.1,
        duration: 1,
        ease: "power2.inOut",
      })
        .from(
          scrollSplit2.chars,
          {
            yPercent: -100,
            stagger: 0.1,
            duration: 1,
            ease: "power2.inOut",
          },
          "<"
        )
        .to([scrollSplit1.lines, scrollSplit2.lines], {
          delay: 1,
          yPercent: -100,
        });
        return(()=>{
          scrollSplit0.revert();
          scrollSplit1.revert();
          scrollSplit2.revert();
        })
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className={`hero col-span-full flex h-[calc(100svh-72px)] flex-col overflow-x-hidden ${className}`}
    >
      <div className="hero__main relative grid w-full max-w-full grow object-cover">
        <video
          src={"/vid.mp4"}
          className="absolute contrast-80 saturate-150  top-0 left-0 z-0 h-full w-full object-cover"
          loop={false}
          autoPlay
          controls={false}
        ></video>
        <div className="z-10 w-full hero__marquee self-end overflow-hidden">
          <p
            className={`animate-marquee flex w-max items-stretch self-end text-[20vw] leading-none tracking-tighter text-nowrap text-black lg:text-[15vw] ${inter.className}`}
          >
            REFORM CO
            <span className="text-[5vw]">©</span>
            <span className="mx-6 flex aspect-square h-full w-[15vw] items-center justify-center self-center rounded-md bg-red-500 text-transparent lg:w-[13vw]"></span>
            REFORM CO
            <span className="text-[5vw]">©</span>
            <span className="mx-6 flex aspect-square h-full w-[15vw] items-center justify-center self-center rounded-md bg-red-500 text-transparent lg:w-[13vw]"></span>
          </p>
        </div>
      </div>
      <div
        className={`hero__footer flex justify-between bg-amber-50 px-4 py-6 ${pixelifySans.className} `}
      >
        <span>EST.2015</span>
        <span className="flex items-center justify-center">
          <span>(</span>
          <span className="relative grid h-min grid-cols-1 grid-rows-1 overflow-clip leading-none">
            <span className="scrollSplit1 col-span-1 col-start-1 row-start-1">
              SCROLL DOWN
            </span>
            <span className="scrollSplit2 col-span-1 col-start-1 row-start-1">
              SCROLL DOWN
            </span>
          </span>
          <span className="flex items-center">
            <SquareChevronDown className="animate-pulse" size={15} />)
          </span>
        </span>
        <span className="hidden sm:inline-block ">WE LIVE IN THE DETAILS ( C )</span>
      </div>
    </section>
  );
}
