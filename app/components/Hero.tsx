"use client";
import { ArrowUpRight, SquareChevronDown } from "lucide-react";
import { Inter, Pixelify_Sans } from "next/font/google";
import gsap from "gsap";
import Observer from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import SplitText from "gsap/SplitText";
import Button from "./Button";
gsap.registerPlugin(SplitText, Observer);

const inter = Inter({
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
});

export default function Hero({ className = "" }) {
  const container = useRef<HTMLElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const cursorItem = useRef<HTMLDivElement>(null);

  // general anim
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

      gsap.from(".hero__marquee", {
        yPercent: 100,
        delay: 1,
        duration: 1.5,
        ease: "power4.out",
      });

      return () => {
        scrollSplit0.revert();
        scrollSplit1.revert();
        scrollSplit2.revert();
      };
    },
    { scope: container }
  );

  // cursor anim
  useGSAP(
    () => {
      gsap.set(cursorItem.current, {
        scale: 0.5,
        opacity: 0,
        pointerEvents: "none",
        yPercent: -50,
        xPercent: -50,
      });

      Observer.create({
        target: ".hero__main",
        ignore: cursorItem.current,
        onHoverEnd: () => {
          gsap.to(cursorItem.current, {
            pointerEvents: "none",
            scale: 0.5,
            opacity: 0,
            ease: "power4.out",
          });
        },
        onHover: () => {
          gsap.to(cursorItem.current, {
            scale: 1,
            opacity: 1,
            ease: "elastic",
            pointerEvents: "auto",
          });
        },
      });

      const xTo = gsap.quickTo(cursorItem.current, "x", {
        duration: 1,
        ease: "power2.out",
      });
      const yTo = gsap.quickTo(cursorItem.current, "y", {
        duration: 1,
        ease: "power2.out",
      });
      window.addEventListener("mousemove", (e) => {
        cursorRef.current.x = e.clientX;
        cursorRef.current.y = e.clientY;
      });
      const setCursor = () => {
        xTo(cursorRef.current.x);
        yTo(cursorRef.current.y);
      };
      gsap.ticker.add(setCursor);
    },

    { scope: container, dependencies: [] }
  );

  return (
    <>
      <section
        ref={container}
        className={`hero col-span-full flex h-[calc(100svh-72px)] flex-col overflow-x-hidden ${className}`}
      >
        <div className="hero__main relative isolate grid w-full max-w-full grow overflow-clip object-cover">
          <div
            ref={cursorItem}
            className="cursor fixed top-0 left-0 z-20 origin-center"
          >
            <Button btnClassName="!py-6">
              <span className="flex items-center justify-center text-xl font-semibold tracking-tighter">
                LET`S CHAT <ArrowUpRight />
              </span>
            </Button>
          </div>
          <video
            className="absolute top-0 left-0 z-0 h-full w-full object-cover contrast-80 saturate-150"
            loop={false}
            autoPlay
            controls={false}
            src={"vid.mp4"}
          ></video>
          {/* <Image
            src={"/hero2.png"}
            height={2000}
            width={2000}
            alt="none"
            className="absolute top-0 left-0 z-0 h-full w-full object-cover contrast-80 saturate-150"
          ></Image> */}
          <div className="hero__marquee pointer-events-none z-10 w-full self-end overflow-hidden">
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
          className={`hero__footer flex justify-between bg-amber-50 px-5 py-6 ${pixelifySans.className} `}
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
          <span className="hidden sm:inline-block">
            WE LIVE IN THE DETAILS ( C )
          </span>
        </div>
      </section>
    </>
  );
}
