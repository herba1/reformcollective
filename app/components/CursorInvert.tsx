"use client";
import gsap from "gsap";
import Observer from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(Observer);

export default function CursorInvert({
  className = "",
  hover,
}: {
  className: string;
  hover: boolean;
}) {
  const cursorRef = useRef({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    offsetFromTop: 0,
  });
  const cursorItem = useRef<HTMLDivElement>(null);
  const cursorItem2 = useRef<HTMLDivElement>(null);

  const getOffsetFromTop = (element: HTMLElement | null): number => {
    if (!element) return 0;
    let offsetTop = 0;
    let currentElement: HTMLElement | null = element;
    while (currentElement) {
      offsetTop += currentElement.offsetTop;
      currentElement = currentElement.offsetParent as HTMLElement;
    }
    return offsetTop;
  };

  useLayoutEffect(() => {
    if (cursorItem.current?.parentElement) {
      cursorRef.current.offsetFromTop = getOffsetFromTop(
        cursorItem.current.parentElement
      );
    }

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (cursorItem.current?.parentElement) {
          cursorRef.current.offsetFromTop = getOffsetFromTop(
            cursorItem.current.parentElement
          );
        }
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useGSAP(
    () => {
      gsap.set([cursorItem.current, cursorItem2.current], {
        pointerEvents: "none",
        yPercent: -50,
        xPercent: -50,
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
        // clean last values cached
        cursorRef.current.clientX = e.clientX;
        cursorRef.current.x = e.clientX;
        cursorRef.current.clientY = e.clientY;
      });
      const setCursor = () => {
        xTo(cursorRef.current.x);
        yTo(
          cursorRef.current.clientY +
            window.pageYOffset -
            cursorRef.current.offsetFromTop
        );
      };
      gsap.ticker.add(setCursor);
    },
    { scope: cursorItem, dependencies: [] }
  );

  useGSAP(
    () => {
      if (!hover) {
        gsap.to([cursorItem.current, cursorItem2.current], {
          overwrite: "auto",
          // pointerEvents: "none",
          scale: 0.5,
          opacity: 0,
          ease: "power4.out",
        });
      } else if (hover) {
        gsap.to([cursorItem.current, cursorItem2.current], {
          overwrite: "auto",
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
        className={`cursor absolute top-0 left-0 z-20 h-42 w-28 origin-center rounded-full bg-white mix-blend-difference md:h-64 md:w-42 ${className}`}
      ></div>
      <div
        ref={cursorItem2}
        className={`cursor absolute top-0 left-0 isolate z-0 h-42 w-28 md:h-64 md:w-42 origin-center rounded-full bg-transparent`}
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
