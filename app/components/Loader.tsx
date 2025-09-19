"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import SplitText from "gsap/SplitText";
import { Inter } from "next/font/google";
import { SquareActivity, SquareAsterisk } from "lucide-react";

const dmSans = Inter({
  weight: "variable",
  subsets: ["latin"],
});

gsap.registerPlugin(SplitText);

export default function Loader() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Your GSAP animations here
      const split1 = SplitText.create(".text1", { type: "chars",reduceWhiteSpace:false });
      const split2 = SplitText.create(".text2", { type: "chars",reduceWhiteSpace:false });

      const tl = gsap.timeline({ repeat: 0, paused: false });
      const duration = 0.8;

      const options = {
        duration: duration,
        stagger: duration / 10,
        ease: "expo.inOut",
      };

      tl.from(split1.chars, {
        yPercent: 100,
        duration: options.duration,
        stagger: options.stagger,
        ease: options.ease,
      })
        .to(
          split2.chars,
          {
            yPercent: -100,
            duration: options.duration,
            stagger: options.stagger,
            ease: options.ease,
          },
          "<"
        )
        .to(".fade", {
          opacity: 0,
          ease: "power4.out",
          duration: 0.5,
        })
        .to(
          ".r",
          {
            overwrite: "auto",
            xPercent: "330",
            ease: "power3.in",
            duration: 0.7,
          },
          "-=0.3"
        )
        .to(
          ".c",
          {
            overwrite: "auto",
            xPercent: "-200",
            ease: "power3.in",
            duration: 0.7,
          },
          "<"
        )
        .set([".r", ".c"], {
          opacity: 0,
        })
        .to(".slide__bottom", {
          yPercent: 100,
          ease: "power3",
          duration: "0.8",
        })
        .to(
          ".slide__top",
          {
            yPercent: -100,
            ease: "power3",
            duration: "0.8",
            onComplete:()=>{
              const video  = document.querySelector('#hero__video') as HTMLVideoElement;
              video.play()
            }
          },
          "<"
        )
        .set(container.current, { display: "none" });

      const badgeTl = gsap.timeline({ repeat: -1 });
      const badgeEase = "power4.out";
      const badgeDuration = 1;

      gsap.set(".badges", {
        opacity: 1,
      });
      badgeTl
        .fromTo(
          ".badge1",
          {
            xPercent: 100,
          },
          {
            xPercent: 0,
            duration: badgeDuration,
            badgeEase: badgeEase,
          }
        )
        .to(".badge1", {
          xPercent: -100,
          duration: badgeDuration,
          badgeEase: badgeEase,
        })
        .from(
          ".badge2",
          {
            xPercent: 100,
            duration: badgeDuration,
            badgeEase: badgeEase,
          },
          "<"
        )
        .to(".badge2", {
          xPercent: -100,
          duration: badgeDuration,
          badgeEase: badgeEase,
        })
        .from(
          ".badge3",
          {
            xPercent: 100,
            duration: badgeDuration,
            badgeEase: badgeEase,
          },
          "<"
        );
    },
    { scope: container, dependencies: [] }
  );

  return (
    <section
      ref={container}
      className="fixed z-[999] grid h-dvh w-full place-content-center"
    >
      <div className="slide__bottom absolute bottom-0 z-0 h-1/2 w-full bg-red-700">
        <div className="badges absolute right-0 bottom-0 m-5 ml-5 grid h-12 w-12 grid-cols-1 grid-rows-1 overflow-clip opacity-0">
          <SquareAsterisk className="badge1 col-start-1 row-start-1 inline-block h-full w-full" />
          <SquareActivity className="badge2 col-start-1 row-start-1 inline-block h-full w-full" />
          <SquareAsterisk className="badge3 col-start-1 row-start-1 inline-block h-full w-full" />
        </div>
      </div>
      <div className="slide__top absolute top-0 z-0 h-1/2 w-full bg-red-700"></div>
      <div
        className={`relative z-10 grid grid-cols-1 grid-rows-1 place-content-center overflow-hidden text-[16.8vw] sm:text-[clamp(32px,8vw,5000px)] ${dmSans.className} `}
      >
        <h1 className="text1 col-start-1 row-start-1 leading-none font-bold tracking-tighter">
          <span className="r">R</span>
          <span className="fade">EFORM</span>
          <span>&nbsp;</span>
          <span className="c">C</span>
          <span className="fade">O</span>
        </h1>
        <h1 className="text2 col-start-1 row-start-1 leading-none font-bold tracking-tighter">
          <span className="r">R</span>
          <span className="fade">EFORM</span>
          <span>&nbsp;</span>
          <span className="c">C</span>
          <span className="fade">O</span>
          {/* REFORM CO */}
        </h1>
      </div>
    </section>
  );
}
