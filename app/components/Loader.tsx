"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Loader() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Your GSAP animations here
    },
    { scope: container, dependencies: [] }
  );

  return (
    <section ref={container} className="fixed z-[999] grid place-content-center h-dvh w-full">
      <div className="slide__bottom absolute bottom-0 z-0 h-1/2 w-full bg-red-600"></div>
      <div className="slide__bottom absolute top-0 z-0 h-1/2 w-full bg-red-600"></div>
      <div className="relative z-10 grid place-content-center bg-blue-500">
        <h1 className="text-[clamp(1px,10vw,5000px)] leading-none font-bold tracking-tighter">
          REFORM CO
        </h1>
      </div>
    </section>
  );
}
