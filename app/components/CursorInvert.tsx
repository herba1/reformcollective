"use client";
import gsap from "gsap";
import Observer from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(Observer);

export default function CursorInvert({ className = "",hover }:{className:string, hover:boolean}) {
  const cursorRef = useRef({ x: 0, y: 0 });
  const cursorItem = useRef<HTMLDivElement>(null);
  const cursorItem2 = useRef<HTMLDivElement>(null);

  // cursor anim
  useGSAP(
    () => {
      gsap.set([cursorItem.current, cursorItem2.current], {
        // scale: 0.5,
        // opacity: 0,
        pointerEvents: "none",
        yPercent: -50,
        xPercent: -50,
      });

      Observer.create({
        target: ".cursor-target",
        ignore: cursorItem.current,
        // onHoverEnd: (e) => {
        //   gsap.to(cursorItem.current, {
        //     pointerEvents: "none",
        //     scale: 0.5,
        //     opacity: 0,
        //     ease: "power4.out",
        //   });
        // },
        // onHover: (e) => {
        //   gsap.to(cursorItem.current, {
        //     scale: 1,
        //     opacity: 1,
        //     ease: "elastic",
        //     pointerEvents: "auto",
        //   });
        // },
      });

      const xTo = gsap.quickTo([cursorItem.current, cursorItem2.current], "x", {
        duration: 1,
        ease: "power2.out",
      });
      const yTo = gsap.quickTo([cursorItem.current, cursorItem2.current], "y", {
        duration: 1,
        ease: "power2.out",
      });
      window.addEventListener("mousemove", (e) => {
        cursorRef.current.x = e.clientX;
        if (!cursorItem.current?.parentElement) return;
        cursorRef.current.y =
          e.clientY -
          cursorItem.current?.parentElement.getBoundingClientRect().top;
      });
      const setCursor = () => {
        xTo(cursorRef.current.x);
        yTo(cursorRef.current.y);
      };
      gsap.ticker.add(setCursor);
    },
    { scope: cursorItem, dependencies: [] }
  );



  useGSAP(
    () => {
        if(!hover){
          gsap.to([cursorItem.current,cursorItem2.current], {
            overwrite:'auto',
            // pointerEvents: "none",
            scale: 0.5,
            opacity: 0,
            ease: "power4.out",
          });
        }
        else if(hover){
          gsap.to([cursorItem.current,cursorItem2.current], {
            overwrite:'auto',
            scale: 1,
            opacity: 1,
            ease: "elastic",
            // pointerEvents: "auto",
          });
        }

    },
    { scope: cursorItem, dependencies: [hover] }
  );

  return (
    <>
      <div
        ref={cursorItem}
        className={`cursor absolute top-0 left-0 z-20 h-64 w-42 origin-center rounded-full bg-white mix-blend-difference ${className}`}
      ></div>
      <div
        ref={cursorItem2}
        className={`cursor absolute top-0 left-0 isolate z-0 h-64 w-42 origin-center rounded-full bg-transparent`}
      >
        <Image
          width={1000}
          unoptimized
          height={1000}
          src={"/chrome.gif"}
          alt="disco"
          className="h-full w-full scale-90 object-contain"
        />
      </div>
    </>
  );
}
